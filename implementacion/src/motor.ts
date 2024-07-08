import { Carta, cartas, Tablero } from "./model";

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  let m = cartas.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = cartas[m];
    cartas[m] = cartas[i];
    cartas[i] = t;
  }
  return cartas;
};

// Funciones del motor del juego
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  const carta = tablero.cartas[indice];
  return (
    !carta.estaVuelta &&
    !carta.encontrada &&
    (tablero.estadoPartida === "CeroCartasLevantadas" ||
      tablero.estadoPartida === "UnaCartaLevantada")
  );
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  const carta = tablero.cartas[indice];
  carta.estaVuelta = true;
};

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.estadoPartida = "CeroCartasLevantadas";
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.estadoPartida = "CeroCartasLevantadas";
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

export const iniciarPartida = (tablero: Tablero): void => {
  tablero.cartas = cartas;
  tablero.estadoPartida = "CeroCartasLevantadas";
};
