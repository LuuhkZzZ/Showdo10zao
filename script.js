const screens = {
  menu: document.getElementById('menu'),
  theme: document.getElementById('themeSelection'),
  quiz: document.getElementById('quiz'),
  end: document.getElementById('end')
};

const elements = {
  question: document.getElementById('question'),
  options: document.getElementById('options'),
  reward: document.getElementById('reward'),
  earned: document.getElementById('earned'),
  progressBar: document.getElementById('progressBar'),
  currentQuestion: document.getElementById('currentQuestion'),
  totalQuestions: document.getElementById('totalQuestions'),
  resultIcon: document.getElementById('resultIcon'),
  resultTitle: document.getElementById('resultTitle'),
  skipBtn: document.getElementById('skipBtn'),
  eliminateBtn: document.getElementById('eliminateBtn'),
  confettiContainer: document.getElementById('confettiContainer')
};

const REWARDS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 10];

const QUESTIONS = {
  general: [
    [
      { q: "Em 'Super Mario', qual item faz o personagem crescer?", a: ["Cogumelo", "Flor", "Estrela", "Pena"], c: 0 },
      { q: "Qual banda canta 'Bohemian Rhapsody'?", a: ["Queen", "Beatles", "Pink Floyd", "Aerosmith"], c: 0 },
      { q: "Capital da Argentina:", a: ["Montevidéu", "Lima", "Buenos Aires", "Santiago"], c: 2 },
      { q: "Qual animal é considerado o símbolo da Austrália?", a: ["Canguru", "Panda", "Águia", "Lêmure"], c: 0 },
      { q: "Qual o planeta conhecido como 'planeta vermelho'?", a: ["Saturno", "Marte", "Júpiter", "Vênus"], c: 1 }
    ],
    [
      { q: "Quem é o protagonista de 'The Witcher'?", a: ["Geralt", "Ezio", "Link", "Kratos"], c: 0 },
      { q: "A cantora Billie Eilish é de qual país?", a: ["Reino Unido", "Estados Unidos", "Austrália", "Canadá"], c: 1 },
      { q: "Em qual continente fica o Egito?", a: ["Ásia", "Europa", "África", "Oceania"], c: 2 },
      { q: "Metal mais utilizado na construção civil:", a: ["Alumínio", "Ferro", "Chumbo", "Níquel"], c: 1 },
      { q: "Qual a primeira cor da bandeira da Itália?", a: ["Azul", "Verde", "Amarelo", "Preto"], c: 1 }
    ],
    [
      { q: "Em Star Wars, o sabre de Luke é de qual cor?", a: ["Vermelho", "Azul", "Roxo", "Amarelo"], c: 1 },
      { q: "Em qual série aparece a personagem Eleven?", a: ["The Boys", "Stranger Things", "Dark", "Loki"], c: 1 },
      { q: "Qual destes é um gás nobre?", a: ["Hidrogênio", "Neônio", "Carbono", "Cloro"], c: 1 },
      { q: "Qual oceano banha o Brasil?", a: ["Índico", "Pacífico", "Atlântico", "Ártico"], c: 2 },
      { q: "O ser humano tem quantos pulmões?", a: ["1", "2", "3", "4"], c: 1 }
    ],
    [
      { q: "Qual jogo popular tem a cidade fictícia 'Los Santos'?", a: ["GTA V", "Cyberpunk", "Watch Dogs", "The Division"], c: 0 },
      { q: "A série 'Breaking Bad' gira em torno da produção de:", a: ["Vacinas", "Computadores", "Drogas", "Armas"], c: 2 },
      { q: "Primeiro metal usado pela humanidade:", a: ["Ferro", "Ouro", "Bronze", "Cobre"], c: 3 },
      { q: "Qual país inventou o sushi?", a: ["China", "Japão", "Coreia", "Tailândia"], c: 1 },
      { q: "A água congela a:", a: ["0°C", "10°C", "5°C", "2°C"], c: 0 }
    ],
    [
      { q: "O jogo 'The Last of Us' gira em torno de um fungo chamado:", a: ["Cordyceps", "Aurora", "Mycena", "Scarlet"], c: 0 },
      { q: "Qual desses é um herói da Marvel?", a: ["Flash", "Pantera Negra", "Batman", "Robin"], c: 1 },
      { q: "Maior deserto quente do mundo:", a: ["Saara", "Gobi", "Atacama", "Mojave"], c: 0 },
      { q: "Fronteira natural entre França e Espanha:", a: ["Andes", "Himalaia", "Apeninos", "Pirineus"], c: 3 },
      { q: "Metal precioso muito usado em joias:", a: ["Zinco", "Ouro", "Magnésio", "Silício"], c: 1 }
    ],
    [
      { q: "Na franquia 'Pokémon', qual é o tipo do Charizard?", a: ["Água", "Fogo/Voador", "Pedra", "Fogo"], c: 1 },
      { q: "A música 'Blinding Lights' é do artista:", a: ["The Weeknd", "Drake", "Justin Bieber", "Bruno Mars"], c: 0 },
      { q: "Qual o planeta com a maior quantidade de luas?", a: ["Terra", "Marte", "Júpiter", "Mercúrio"], c: 2 },
      { q: "Qual foi a primeira capital do Brasil?", a: ["Rio", "Salvador", "Brasília", "Recife"], c: 1 },
      { q: "Qual o elemento químico do sal de cozinha?", a: ["NaCl", "H2O", "CO2", "O2"], c: 0 }
    ],
    [
      { q: "O vilão principal de 'Coringa' (2019) é o próprio Arthur, que trabalha como:", a: ["Professor", "Limpeza", "Comediante", "Garçom"], c: 2 },
      { q: "O monstro amarelo 'Agumon' vem de qual franquia?", a: ["Yu-Gi-Oh", "Digimon", "Pokémon", "Bakugan"], c: 1 },
      { q: "A capital da Suécia é:", a: ["Oslo", "Estocolmo", "Copenhague", "Zurique"], c: 1 },
      { q: "Qual a substância responsável pela fotossíntese?", a: ["Glicose", "Clorofila", "Sacarose", "Hélio"], c: 1 },
      { q: "Ano de criação da ONU:", a: ["1940", "1945", "1950", "1955"], c: 1 }
    ],
    [
      { q: "Qual desses é um jogo 'soulslike'?", a: ["Hades", "Elden Ring", "Overwatch", "Valorant"], c: 1 },
      { q: "A série 'Arcane' é baseada em qual jogo?", a: ["Valorant", "Dota", "League of Legends", "Fortnite"], c: 2 },
      { q: "Qual o maior país do mundo em área?", a: ["China", "Rússia", "Canadá", "Brasil"], c: 1 },
      { q: "Velocidade da rotação da Terra aproximadamente:", a: ["1.600 km/h", "500 km/h", "900 km/h", "3.200 km/h"], c: 0 },
      { q: "A primeira lei de Newton trata de:", a: ["Inércia", "Gravidade", "Ação e reação", "Pressão"], c: 0 }
    ],
    [
      { q: "Em 'One Piece', qual é o sonho do Luffy?", a: ["Ser rei dos piratas", "Encontrar ouro", "Derrotar a Marinha", "Viajar o mundo"], c: 0 },
      { q: "Em 'Avatar' (filme), os habitantes de Pandora são os:", a: ["Navi", "Na'vi", "Navií", "Nava"], c: 1 },
      { q: "Capital do Canadá:", a: ["Vancouver", "Toronto", "Ottawa", "Montreal"], c: 2 },
      { q: "Qual é a cordilheira que possui as montanhas de maior altitude do planeta?", a: ["Andes", "Rocosas", "Himalaia", "Alpes"], c: 2 },
      { q: "Antônimo de 'superficial':", a: ["Raso", "Profundo", "Simples", "Vasto"], c: 1 }
    ],
    [
      { q: "No Universo Cinematográfico da Marvel, quem fundou os Vingadores?", a: ["Hulk", "Thor", "Nick Fury", "Loki"], c: 2 },
      { q: "A cantora Shakira nasceu em qual país?", a: ["Chile", "Colômbia", "Espanha", "México"], c: 1 },
      { q: "Qual o maior país da África?", a: ["Argélia", "Egito", "Sudão", "Nigéria"], c: 0 },
      { q: "Qual a substância que forma as unhas?", a: ["Cálcio", "Queratina", "Sílica", "Colágeno"], c: 1 },
      { q: "A menor unidade da vida é:", a: ["Organelo", "Célula", "Átomo", "Molécula"], c: 1 }
    ]
  ],
    math: [
    [
      { q: "Se um bolo é dividido em 8 partes e você come 2, quanto sobra?", a: ["4", "5", "6", "7"], c: 2 },
      { q: "Qual número completa a sequência: 2, 4, 8, 16, ...?", a: ["18", "20", "24", "32"], c: 3 },
      { q: "Dobro de 7 é:", a: ["10", "12", "14", "16"], c: 2 },
      { q: "Qual é o menor número primo?", a: ["1", "2", "3", "5"], c: 1 },
      { q: "Se 1 hora tem 60 min, 3 horas têm:", a: ["100", "120", "150", "180"], c: 3 }
    ],
    [
      { q: "Quanto é 15% de 200?", a: ["25", "30", "35", "40"], c: 1 },
      { q: "Qual número completa a sequência: 5, 10, 20, 40, ...?", a: ["50", "70", "80", "100"], c: 2 },
      { q: "Raiz quadrada de 49:", a: ["5", "6", "7", "8"], c: 2 },
      { q: "Se 3 caixas têm 18 maçãs, quantas têm 1 caixa?", a: ["4", "5", "6", "9"], c: 2 },
      { q: "Qual é maior?", a: ["1/2", "3/4", "1/3", "2/5"], c: 1 }
    ],
    [
      { q: "Qual número completa a sequência: 9, 12, 15, 18, ...?", a: ["19", "20", "21", "22"], c: 2 },
      { q: "40% de 250:", a: ["80", "90", "95", "100"], c: 1 },
      { q: "Raiz quadrada de 121:", a: ["9", "10", "11", "12"], c: 2 },
      { q: "Se 1 lápis custa 3 reais, 7 custam:", a: ["18", "19", "20", "21"], c: 3 },
      { q: "Qual é o valor de |−15|?", a: ["10", "12", "15", "18"], c: 2 }
    ],
    [
      { q: "Qual número completa a sequência: 3, 6, 12, 24, ...?", a: ["36", "40", "42", "48"], c: 3 },
      { q: "25% de 360:", a: ["70", "90", "85", "80"], c: 1 },
      { q: "Se x = 5, quanto vale 3x + 2?", a: ["12", "15", "17", "20"], c: 2 },
      { q: "Raiz quadrada de 225:", a: ["13", "14", "15", "16"], c: 2 },
      { q: "Quanto é 2³ (2 ao cubo)?", a: ["6", "7", "8", "9"], c: 2 }
    ],
    [
      { q: "Qual número completa a sequência: 12, 15, 21, 30, ...?", a: ["35", "36", "42", "45"], c: 2 },
      { q: "55% de 200:", a: ["100", "110", "120", "130"], c: 1 },
      { q: "Área de um quadrado de lado 6:", a: ["26", "30", "32", "36"], c: 3 },
      { q: "Raiz cúbica de 64:", a: ["3", "4", "5", "6"], c: 1 },
      { q: "Valor de π aproximado:", a: ["3.1", "3.14", "3.4", "3.5"], c: 1 }
    ],
    [
      { q: "Qual número completa a sequência: 4, 9, 16, 25, ...?", a: ["30", "35", "36", "40"], c: 2 },
      { q: "30% de 900:", a: ["200", "250", "260", "270"], c: 3 },
      { q: "Quanto é 12²?", a: ["124", "144", "154", "164"], c: 1 },
      { q: "Raiz quadrada de 361:", a: ["17", "18", "19", "20"], c: 2 },
      { q: "Qual é o próximo primo após 23?", a: ["25", "27", "29", "31"], c: 2 }
    ],
    [
      { q: "Qual número completa a sequência: 7, 14, 28, 56, ...?", a: ["80", "98", "100", "112"], c: 1 },
      { q: "60% de 750:", a: ["430", "440", "450", "460"], c: 2 },
      { q: "Valor de 9³:", a: ["729", "739", "749", "759"], c: 0 },
      { q: "Raiz quadrada de 625:", a: ["23", "24", "25", "26"], c: 2 },
      { q: "Quanto é 3⁵?", a: ["210", "240", "243", "250"], c: 2 }
    ],
    [
      { q: "Próximo termo: 11, 22, 44, 88, ...", a: ["132", "144", "160", "176"], c: 0 },
      { q: "75% de 3200:", a: ["2200", "2300", "2400", "2500"], c: 2 },
      { q: "Valor de 6⁴:", a: ["1180", "1296", "1340", "1390"], c: 1 },
      { q: "Raiz quadrada de 1024:", a: ["30", "31", "32", "33"], c: 2 },
      { q: "Qual é o próximo primo após 47?", a: ["49", "51", "53", "55"], c: 2 }
    ],
    [
      { q: "Qual número completa a sequência: 15, 30, 60, 120, ...?", a: ["180", "200", "220", "240"], c: 3 },
      { q: "40% de 4800:", a: ["1800", "1900", "1920", "2000"], c: 2 },
      { q: "Valor de 14³:", a: ["2680", "2690", "2744", "2800"], c: 2 },
      { q: "Raiz quadrada de 1600:", a: ["35", "38", "40", "42"], c: 2 },
      { q: "Quanto é 5⁶?", a: ["12500", "15000", "15625", "16000"], c: 2 }
    ],
    [
      { q: "Próximo termo: 21, 42, 84, 168, ...", a: ["260", "300", "320", "336"], c: 3 },
      { q: "37.5% de 2400:", a: ["850", "875", "900", "925"], c: 2 },
      { q: "Valor de 18³:", a: ["5832", "5890", "5950", "6000"], c: 0 },
      { q: "Raiz quadrada de 2025:", a: ["41", "44", "45", "47"], c: 2 },
      { q: "Valor de 7⁵:", a: ["16000", "16807", "17000", "17500"], c: 1 }
    ]
  ]
};

let globalSequences = {
  general: [],
  math: []
};

let globalPositions = {
  general: new Array(10).fill(0),
  math: new Array(10).fill(0)
};

let gameState = {
  currentQuestionIndex: 0,
  earnedMoney: 0,
  skipUsed: false,
  eliminateUsed: false,
  pendingHelpAction: null,
  currentQuestionData: null,
  currentShuffled: null,
  selectedTheme: null
};

function initGlobalSequences() {
  ['general', 'math'].forEach(theme => {
    globalSequences[theme] = QUESTIONS[theme].map(levelQuestions => {
      return [...levelQuestions].sort(() => Math.random() - 0.5);
    });
  });
}

initGlobalSequences();

function initGame() {
  elements.totalQuestions.textContent = REWARDS.length;
  setupEventListeners();
}

function setupEventListeners() {
  document.getElementById('startBtn').onclick = showThemeSelection;
  document.getElementById('retryBtn').onclick = showThemeSelection;
  document.getElementById('menuBtn').onclick = () => {
    clearConfetti();
    switchScreen(screens.end, screens.menu);
  };
  document.getElementById('backToMenuBtn').onclick = () => switchScreen(screens.theme, screens.menu);
  
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.onclick = () => startGame(btn.dataset.theme);
  });
  
  document.getElementById('infoBtn').onclick = () => document.getElementById('infoModal').classList.add('active');
  document.getElementById('withdrawBtn').onclick = () => document.getElementById('withdrawModal').classList.add('active');
  document.getElementById('closeInfoBtn').onclick = () => document.getElementById('infoModal').classList.remove('active');
  document.getElementById('closeWithdrawBtn').onclick = () => document.getElementById('withdrawModal').classList.remove('active');
  
  document.getElementById('continueLastBtn').onclick = () => {
    document.getElementById('lastQuestionModal').classList.remove('active');
    displayQuestion();
  };
  
  elements.skipBtn.onclick = () => showHelpModal('skip', 'Pular Pergunta', 'Troque esta pergunta por outra do mesmo nível.');
  elements.eliminateBtn.onclick = () => showHelpModal('eliminate', 'Eliminar Alternativas', 'Remove 2 alternativas incorretas.');
  
  document.getElementById('confirmBtn').onclick = handleConfirmHelp;
  document.getElementById('cancelBtn').onclick = () => {
    document.getElementById('helpModal').classList.remove('active');
    gameState.pendingHelpAction = null;
  };
}

function switchScreen(from, to) {
  from.classList.add('fade-out');
  setTimeout(() => {
    from.classList.remove('active', 'fade-out');
    to.classList.add('active');
  }, 500);
}

function showThemeSelection() {
  clearConfetti();
  switchScreen(screens.menu.classList.contains('active') ? screens.menu : screens.end, screens.theme);
}

function startGame(theme) {
  gameState = {
    currentQuestionIndex: 0,
    earnedMoney: 0,
    skipUsed: false,
    eliminateUsed: false,
    pendingHelpAction: null,
    currentQuestionData: null,
    currentShuffled: null,
    selectedTheme: theme
  };
  
  elements.skipBtn.disabled = false;
  elements.eliminateBtn.disabled = false;
  
  switchScreen(screens.theme, screens.quiz);
  setTimeout(nextQuestion, 600);
}

function updateProgress() {
  const progress = ((gameState.currentQuestionIndex + 1) / REWARDS.length) * 100;
  elements.progressBar.style.width = `${progress}%`;
  elements.currentQuestion.textContent = gameState.currentQuestionIndex + 1;
}

function nextQuestion() {
  if (gameState.currentQuestionIndex >= REWARDS.length) {
    endGame(true);
    return;
  }
  
  if (gameState.currentQuestionIndex === 9) {
    elements.skipBtn.disabled = true;
    elements.eliminateBtn.disabled = true;
    
    prepareQuestion();
    
    document.getElementById('lastQuestionModal').classList.add('active');
    return;
  }
  
  updateProgress();
  prepareQuestion();
  displayQuestion();
}

function prepareQuestion() {
  const level = gameState.currentQuestionIndex;
  const theme = gameState.selectedTheme;
  
  const sequence = globalSequences[theme][level];
  
  const position = globalPositions[theme][level];
  
  gameState.currentQuestionData = sequence[position];
  
  globalPositions[theme][level] = (position + 1) % sequence.length;
}

function displayQuestion() {
  updateProgress();
  
  elements.question.classList.remove('show');
  elements.options.style.opacity = '0';
  
  setTimeout(() => {
    elements.question.textContent = gameState.currentQuestionData.q;
    elements.reward.textContent = `R$ ${REWARDS[gameState.currentQuestionIndex].toFixed(2)}`;
    elements.options.innerHTML = '';
    
    gameState.currentShuffled = gameState.currentQuestionData.a
      .map((text, i) => ({ text, i }))
      .sort(() => Math.random() - 0.5);
    
    gameState.currentShuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.classList.add('option');
      btn.textContent = opt.text;
      btn.onclick = () => selectAnswer(opt.i === gameState.currentQuestionData.c, btn);
      elements.options.appendChild(btn);
    });
    
    setTimeout(() => {
      elements.question.classList.add('show');
      elements.options.style.opacity = '1';
    }, 50);
  }, gameState.currentQuestionIndex > 0 ? 400 : 0);
}

function selectAnswer(isCorrect, button) {
  const buttons = document.querySelectorAll('.option');
  buttons.forEach(b => b.disabled = true);
  
  if (isCorrect) {
    button.classList.add('correct');
    gameState.earnedMoney = REWARDS[gameState.currentQuestionIndex];
    gameState.currentQuestionIndex++;
    setTimeout(nextQuestion, 1200);
  } else {
    button.classList.add('wrong');
    buttons.forEach(btn => {
      const optIndex = gameState.currentShuffled.find(o => o.text === btn.textContent).i;
      if (optIndex === gameState.currentQuestionData.c) btn.classList.add('correct');
    });
    
    if (gameState.currentQuestionIndex === 9) {
      gameState.earnedMoney = 0;
    }
    
    setTimeout(() => endGame(false), 1800);
  }
}

function showHelpModal(action, title, description) {
  if ((action === 'skip' && gameState.skipUsed) || (action === 'eliminate' && gameState.eliminateUsed)) return;
  
  gameState.pendingHelpAction = action;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDescription').textContent = description;
  document.getElementById('confirmBtnText').textContent = 'Confirmar';
  document.getElementById('cancelBtn').style.display = 'block';
  document.getElementById('helpModal').classList.add('active');
}

function handleConfirmHelp() {
  document.getElementById('helpModal').classList.remove('active');
  
  if (gameState.pendingHelpAction === 'skip') {
    gameState.skipUsed = true;
    elements.skipBtn.disabled = true;
    loadNewQuestion();
  } else if (gameState.pendingHelpAction === 'eliminate') {
    gameState.eliminateUsed = true;
    elements.eliminateBtn.disabled = true;
    eliminateWrongOptions();
  }
  
  gameState.pendingHelpAction = null;
}

function loadNewQuestion() {
  prepareQuestion();
  
  elements.question.classList.remove('show');
  elements.options.style.opacity = '0';
  
  setTimeout(() => {
    elements.question.textContent = gameState.currentQuestionData.q;
    elements.options.innerHTML = '';
    
    gameState.currentShuffled = gameState.currentQuestionData.a
      .map((text, i) => ({ text, i }))
      .sort(() => Math.random() - 0.5);
    
    gameState.currentShuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.classList.add('option');
      btn.textContent = opt.text;
      btn.onclick = () => selectAnswer(opt.i === gameState.currentQuestionData.c, btn);
      elements.options.appendChild(btn);
    });
    
    setTimeout(() => {
      elements.question.classList.add('show');
      elements.options.style.opacity = '1';
    }, 50);
  }, 400);
}

function eliminateWrongOptions() {
  const buttons = Array.from(document.querySelectorAll('.option'));
  const wrongButtons = buttons.filter(btn => {
    const opt = gameState.currentShuffled.find(o => o.text === btn.textContent);
    return opt.i !== gameState.currentQuestionData.c;
  }).sort(() => Math.random() - 0.5).slice(0, 2);
  
  wrongButtons.forEach((btn, i) => {
    setTimeout(() => {
      btn.style.opacity = '0';
      btn.style.transform = 'scale(0.8)';
      btn.disabled = true;
      setTimeout(() => btn.remove(), 300);
    }, i * 150);
  });
}

function createConfetti() {
  const colors = ['#8b5cf6', '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#eab308'];
  const shapes = ['square', 'circle', 'triangle', 'rectangle'];
  
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti', shapes[Math.floor(Math.random() * shapes.length)]);
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.backgroundColor = color;
      confetti.style.borderBottomColor = color;
      
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      confetti.style.animationDelay = (Math.random() * 0.5) + 's';
      
      elements.confettiContainer.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
}

function clearConfetti() {
  elements.confettiContainer.innerHTML = '';
}

function endGame(won) {
  elements.earned.textContent = `R$ ${gameState.earnedMoney.toFixed(2)}`;
  
  const messages = {
    win: { icon: "🎉", text: ["Você venceu!", "Incrível!", "Dominou tudo!"] },
    q0: { icon: "💀", text: ["Errou a primeira!", "Começo difícil!", "Azar total!"] },
    q1: { icon: "😬", text: ["Quase avançou!", "2ª já complicou!", "Vai melhorar!"] },
    q2: { icon: "😅", text: ["Pelo menos deu café!", "Foi por pouco!", "Melhor que nada!"] },
    q3: { icon: "🤔", text: ["Continue tentando!", "Dá pra melhorar!", "Rumo ao topo!"] },
    q4: { icon: "🤷", text: ["Meio caminho!", "Dá para subir!", "Foco!"] },
    q5: { icon: "👍", text: ["Boa partida!", "Equilibrado!", "Nada mal!"] },
    q6: { icon: "😎", text: ["Acima da média!", "Mandou bem!", "Ótimo resultado!"] },
    q7: { icon: "🔥", text: ["Ficou quente!", "Quase lá!", "Excelente tentativa!"] },
    q8: { icon: "😫", text: ["ERROU QUASE NO FIM!", "Faltou pouco!", "Por um fio!"] },
    q9: { icon: "💔", text: ["A ÚLTIMA PEGOU!", "Perdeu tudo!", "Que azar!"] }
  };
  
  const key = won ? "win" : `q${gameState.currentQuestionIndex}`;
  const msg = messages[key] || messages.q0;
  
  elements.resultIcon.textContent = msg.icon;
  elements.resultTitle.textContent = msg.text[Math.floor(Math.random() * msg.text.length)];
  
  if (won) {
    createConfetti();
    const earnedDisplay = document.querySelector('.earned-display');
    if (earnedDisplay) {
      earnedDisplay.classList.add('victory-glow');
    }
  }
  
  switchScreen(screens.quiz, screens.end);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}


