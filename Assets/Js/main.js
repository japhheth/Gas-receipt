
let btn = document.getElementById('print-div');
let kgInputed = document.getElementById('kg-purchased');
let error = document.getElementById('error-text');
let wrapperDiv = document.getElementById('value-entered');
let outputDiv = document.getElementById('total');
let totalAmount = document.getElementById('total-amount');
let history = document.getElementById('tran-history');
let todayDate = document.getElementById('today');
let res;
let formattedAmt;



//Get today's date begin

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let purchasedDate = new Date();
let purchasedDateOutput = purchasedDate.toLocaleDateString("en-US",options);
console.log(purchasedDate.toLocaleDateString("en-US",options));

//Get today's date End


// Print receipt 

btn.addEventListener('click', function() {

    if(kgInputed.value == '' || kgInputed.value == 0){
        error.innerHTML = 'Please enter the amount of Kg purchased';
        setTimeout(function(){
            init();
            clearError();
        }, 3000)
    }else if (isNaN(kgInputed.value)){
        error.innerHTML = 'Value Must be a number';
        setTimeout(function(){
            init();
            clearError();
        }, 3000)
    } else{
        calculateKgPurchased();
        btn.style.display = 'none';
        history.style.display = 'none';
        window.print();
        setTimeout( function(){
            init();
        }, 4000)   
         postData();
    }
});




//Clear Error
function clearError(){
    error.innerHTML = '';
}

//Calculate kg purchased
function calculateKgPurchased(){
    let perKg = 300;

    res = kgInputed.value * perKg;
    formattedAmt = formatMoney(res)
    totalAmount.innerHTML = '<span>&#8358;</span>' + formattedAmt;
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
     todayDate.innerHTML = purchasedDateOutput;
     totalAmount.innerHTML = '';
     kgInputed.value = '';
     btn.style.display = 'block';
     history.style.display = 'block';

 }

//Post data()
 function postData(){
    try{
        fetch('https://crossorigin.me/https://stationwork-api.herokuapp.com/api/transaction', {
            method : 'POST',
            headers : {
                'Accept' : 'application/json, text/plain, */*',
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({quantity : kgInputed.value, amount : res})    
        })
        .then( function(dt){
            return dt.json()
        })
        .then(function(data){
            console.log(data)
        })
    }
    catch(error){
        console.log(error)
    }
}



 

  



