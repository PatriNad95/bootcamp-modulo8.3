import { tablero } from "./model";
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

const renderizarTablero = () => {
  actualizarIntentos();
  const tableroElem = document.getElementById("tablero");
  if (
    tableroElem !== null &&
    tableroElem !== undefined &&
    tableroElem instanceof HTMLElement
  ) {
    tableroElem.innerHTML = "";
    tablero.cartas.forEach((carta, index) => {
      const cartaElem = document.createElement("div");
      cartaElem.className =
        carta.estaVuelta || carta.encontrada ? "carta-vuelta" : "carta";
      cartaElem.setAttribute("data-indice-id", index.toString());
      const imgElem = document.createElement("img");
      imgElem.classList.add("imagenCarta");
      imgElem.src = carta.imagen;
      cartaElem.appendChild(imgElem);
      tableroElem.appendChild(cartaElem);

      cartaElem.addEventListener("click", () => {
        if (sePuedeVoltearLaCarta(tablero, index)) {
          voltearLaCarta(tablero, index);
          renderizarTablero();
          if (
            tablero.estadoPartida === "UnaCartaLevantada" &&
            tablero.indiceCartaVolteadaA !== undefined
          ) {
            intentos++;
            actualizarIntentos();
            tablero.estadoPartida = "DosCartasLevantadas";
            const indiceA = tablero.indiceCartaVolteadaA;
            const indiceB = index;
            if (sonPareja(indiceA, indiceB, tablero)) {
              parejaEncontrada(tablero, indiceA, indiceB);
            } else {
              setTimeout(() => {
                parejaNoEncontrada(tablero, indiceA, indiceB);
                renderizarTablero();
              }, 1000);
            }
            if (esPartidaCompleta(tablero)) {
              alert("¡Has completado el juego!");
              tablero.estadoPartida = "PartidaCompleta";
            }
          } else {
            tablero.estadoPartida = "UnaCartaLevantada";
            tablero.indiceCartaVolteadaA = index;
          }
        } else if (tablero.cartas[index].estaVuelta) {
          alert("Esta carta ya está volteada.");
        }
      });
    });
  } else {
    console.log("El elemento con id tablero no es un elemento HTML");
  }
};
