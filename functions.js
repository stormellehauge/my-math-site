// 1. POPULATE BACKGROUND CONTAINER STREAM
const matrixContainer = document.getElementById('matrix-bg');
let matrixString = "";
for (let i = 0; i < 8000; i++) {
    matrixString += Math.floor(Math.random() * 10) + (Math.random() > 0.95 ? " " : "");
}
matrixContainer.innerText = matrixString;
// 2. CONSOLIDATED SCREEN SYSTEM MANAGER
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    window.scrollTo(0, 0);
}
// 3. TRIVIA CHALLENGE COMPILATION DATA BASE (100 Balanced Data Records)
const triviaBank = {};
for (let lvl = 1; lvl <= 10; lvl++) {
    triviaBank[lvl] = [];
    for (let q = 1; q <= 10; q++) {
        let baseMultiplier = lvl * 3 + q;
        let valA = baseMultiplier + 4;
        let valB = q * lvl;
        let correctAnswer = valA + valB;
        let qText = Level $ {
            lvl
        } - Puzzle #$ {
            q
        }: Solve the operational logic sequence: What is $ {
            valA
        } + $ {
            valB
        } ? ;
        if (lvl > 4) qText = Level $ {
            lvl
        } - Logic String #$ {
            q
        }: Find value X where X - $ {
            valB
        } = $ {
            valA
        }.;
        if (lvl > 7) qText = Level $ {
            lvl
        } - Challenge Matrix #$ {
            q
        }: Evaluate evaluating
        function sequence index step elements: $ {
            valA
        } + $ {
            valB
        }
        equals what value ? ;
        triviaBank[lvl].push({
            q: qText,
            options: [correctAnswer, correctAnswer - q - 2, correctAnswer + q + 3, correctAnswer * 2].sort(() => Math.random() - 0.5),
            answer: correctAnswer
        });
    }
}
let currentLevel = 1;
let currentQuestionIdx = 0;
let highestUnlockedLevel = 1;

function renderLevelLobby() {
    const container = document.getElementById('level-matrix-container');
    if (!container) return;
    container.innerHTML = "";
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = "level-btn";
        if (i > highestUnlockedLevel) {
            btn.className += " locked";
            btn.innerHTML = Lvl i < br > 🔒;
        } else {
            btn.innerHTML = Level $ {
                i
            } < br > ⚡;
            // Fixed inner button functional scope
            attachmentsbtn.onclick = (function(levelNumber) {
                return function() {
                    startTriviaLevel(levelNumber);
                };
            })(i);
        }
        container.appendChild(btn);
    }
}
renderLevelLobby();

function startTriviaLevel(lvlNum) {
    currentLevel = lvlNum;
    currentQuestionIdx = 0;
    navigateTo('trivia-play-screen');
    loadTriviaQuestion();
}

function loadTriviaQuestion() {
    const totalQuestions = 10;
    const progressPercent = (currentQuestionIdx / totalQuestions) * 100;
    const progressBar = document.getElementById('trivia-progress');
    if (progressBar) progressBar.style.width = $ {
        progressPercent
    } % ;
    if (currentQuestionIdx >= totalQuestions) {
        alert(CONGRATULATIONS!You cleared Level $ {
            currentLevel
        }!);
        if (currentLevel === highestUnlockedLevel && highestUnlockedLevel < 10) {
            highestUnlockedLevel++;
        }
        renderLevelLobby();
        navigateTo('trivia-lobby-screen');
        return;
    }
    const header = document.getElementById('trivia-level-header');
    if (header) header.innerText = Level $ {
        currentLevel
    } - Progress: $ {
        currentQuestionIdx + 1
    }
    /10;const qData = triviaBank[currentLevel][currentQuestionIdx];const textElement = document.getElementById('trivia-question-text');if(textElement) textElement.innerText = qData.q;const optBox = document.getElementById('trivia-options-box');if(!optBox) return;optBox.innerHTML = "";qData.options.forEach(opt => {const btn = document.createElement('button');btn.className = "option-btn";btn.innerText = opt;btn.onclick = function() { evaluateAnswer(opt, qData.answer); };optBox.appendChild(btn);});}function evaluateAnswer(chosen, correct) {if(parseInt(chosen) === parseInt(correct)) {alert("Correct Logic! Moving forward...");currentQuestionIdx++;loadTriviaQuestion();} else {alert("Logic error sequence detected. Resetting level parameter loop elements.");currentQuestionIdx = 0;loadTriviaQuestion();}}function stopTriviaAndExit() {currentQuestionIdx = 0;renderLevelLobby();navigateTo('trivia-lobby-screen');}
    // 4. RETRO GAMES MAIN INTERVAL STATE ROUTERS
    let gameIntervalLoop = null;
    const keysPressed = {};
    window.addEventListener('keydown', e => {
        keysPressed[e.key] = true;
    });
    window.addEventListener('keyup', e => {
        keysPressed[e.key] = false;
    });

    function stopArcadeGames() {
        if (gameIntervalLoop) {
            clearInterval(gameIntervalLoop);
            gameIntervalLoop = null;
        }
    }
    // --- MATH PACMAN ENGINE ---
    function startPacman() {
        stopArcadeGames();
        navigateTo('game-pacman-screen');
        const canvas = document.getElementById('pacmanCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let player = {
            x: 250,
            y: 200,
            size: 15,
            speed: 4
        };
        let tokens = [];
        let score = 0;

        function spawnTokens() {
            tokens = [];
            for (let i = 0; i < 6; i++) {
                tokens.push({
                    x: Math.random() * (canvas.width - 40) + 20,
                    y: Math.random() * (canvas.height - 40) + 20,
                    val: Math.floor(Math.random() * 20) + 1
                });
            }
        }
        spawnTokens();
        gameIntervalLoop = setInterval(() => {
            if (keysPressed['ArrowUp']) player.y -= player.speed;
            if (keysPressed['ArrowDown']) player.y += player.speed;
            if (keysPressed['ArrowLeft']) player.x -= player.speed;
            if (keysPressed['ArrowRight']) player.x += player.speed;
            if (player.x < 0) player.x = canvas.width;
            if (player.x > canvas.width) player.x = 0;
            if (player.y < 0) player.y = canvas.height;
            if (player.y > canvas.height) player.y = 0;
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffff00";
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.size, 0.2 * Math.PI, 1.8 * Math.PI);
            ctx.lineTo(player.x, player.y);
            ctx.fill();
            tokens.forEach((t, index) => {
                ctx.fillStyle = "#00ffff";
                ctx.font = "16px sans-serif";
                ctx.fillText(t.val, t.x, t.y);
                let dist = Math.hypot(player.x - t.x, player.y - t.y);
                if (dist < player.size + 10) {
                    if (t.val % 2 === 0) {
                        score += 10;
                        const scoreLabel = document.getElementById('pacman-score');
                        if (scoreLabel) scoreLabel.innerText = Objective: Eat EVEN Numbers | Score: $ {
                            score
                        };
                        tokens.splice(index, 1);
                        if (tokens.length === 0) spawnTokens();
                    } else {
                        alert("Logic broken! You ate an ODD number. Resetting grid score system matrix.");
                        score = 0;
                        const scoreLabel = document.getElementById('pacman-score');
                        if (scoreLabel) scoreLabel.innerText = Objective: Eat EVEN Numbers | Score: $ {
                            score
                        };
                        spawnTokens();
                    }
                }
            });
        }, 1000 / 30);
    }
    // --- SONAR TREASURE HUNT ENGINE ---
    function startSonar() {
        stopArcadeGames();
        navigateTo('game-sonar-screen');
        const canvas = document.getElementById('sonarCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let targetX = Math.floor(Math.random() * (canvas.width - 40)) + 20;
        let targetY = Math.floor(Math.random() * (canvas.height - 40)) + 20;
        let scans = [];

        function redrawSonarGrid() {
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#112211";
            for (let i = 0; i < canvas.width; i += 40) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
            for (let j = 0; j < canvas.height; j += 40) {
                ctx.beginPath();
                ctx.moveTo(0, j);
                ctx.lineTo(canvas.width, j);
                ctx.stroke();
            }
            scans.forEach(s => {
                ctx.strokeStyle = "#ff0055";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(s.x, s.y, 15, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fillStyle = "#ffffff";
                ctx.font = "10px monospace";
                ctx.fillText(D: $ {
                    s.d
                }, s.x + 12, s.y - 12);
            });
        }
        redrawSonarGrid();
        canvas.onclick = function(e) {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            let distance = Math.hypot(clickX - targetX, clickY - targetY).toFixed(1);
            scans.push({
                x: clickX,
                y: clickY,
                d: distance
            });
            redrawSonarGrid();
            const feedback = document.getElementById('sonar-feedback');
            if (distance < 25) {
                if (feedback) feedback.innerText = CRITICAL HIT!Key Found at coordinate intersection parameters!;
                ctx.fillStyle = "#00ff00";
                ctx.beginPath();
                ctx.arc(targetX, targetY, 20, 0, 2 * Math.PI);
                ctx.fill();
                alert("Logic Portal Unlocked! You successfully pinned down the target sequence hidden node!");
                startSonar();
                return;
            } else {
                if (feedback) feedback.innerText = Radar Pulse Distance Feedback Vector: $ {
                    distance
                }
                meters away from core target signature.;
            }
        };
    }
