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
  eliminateBtn: document.getElementById('eliminateBtn')
};

const REWARDS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 10];

const QUESTIONS = {
  general: [
    [
      { q: "Qual casa Harry Potter estudava?", a: ["Grifinória","Sonserina","Lufa-Lufa","Corvinal"], c: 0 },
      { q: "Quantos lados tem um triângulo?", a: ["2","3","4","5"], c: 1 },
      { q: "Qual a cor do céu?", a: ["Verde","Azul","Roxo","Laranja"], c: 1 },
      { q: "Quantas patas tem um cachorro?", a: ["2","4","6","8"], c: 1 },
      { q: "Qual desses é uma fruta?", a: ["Batata","Maçã","Cenoura","Alface"], c: 1 }
    ],
    [
      { q: "Vilão de Ultimato?", a: ["Loki","Thanos","Ultron","Kang"], c: 1 },
      { q: "Qual é Pokémon?", a: ["Yoda","Pikachu","Dobby","Gandalf"], c: 1 },
      { q: "Qual é Vingador?", a: ["Batman","Iron Man","Flash","Superman"], c: 1 },
      { q: "Jon Snow aparece em:", a: ["The Witcher","GoT","Vikings","The Crown"], c: 1 },
      { q: "Quem come espinafre?", a: ["Popeye","Homer","Superman","Bob"], c: 0 }
    ],
    [
      { q: "Criador da Microsoft?", a: ["Jobs","Musk","Bill Gates","Bezos"], c: 2 },
      { q: "Planeta mais próximo do Sol:", a: ["Terra","Mercúrio","Marte","Vênus"], c: 1 },
      { q: "Segundos em 1 minuto:", a: ["30","60","90","120"], c: 1 },
      { q: "Animal mais rápido:", a: ["Leão","Guepardo","Águia","Cavalo"], c: 1 },
      { q: "Dias da semana:", a: ["5","6","7","8"], c: 2 }
    ],
    [
      { q: "Onde fica a Torre Eiffel?", a: ["Itália","França","Espanha","Inglaterra"], c: 1 },
      { q: "Mona Lisa foi pintada por:", a: ["Da Vinci","Picasso","Michelangelo","Van Gogh"], c: 0 },
      { q: "Maior oceano:", a: ["Atlântico","Pacífico","Índico","Ártico"], c: 1 },
      { q: "Brasil está em qual continente?", a: ["Ásia","Europa","América","África"], c: 2 },
      { q: "Jogadores no futebol:", a: ["9","10","11","12"], c: 2 }
    ],
    [
      { q: "Quem descobriu o Brasil?", a: ["Colombo","Cabral","Magalhães","Vespúcio"], c: 1 },
      { q: "Maior animal do mundo:", a: ["Tubarão","Baleia Azul","Elefante","Orca"], c: 1 },
      { q: "Capital do Japão:", a: ["Pequim","Tóquio","Seul","Osaka"], c: 1 },
      { q: "Gás para respirar:", a: ["CO2","Oxigênio","Hélio","Nitrogênio"], c: 1 },
      { q: "Menor país do mundo:", a: ["Mônaco","Vaticano","Malta","San Marino"], c: 1 }
    ],
    [
      { q: "Inventor do telefone:", a: ["Edison","Bell","Tesla","Marconi"], c: 1 },
      { q: "Continentes existem:", a: ["5","6","7","8"], c: 2 },
      { q: "Ano da chegada à Lua:", a: ["1965","1967","1969","1971"], c: 2 },
      { q: "Rio mais extenso:", a: ["Nilo","Amazonas","Yangtzé","Mississippi"], c: 1 },
      { q: "Maior planeta:", a: ["Júpiter","Terra","Marte","Vênus"], c: 0 }
    ],
    [
      { q: "Símbolo do ouro:", a: ["O","Ag","Au","Ni"], c: 2 },
      { q: "Primeiro homem na Lua:", a: ["Aldrin","Armstrong","Gagarin","Shepard"], c: 1 },
      { q: "Nome real do Batman:", a: ["Bruce Wayne","Clark Kent","Tony Stark","Peter Parker"], c: 0 },
      { q: "Planetas do Sistema Solar:", a: ["7","8","9","10"], c: 1 },
      { q: "Água ferve a:", a: ["80°C","90°C","100°C","110°C"], c: 2 }
    ],
    [
      { q: "Velocidade da luz:", a: ["300 mil km/s","150 mil km/s","1 milhão km/s","100 mil km/s"], c: 0 },
      { q: "Estados do Brasil:", a: ["25","26","27","28"], c: 2 },
      { q: "Maior deserto:", a: ["Saara","Gobi","Antártica","Kalahari"], c: 2 },
      { q: "Teoria da Relatividade:", a: ["Tesla","Einstein","Bohr","Curie"], c: 1 },
      { q: "Fórmula da água:", a: ["CO2","H2O","O2","NaCl"], c: 1 }
    ],
    [
      { q: "Autor de 1984:", a: ["Orwell","Huxley","Bradbury","Dickens"], c: 0 },
      { q: "Montanha mais alta:", a: ["Everest","K2","Makalu","Kilimanjaro"], c: 0 },
      { q: "Início da 2ª Guerra:", a: ["1937","1939","1941","1943"], c: 1 },
      { q: "Capital da Austrália:", a: ["Sydney","Melbourne","Canberra","Brisbane"], c: 2 },
      { q: "Maior lago:", a: ["Caspio","Superior","Titicaca","Victoria"], c: 0 }
    ],
    [
      { q: "Ossos da mão humana:", a: ["27","28","29","30"], c: 0 },
      { q: "Elemento mais abundante:", a: ["O2","Hidrogênio","Carbono","Nitrogênio"], c: 1 },
      { q: "Fundação da Microsoft:", a: ["1973","1975","1977","1979"], c: 1 },
      { q: "Maior prédio do mundo:", a: ["Eiffel","Empire","Burj Khalifa","One WTC"], c: 2 },
      { q: "Tipo sanguíneo universal:", a: ["A","B","AB","O−"], c: 3 }
    ]
  ],
  math: [
    [
      { q: "Quanto é 2 + 2?", a: ["3","4","5","6"], c: 1 },
      { q: "Quanto é 5 - 3?", a: ["1","2","3","4"], c: 1 },
      { q: "Quanto é 3 × 2?", a: ["5","6","7","8"], c: 1 },
      { q: "Quanto é 10 ÷ 2?", a: ["3","4","5","6"], c: 2 },
      { q: "Quanto é 7 + 1?", a: ["6","7","8","9"], c: 2 }
    ],
    [
      { q: "Quanto é 15 + 8?", a: ["21","22","23","24"], c: 2 },
      { q: "Quanto é 20 - 7?", a: ["11","12","13","14"], c: 2 },
      { q: "Quanto é 6 × 4?", a: ["22","23","24","25"], c: 2 },
      { q: "Quanto é 18 ÷ 3?", a: ["4","5","6","7"], c: 2 },
      { q: "Quanto é 9 × 5?", a: ["40","43","45","48"], c: 2 }
    ],
    [
      { q: "Quanto é 45 + 37?", a: ["80","81","82","83"], c: 2 },
      { q: "Quanto é 100 - 47?", a: ["51","52","53","54"], c: 2 },
      { q: "Quanto é 12 × 8?", a: ["94","95","96","97"], c: 2 },
      { q: "Quanto é 144 ÷ 12?", a: ["10","11","12","13"], c: 2 },
      { q: "Quanto é 25% de 200?", a: ["40","45","50","55"], c: 2 }
    ],
    [
      { q: "Quanto é 7² (7 ao quadrado)?", a: ["42","45","49","52"], c: 2 },
      { q: "Raiz quadrada de 64:", a: ["6","7","8","9"], c: 2 },
      { q: "Quanto é 15 × 15?", a: ["220","225","230","235"], c: 1 },
      { q: "Quanto é 250 ÷ 5?", a: ["45","48","50","52"], c: 2 },
      { q: "30% de 150:", a: ["40","42","45","48"], c: 2 }
    ],
    [
      { q: "Quanto é 13²?", a: ["156","165","169","172"], c: 2 },
      { q: "Raiz quadrada de 144:", a: ["10","11","12","13"], c: 2 },
      { q: "Quanto é 18 × 12?", a: ["206","214","216","224"], c: 2 },
      { q: "50% de 478:", a: ["236","238","239","241"], c: 2 },
      { q: "Quanto é 1000 ÷ 25?", a: ["35","38","40","42"], c: 2 }
    ],
    [
      { q: "Quanto é 17 × 19?", a: ["313","319","323","327"], c: 2 },
      { q: "Raiz cúbica de 125:", a: ["3","4","5","6"], c: 2 },
      { q: "35% de 600:", a: ["200","205","210","215"], c: 2 },
      { q: "Quanto é 23²?", a: ["527","529","531","533"], c: 1 },
      { q: "Quanto é 2⁵ (2^5)?", a: ["28","30","32","34"], c: 2 }
    ],
    [
      { q: "Quanto é 37 × 43?", a: ["1587","1589","1591","1593"], c: 2 },
      { q: "Raiz quadrada de 289:", a: ["15","16","17","18"], c: 2 },
      { q: "75% de 840:", a: ["620","625","630","635"], c: 2 },
      { q: "Quanto é 3⁴ (3^4)?", a: ["79","81","83","85"], c: 1 },
      { q: "Quanto é 1728 ÷ 12?", a: ["142","144","146","148"], c: 1 }
    ],
    [
      { q: "Quanto é 47 × 53?", a: ["2487","2489","2491","2493"], c: 2 },
      { q: "Raiz quadrada de 529:", a: ["21","22","23","24"], c: 2 },
      { q: "Quanto é 15% de 2400?", a: ["350","355","360","365"], c: 2 },
      { q: "Quanto é 11³ (11^3)?", a: ["1329","1331","1333","1335"], c: 1 },
      { q: "Quanto é 5⁵ (5^5)?", a: ["3123","3125","3127","3129"], c: 1 }
    ],
    [
      { q: "Quanto é 89 × 97?", a: ["8631","8633","8635","8637"], c: 1 },
      { q: "Raiz quadrada de 841:", a: ["27","28","29","30"], c: 2 },
      { q: "125% de 480:", a: ["590","595","600","605"], c: 2 },
      { q: "Quanto é 13³ (13^3)?", a: ["2195","2197","2199","2201"], c: 1 },
      { q: "Quanto é 2¹⁰ (2^10)?", a: ["1020","1022","1024","1026"], c: 2 }
    ],
    [
      { q: "Quanto é 127 × 131?", a: ["16635","16637","16639","16641"], c: 1 },
      { q: "Raiz quadrada de 1296:", a: ["34","35","36","37"], c: 2 },
      { q: "37.5% de 1600:", a: ["590","595","600","605"], c: 2 },
      { q: "Quanto é 17³ (17^3)?", a: ["4911","4913","4915","4917"], c: 1 },
      { q: "Quanto é 7⁴ (7^4)?", a: ["2399","2401","2403","2405"], c: 1 }
    ]
  ]
};

let gameState = {
  currentQuestionIndex: 0,
  earnedMoney: 0,
  skipUsed: false,
  eliminateUsed: false,
  pendingHelpAction: null,
  currentQuestionData: null,
  currentShuffled: null,
  selectedTheme: null,
  questionSequences: [],
  sequencePositions: []
};

let globalSequences = {
  general: [],
  math: []
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
  document.getElementById('menuBtn').onclick = () => switchScreen(screens.end, screens.menu);
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
    selectedTheme: theme,
    questionSequences: globalSequences[theme].map(seq => [...seq]),
    sequencePositions: new Array(10).fill(0)
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
  const sequence = gameState.questionSequences[level];
  const position = gameState.sequencePositions[level];
  
  gameState.currentQuestionData = sequence[position];
  
  gameState.sequencePositions[level] = (position + 1) % sequence.length;
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
  
  switchScreen(screens.quiz, screens.end);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
