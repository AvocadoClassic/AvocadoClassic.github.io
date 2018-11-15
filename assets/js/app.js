//Avocado Classic Inc. Web App

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.currentProvider);
var account = web3.eth.accounts[0];
var accountInterval = setInterval(function() {
  if (web3.eth.accounts[0] !== account) {
    account = web3.eth.accounts[0];
    updateInterface();
  }
}, 100);
function watchBalance() {
    var coinbase = web3.eth.coinbase;
    var originalBalance = web3.eth.getBalance(coinbase).toNumber();
    document.getElementById('coinbase').innerText = 'coinbase: ' + coinbase;
    document.getElementById('original').innerText = ' original balance: ' + originalBalance + '    watching...';
    web3.eth.filter('latest').watch(function() {
        var currentBalance = web3.eth.getBalance(coinbase).toNumber();
        document.getElementById("current").innerText = 'current: ' + currentBalance;
        document.getElementById("diff").innerText = 'diff:    ' + (currentBalance - originalBalance);
        });
        
    }