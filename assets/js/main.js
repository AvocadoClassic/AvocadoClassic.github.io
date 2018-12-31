
/*
	Avocado Classic Inc. 
	Web3 @Guactoshi
	Theme templates by @ajlkn
*/
//By @ajlkn 


(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}
		$(document).ready(function(){

			console.log("Document Ready");

			//function to handle multiple Ids
			function replaceTextById(id_, value) {
				var i;
				var ids = document.querySelectorAll(id_);	
				for (i = 0; i < ids.length; i += 1) {
					ids[i].innerHTML = value;
				}
			}

			// Web3 @Guactoshi.	
				var protocolVersion;
				var account;
				var coinbase;
				var donationWallet = "0xD531b32855379D943149D8C67723A77853038c27";

				//Define promise constructor that returns Protocol Version
				function getProtocolVersion() {
					return new web3.eth.getProtocolVersion();
				}

				function getAccounts() {
					return new web3.eth.getAccounts();
				}

				function getBalance(account_) {
					return new web3.eth.getBalance(account_);
				}
				function getCoinbase() {
					return new web3.eth.getCoinbase();
				}
				function getTransactionCount(account_) {
					return new web3.eth.getTransactionCount(account_);
				}
				function isMining() {
					return new web3.eth.isMining();
				}
				function getHashrate() {
					return new web3.eth.getHashrate();
				}
				function getWork() {
					return new web3.eth.getWork();
				}
				function sendTransaction(from_, to_, value_) {
					let transaction = {
						from: from_,
						to: to_,
						value: value_
					}
					return new web3.eth.sendTransaction(transaction);
				}

				function donate(from_) {
					var ether_ = prompt("How much Ether would you live to donate?", "0.1").toString();
					var wei_ = web3.utils.toWei(ether_);
					sendTransaction(from_, donationWallet, wei_);
				}
			
				if(typeof web3 !== "undefined"){
					web3 = new Web3(web3.currentProvider);
					console.log(web3);
				}
				else{
					alert("Could not find Web3.0 provider. Please visit metamask.io or download the Ethereum Mist browser");
					web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/92c7d68c82d44e619acf69270649590b"));

				}
				const ipfs = new window.IpfsHttpClient("ipfs.infura.io", "5001");
				console.log(ipfs);

				 

				getProtocolVersion().then(function(protocolVersion_){
					var protocolVersion = web3.utils.hexToNumberString(protocolVersion_);
					replaceTextById("#protocolVer", protocolVersion);
					console.log("node ethereum protocol version " + protocolVersion);
					var web3ver = web3.version;
					console.log("web3 version: " + web3ver);
					replaceTextById("#web3Ver", web3ver)
					return getAccounts();
				}).then(function(accounts){

					var account = accounts[0];
					replaceTextById("#account", account);
					getTransactionCount(account).then(function(txcount_){
						replaceTextById("#txCount", txcount_);
						console.log("tx count: " + txcount_);
					});

					console.log("user: " + account);
					document.getElementById("donate").onclick = function() {
						donate(account);
					}
					return getBalance(account);
				}).then(function(balance_){
					balance = web3.utils.fromWei(balance_, 'ether');
					replaceTextById("#balance", balance);
					console.log(balance);
					return getCoinbase();
				}).then(function(coinbase_){
					var coinbase = coinbase_;
					console.log("miner: " + coinbase);
					//Checks if current injected private key is the mining coinbase
					if(coinbase == account) {
						web3.eth.defaultAccount = account;
						console.log("user is a miner")
						return isMining();
					}
					else{
						console.log("user is not a miner");
						return isMining();
					}
				}).then(function(bool){
					if (bool) {
						console.log("User is mining");
						return getHashrate();
					}else{
						console.log("User is not mining");
						return getHashrate();
					}
				}).then(function(hashrate_){
					var hashrate = hashrate_;
					replaceTextById("#hashrate", hashrate);
					console.log("Hashrate: " + hashrate);
				});
				
				getBalance("0xD531b32855379D943149D8C67723A77853038c27").then(function(guacbase_){
					guacbase = web3.utils.fromWei(guacbase_, 'ether');
					replaceTextById("#guacbase", guacbase + " ETH");
					console.log("donation wallet balance is " + guacbase);
					return getTransactionCount("0xD531b32855379D943149D8C67723A77853038c27");
				}).then(function(guacbaseTxCount_){
					guacbaseTxCount = guacbaseTxCount_;
					replaceTextById("#guacbaseTxCt", guacbaseTxCount);
					console.log("Donation wallet has had " + guacbaseTxCount + " transactions");
				});
	});			
})(jQuery);





