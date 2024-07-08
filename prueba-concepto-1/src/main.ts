import "./style.css";

export const shuffle = <T>(array: T[]): T[] => {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

// Ejemplo de uso
const cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
console.log(shuffle(cartas));
