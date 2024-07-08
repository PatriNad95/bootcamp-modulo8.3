import "./style.css";

const carta = document.getElementById("carta");
if (carta !== null && carta !== undefined && carta instanceof HTMLElement) {
  carta.addEventListener("click", () => {
    const img = document.getElementById("imagenCarta");
    if (img !== null && img !== undefined && img instanceof HTMLImageElement) {
      img.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png";
    } else {
      console.error("El elemento con id imagenCarta no es un elemento Imagen");
    }
  });
} else {
  console.error("El elemento con id carta no es un elemento HTML");
}
