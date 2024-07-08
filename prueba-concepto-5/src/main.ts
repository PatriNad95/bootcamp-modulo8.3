import "./style.css";

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
  },
  {
    idFoto: 2,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
  },
  {
    idFoto: 3,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
  },
];

const crearCartas = (infoCartas: InfoCarta[]): InfoCarta[] => {
  return [...infoCartas, ...infoCartas];
};

const cartas = crearCartas(infoCartas);

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

shuffle(cartas);

const tablero = document.getElementById("tablero");
if (
  tablero !== null &&
  tablero !== undefined &&
  tablero instanceof HTMLElement
) {
  cartas.forEach((src, indice) => {
    const div = document.createElement("div");
    div.className = "carta";
    div.setAttribute("data-indice-id", indice.toString());

    const img = document.createElement("img");
    img.setAttribute("data-indice-id", indice.toString());
    img.src = src.imagen;
    div.appendChild(img);

    div.addEventListener("click", () => {
      div.className = "carta-vuelta";
    });

    tablero.appendChild(div);
  });
} else {
  console.log("El elemento con id tablero no es un elemento HTML");
}
