import { map, snake } from "./map.js";
import { exchangePosition, findPosition } from "./move.js";

var wrapper = document.getElementsByClassName("wrapper")[0];
wrapper.style.height = map.length * 20 + "px";
wrapper.style.width = map[0].length * 20 + "px";
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
  const x = Math.round(Math.random() * (map[0].length - 2 - 1) + 1);
  const y = Math.round(Math.random() * (map.length - 2 - 1) + 1);
  return { x, y };
}

function moveToLeft() {
  var pHead = findPosition(snake[0]);
  var pTail = findPosition(snake[snake.length - 1]);
  var pHeadNext = { x: pHead.x, y: pHead.y - 1 };
  if (map[pHeadNext.x][pHeadNext.y] === -1) {
    clearInterval(timer);
    return;
  }
  if (map[pHeadNext.x][pHeadNext.y] === 1) {
    map[pHeadNext.x][pHeadNext.y] = snake[snake.length - 1] + 1;
    snake.push(snake[snake.length - 1] + 1);
  }
  for (var i = snake.length - 1; i > 0; i--) {
    exchangePosition(findPosition(snake[i]), findPosition(snake[i - 1]));
  }
  exchangePosition(findPosition(10), pHeadNext);

}
// setInterval(() => {
//   const { x, y } = randomPosition();
//   map[y][x] = 1;
//   render();
// }, 1000);

var timer = setInterval(() => {
  // const { x, y } = randomPosition();
  moveToLeft();
  render();
}, 500);
