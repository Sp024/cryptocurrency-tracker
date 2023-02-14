document.getElementById('convert').onclick = currConvert;
document.getElementById('clear').onclick = clearForm;

function currConvert() {
    
    var coin = document.getElementById("cryp-coin").value;
    var usdVal = document.getElementById("usd").value;
  

  if (coin != '') {
        usdVal = (parseFloat(coin) * 21905.29) ;
    } else {
        coin = (parseFloat(usdVal) /21905.29) ;
    }
  


    document.getElementById('cryp-coin').value = parseFloat(coin);
    document.getElementById('usd').value = parseFloat(usdVal);
}


function clearForm() {
    document.getElementById('cryp-coin').value = '';
    document.getElementById('usd').value = '';
} 



