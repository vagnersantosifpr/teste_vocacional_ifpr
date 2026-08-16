import { CourseData, CourseKey, Question } from '../types';

export const COURSES_DATA: Record<CourseKey, CourseData> = {
  agro: {
    key: 'agro',
    shortName: 'Agropecuária',
    fullName: 'Técnico em Agropecuária Integrado ao Ensino Médio',
    tagline: 'O agro tecnológico que move a nossa região!',
    icon: '🌾',
    themeColor: '#2F9E41',
    themeLightBg: '#EAF7ED',
    themeBorder: '#A7E3B4',
    resultTitle: 'Seu Match é: Técnico em Agropecuária! 🌾',
    about: 'Topografia, Zootecnia, Agricultura, Máquinas Agrícolas e Administração Rural. Tudo com muita aula prática e laboratórios abertos!',
    whereToWork: 'Grandes cooperativas da nossa região (C.Vale, Copacol, etc.), fazendas de tecnologia de precisão e assistência técnica.',
    keySkills: ['Manejo Sustentável', 'Drones & Agricultura de Precisão', 'Zootecnia', 'Gestão Rural'],
    campusPerks: ['Área experimental no campus', 'Aulas a campo', 'Laboratórios de solos e sementes', 'Alta empregabilidade regional']
  },
  info: {
    key: 'info',
    shortName: 'Informática',
    fullName: 'Técnico em Informática Integrado ao Ensino Médio',
    tagline: 'Construa os apps, sistemas e soluções do futuro!',
    icon: '💻',
    themeColor: '#0284C7',
    themeLightBg: '#E0F2FE',
    themeBorder: '#7DD3FC',
    resultTitle: 'Seu Match é: Técnico em Informática! 💻',
    about: 'Programação Full-Stack, Criação de Bancos de Dados, Manutenção de Computadores, Robótica e Internet das Coisas (IoT).',
    whereToWork: 'Empresas de tecnologia, setor de TI das indústrias, criando sua própria startup ou trabalhando home office para o mundo.',
    keySkills: ['Desenvolvimento Web & Mobile', 'Lógica & Algoritmos', 'Redes & Hardware', 'Bancos de Dados'],
    campusPerks: ['Laboratórios de computadores modernos', 'Projetos de software reais', 'Hackathons e eventos tech', 'Possibilidade de trabalho remoto']
  },
  meca: {
    key: 'meca',
    shortName: 'Mecatrônica',
    fullName: 'Técnico em Mecatrônica Integrado ao Ensino Médio',
    tagline: 'A revolução dos robôs e da Indústria 4.0 nas suas mãos!',
    icon: '🤖',
    themeColor: '#7C3AED',
    themeLightBg: '#F3E8FF',
    themeBorder: '#D8B4FE',
    resultTitle: 'Seu Match é: Técnico em Mecatrônica! 🤖',
    about: 'Desenho Técnico em 3D, Eletrônica, Robótica Industrial, Soldagem e Automação. A mistura perfeita de Mecânica, Elétrica e Informática.',
    whereToWork: 'Na linha de frente da Indústria 4.0! Você será disputado pelos grandes parques industriais da região (como a Frimesa) para cuidar de robôs e automação.',
    keySkills: ['Braços Robóticos & Sensores', 'Modelagem 3D & Usinagem', 'Circuitos Elétricos', 'Controladores Lógicos (CLP)'],
    campusPerks: ['Laboratório de robótica avançado', 'Bancadas industriais reais', 'Projetos de prototipagem', 'Parcerias com indústrias da região']
  },
  comercio: {
    key: 'comercio',
    shortName: 'Comércio',
    fullName: 'Técnico em Comércio Integrado ao Ensino Médio',
    tagline: 'Lidere negócios, crie estratégias e domine o mercado!',
    icon: '🛍️',
    themeColor: '#EA580C',
    themeLightBg: '#FFEDD5',
    themeBorder: '#FDBA74',
    resultTitle: 'Seu Match é: Técnico em Comércio! 🛍️',
    about: 'Gestão de Pessoas, Marketing Estratégico, Empreendedorismo, Contabilidade, Logística e Matemática Financeira.',
    whereToWork: 'No setor administrativo, vendas ou RH de grandes empresas, cooperativas, ou até mesmo gerenciando o seu próprio negócio de sucesso.',
    keySkills: ['Marketing Digital & Vendas', 'Planejamento Financeiro', 'Comunicação & Negociação', 'Logística & E-commerce'],
    campusPerks: ['Projetos de empresas júnior', 'Simulações de mercado e vendas', 'Networking com gestores locais', 'Visão ampla de administração']
  }
};

export const GENERAL_QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'O que você mais curte fazer no tempo livre?',
    options: [
      { id: '1-A', letter: 'A', text: 'Ficar ao ar livre / em contato com a natureza', courseKey: 'agro' },
      { id: '1-B', letter: 'B', text: 'Ficar no PC / celular testando novos apps e códigos', courseKey: 'info' },
      { id: '1-C', letter: 'C', text: 'Desmontar aparelhos e consertar coisas mecânicas', courseKey: 'meca' },
      { id: '1-D', letter: 'D', text: 'Interagir nas redes sociais ou criar formas de vender coisas', courseKey: 'comercio' }
    ]
  },
  {
    id: 2,
    prompt: 'Qual seria o seu ambiente de trabalho dos sonhos?',
    options: [
      { id: '2-A', letter: 'A', text: 'Fazendas tecnológicas ou laboratórios de biologia', courseKey: 'agro' },
      { id: '2-B', letter: 'B', text: 'Escritório moderno de tecnologia (ou no sofá de home office)', courseKey: 'info' },
      { id: '2-C', letter: 'C', text: 'Fábrica moderna com máquinas automatizadas e robôs', courseKey: 'meca' },
      { id: '2-D', letter: 'D', text: 'Empresas dinâmicas, lojas, agências ou no meu próprio negócio', courseKey: 'comercio' }
    ]
  },
  {
    id: 3,
    prompt: 'Na escola, quais matérias você acha menos chatas ou mais legais?',
    options: [
      { id: '3-A', letter: 'A', text: 'Ciências / Biologia e temas sobre meio ambiente', courseKey: 'agro' },
      { id: '3-B', letter: 'B', text: 'Matemática / Lógica / Informática / Inglês', courseKey: 'info' },
      { id: '3-C', letter: 'C', text: 'Física / Desenho geométrico / Matemática aplicada', courseKey: 'meca' },
      { id: '3-D', letter: 'D', text: 'História / Geografia / Matemática Financeira e debates', courseKey: 'comercio' }
    ]
  },
  {
    id: 4,
    prompt: 'Quando tem trabalho em grupo na escola, qual é o seu papel?',
    options: [
      { id: '4-A', letter: 'A', text: 'Faço a parte prática da experiência e coleta de dados', courseKey: 'agro' },
      { id: '4-B', letter: 'B', text: 'Pesquiso no computador, monto os slides e configuro tudo', courseKey: 'info' },
      { id: '4-C', letter: 'C', text: 'Construo a maquete física, estrutura ou mecanismo funcional', courseKey: 'meca' },
      { id: '4-D', letter: 'D', text: 'Lidero a equipe, divido as tarefas e apresento para a turma', courseKey: 'comercio' }
    ]
  },
  {
    id: 5,
    prompt: 'Maratonando vídeos no YouTube ou TikTok, você prefere assistir:',
    options: [
      { id: '5-A', letter: 'A', text: 'Natureza, animais, vida no campo e agro sustentável', courseKey: 'agro' },
      { id: '5-B', letter: 'B', text: 'Setup gamer, programação, inteligência artificial e truques de PC', courseKey: 'info' },
      { id: '5-C', letter: 'C', text: 'Vídeos de "como é feito", impressoras 3D e invenções malucas', courseKey: 'meca' },
      { id: '5-D', letter: 'D', text: 'Dicas de negócios, finanças jovens, marketing e cases de sucesso', courseKey: 'comercio' }
    ]
  },
  {
    id: 6,
    prompt: 'Sobre interagir e lidar com pessoas no dia a dia:',
    options: [
      { id: '6-A', letter: 'A', text: 'Prefiro a tranquilidade do campo e o cuidado com plantas e animais', courseKey: 'agro' },
      { id: '6-B', letter: 'B', text: 'Me comunico super bem pelo Discord/WhatsApp e resolvendo problemas online', courseKey: 'info' },
      { id: '6-C', letter: 'C', text: 'Gosto de focar concentrado na minha tarefa, peças e ferramentas', courseKey: 'meca' },
      { id: '6-D', letter: 'D', text: 'Falo com todo mundo, adoro fazer amizades, debater e negociar ideias', courseKey: 'comercio' }
    ]
  },
  {
    id: 7,
    prompt: 'Onde você acha mais legal e útil aplicar a Matemática?',
    options: [
      { id: '7-A', letter: 'A', text: 'Calcular quantidade de adubo, ração e áreas de plantio', courseKey: 'agro' },
      { id: '7-B', letter: 'B', text: 'Criar códigos lógicos, criptografia e algoritmos de games', courseKey: 'info' },
      { id: '7-C', letter: 'C', text: 'Calcular força, engrenagens e velocidade de rotação de motores', courseKey: 'meca' },
      { id: '7-D', letter: 'D', text: 'Calcular preços, margem de lucro, juros e promoções', courseKey: 'comercio' }
    ]
  },
  {
    id: 8,
    prompt: 'Para você, a principal utilidade da tecnologia moderna é:',
    options: [
      { id: '8-A', letter: 'A', text: 'Monitorar lavouras por satélite, prever o clima e alimentar o mundo', courseKey: 'agro' },
      { id: '8-B', letter: 'B', text: 'Criar aplicativos úteis, conectar o planeta e automatizar processos', courseKey: 'info' },
      { id: '8-C', letter: 'C', text: 'Dar vida a robôs inteligentes e máquinas industriais autônomas', courseKey: 'meca' },
      { id: '8-D', letter: 'D', text: 'Vender para qualquer lugar do mundo e gerenciar equipes com eficiência', courseKey: 'comercio' }
    ]
  },
  {
    id: 9,
    prompt: 'Qual desses desafios seria mais divertido e empolgante resolver?',
    options: [
      { id: '9-A', letter: 'A', text: 'Descobrir o que está deixando uma planta doente e salvá-la', courseKey: 'agro' },
      { id: '9-B', letter: 'B', text: 'Caçar e consertar um bug chato em um código até ele rodar perfeitamente', courseKey: 'info' },
      { id: '9-C', letter: 'C', text: 'Descobrir por que uma engrenagem travou e fazê-la girar suavemente', courseKey: 'meca' },
      { id: '9-D', letter: 'D', text: 'Criar uma campanha para convencer toda a escola a abraçar um projeto', courseKey: 'comercio' }
    ]
  },
  {
    id: 10,
    prompt: 'Qual sensação de "missão cumprida" te deixaria mais realizado(a)?',
    options: [
      { id: '10-A', letter: 'A', text: 'Ver uma colheita farta ou animais crescendo com saúde', courseKey: 'agro' },
      { id: '10-B', letter: 'B', text: 'Ver o seu site ou aplicativo funcionando sem nenhum erro', courseKey: 'info' },
      { id: '10-C', letter: 'C', text: 'Ligar o robô na tomada e vê-lo executar os movimentos certinho', courseKey: 'meca' },
      { id: '10-D', letter: 'D', text: 'Bater a meta de vendas e ver os clientes super satisfeitos', courseKey: 'comercio' }
    ]
  }
];

// Helper to generate specific affirmation questions with Sim / Talvez / Não
const createSpecificOptions = (qid: number) => [
  { id: `${qid}-sim`, text: 'Sim, super a minha cara! ✨', points: 10 },
  { id: `${qid}-talvez`, text: 'Talvez / Depende do momento 🤔', points: 5 },
  { id: `${qid}-nao`, text: 'Não, nada a ver comigo ❌', points: 0 }
];

export const AGRO_SPECIFIC_QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'Você gosta da ideia de ter aulas práticas ao ar livre e no campo, em vez de ficar o dia todo preso na sala?',
    options: createSpecificOptions(1)
  },
  {
    id: 2,
    prompt: 'Aprender como as plantas crescem, como adubar a terra e produzir alimentos saudáveis parece interessante para você?',
    options: createSpecificOptions(2)
  },
  {
    id: 3,
    prompt: 'Você se imagina aprendendo a pilotar tratores modernos, operar máquinas agrícolas e usar drones de lavoura?',
    options: createSpecificOptions(3)
  },
  {
    id: 4,
    prompt: 'Você tem carinho, paciência e curiosidade para cuidar da alimentação e saúde de animais de criação (bovinos, aves, suínos)?',
    options: createSpecificOptions(4)
  },
  {
    id: 5,
    prompt: 'Gostaria de entender como a biotecnologia e a genética melhoram a qualidade de sementes e grãos?',
    options: createSpecificOptions(5)
  },
  {
    id: 6,
    prompt: 'Você se preocupa com o meio ambiente e quer aprender a produzir alimentos preservando rios, solo e florestas?',
    options: createSpecificOptions(6)
  },
  {
    id: 7,
    prompt: 'A ideia de trabalhar em grandes cooperativas agrícolas do Paraná (como C.Vale, Copacol, Lar) te atrai?',
    options: createSpecificOptions(7)
  },
  {
    id: 8,
    prompt: 'Você não se incomoda em sujar um pouco as botas na terra ou tomar um solzinho enquanto faz experiências práticas?',
    options: createSpecificOptions(8)
  },
  {
    id: 9,
    prompt: 'Você gostaria de aprender a administrar uma propriedade rural como uma empresa moderna e lucrativa?',
    options: createSpecificOptions(9)
  },
  {
    id: 10,
    prompt: 'Fazer parte do setor que alimenta o Brasil e exporta comida para o mundo todo te dá orgulho?',
    options: createSpecificOptions(10)
  }
];

export const INFO_SPECIFIC_QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'Você tem curiosidade de saber como os sites, aplicativos de celular e jogos funcionam por trás dos panos?',
    options: createSpecificOptions(1)
  },
  {
    id: 2,
    prompt: 'Gosta de passar horas no computador ou celular descobrindo novos programas, extensões e macetes digitais?',
    options: createSpecificOptions(2)
  },
  {
    id: 3,
    prompt: 'Quando alguém na sua casa tem um problema no celular, Wi-Fi ou computador, você é quem tenta resolver?',
    options: createSpecificOptions(3)
  },
  {
    id: 4,
    prompt: 'Você curte jogos de raciocínio, lógica, quebra-cabeças ou enigmas que exigem paciência e estratégia?',
    options: createSpecificOptions(4)
  },
  {
    id: 5,
    prompt: 'Gostaria de aprender a criar seu próprio site, app ou sistema para automatizar tarefas da escola ou do dia a dia?',
    options: createSpecificOptions(5)
  },
  {
    id: 6,
    prompt: 'A ideia de aprender sobre Inteligência Artificial, automação de dados e segurança cibernética te empolga?',
    options: createSpecificOptions(6)
  },
  {
    id: 7,
    prompt: 'Você se imagina trabalhando em um ambiente moderno de escritório ou trabalhando de casa (home office) para qualquer lugar?',
    options: createSpecificOptions(7)
  },
  {
    id: 8,
    prompt: 'Quando algo dá errado num programa, você prefere pesquisar no Google/YouTube até achar a solução em vez de desistir?',
    options: createSpecificOptions(8)
  },
  {
    id: 9,
    prompt: 'Você tem interesse em aprender sobre peças de computador (placa-mãe, memória, processador) e montagem de máquinas?',
    options: createSpecificOptions(9)
  },
  {
    id: 10,
    prompt: 'Aprender comandos em código (como JavaScript, Python e HTML/CSS) parece um superpoder legal para você?',
    options: createSpecificOptions(10)
  }
];

export const MECA_SPECIFIC_QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'Você já teve vontade de abrir um carrinho de controle remoto, videogame ou brinquedo para ver os motores e placas por dentro?',
    options: createSpecificOptions(1)
  },
  {
    id: 2,
    prompt: 'Ver vídeos de braços robóticos industriais montando carros e embalando produtos na fábrica te deixa fascinado(a)?',
    options: createSpecificOptions(2)
  },
  {
    id: 3,
    prompt: 'Você gosta de desenhar peças, montar estruturas físicas (tipo LEGO Technic) ou usar ferramentas manuais?',
    options: createSpecificOptions(3)
  },
  {
    id: 4,
    prompt: 'A ideia de juntar mecânica (engrenagens), eletrônica (sensores e fios) e programação em um único robô parece o combo perfeito?',
    options: createSpecificOptions(4)
  },
  {
    id: 5,
    prompt: 'Você gostaria de aprender a projetar peças em 3D no computador e vê-las sendo impressas em uma impressora 3D?',
    options: createSpecificOptions(5)
  },
  {
    id: 6,
    prompt: 'Aprender sobre solda elétrica, circuitos eletrônicos e medições de voltagem desperta sua curiosidade?',
    options: createSpecificOptions(6)
  },
  {
    id: 7,
    prompt: 'Você se imagina trabalhando nas grandes indústrias da nossa região (como Frimesa, indústrias de automação e metalúrgicas)?',
    options: createSpecificOptions(7)
  },
  {
    id: 8,
    prompt: 'Você é detalhista e paciente quando precisa consertar um mecanismo que emperrou ou não está girando direito?',
    options: createSpecificOptions(8)
  },
  {
    id: 9,
    prompt: 'Gostaria de programar esteiras automáticas, sensores de presença e luzes de advertência como nas fábricas do futuro?',
    options: createSpecificOptions(9)
  },
  {
    id: 10,
    prompt: 'Você se sente empolgado(a) em criar protótipos físicos que se movimentam de verdade apertando apenas um botão?',
    options: createSpecificOptions(10)
  }
];

export const COMERCIO_SPECIFIC_QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'Você gosta de negociar, pechinchar ou já teve a iniciativa de vender doces, figurinhas, roupas ou itens de jogos?',
    options: createSpecificOptions(1)
  },
  {
    id: 2,
    prompt: 'Você se considera uma pessoa comunicativa, que faz amizades facilmente e não tem vergonha de falar com pessoas novas?',
    options: createSpecificOptions(2)
  },
  {
    id: 3,
    prompt: 'Você repara como as marcas famosas fazem propagandas criativas no Instagram/TikTok para convencer as pessoas a comprar?',
    options: createSpecificOptions(3)
  },
  {
    id: 4,
    prompt: 'Você gosta de planejar a sua mesada ou dinheiro, anotando gastos para não ficar no vermelho no final do mês?',
    options: createSpecificOptions(4)
  },
  {
    id: 5,
    prompt: 'Você sonha em abrir seu próprio negócio no futuro e ser seu próprio chefe?',
    options: createSpecificOptions(5)
  },
  {
    id: 6,
    prompt: 'Em trabalhos escolares, você prefere apresentar para a turma e organizar quem faz o quê no grupo?',
    options: createSpecificOptions(6)
  },
  {
    id: 7,
    prompt: 'Aprender técnicas de vendas, atendimento ao cliente e marketing digital parece uma habilidade muito útil para sua vida?',
    options: createSpecificOptions(7)
  },
  {
    id: 8,
    prompt: 'Você tem curiosidade sobre como funciona a logística de lojas online (como a Shopee ou Mercado Livre entrega tão rápido)?',
    options: createSpecificOptions(8)
  },
  {
    id: 9,
    prompt: 'Você se imagina trabalhando em áreas de recursos humanos (RH), finanças, bancos ou liderando equipes em empresas?',
    options: createSpecificOptions(9)
  },
  {
    id: 10,
    prompt: 'Saber defender um ponto de vista com argumentos claros e convencer outras pessoas é algo que você faz com facilidade?',
    options: createSpecificOptions(10)
  }
];

export const TRACK_QUESTIONS_MAP: Record<CourseKey, Question[]> = {
  agro: AGRO_SPECIFIC_QUESTIONS,
  info: INFO_SPECIFIC_QUESTIONS,
  meca: MECA_SPECIFIC_QUESTIONS,
  comercio: COMERCIO_SPECIFIC_QUESTIONS
};
