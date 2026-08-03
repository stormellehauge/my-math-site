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
