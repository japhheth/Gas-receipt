
let btn = document.getElementById('print-div');
let kgInputed = document.getElementById('kg-purchased');
let error = document.getElementById('error-text');
let wrapperDiv = document.getElementById('value-entered');
let outputDiv = document.getElementById('total');
let totalAmount = document.getElementById('total-amount');
let res = '';


btn.addEventListener('click', (e)=> {
    if(kgInputed.value == ''){
        error.innerHTML = 'Enter the total amount of Kg';
        e.preventDefault();
    }else{
        calculateKgPurchased();
        btn.style.display = 'none';
        window.print();
    }
});


let calculateKgPurchased = function(){
    let perKg = 300;
    res = kgInputed.value * perKg;
    totalAmount.innerHTML = '#' + formatMoney(res);
}

//Amount formatter

function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;
    
    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
    }