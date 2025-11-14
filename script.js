const menuScreen = document.getElementById('menu');
const quizScreen = document.getElementById('quiz');
const endScreen = document.getElementById('end');
const startBtn = document.getElementById('startBtn');
const retryBtn = document.getElementById('retryBtn');
const menuBtn = document.getElementById('menuBtn');

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const rewardElement = document.getElementById('reward');
const earnedElement = document.getElementById('earned');

const progressBar = document.getElementById('progressBar');
const currentQuestionDisplay = document.getElementById('currentQuestion');
const totalQuestionsDisplay = document.getElementById('totalQuestions');

const resultIcon = document.getElementById('resultIcon');

const skipBtn = document.getElementById('skipBtn');
const eliminateBtn = document.getElementById('eliminateBtn');

const helpModal = document.getElementById('helpModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const confirmBtn = document.getElementById('confirmBtn');
const confirmBtnText = document.getElementById('confirmBtnText');
const cancelBtn = document.getElementById('cancelBtn');

const infoBtn = document.getElementById('infoBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const infoModal = document.getElementById('infoModal');
const withdrawModal = document.getElementById('withdrawModal');
const closeInfoBtn = document.getElementById('closeInfoBtn');
const closeWithdrawBtn = document.getElementById('closeWithdrawBtn');

let currentQuestionIndex = 0;
let earnedMoney = 0;

let skipUsed = false;
let eliminateUsed = false;
let pendingHelpAction = null;

let currentQuestionData = null;
let currentShuffled = null;

let lastMessages = {};

let levelQueues = [];
let levelPositions = [];
let visitedLevels = new Set();

const rewards = [0.5,1,1.5,2,2.5,3,3.5,4,5,10];

const baseQuestionsByLevel = [
  [
    { q: "Qual casa Harry Potter estudava?", a: ["Grifinória","Sonserina","Lufa-Lufa","Corvinal"], c: 0 },
    { q: "Quantos lados tem um triângulo?", a: ["2","3","4","5"], c: 1 },
    { q: "Qual a cor do céu?", a: ["Verde","Azul","Roxo","Laranja"], c: 1 },
    { q: "Quantas patas tem um cachorro?", a: ["2","4","6","8"], c: 1 },
    { q: "Qual desses é uma fruta?", a: ["Batata","Maçã","Cenoura","Alface"], c: 1 },
    { q: "Quanto é 2+2?", a: ["3","4","5","6"], c: 1 },
    { q: "Qual destes é doméstico?", a: ["Tubarão","Gato","Águia","Foca"], c: 1 },
    { q: "O que usamos para escrever?", a: ["Lápis","Colher","Martelo","Vassoura"], c: 0 },
    { q: "Opósito de quente?", a: ["Doce","Frio","Grande","Molhado"], c: 1 },
    { q: "Qual é veículo?", a: ["Cadeira","Avião","Copo","Tapete"], c: 1 }
  ],
  [
    { q: "Vilão de Ultimato?", a: ["Loki","Thanos","Ultron","Kang"], c: 1 },
    { q: "Qual é Pokémon?", a: ["Yoda","Pikachu","Dobby","Gandalf"], c: 1 },
    { q: "Qual é Vingador?", a: ["Batman","Iron Man","Flash","Superman"], c: 1 },
    { q: "Jon Snow aparece em:", a: ["The Witcher","GoT","Vikings","The Crown"], c: 1 },
    { q: "Quem come espinafre?", a: ["Popeye","Homer","Superman","Bob"], c: 0 },
    { q: "Qual é da Marvel?", a: ["Batman","Hulk","Flash","Superman"], c: 1 },
    { q: "O que é lightsaber?", a: ["Espada de luz","Robô","Nave","Planeta"], c: 0 },
    { q: "O ogro verde é:", a: ["Shrek","Fiona","Donkey","Hulk"], c: 0 },
    { q: "Pai de Simba?", a: ["Mufasa","Scar","Rafiki","Zazu"], c: 0 },
    { q: "Pixar fez:", a: ["Shrek","Toy Story","KFP","Madagascar"], c: 1 }
  ],
  [
    { q: "Criador da Microsoft?", a: ["Jobs","Musk","Bill Gates","Bezos"], c: 2 },
    { q: "Planeta + próximo:", a: ["Terra","Mercúrio","Marte","Vênus"], c: 1 },
    { q: "Segundos em 1 min:", a: ["30","60","90","120"], c: 1 },
    { q: "Animal mais rápido:", a: ["Leão","Guepardo","Águia","Cavalo"], c: 1 },
    { q: "Dias da semana:", a: ["5","6","7","8"], c: 2 },
    { q: "É navegador:", a: ["Excel","Discord","Chrome","Word"], c: 2 },
    { q: "Capital da Argentina:", a: ["Lima","Buenos Aires","Santiago","Montevidéu"], c: 1 },
    { q: "Qual é metal?", a: ["Papel","Vidro","Ouro","Plástico"], c: 2 },
    { q: "9 × 3 =", a: ["27","18","36","21"], c: 0 },
    { q: "Maior continente:", a: ["Europa","Ásia","África","América"], c: 1 }
  ],
  [
    { q: "Onde fica a Torre Eiffel?", a: ["Itália","França","Espanha","Inglaterra"], c: 1 },
    { q: "Mona Lisa foi pintada por:", a: ["Da Vinci","Picasso","Michelangelo","Van Gogh"], c: 0 },
    { q: "Maior oceano:", a: ["Atlântico","Pacífico","Índico","Ártico"], c: 1 },
    { q: "Brasil está em:", a: ["Ásia","Europa","América","África"], c: 2 },
    { q: "Jogadores no futebol:", a: ["9","10","11","12"], c: 2 },
    { q: "Quem descobriu o Brasil?", a: ["Colombo","Cabral","Magalhães","Vespúcio"], c: 1 },
    { q: "Qual é idioma?", a: ["Azul","Mesa","Francês","Quente"], c: 2 },
    { q: "50% de 100 =", a: ["25","50","75","100"], c: 1 },
    { q: "Dom Quixote foi escrito por:", a: ["Camões","Cervantes","Poe","Machado"], c: 1 },
    { q: "Instrumento musical:", a: ["Panela","Violino","Martelo","Vassoura"], c: 1 }
  ],
  [
    { q: "Protagonista de The Witcher:", a: ["Geralt","Arthur","Kratos","Ezio"], c: 0 },
    { q: "Egito fica em:", a: ["África","Ásia","Europa","América"], c: 0 },
    { q: "O corpo tem quantos ossos?", a: ["206","306","106","406"], c: 0 },
    { q: "Link aparece em:", a: ["Mario","Zelda","Pokémon","Halo"], c: 1 },
    { q: "Menor país do mundo:", a: ["Mônaco","Vaticano","Malta","San Marino"], c: 1 },
    { q: "Fundador do Facebook:", a: ["Zuckerberg","Jobs","Gates","Musk"], c: 0 },
    { q: "Maior animal:", a: ["Tubarão","Baleia Azul","Elefante","Orca"], c: 1 },
    { q: "Gás para respirar:", a: ["CO2","Oxigênio","Hélio","Nitrogênio"], c: 1 },
    { q: "Criador de Minecraft:", a: ["Notch","Valve","Sony","Mojang"], c: 0 },
    { q: "Maior país:", a: ["EUA","China","Rússia","Canadá"], c: 2 }
  ],
  [
    { q: "Herói do escudo estrela:", a: ["Thor","Iron Man","Capitão América","Hulk"], c: 2 },
    { q: "Capital do Japão:", a: ["Pequim","Tóquio","Seul","Osaka"], c: 1 },
    { q: "Continentes:", a: ["5","6","7","8"], c: 2 },
    { q: "Ano da Lua:", a: ["1965","1967","1969","1971"], c: 2 },
    { q: "Rio mais extenso:", a: ["Nilo","Amazonas","Yangtzé","Mississippi"], c: 1 },
    { q: "Maior planeta:", a: ["Júpiter","Terra","Marte","Vênus"], c: 0 },
    { q: "Deus do trovão:", a: ["Odin","Thor","Loki","Tyr"], c: 1 },
    { q: "Idioma da China:", a: ["Mandarim","Coreano","Japonês","Tibetano"], c: 0 },
    { q: "Galáxia da Terra:", a: ["Via Láctea","Andrômeda","NGC1300","M81"], c: 0 },
    { q: "Inventor do telefone:", a: ["Edison","Bell","Tesla","Marconi"], c: 1 }
  ],
  [
    { q: "Símbolo do ouro:", a: ["O","Ag","Au","Ni"], c: 2 },
    { q: "Primeiro homem na Lua:", a: ["Aldrin","Armstrong","Gagarin","Shepard"], c: 1 },
    { q: "Nome real do Batman:", a: ["Bruce Wayne","Clark Kent","Tony Stark","Peter Parker"], c: 0 },
    { q: "Planetas do Sistema Solar:", a: ["7","8","9","10"], c: 1 },
    { q: "Montanha mais alta do BR:", a: ["Pico da Neblina","Roraima","Bandeira","Pedra da Mina"], c: 0 },
    { q: "Autor de Hamlet:", a: ["Shakespeare","Cervantes","Kafka","Poe"], c: 0 },
    { q: "Água ferve a:", a: ["80°C","90°C","100°C","110°C"], c: 2 },
    { q: "Maior osso do corpo:", a: ["Fêmur","Tíbia","Úmero","Costela"], c: 0 },
    { q: "Autor da evolução:", a: ["Newton","Darwin","Einstein","Pascal"], c: 1 },
    { q: "Tecido biológico:", a: ["Plástico","Epitélio","Metal","Vidro"], c: 1 }
  ],
  [
    { q: "Pai de Luke:", a: ["Obi-Wan","Anakin","Yoda","Windu"], c: 1 },
    { q: "Velocidade da luz:", a: ["300 mil km/s","150 mil km/s","1 milhão km/s","100 mil km/s"], c: 0 },
    { q: "Descobridor do BR:", a: ["Colombo","Cabral","Vasco da Gama","Vespúcio"], c: 1 },
    { q: "Estados do Brasil:", a: ["25","26","27","28"], c: 2 },
    { q: "Maior deserto:", a: ["Saara","Gobi","Antártica","Kalahari"], c: 2 },
    { q: "Maior ser vivo:", a: ["Baleia Azul","Armillaria","Elefante","Mamute"], c: 1 },
    { q: "Teoria da Relatividade:", a: ["Tesla","Einstein","Bohr","Curie"], c: 1 },
    { q: "Capital da Noruega:", a: ["Oslo","Helsinque","Copenhague","Estocolmo"], c: 0 },
    { q: "Rotação da Terra:", a: ["12h","24h","36h","48h"], c: 1 },
    { q: "Fórmula da água:", a: ["CO2","H2O","O2","NaCl"], c: 1 }
  ],
  [
    { q: "Autor de 1984:", a: ["Orwell","Huxley","Bradbury","Dickens"], c: 0 },
    { q: "Vilão de Death Note:", a: ["Light","Ryuk","L","Near"], c: 0 },
    { q: "Montanha mais alta:", a: ["Everest","K2","Makalu","Kilimanjaro"], c: 0 },
    { q: "Início da 2ª Guerra:", a: ["1937","1939","1941","1943"], c: 1 },
    { q: "Capital da Austrália:", a: ["Sydney","Melbourne","Canberra","Brisbane"], c: 2 },
    { q: "Maior lago:", a: ["Caspio","Superiores","Titicaca","Victoria"], c: 0 },
    { q: "Autor de Guernica:", a: ["Picasso","Dalí","Monet","Klimt"], c: 0 },
    { q: "1º homem no espaço:", a: ["Armstrong","Gagarin","Aldrin","Collins"], c: 1 },
    { q: "Idioma da Índia:", a: ["Hindi","Inglês","Urdu","Nepalês"], c: 0 },
    { q: "Moeda do Japão:", a: ["Iene","Yuan","Dólar","Won"], c: 0 }
  ],
  [
    { q: "Base do Chrome:", a: ["Python","C++","Java","Rust"], c: 1 },
    { q: "Ossos da mão:", a: ["27","28","29","30"], c: 0 },
    { q: "Elemento mais abundante:", a: ["O2","Hidrogênio","Carbono","Nitrogênio"], c: 1 },
    { q: "Fundação da Microsoft:", a: ["1973","1975","1977","1979"], c: 1 },
    { q: "Ebulição da água:", a: ["90°C","95°C","100°C","105°C"], c: 2 },
    { q: "Maior construção:", a: ["Eiffel","Empire","Burj Khalifa","One WTC"], c: 2 },
    { q: "Sangue universal:", a: ["A","B","AB","O−"], c: 3 },
    { q: "Maior primo < 20:", a: ["17","19","13","11"], c: 1 },
    { q: "Física do Unity:", a: ["PhysX","Raycast","Havok","Bullet"], c: 0 },
    { q: "1º console Sony:", a: ["PS1","PS2","PSX","PSP"], c: 0 }
  ]
];

function initLevelQueues() {
  levelQueues = [];
  levelPositions = [];

  for (let lvl = 0; lvl < baseQuestionsByLevel.length; lvl++) {
    const original = JSON.parse(JSON.stringify(baseQuestionsByLevel[lvl]));
    const shuffled = original.sort(() => Math.random() - 0.5);

    levelQueues.push(shuffled);
    levelPositions.push(0);
  }
}

initLevelQueues();

function switchScreen(from, to) {
  from.classList.add('fade-out');
  setTimeout(() => {
    from.classList.remove('active', 'fade-out');
    to.classList.add('active');
  }, 500);
}

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / rewards.length) * 100;
  progressBar.style.width = `${progress}%`;
  currentQuestionDisplay.textContent = currentQuestionIndex + 1;
  totalQuestionsDisplay.textContent = rewards.length;
}

function startGame() {
  earnedMoney = 0;
  currentQuestionIndex = 0;
  skipUsed = false;
  eliminateUsed = false;
  pendingHelpAction = null;
  visitedLevels = new Set();

  switchScreen(menuScreen.classList.contains('active') ? menuScreen : endScreen, quizScreen);
  setTimeout(nextQuestion, 600);
}

function nextQuestion() {
  if (currentQuestionIndex >= rewards.length) {
    endGame(true);
    return;
  }

  updateProgress();

  const level = currentQuestionIndex;
  visitedLevels.add(level);

  const queue = levelQueues[level];
  const pos = levelPositions[level];

  const questionData = queue[pos];
  currentQuestionData = questionData;

  levelPositions[level] = (pos + 1) % queue.length;

  questionElement.classList.remove('show');
  optionsContainer.style.opacity = '0';

  setTimeout(() => {
    questionElement.textContent = questionData.q;
    rewardElement.textContent = `R$ ${rewards[currentQuestionIndex].toFixed(2)}`;
    optionsContainer.innerHTML = "";

    const shuffled = questionData.a.map((text,i)=>({text,i}))
      .sort(() => Math.random() - 0.5);

    currentShuffled = shuffled;

    shuffled.forEach(opt => {
      const btn = document.createElement("button");
      btn.classList.add("option");
      btn.textContent = opt.text;

      btn.onclick = () => selectAnswer(opt.i === questionData.c, btn, questionData, shuffled);

      optionsContainer.appendChild(btn);
    });

    setTimeout(() => {
      questionElement.classList.add('show');
      optionsContainer.style.opacity = '1';
    }, 50);

  }, currentQuestionIndex > 0 ? 400 : 0);
}

function selectAnswer(isCorrect, button, questionData, shuffled) {
  const buttons = document.querySelectorAll('.option');
  buttons.forEach(b => b.disabled = true);

  if (isCorrect) {
    button.classList.add('correct');
    earnedMoney = rewards[currentQuestionIndex];
    currentQuestionIndex++;

    setTimeout(nextQuestion, 1200);
  } else {
    button.classList.add('wrong');

    buttons.forEach(btn => {
      const optIndex = shuffled.find(o => o.text === btn.textContent).i;
      if (optIndex === questionData.c) btn.classList.add('correct');
    });

    setTimeout(() => endGame(false), 1800);
  }
}

function loadNewQuestion() {
  const level = currentQuestionIndex;
  visitedLevels.add(level);

  const queue = levelQueues[level];
  const pos = levelPositions[level];

  const questionData = queue[pos];
  currentQuestionData = questionData;

  levelPositions[level] = (pos + 1) % queue.length;

  questionElement.classList.remove('show');
  optionsContainer.style.opacity = '0';

  setTimeout(() => {
    questionElement.textContent = questionData.q;
    optionsContainer.innerHTML = "";

    const shuffled = questionData.a.map((t,i)=>({text:t,i}))
      .sort(() => Math.random() - 0.5);

    currentShuffled = shuffled;

    shuffled.forEach(opt => {
      const btn = document.createElement("button");
      btn.classList.add("option");
      btn.textContent = opt.text;
      btn.onclick = () => selectAnswer(opt.i === questionData.c, btn, questionData, shuffled);
      optionsContainer.appendChild(btn);
    });

    setTimeout(() => {
      questionElement.classList.add('show');
      optionsContainer.style.opacity = '1';
    }, 50);
  }, 400);
}

function eliminateWrongOptions() {
  const buttons = Array.from(document.querySelectorAll('.option'));
  const wrongButtons = [];

  buttons.forEach(btn => {
    const opt = currentShuffled.find(o => o.text === btn.textContent);
    if (opt.i !== currentQuestionData.c) wrongButtons.push(btn);
  });

  wrongButtons.sort(() => Math.random() - 0.5);

  for (let i = 0; i < 2; i++) {
    wrongButtons[i].style.opacity = '0';
    wrongButtons[i].style.transform = 'scale(0.8)';
    wrongButtons[i].disabled = true;
    setTimeout(() => wrongButtons[i].remove(), 300);
  }
}

function handleConfirmHelp() {
  helpModal.classList.remove('active');

  if (pendingHelpAction === 'skip') {
    skipUsed = true;
    skipBtn.disabled = true;
    loadNewQuestion();
  }
  else if (pendingHelpAction === 'eliminate') {
    eliminateUsed = true;
    eliminateBtn.disabled = true;
    eliminateWrongOptions();
  }

  pendingHelpAction = null;
}

function endGame(won) {

  visitedLevels.forEach(level => {
    levelPositions[level] = levelPositions[level] % 10;
  });

  earnedElement.textContent = `R$ ${earnedMoney.toFixed(2)}`;

  const msgs = {
    win: { icon: "🎉", text: ["Você venceu!", "Incrível!", "Dominou tudo!"] },
    q0: { icon: "💀", text: ["Errou a primeira!", "Começo difícil!", "Azar total!"] },
    q1: { icon: "😬", text: ["Quase avançou!", "2° já complicou!", "Vai melhorar!"] },
    q2: { icon: "😅", text: ["Pelo menos deu café!", "Foi por pouco!", "R$ 1 melhor que nada!"] },
    q3: { icon: "🤔", text: ["Continue tentando!", "Dá pra melhorar!", "Rumo ao topo!"] },
    q4: { icon: "🤷", text: ["Meio caminho!", "Dá para subir!", "Foco!"] },
    q5: { icon: "👍", text: ["Boa partida!", "Equilibrado!", "Nada mal!"] },
    q6: { icon: "😎", text: ["Acima da média!", "Mandou bem!", "Ótimo resultado!"] },
    q7: { icon: "🔥", text: ["Ficou quente!", "Quase lá!", "Excelente tentativa!"] },
    q8: { icon: "😫", text: ["ERROU QUASE NO FIM!", "Faltou pouco!", "Foi por um fio!"] },
    q9: { icon: "💔", text: ["A ÚLTIMA PEGOU!", "Quase ganhou tudo!", "Injustiça do destino!"] }
  };

  let key = won ? "win" : `q${currentQuestionIndex}`;
  if (!msgs[key]) key = "q0";

  const pack = msgs[key];
  resultIcon.textContent = pack.icon;

  const titleEl = document.querySelector(".result-title");
  if (titleEl) titleEl.textContent = pack.text[Math.floor(Math.random()*pack.text.length)];

  switchScreen(quizScreen, endScreen);
}

startBtn.onclick = startGame;
retryBtn.onclick = startGame;
menuBtn.onclick = () => switchScreen(endScreen, menuScreen);

infoBtn && (infoBtn.onclick = () => infoModal.classList.add("active"));
withdrawBtn && (withdrawBtn.onclick = () => withdrawModal.classList.add("active"));
closeInfoBtn && (closeInfoBtn.onclick = () => infoModal.classList.remove("active"));
closeWithdrawBtn && (closeWithdrawBtn.onclick = () => withdrawModal.classList.remove("active"));

cancelBtn.onclick = () => { helpModal.classList.remove('active'); pendingHelpAction = null; };

skipBtn.onclick = () => {
  if (skipUsed) return;
  pendingHelpAction = "skip";
  modalTitle.textContent = "Pular Pergunta";
  modalDescription.textContent = "Troque esta pergunta por outra do mesmo nível.";
  confirmBtnText.textContent = "Confirmar";
  cancelBtn.style.display = "block";
  helpModal.classList.add('active');
};

eliminateBtn.onclick = () => {
  if (eliminateUsed) return;
  pendingHelpAction = "eliminate";
  modalTitle.textContent = "Eliminar Alternativas";
  modalDescription.textContent = "Remove 2 alternativas incorretas.";
  confirmBtnText.textContent = "Confirmar";
  cancelBtn.style.display = "block";
  helpModal.classList.add('active');
};

confirmBtn.onclick = handleConfirmHelp;
totalQuestionsDisplay.textContent = rewards.length;