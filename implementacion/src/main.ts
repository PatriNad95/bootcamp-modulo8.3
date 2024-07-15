import { Carta, Tablero, tablero } from "./model";
import {
  barajarCartas,
  esPartidaCompleta,
  iniciarPartida,
  parejaEncontrada,
  parejaNoEncontrada,
  sePuedeVoltearLaCarta,
  sonPareja,
  voltearLaCarta,
} from "./motor";
import "./style.css";

let intentos = 0;

const btnIniciarPartida = document.getElementById("iniciarPartida");

if (
  btnIniciarPartida !== null &&
  btnIniciarPartida !== undefined &&
  btnIniciarPartida instanceof HTMLButtonElement
) {
  btnIniciarPartida.addEventListener("click", () => {
    btnIniciarPartida.classList.add("no-mostrar");
    iniciarPartida(tablero);
    tablero.cartas = barajarCartas(tablero.cartas);
    renderizarTablero();
  });
} else {
  console.log("El elemento con id tablero no es un elemento Button");
}

const actualizarIntentos = () => {
  const intentosElem = document.getElementById("intentos");
  if (
    intentosElem !== null &&
    intentosElem !== undefined &&
    intentosElem instanceof HTMLElement
  ) {
    intentosElem.className = "mostrar";
    intentosElem.textContent = `Intentos: ${intentos}`;
  } else {
    console.log("El elemento con id intentosElem no es un elemento HTML");
  }
};

const mostrarImagen = (carta: HTMLDivElement, cartas: Carta[]) => {
  const cartaIndice = Number(carta.getAttribute("data-indice-id"));
  const imgElem = document.createElement("img");
  imgElem.src = cartas[cartaIndice].imagen;
  carta.classList.add("carta-vuelta");
  carta.appendChild(imgElem);
  return carta;
};

const mirarPosicionSegundaCarta = (tablero: Tablero) => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  if (indiceA !== undefined && indiceB !== undefined) {
    if (sonPareja(indiceA, indiceB, tablero)) {
      parejaEncontrada(tablero, indiceA, indiceB);
      if (esPartidaCompleta(tablero)) {
        alert("¡Has completado el juego!");
        tablero.estadoPartida = "PartidaCompleta";
      }
    } else {
      setTimeout(() => {
        parejaNoEncontrada(tablero, indiceA, indiceB);
        noMostrarImagenes(indiceA, indiceB);
      }, 1000);
    }
    intentos++;
    actualizarIntentos();
  }
};

const noMostrarImagenes = (indiceA: number, indiceB: number) => {
  const tableroElem = document.getElementById("tablero");
  if (
    tableroElem !== null &&
    tableroElem !== undefined &&
    tableroElem instanceof HTMLElement
  ) {
    const cartasElem = tableroElem.getElementsByClassName("carta");
    eliminarImagen(cartasElem, indiceA);
    eliminarImagen(cartasElem, indiceB);
  } else {
    console.log("El elemento con id tablero no es un elemento HTML");
  }
};

const eliminarImagen = (
  cartasElem: HTMLCollectionOf<Element>,
  indice: number
) => {
  const imagen = cartasElem[indice].getElementsByTagName("img");
  cartasElem[indice].classList.remove("carta-vuelta");
  cartasElem[indice].removeChild(imagen[0]);
};

const renderizarTablero = () => {
  const tableroElem = document.getElementById("tablero");
  if (
    tableroElem !== null &&
    tableroElem !== undefined &&
    tableroElem instanceof HTMLElement
  ) {
    tableroElem.innerHTML = "";
    tablero.cartas.forEach((_, index) => {
      let cartaElem = document.createElement("div");
      cartaElem.classList.add("carta");
      cartaElem.setAttribute("data-indice-id", index.toString());
      tableroElem.appendChild(cartaElem);

      cartaElem.addEventListener("click", () => {
        if (sePuedeVoltearLaCarta(tablero, index)) {
          voltearLaCarta(tablero, index);
          mostrarImagen(cartaElem, tablero.cartas);
          mirarPosicionSegundaCarta(tablero);
        } else {
          alert("Esta carta ya está volteada.");
        }
      });
    });
  } else {
    console.log("El elemento con id tablero no es un elemento HTML");
  }
};
