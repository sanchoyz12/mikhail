/* 
   Game Logic for Negotiation Simulator
*/

const scenarios = [
    {
        stage: 1,
        context: "Ситуация: Крупный клиент, формирующий 40% вашей выручки, внезапно требует скидку 20% на следующий год, ссылаяясь на предложение конкурентов.",
        text: "«Послушайте, рынок упал. У нас есть предложение от компании N, они дают цену на 20% ниже вашей. Вы либо даете нам такие же условия, либо мы расходимся. У вас есть 24 часа на ответ».",
        choices: [
            {
                text: "Агрессивно отказать: «Наше качество выше, мы не будем падать в цене. Уходите, если хотите».",
                levDelta: 15, relDelta: -30,
                feedback: "Вы сохранили маржу и показали силу, но клиент взбешен. Риск разрыва отношений категорически высок."
            },
            {
                text: "Пойти на уступку ради сохранения: «Хорошо, мы ценим наше партнерство и согласны на скидку 15%, чтобы договориться».",
                levDelta: -25, relDelta: 10,
                feedback: "Клиент доволен, но вы показали слабость. В следующем году он вернется за новой скидкой, зная, что вас можно продавить."
            },
            {
                text: "Смена фрейма (Тактика Козловского): «Мы не соревнуемся по цене с N, у нас разные бизнес-модели. Но если вам нужно урезать бюджет на 20%, давайте обсудим, какой объем услуг мы уберем из контракта».",
                levDelta: 10, relDelta: 0,
                feedback: "Вы не уступили в цене (твердость) и перевели разговор в конструктивное русло математики (отношения сохранены)."
            }
        ]
    },
    {
        stage: 2,
        context: "Ситуация: Переговоры о слиянии (M&A). Вы продаете свой бизнес. Инвестор в последний момент перед подписанием меняет условия сделки.",
        text: "«Наши юристы нашли пару рисков при аудите. Мы готовы подписать сделку прямо сегодня, но оценка бизнеса будет не $10M, а $8.5M. Вы же хотите закрыть сделку?»",
        choices: [
            {
                text: "Взорваться и уйти: «Это обман! Мы договорились об условиях месяц назад. Сделки не будет».",
                levDelta: 10, relDelta: -25,
                feedback: "Сделка сорвана. Возможно, это спасло вас от плохих партнеров, но эмоции взяли верх над расчетом."
            },
            {
                text: "Согласиться: «Мы потратили столько времени... Хорошо, давайте подписывать по $8.5M».",
                levDelta: -30, relDelta: 5,
                feedback: "Эффект 'Поведенческого захвата' (Sunk Cost Fallacy). Инвестор надавил и заработал $1.5M за одну фразу. Вы потеряли деньги."
            },
            {
                text: "Отзеркаливание + Пауза: «Ваши юристы нашли риски на $1.5M...?» (молчать и смотреть в глаза).",
                levDelta: 15, relDelta: 5,
                feedback: "Использование молчания как инструмента давления заставляет оппонента оправдываться и раскрывать реальную причину торга."
            }
        ]
    },
    {
        stage: 3,
        context: "Ситуация: Жесткий конфликт соучредителей. Ваш партнер блокирует операционную работу и шантажирует вас уходом команды.",
        text: "«Или ты переписываешь на меня долю в дочерней компании, или завтра ключевые разработчики кладут заявления на стол. Выбирай».",
        choices: [
            {
                text: "Юридическая атака: «Я подаю на тебя в суд за саботаж работы компании, все документировано».",
                levDelta: 20, relDelta: -40,
                feedback: "Началась война на уничтожение. Бизнес пострадает в любом случае, отношения убиты навсегда."
            },
            {
                text: "Выявление истинного интереса: «Кажется, ты чувствуешь, что твой вклад в компанию не оценен справедливо. Давай разберемся, из-за чего на самом деле этот ультиматум».",
                levDelta: 5, relDelta: 20,
                feedback: "Тактическая эмпатия. Вы игнорируете шантаж и бьете в корень проблемы, снижая градус агрессии."
            },
            {
                text: "Поддаться шантажу: «Уход команды убьет проект. Хорошо, забирай 'дочку'».",
                levDelta: -40, relDelta: -10,
                feedback: "Террористам нельзя платить. Вы потеряли актив и уважение, завтра он потребует остальное."
            }
        ]
    },
    {
        stage: 4,
        context: "Ситуация: Финальный этап тендера. Вы сидите за столом с комиссией из 5 человек. Председатель применяет тактику 'Хороший-плохой полицейский'.",
        text: "«Знаете, ваше предложение технически интересное. Но ваш ценник — просто космос. Нам придется выбрать другую компанию, если вы прямо сейчас не срежете 30%».",
        choices: [
            {
                text: "Назвать игру своими именами: «Вы отлично разыгрываете 'плохого полицейского'. Если бы вы собирались выбрать других, меня бы здесь не было. Давайте говорить по делу».",
                levDelta: 25, relDelta: 0,
                feedback: "Рискованный, но мощный ход. Вы показали, что видите их манипуляции. Вас начнут уважать."
            },
            {
                text: "Торговаться: «30% это много... Могу дать максимум 10%».",
                levDelta: -20, relDelta: 5,
                feedback: "Вы попали в ловушку брошенного якоря. Они этого и ждали."
            },
            {
                text: "Выход из-за стола: Встать, собрать документы: «Жаль, что мы не сходимся в оценке качества. Желаю удачи с дешевыми подрядчиками».",
                levDelta: 15, relDelta: -15,
                feedback: "Готовность уйти — ваше главное оружие (BATNA). Часто после этого вас возвращают за стол на ваших условиях."
            }
        ]
    }
];

// State
let currentStageIndex = 0;
let leverage = 50;
let relationship = 50;

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const gameplayScreen = document.getElementById('gameplay-screen');
const resultScreen = document.getElementById('result-screen');

const btnStart = document.getElementById('start-btn');
const btnNext = document.getElementById('next-btn');
const btnRestart = document.getElementById('restart-btn');

const elContext = document.getElementById('opponent-context');
const elText = document.getElementById('opponent-text');
const elChoices = document.getElementById('choices-container');
const elFeedback = document.getElementById('feedback-bubble');
const elFeedbackText = document.getElementById('feedback-text');

const barLev = document.getElementById('leverage-bar');
const barRel = document.getElementById('relationship-bar');
const valLev = document.getElementById('leverage-val');
const valRel = document.getElementById('relationship-val');
const elStageCurrent = document.getElementById('current-stage');


// Initialization
btnStart.addEventListener('click', startGame);
btnNext.addEventListener('click', handleNext);
btnRestart.addEventListener('click', resetGame);

function startGame() {
    welcomeScreen.classList.remove('active');
    gameplayScreen.classList.add('active');
    loadScenario();
    updateMeters();
}

function loadScenario() {
    const scenario = scenarios[currentStageIndex];
    elStageCurrent.textContent = scenario.stage;
    
    elContext.textContent = scenario.context;
    elText.textContent = scenario.text;
    
    // Clear previous choices
    elChoices.innerHTML = '';
    elFeedback.classList.add('hidden');
    
    scenario.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `<span>${choice.text}</span>`;
        btn.addEventListener('click', () => makeChoice(choice, btn));
        elChoices.appendChild(btn);
    });
}

function makeChoice(choice, clickedBtn) {
    // Disable all buttons
    const buttons = elChoices.querySelectorAll('.choice-btn');
    buttons.forEach(b => {
        b.disabled = true;
        if(b !== clickedBtn) {
            b.style.opacity = '0.3';
        }
    });
    
    // Highlight selected
    clickedBtn.style.borderColor = 'var(--accent-gold)';
    clickedBtn.style.color = 'var(--text-main)';

    // Update Scores (clamp between 0 and 100)
    leverage = Math.max(0, Math.min(100, leverage + choice.levDelta));
    relationship = Math.max(0, Math.min(100, relationship + choice.relDelta));
    
    updateMeters();

    // Show feedback
    elFeedbackText.textContent = choice.feedback;
    elFeedback.classList.remove('hidden');
}

function updateMeters() {
    barLev.style.width = `${leverage}%`;
    valLev.textContent = `${leverage}%`;
    barRel.style.width = `${relationship}%`;
    valRel.textContent = `${relationship}%`;

    // Apply danger styling if too low
    if(leverage <= 25) barLev.classList.add('danger'); else barLev.classList.remove('danger');
    if(relationship <= 25) barRel.classList.add('danger'); else barRel.classList.remove('danger');
}

function handleNext() {
    currentStageIndex++;
    if (currentStageIndex >= scenarios.length) {
        showResults();
    } else {
        loadScenario();
    }
}

function showResults() {
    gameplayScreen.classList.remove('active');
    resultScreen.classList.add('active');

    document.getElementById('final-leverage').textContent = leverage;
    document.getElementById('final-relationship').textContent = relationship;

    let archetype = "";
    let desc = "";

    // Calculation logic
    if (leverage >= 80 && relationship >= 60) {
        archetype = "Мастер Win-Win";
        desc = "Блестяще! Вы жестко защищаете свои рамки, но при этом филигранно сохраняете партнерские отношения. Это высший пилотаж переговоров.";
    } else if (leverage >= 70 && relationship < 50) {
        archetype = "Танк / Агрессор";
        desc = "Вы не отдаете ни цента из своей прибыли, но после переговоров с вами люди чувствуют себя опустошенными. В долгосрочной перспективе выжигаете рынок.";
    } else if (leverage <= 40 && relationship >= 70) {
        archetype = "Заложник отношений";
        desc = "Вы отличный парень и с вами приятно работать. Беда в том, что вы покупаете эту любовь за счет прибыли вашей компании, постоянно уступая.";
    } else if (leverage < 50 && relationship < 50) {
        archetype = "Слабое Звено";
        desc = "Вас легко прожать, и при этом сделки все равно срываются из-за вашей непоследовательности. Вам срочно нужен коучинг у Михаила Козловского.";
    } else {
        archetype = "Опытный практик";
        desc = "У вас есть хорошая интуиция. Вы балансируете между твердостью и эмпатией, но периодически попадаетесь на профессиональные манипуляции.";
    }

    document.getElementById('archetype-title').textContent = archetype;
    document.getElementById('archetype-desc').textContent = desc;
}

function resetGame() {
    currentStageIndex = 0;
    leverage = 50;
    relationship = 50;
    resultScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
}
