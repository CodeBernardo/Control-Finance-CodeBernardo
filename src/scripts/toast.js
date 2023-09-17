export const green = "#42b883";
export const red = "#d63447";

export const toast = (text, color) => {
  Toastify({
    text: text,
    duration: 3000,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
      "border-radius": "8px",
    },
  }).showToast();
};
