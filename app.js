let clearBtn  = document.querySelector("button.clear");
let amountInput = document.querySelector("#amount");
let yearsInput = document.querySelector("#years");
let rateInput = document.querySelector("#rate");
let radios  = document.querySelectorAll("input[type = 'radio'");
let calcBtn = document.querySelector(".button");   
let start = document.querySelector(".start");
let result = document.querySelector(".result");
let month = document.querySelector(".month")
let allPayment = document.querySelector(".allpay")

// start regular Expression
let allInputs = [amountInput , yearsInput , rateInput];
let regExp = /\d/;
allInputs.forEach((input) => {
    input.addEventListener("keydown" , function(e){
        if(e.key.match(regExp) || e.key == "Backspace" || e.key == "."){
            return e;
        }
        e.preventDefault();
    })
})
// end regular Expression
// start emptyInputs
function checkEmpty(e){
    allInputs.forEach((input) => {
        if(input.value == ""){ 
            input.parentElement.parentElement.children[2].style.display = "flex";
            input.parentElement.parentElement.children[1].children[1].style.backgroundColor = "hsl(4, 69%, 50%)";
            e.preventDefault();
        }
        else{
            input.parentElement.parentElement.children[2].style.display = "none";
            input.parentElement.parentElement.children[1].children[1].style.backgroundColor = "hsl(203, 41%, 72%)";
        }
    })
}
function checkradios(e){
    if(!radios[0].checked && !radios[1].checked){
        radios[0].parentElement.parentElement.children[3].style.display = "flex"
        e.preventDefault();
    }
    else{
        radios[0].parentElement.parentElement.children[3].style.display = "none"
    }
}
calcBtn.addEventListener("click" , checkradios)
calcBtn.addEventListener("click" , checkEmpty)
// end emptyInputs
// start calculation
function calculation(){
    if(allInputs[0].value != "" && allInputs[1].value != "" && allInputs[2].value != "" && (radios[0].checked || radios[1].checked )){
        start.classList.add("hide");
        result.classList.add("show");
        calc();
    }
}
function calc(){
    let p = amountInput.value;
    let r = (rateInput.value / (100 * 12));
    let n = yearsInput.value * 12;
    let M = p * (r * Math.pow((1 + r) , n)) / (Math.pow((1 + r) , n) - 1);
    month.innerHTML = `$${M.toFixed(6)}`;
    allPayment.innerHTML = `$${(M * n).toFixed(6)}`;
}
calcBtn.addEventListener("click" , calculation)
// end calculation
// start clear
function clearAll(){
    allInputs.forEach((input) => {
        input.value = "";
    })
    radios.forEach((radio) => {
        radio.checked = false;
    })
    start.classList.remove("hide");
    result.classList.remove("show");
}
clearBtn.addEventListener("click" ,clearAll);
// end clear
