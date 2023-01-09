const cardNumberInput = document.getElementById("card-number");

cardNumberInput.addEventListener("keypress", (event) => {
  const key = event.keyCode;
  if (key < 48 || key > 57 && key !== 8) {
    event.preventDefault();
  }
});
