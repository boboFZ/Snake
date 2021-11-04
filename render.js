import { map, snake } from "./map.js";
import { exchangePosition, findPosition } from "./move.js";

var wrapper = document.getElementsByClassName("wrapper")[0];
wrapper.style.height = map.length * 20 + "px";
wrapper.style.width = map[0].length * 20 + "px";
let direction = "left";
const { x, y } = randomPosition();
map[x][y] = 1;
function render() {
  wrapper.innerHTML = "";
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      var div = document.createElement("div");
      if (map[i][j] === -1) {
        div.className = "box wall";
      } else if (map[i][j] === 1) {
        div.className = "box food";
      } else if (map[i][j] === 10) {
        div.className = "box head";
      } else if (map[i][j] > 10) {
        div.className = "box body";
      }
      div.style.left = j * 20 + "px";
      div.style.top = i * 20 + "px";
      wrapper.appendChild(div);
    }
  }
}
render();

function randomPosition() {
  const x = Math.round(Math.random() * (map.length - 2 - 1) + 1);
  const y = Math.round(Math.random() * (map[0].length - 2 - 1) + 1);
  return { x, y };
}

function moveToNext(direction) {
  var pHead = findPosition(snake[0]);
  let pHeadNext;
  switch (direction) {
    case "left":
      pHeadNext = { x: pHead.x, y: pHead.y - 1 };
      break;
    case "right":
      pHeadNext = { x: pHead.x, y: pHead.y + 1 };
      break;
    case "up":
      pHeadNext = { x: pHead.x - 1, y: pHead.y };
      break;
    case "down":
      pHeadNext = { x: pHead.x + 1, y: pHead.y };
      break;
    default:
      pHeadNext = { x: pHead.x, y: pHead.y - 1 };
      break;
  }
  if (
    map[pHeadNext.x][pHeadNext.y] === -1 ||
    map[pHeadNext.x][pHeadNext.y] > 10
  ) {
    clearInterval(timer);
    return;
  }
  if (map[pHeadNext.x][pHeadNext.y] === 1) {
    map[pHeadNext.x][pHeadNext.y] = snake[snake.length - 1] + 1;
    snake.push(snake[snake.length - 1] + 1);
    const { x, y } = randomPosition();
    map[x][y] = 1;
  }
  for (var i = snake.length - 1; i > 0; i--) {
    exchangePosition(findPosition(snake[i]), findPosition(snake[i - 1]));
  }
  exchangePosition(findPosition(10), pHeadNext);
}

var timer = setInterval(() => {
  // const { x, y } = randomPosition();
  moveToNext(direction);
  render();
}, 300);

document.onkeydown = (e) => {
  switch (e.key) {
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
};
