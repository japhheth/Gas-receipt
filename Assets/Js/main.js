
let btn = document.getElementById('print-div');
let kgInputed = document.getElementById('kg-purchased');
let error = document.getElementById('error-text');
let wrapperDiv = document.getElementById('value-entered');
let outputDiv = document.getElementById('total');
let totalAmount = document.getElementById('total-amount');
let history = document.getElementById('tran-history');
let todayDate = document.getElementById('today');
let res = '';


//Get today's date begin

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let purchasedDate = new Date();
let purchasedDateOutput = purchasedDate.toLocaleDateString("en-US",options);
console.log(purchasedDate.toLocaleDateString("en-US",options));

//Get today's date End

todayDate.innerHTML = purchasedDateOutput;

// Print receipt 

btn.addEventListener('click', function() {

    if(kgInputed.value == '' || kgInputed.value == 0){
        error.innerHTML = 'Please enter the amount of Kg purchased';
        setTimeout(function(){
            init();
            clearError();
        }, 3000)
        e.preventDefault();
    }else if (isNaN(kgInputed.value)){
        error.innerHTML = 'Value Must be a number';
        setTimeout(function(){
            init();
            clearError();
        }, 3000)
        e.preventDefault();
    } else{
        calculateKgPurchased();
        btn.style.display = 'none';
        history.style.display = 'none';
        window.print();
        setTimeout( function(){
            init();
        }, 4000)   
        postData(e);
    }
});



//Post data()
function postData(e){
    e.preventDefault();
    fetch('url', {
        method : 'POST',
        headers : {
            'Accept' : 'application/json, text/plain, */*',
            'Content-type' : 'application/json'
        },
        body : JSON.stringify({
            day : purchasedDateOutput,
            gasKg : kgInputed.value,
            amount : res
        })    
    })
    .then( function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data)
    })
    .catch(function(error){
        return error
    })
}

//Clear Error

function clearError(){
    error.innerHTML = '';
}
//Calculate kg purchased

function calculateKgPurchased(){
    let perKg = 300;
    res = formatMoney(kgInputed.value * perKg);
    totalAmount.innerHTML = '<span>&#8358;</span>' + res;
    //PostData

  
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

 //Re-initialization

 function init(){
     totalAmount.innerHTML = '';
     kgInputed.value = '';
     btn.style.display = 'block';
     history.style.display = 'block';

 }