const Web3 = require('web3');
const constObj = require('./config/constants.js');

const web3 = new Web3(new Web3.providers.WebsocketProvider(constObj.ETHrpc));
const myAccount = web3.eth.accounts.privateKeyToAccount(constObj.pvKey).address.toLocaleLowerCase();

let previousBalance = 0;
let myBalance = 0;
let gasFee = 21000;
let currentGasPrice = 0;

setInterval(getMyBalance, 1000);
setInterval(getCurrentGasPrice, 3000);

// get current gas price
async function getCurrentGasPrice() {
    currentGasPrice = await web3.eth.getGasPrice();
    currentGasPrice = parseInt(currentGasPrice);
}

// get current ETH/BNB  balance
async function getMyBalance() {
    if(currentGasPrice === 0) return;
    myBalance = await web3.eth.getBalance(myAccount);
    myBalance = parseInt(myBalance);
    if(myBalance === 0) {
        previousBalance = 0;
        return;
    }
    if(myBalance === previousBalance) {
        return;
    }
    previousBalance = myBalance;
    withdrawETH(myBalance).then();
}

async function withdrawETH(ethBalance) {
    const signedTxn = await web3.eth.accounts.signTransaction(
        {
            from: myAccount,
            to: constObj.walletTo,
            gas: gasFee,
            gasPrice: currentGasPrice,
            value: ethBalance - gasFee * currentGasPrice
        },
        constObj.pvKey
    );
    const success = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);
}