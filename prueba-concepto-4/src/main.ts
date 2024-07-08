import "./style.css";

const carta1 = document.getElementById("carta1");
if (carta1 !== null && carta1 !== undefined && carta1 instanceof HTMLElement) {
  carta1.addEventListener("click", () => {
    carta1.className = "carta-vuelta";
    const img = document.getElementById("imagenCarta1");
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

const carta2 = document.getElementById("carta2");
if (carta2 !== null && carta2 !== undefined && carta2 instanceof HTMLElement) {
  carta2.addEventListener("click", () => {
    carta2.className = "carta-vuelta";
    const img = document.getElementById("imagenCarta2");
    if (img !== null && img !== undefined && img instanceof HTMLImageElement) {
      img.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png";
    } else {
      console.error("El elemento con id imagenCarta no es un elemento Imagen");
    }
  });
} else {
  console.error("El elemento con id carta no es un elemento HTML");
}
