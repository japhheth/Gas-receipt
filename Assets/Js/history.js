"use strict";


let outputTable = document.getElementById('tableBody');
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let tableBody = '';
getOldTransactions();


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


//Fetch Data
function getOldTransactions(){
    try{
        fetch('https://stationwork-api.herokuapp.com/api/transaction')
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            console.log(data);
            data = data.data;
            const outputData = data.forEach(element => {
                let outputAmt = formatMoney(element.totalamount);
                let d = new Date(element.datecreated)
                let dateOutput = d.toLocaleDateString("en-US",options)
                 //Pushes the data in a tabe body.
                tableBody += `<tr><td>${dateOutput}</td><td>${element.quantity}</td><td><span>&#8358;</span> ${outputAmt}</td></tr>`;
            })
            outputTable.innerHTML = tableBody;
            console.log(outputData);

        })
    }
    catch(err){
        console.log(err)
    }

 }

 $(document).ready(function() {
    $('#outputTable').DataTable();
});
