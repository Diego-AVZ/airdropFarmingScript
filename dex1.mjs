import Web3 from 'web3';
import { abiDex1 } from './abis.mjs';

const url = 'https://rpc.ankr.com/scroll_sepolia_testnet';
const myAddress = "0x85dEee2d87C40DcD459A07EBa7371bf535435b52";
const prvKey = "5f0a23a7629a71d49261db38dd2c30c00468995723b215e5dce6111a9ad65d6b";
const web3 = new Web3(url);

export const addressDex1 = "0xd135FE519Bda20FFa65c3Ed762d6478312075966";
const Dex1 = new web3.eth.Contract(abiDex1,addressDex1);

export async function SwapETHForToken(tokenOut, ethValue){  
    try{
        const _nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
        var path = ["0x575Ad5f3b05D76Bf8B19E9813A4D88aB1E8cF903",tokenOut]
        var data = Dex1.methods.swapExactETHForTokens(0,path,myAddress,30000000000).encodeABI(); // 300...000 is deadlineTime
        var Tx = {
            from: myAddress,
            to: addressDex1,
            nonce : _nonce,
            gasLimit: 2100000,
            gasPrice: 4500000000,
            value: ethValue,
            data: data
        }
        var signedTx = await web3.eth.accounts.signTransaction(Tx, prvKey);
        console.log("Signed transaction");
        var txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Transaction receipt");
        
    }catch(error){console.error(error);}
}

export async function SwapTokensForETH(tokenIn, amount){  
    try{
        const _nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
        var path = [tokenIn,"0x575Ad5f3b05D76Bf8B19E9813A4D88aB1E8cF903"]
        var data = Dex1.methods.swapExactTokensForETH(amount,0,path,myAddress,30000000000).encodeABI(); // 300...000 is deadlineTime
        var Tx = {
            from: myAddress,
            to: addressDex1,
            nonce : _nonce,
            gasLimit: 2100000,
            gasPrice: 4500000000,
            data: data
        }
        var signedTx = await web3.eth.accounts.signTransaction(Tx, prvKey);
        console.log("Signed transaction");
        var txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Transaction receipt");
        
    }catch(error){console.error(error);}
}

export async function getAmountsOut(amountIn, tokenIn, tokenOut){
    var amountOut = await Dex1.methods.getAmountsOut(amountIn, [tokenIn, tokenOut]).call();
    console.log(amountOut[1]);
}

export async function SwapTokensForTokens(tokenIn, tokenOut, amountIn){  // APPROVE?
    try{
        const _nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
        var path = [tokenIn,tokenOut];
        var data = Dex1.methods.swapExactTokensForTokens(amountIn,0,path,myAddress,30000000000).encodeABI(); // 300...000 is deadlineTime
        var Tx = {
            from: myAddress,
            to: addressDex1,
            nonce : _nonce,
            gasLimit: 2100000,
            gasPrice: 4500000000,
            data: data
        }
        var signedTx = await web3.eth.accounts.signTransaction(Tx, prvKey);
        console.log("Signed transaction");
        var txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Transaction receipt");
        
    }catch(error){console.error(error);}
}

export async function addLiquidity(tokenA, tokenB, amountA, amountB){
    try{
        const _nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
        var data = Dex1.methods.addLiquidity(tokenA, tokenB,amountA,amountB,0,0,myAddress,30000000000).encodeABI();
        var Tx = {
            from: myAddress,
            to: addressDex1,
            nonce : _nonce,
            gasLimit: 2100000,
            gasPrice: 4500000000,
            value: 0,//ethValue,//5000000000000000,
            data: data
        }
        var signedTx = await web3.eth.accounts.signTransaction(Tx, prvKey);
        console.log("Signed transaction");
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Transaction receipt");
        
    }catch(error){console.error(error);}
}

export async function removeLiquidity(tokenA, tokenB, liquidity){
    try{
        const _nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
        var data = Dex1.methods.removeLiquidity(tokenA,tokenB,liquidity,0,0,myAddress,1818383472).encodeABI();
        var Tx = {
            from: myAddress,
            to: addressDex1,
            nonce : _nonce,
            gasLimit: 2100000,
            gasPrice: 45000000000,
            data: data
        }
        var signedTx = await web3.eth.accounts.signTransaction(Tx, prvKey);
        console.log("Signed transaction");
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Transaction receipt");
        
    }catch(error){console.error(error);}
}

//removeLiquidity("0xba61964dA4B1eB3606737a0031bFe70665CeAE3d", "0xB43EbF084442889a7FaEB2c93a53eA6493d83454", BigInt("12582534619893978"));