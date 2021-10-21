import { map } from "./map.js";
export const exchangePosition = (p1, p2) => {
  var temp = map[p1.x][p1.y];
  map[p1.x][p1.y] = map[p2.x][p2.y];
  map[p2.x][p2.y] = temp;
};

export const findPosition = (number) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === number) {
        return {
          x: i,
          y: j,
        };
      }
    }
  }
};
