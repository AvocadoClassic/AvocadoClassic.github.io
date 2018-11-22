const Web3 = require("web3");
window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
      try {
          // Request account access if needed
          await ethereum.enable();
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */});
      } catch (error) {
          // User denied account access...
          alert("User denied access").then(console.log("User denied access"));
      }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
      // Acccounts alwas exposed
      web3.eth.sendTransaction({/* ... */});
  }
  // Non-dapp browsers...
  else {
      console.log('Non-dApp browser detected. You should consider trying MetaMask!');
  }
});