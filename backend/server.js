// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Permite que seu frontend na Vercel acesse este backend no Render
app.use(cors());
app.use(express.json());

// =====================================================
// CONEXÃO COM O BANCO DE DADOS MONGODB
// =====================================================
console.log(`[${getTimestamp()}] ⏳ [CONEXÃO] Tentando conectar ao MongoDB Atlas...`);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`[${getTimestamp()}] ✅ [CONEXÃO] Sucesso: Conectado ao MongoDB Atlas com segurança!`);
    })
    .catch((err) => {
        console.error(`[${getTimestamp()}] ❌ [CONEXÃO] INSUCESSO: Erro crítico ao conectar no MongoDB!`);
        console.error(`[${getTimestamp()}] 📄 [DETALHE DO ERRO]:`, err.message);
    });



// Criando a estrutura (Schema) das nossas estatísticas
const StatsSchema = new mongoose.Schema({
    id: { type: String, default: 'estatisticas_ifpr' }, // Um único documento para somar tudo
    totalGeral: { type: Number, default: 0 },
    vencedorAgro: { type: Number, default: 0 },
    vencedorInfo: { type: Number, default: 0 },
    vencedorMeca: { type: Number, default: 0 },
    vencedorCom: { type: Number, default: 0 },
    testesEspecAgro: { type: Number, default: 0 },
    testesEspecInfo: { type: Number, default: 0 },
    testesEspecMeca: { type: Number, default: 0 },
    testesEspecCom: { type: Number, default: 0 }
});

const Stats = mongoose.model('Stats', StatsSchema);

// -----------------------------------------------------
// ROTA 1: GET (Busca os dados para mostrar no seu Painel Oculto)
// -----------------------------------------------------
app.get('/api/stats', async (req, res) => {


    try {

        const timestamp = getTimestamp();
        console.log(`[${timestamp}] 🔍 [GET /api/stats] Requisição recebida para leitura das estatísticas...`);

        let stats = await Stats.findOne({ id: 'estatisticas_ifpr' });

        if (!stats) {
            console.log(`[${timestamp}] ℹ️ [BANCO] Documento inicial não encontrado. Criando novo registro padrão...`);
            stats = await Stats.create({ id: 'estatisticas_ifpr' });
        }

        console.log(`[${timestamp}] ✅ [GET /api/stats] SUCESSO: Estatísticas enviadas ao cliente com êxito! Total acumulado: ${stats.totalGeral} testes.`);

        return res.status(200).json(stats);

    } catch (error) {
        console.error(`[${timestamp}] ❌ [GET /api/stats] INSUCESSO ao consultar o MongoDB!`);
        console.error(`[${timestamp}] 📄 [DETALHE DO ERRO]:`, error.message);

        res.status(500).json({ error: 'Erro interno ao buscar estatísticas do banco de dados.' });
    }
});

// -----------------------------------------------------
// ROTA 2: POST (Recebe o resultado de um aluno e soma +1)
// -----------------------------------------------------
app.post('/api/stats', async (req, res) => {

    try {
        const timestamp = getTimestamp();
        const { tipoTeste, cursoResult } = req.body;

        console.log(`[${timestamp}] 📥 [POST /api/stats] Nova requisição recebida: Tipo="${tipoTeste}", Resultado="${cursoResult}"`);


        // Validação básica do payload enviado pelo Frontend
        if (!tipoTeste || !cursoResult) {
            console.warn(`[${timestamp}] ⚠️ [POST /api/stats] AVISO: Dados incompletos recebidos na requisição! Body:`, req.body);
            return res.status(400).json({ error: 'Parâmetros "tipoTeste" e "cursoResult" são obrigatórios.' });
        }

        let stats = await Stats.findOne({ id: 'estatisticas_ifpr' });
        if (!stats) stats = await Stats.create({ id: 'estatisticas_ifpr' });

        stats.totalGeral += 1; // Sempre soma +1 no total

        // Lógica para Trilha Geral
        if (tipoTeste === 'GERAL') {
            if (cursoResult === 'Agropecuária') stats.vencedorAgro += 1;
            if (cursoResult === 'Informática') stats.vencedorInfo += 1;
            if (cursoResult === 'Mecatrônica') stats.vencedorMeca += 1;
            if (cursoResult === 'Comércio') stats.vencedorCom += 1;
            else console.warn(`[${timestamp}] ⚠️ [POST] Curso não mapeado na Trilha Geral: "${cursoResult}"`);

        }
        // Lógica para Trilhas Específicas
        else if (tipoTeste === 'ESPECIFICO') {
            if (cursoResult === 'Agropecuária') stats.testesEspecAgro += 1;
            if (cursoResult === 'Informática') stats.testesEspecInfo += 1;
            if (cursoResult === 'Mecatrônica') stats.testesEspecMeca += 1;
            if (cursoResult === 'Comércio') stats.testesEspecCom += 1;
            else console.warn(`[${timestamp}] ⚠️ [POST] Curso não mapeado na Trilha Específica: "${cursoResult}"`);

        }

        await stats.save();

        console.log(`[${timestamp}] ✅ [POST /api/stats] SUCESSO: Registro gravado no MongoDB!`);
        console.log(`[${timestamp}] 📊 [PLANO GERAL ATUALIZADO]: Total Geral = ${stats.totalGeral} | Agro = ${stats.vencedorAgro} | Info = ${stats.vencedorInfo} | Meca = ${stats.vencedorMeca} | Comércio = ${stats.vencedorCom}`);


        return res.status(200).json({
            message: '✅ Dados salvos com sucesso na nuvem!',
            stats
        });


    } catch (error) {
        console.error(`[${timestamp}] ❌ [POST /api/stats] INSUCESSO: Falha ao persistir os dados no MongoDB!`);
        console.error(`[${timestamp}] 📄 [DETALHE DO ERRO]:`, error.message);

        return res.status(500).json({ error: 'Erro interno ao salvar dados no MongoDB.' });
    }
});

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[${getTimestamp()}] 🚀 Servidor ativo e escutando na porta ${PORT}`);
});

