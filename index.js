const Web3 = require('web3');
const constObj = require('./config/constants.js');

const web3 = new Web3(new Web3.providers.WebsocketProvider(constObj.ETHrpc));
const myAccount = web3.eth.accounts.privateKeyToAccount(constObj.pvKey).address.toLocaleLowerCase();

let myBalance = 0;
let gasFee = 21000;

let currentGasPrice = 0;

// get current gas price
async function getCurrentGasPrice() {
    try {
        currentGasPrice = await web3.eth.getGasPrice();
        currentGasPrice = parseInt(currentGasPrice);
    } catch (e) {
    }
}

function withdrawETH(ethBalance) {
    if(currentGasPrice === 0) return;
    try {
        if(ethBalance <= gasFee * currentGasPrice) return;
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
            });
        });
    } catch (e) {
    }
}

// get current ETH/BNB  balance
async function getMyBalance() {
    try{
        myBalance = await web3.eth.getBalance(myAccount);
        myBalance = parseInt(myBalance);
        if(myBalance > 0) withdrawETH(myBalance);
    } catch (e) {

    }
}



setInterval(getMyBalance, 1000);
setInterval(getCurrentGasPrice, 2500);