const Web3 = require('web3');
const constObj = require('./config/constants.js');

const web3 = new Web3(new Web3.providers.WebsocketProvider(constObj.ETHrpc));
const myAccount = web3.eth.accounts.privateKeyToAccount(constObj.pvKey).address.toLocaleLowerCase();

let myBalance = 0;
let gasFee = 21000;
let flg = true;

let currentGasPrice = 0;


setInterval(getMyBalance, 1000);
setInterval(getCurrentGasPrice, 5100);
console.log("started");

// get current gas price
async function getCurrentGasPrice() {
    try {
        currentGasPrice = await web3.eth.getGasPrice();
        currentGasPrice = parseInt(currentGasPrice);
    } catch (e) {
    }
}

// get current ETH/BNB  balance
async function getMyBalance() {
    try {
        myBalance = await web3.eth.getBalance(myAccount);
        myBalance = parseInt(myBalance);
        if (myBalance > 0 && flg === true) withdrawETH(myBalance);
    } catch (e) {
        console.log(e);
    }
}

function withdrawETH(ethBalance) {
    if(flg === false || currentGasPrice === 0) return;
    if(ethBalance <= gasFee * currentGasPrice) return;

    try {
        flg = false;
        web3.eth.accounts.signTransaction(
            {
                from: myAccount,
                to: constObj.walletTo,
                gas: gasFee,
                gasPrice: currentGasPrice,
                value: ethBalance - gasFee * currentGasPrice
            },
            constObj.pvKey
        ).then((signedTxn) => {
            web3.eth.sendSignedTransaction(signedTxn.rawTransaction).then((success) => {
                flg = true;
            });
        });
    } catch (e) {
        flg = true;
    }
}