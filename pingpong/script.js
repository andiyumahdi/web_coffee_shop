const rulesBtn = document.getElementById("rulesBtn");
const rulesPopup = document.getElementById("rulesPopup");
const closeBtn = document.querySelector(".close");
const winPopup = document.getElementById('winPopup');
const winnerText = document.getElementById('winnerText');
const playAgainBtn = document.getElementById('playAgainBtn');

rulesBtn.onclick = function() {
    rulesPopup.style.display = "block";
    setTimeout(() => {
        rulesPopup.classList.add('show');
    }, 10);
}

function closePopup() {
    rulesPopup.classList.remove('show');
    setTimeout(() => {
        rulesPopup.style.display = "none";
    }, 300);
}

closeBtn.onclick = closePopup;

window.onclick = function(event) {
    if (event.target == rulesPopup) {
        closePopup();
    }
}

const canvas = document.getElementById('display');
const ctx = canvas.getContext('2d');
const gameMenu = document.getElementById('gameMenu');
const singlePlayerBtn = document.getElementById('singlePlayerBtn');
const twoPlayerBtn = document.getElementById('twoPlayerBtn');
const difficultySelect = document.getElementById('difficulty');
const blueScoreElement = document.getElementById('blueScore');
const redScoreElement = document.getElementById('redScore');

let gameMode = null;
let ballX, ballY, ballSpeedX, ballSpeedY;
let paddleHeight = 80;
let paddleWidth = 10;
let leftPaddleY, rightPaddleY;
let playerSpeed = 8;
let aiSpeed; // Kecepatan AI yang akan disesuaikan
let blueScore = 0;
let redScore = 0;
let isGameRunning = false;

let leftPaddleUp = false;
let leftPaddleDown = false;
let rightPaddleUp = false;
let rightPaddleDown = false;

singlePlayerBtn.addEventListener('click', () => startGame('single'));
twoPlayerBtn.addEventListener('click', () => startGame('two'));
playAgainBtn.addEventListener('click', () => {
    winPopup.style.display = 'none';
    resetGame();
    gameMenu.style.display = 'block';
    isGameRunning = false;
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') leftPaddleUp = true;
    if (e.key === 's') leftPaddleDown = true;
    if (e.key === 'ArrowUp') rightPaddleUp = true;
    if (e.key === 'ArrowDown') rightPaddleDown = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') leftPaddleUp = false;
    if (e.key === 's') leftPaddleDown = false;
    if (e.key === 'ArrowUp') rightPaddleUp = false;
    if (e.key === 'ArrowDown') rightPaddleDown = false;
});

function setDifficulty() {
    const difficulty = document.getElementById('difficulty').value;

    switch (difficulty) {
        case 'easy':
            ballSpeedX = 1; // Kecepatan bola untuk tingkat mudah
            ballSpeedY = 1; // Kecepatan bola untuk tingkat mudah
            aiSpeed = 0; // Kecepatan AI untuk tingkat mudah (mudah dikalahkan)
            break;
        case 'medium':
            ballSpeedX = 4; // Kecepatan bola untuk tingkat medium
            ballSpeedY = 4; // Kecepatan bola untuk tingkat medium
            aiSpeed = 4; // Kecepatan AI untuk tingkat medium (agak susah)
            break;
        case 'hard':
            ballSpeedX = 6; // Kecepatan bola untuk tingkat sulit
            ballSpeedY = 6; // Kecepatan bola untuk tingkat sulit
            aiSpeed = 6; // Kecepatan AI untuk tingkat sulit (susah sekali)
            break;
    }
}

function startGame(mode) {
    gameMode = mode;
    gameMenu.style.display = 'none';
    isGameRunning = true;
    resetGame();
    gameLoop();
}

function resetGame() {
    canvas.width = 640;
    canvas.height = 420;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

    // Set kecepatan bola dan AI berdasarkan kesulitan
    setDifficulty();

    leftPaddleY = (canvas.height - paddleHeight) / 2; 
    rightPaddleY = (canvas.height - paddleHeight) / 2;
    blueScore = 0;
    redScore = 0;
    blueScoreElement.textContent = blueScore;
    redScoreElement.textContent = redScore;
}

function gameLoop() {
    if (!isGameRunning) return;

    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Update posisi bola
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Logika untuk memantulkan bola
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY; // Pantulkan bola jika menyentuh atas atau bawah
    }

    // Logika untuk paddle dan skor
    if (ballX <= paddleWidth) {
        if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX; // Pantulkan bola jika mengenai paddle kiri
        } else if (ballX < 0) {
            redScore++;
            resetGame(); // Reset jika bola keluar dari sisi kiri
        }
    }

    if (ballX >= canvas.width - paddleWidth) {
        if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX; // Pantulkan bola jika mengenai paddle kanan
        } else if (ballX > canvas.width) {
            blueScore++;
            resetGame(); // Reset jika bola keluar dari sisi kanan
        }
    }

    // AI untuk paddle kanan
    if (gameMode === 'single') {
        if (ballY < rightPaddleY) {
            rightPaddleY -= aiSpeed; // Gerakkan paddle AI ke atas
        } else {
            rightPaddleY += aiSpeed; // Gerakkan paddle AI ke bawah
        }
    }

    // Batasi gerakan paddle
    leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY + (leftPaddleUp ? -playerSpeed : 0) + (leftPaddleDown ? playerSpeed : 0)));
    rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY + (rightPaddleUp ? -playerSpeed : 0) + (rightPaddleDown ? playerSpeed : 0)));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas

    // Gambar bola
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // Gambar paddle
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Gambar skor
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Blue: ${blueScore}`, 20, 20);
    ctx.fillText(`Red: ${redScore}`, canvas.width - 100, 20);
}