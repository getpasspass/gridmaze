
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 30;
let path = [];
let player = { x: 0, y: 0 };
let score = 100;
let lives = 5;
let streak = 0;

function createPath() {
  let x = 0, y = 0;
  path = [{ x, y }];
  while (path.length < 100) {
    let direction = Math.random() < 0.5 ? 'x' : 'y';
    if (direction === 'x') x++;
    else y++;
    path.push({ x, y });
  }
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  path.forEach(cell => {
    ctx.fillStyle = '#444';
    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
  });
  ctx.fillStyle = '#33ffd7';
  ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

function isOnPath(x, y) {
  return path.some(cell => cell.x === x && cell.y === y);
}

function move(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;
  if (isOnPath(newX, newY)) {
    player.x = newX;
    player.y = newY;
    score += 100;
    drawGrid();
    checkWin();
  }
}

function checkWin() {
  const end = path[path.length - 1];
  if (player.x === end.x && player.y === end.y) {
    setTimeout(() => {
      alert("🎉 You reached the end! Final Score: " + score);
      resetGame();
    }, 100);
  }
}

function resetGame() {
  player = { x: 0, y: 0 };
  score = 100;
  lives = 5;
  streak = 0;
  createPath();
  drawGrid();
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp': move(0, -1); break;
    case 'ArrowDown': move(0, 1); break;
    case 'ArrowLeft': move(-1, 0); break;
    case 'ArrowRight': move(1, 0); break;
  }
});

createPath();
drawGrid();
