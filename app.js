const cardNumberInput = document.getElementById("card-number");
const cnum = document.querySelector(".cnum");

cardNumberInput.addEventListener("keyup", (event) => {
    const key = event.key;
    console.log(key);

    let card = cardNumberInput.value;
    cnum.textContent = card;
});

