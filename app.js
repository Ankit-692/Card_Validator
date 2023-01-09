const cardNumberInput = document.getElementById("card-number");
const cnum = document.querySelector(".cnum");


cardNumberInput.addEventListener("keyup", (event) => {
    const key = event.key;

    let card = cardNumberInput.value;
    cnum.textContent = card;
});

let myHeaders = new Headers();
myHeaders.append("apikey","dmydq6nhQDrxWqRIQqe9qJ0Y2o6w4UdW");

let requestOptions = {
    method : 'GET',
    redirect : 'follow',
    headers : myHeaders
};

const cardCheck = async (cardNum)=>{
    let binNum = parseInt(cardNum.slice(0,6),10);
    await fetch(`https://api.apilayer.com/bincheck/${binNum}`,requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error',error));

    console.log(typeof(result));
}

const check = ()=>{
    event.preventDefault();
    let cardNum = cardNumberInput.value;
    cardCheck(cardNum);
}
