const input   = document.querySelector(".input");
const result  = document.querySelector(".result");
const select1 = document.querySelector(".currency1");
const select2 = document.querySelector(".currency2");
const convertBtn = document.querySelector(".convert");
const rateInfo = document.getElementById("rate_info");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '89360db1b9msh458632a7441bc98p114945jsn7da57a06d4b1',
		'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
	}
};

fetch('https://currency-exchange.p.rapidapi.com/listquotes', options)
	.then(response => response.json())
    .then((response) => {
        display(response);
    })
	.catch(err => console.error(err));

function display(data) 
{
    for(let i of data) {
        let option = `
        <option value="${i}">${i}</option> `;
        select1.insertAdjacentHTML("beforeend",option);
        select2.insertAdjacentHTML("beforeend",option);
    }
}

convertBtn.addEventListener("click", () => {
    let currency1 = select1.value;
    let currency2 = select2.value;
    let number = parseFloat(input.value);
    if(currency1 != currency2) {
        convert(currency1, currency2, number); 
        setTimeout(() => {
            let number2 = parseFloat(result.value);
            if(input.value == "") {
                alert("Please enter a value.");
            } else if(input.value <= 0){
                alert("Please enter positive number !!")
            } else {
            rateInfo.innerText = `${number} ${currency1} = ${number2.toFixed(2)} ${currency2}`
            }
        },1500);
    }
    else {
        alert("Choose Different Currencies !!");
    }
});

function convert(currency1, currency2, number)
{
    if(number > 0) {
        fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${currency1}&to=${currency2}&q=${number}`, options)
        .then(response => response.json())
        .then(response => {
            let rv = response*number;
            result.value = rv.toFixed(2);
        })
        .catch(err => console.error(err));
    } 
}

input.addEventListener("keypress", (event) => {
    if(event.key == "Enter") {
        document.getElementById("convert").click();
    }
});