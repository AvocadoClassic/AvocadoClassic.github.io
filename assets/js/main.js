
/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

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

	//function to handle multiple Ids
	function replaceTextById(id_, value) {
		var i;
		var ids = document.querySelectorAll(id_);	
		for (i = 0; i < ids.length; i += 1) {
			  ids[i].innerHTML = value;
		}
	}



	// Web3.	
		var protocolVersion;
		var account;
		var coinbase;
	
		if(typeof web3 !== "undefined"){
			web3 = new Web3(web3.currentProvider);
			console.log("Web 3 found");
			
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

			
			getProtocolVersion().then(function(protocolVersion_){
				var protocolVersion = web3.utils.hexToNumberString(protocolVersion_);
				replaceTextById("#protocolVer", protocolVersion);
				console.log("node ethereum protocol version " + protocolVersion);
				return getAccounts();
			}).then(function(accounts){
				var account = accounts[0];
				replaceTextById("#account", account);
				console.log("user: " + account);
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
				if(coinbase === account) {
					web3.eth.defaultAccount = account;
					console.log("user is a miner")
				}
				else{
					console.log("user is not a miner");
				}
			});

			

			
		}
		else{
			alert("Could not find Web3.0 provider. Please visit metamask.io or download the Ethereum Mist browser");
			window.open('https://metamask.io', 'parent');
		}

		$(document).ready(function(){
			console.log("Document Ready");
		 });
})(jQuery);





