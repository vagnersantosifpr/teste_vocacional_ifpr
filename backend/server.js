// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Permite que seu frontend na Vercel acesse este backend no Render
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB!'))
  .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err));

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
        let stats = await Stats.findOne({ id: 'estatisticas_ifpr' });
        if (!stats) {
            stats = await Stats.create({ id: 'estatisticas_ifpr' }); // Cria se não existir
        }
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

// -----------------------------------------------------
// ROTA 2: POST (Recebe o resultado de um aluno e soma +1)
// -----------------------------------------------------
app.post('/api/stats', async (req, res) => {
    try {
        const { tipoTeste, cursoResult } = req.body; 
        
        let stats = await Stats.findOne({ id: 'estatisticas_ifpr' });
        if (!stats) stats = await Stats.create({ id: 'estatisticas_ifpr' });

        stats.totalGeral += 1; // Sempre soma +1 no total

        // Lógica para Trilha Geral
        if (tipoTeste === 'GERAL') {
            if (cursoResult === 'Agropecuária') stats.vencedorAgro += 1;
            if (cursoResult === 'Informática') stats.vencedorInfo += 1;
            if (cursoResult === 'Mecatrônica') stats.vencedorMeca += 1;
            if (cursoResult === 'Comércio') stats.vencedorCom += 1;
        } 
        // Lógica para Trilhas Específicas
        else if (tipoTeste === 'ESPECIFICO') {
            if (cursoResult === 'Agropecuária') stats.testesEspecAgro += 1;
            if (cursoResult === 'Informática') stats.testesEspecInfo += 1;
            if (cursoResult === 'Mecatrônica') stats.testesEspecMeca += 1;
            if (cursoResult === 'Comércio') stats.testesEspecCom += 1;
        }

        await stats.save();
        res.json({ message: '✅ Dados salvos com sucesso na nuvem!', stats });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar dados' });
    }
});

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

