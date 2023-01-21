const cardNumberInput = document.getElementById("card-number");
const cnum = document.querySelector(".cnum");
const bname = document.querySelector(".bname");
const type = document.querySelector(".type");
const scheme = document.querySelector(".scheme");
const flag = document.querySelector(".cflag");
const cCity = document.querySelector(".cCity");
const bcard = document.querySelector(".card");
const validy = document.querySelector(".validity");
const root = document.querySelector(':root');

cardNumberInput.addEventListener("keyup", (event) => {
    const key = event.key;

    let card = cardNumberInput.value;
    cnum.textContent = card;
    cnum.style.color = 'white';
    bname.textContent = 'BANK Name, LTD.';
    scheme.textContent = 'Credit/Debit';
    type.textContent = 'Card Type';
    cCity.textContent = 'City, Country';
    flag.src = "images/globe.png";
    root.style.setProperty("--display",'none');

});

const cardCheck = async (cardNum)=>{
        let binNum = parseInt(cardNum.slice(0,6),10);
        try{
            cnum.style.color = 'white';
            await fetch(`https://lookup.binlist.net/${binNum}`)
            .then(response => response.json())
            .then(result => update(result));
        }
        catch(error){
            cnum.style.color = 'red';
            cnum.classList.add("cshake");
            bname.textContent = "No Info";
            cnum.textContent = "";
            cnum.insertAdjacentHTML("afterbegin",`<del>${cardNum}</del>`);
            flag.src = "images/globe.png";
            cCity.textContent = "";
            type.textContent = "";
            scheme.textContent = "";

            setTimeout(() => {
                cnum.classList.remove("cshake");
            }, 1000);

        }
    }


const check = ()=>{
    event.preventDefault();
    let cardNum = cardNumberInput.value;
    cardCheck(cardNum);
    if(validy.textContent == 'Valid Card'){
        root.style.setProperty("--valid","Green");
        root.style.setProperty("--display",'block');
    }
    else{
        root.style.setProperty("--valid","red");
        root.style.setProperty("--display",'block');
    }
}

const update = (result)=>{
    console.log(result);
    try{
        let bank_name = result.bank.name;
        bname.textContent = bank_name;
        if(bank_name == undefined) bname.textContent = "No Info";
    }
    catch{
        bname.textContent = "Unknown Bank";
    }

    let country = result.country.name;
    let cscheme = result.type;
    let ctype = result.scheme;
    let cCode = result.country.alpha2;

    if(result.bank.city != undefined){
        let city = result.bank.city;
        cCity.textContent = `${city},${cCode}`;
    }
    else{
        cCity.textContent = `${cCode}`;
    }

    type.textContent = ctype;
    scheme.textContent = cscheme;
    flag.src = `https://countryflagsapi.com/png/${country}`;

}
