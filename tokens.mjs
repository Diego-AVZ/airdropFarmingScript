import Web3 from 'web3';
import { Erc20abi } from './abis.mjs';

const url = 'https://rpc.ankr.com/scroll_sepolia_testnet';
const myAddress = "0x85dEee2d87C40DcD459A07EBa7371bf535435b52";
const prvKey = "5f0a23a7629a71d49261db38dd2c30c00468995723b215e5dce6111a9ad65d6b";
const web3 = new Web3(url);

export async function approveTokens(token,amount,spender){
    try{
        const _nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
        const tokenInfo = new web3.eth.Contract(Erc20abi,token);
        var data = tokenInfo.methods.approve(spender,amount).encodeABI();
        var Tx = {
            from: myAddress,
            to: token,
            nonce: _nonce,
            gasLimit: 2100000,
            gasPrice: 4500000000,
            data: data
        }
        var signedTx = await web3.eth.accounts.signTransaction(Tx, prvKey);
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Approved => " + amount + " " + token)
    }catch(error){console.error(error);}
}

export async function getTokenBalance(token){
    try{
        const tokenInfo = new web3.eth.Contract(Erc20abi,token);
        var balanceToken = await tokenInfo.methods.balanceOf(myAddress).call();
        let tokenBalanceStr = balanceToken.toString();
        let formattedTokenBalanceStr = tokenBalanceStr.slice(0, -2) + '00';
        let formattedTokenBalance = BigInt(formattedTokenBalanceStr);
        console.log(Number(formattedTokenBalance));
        return Number(formattedTokenBalance);
    }catch(error){console.error(error);}
}

const addressHipo = "0xba61964dA4B1eB3606737a0031bFe70665CeAE3d";
const addressWeth = "0x575Ad5f3b05D76Bf8B19E9813A4D88aB1E8cF903"; 
const addressUsdc = "0xB43EbF084442889a7FaEB2c93a53eA6493d83454";

export async function getTokenBalanceFormated(token){
    try{
        const tokenInfo = new web3.eth.Contract(Erc20abi,token);
        var balanceToken = await tokenInfo.methods.balanceOf(myAddress).call();
        var decimals = await tokenInfo.methods.decimals().call();
        //console.log("decimals " + decimals);
        var balanceTokenFormatted = Number(balanceToken) / (10**Number(decimals));
        //console.log("Token Balance => " + balanceTokenFormatted);
        return balanceTokenFormatted, balanceToken;
    }catch(error){console.error(error);}
}

export async function SendTokens(token, amountPer, toAddress){
    try{
        const _nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
        const tokenInfo = new web3.eth.Contract(Erc20abi,token);
        var amount = await getTokenBalance(token) * (amountPer/100);
        console.log("Sending... => " + amount);
        var data = tokenInfo.methods.transfer(toAddress, amount).encodeABI();
        var Tx = {
            from: myAddress,
            to: token,
            nonce : _nonce,
            gasLimit: 2100000,
            gasPrice: 450000000,
            data: data
        }
        var signedTx = await web3.eth.accounts.signTransaction(Tx, prvKey);
        console.log("Signed transaction", signedTx);
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    }catch(error){console.error(error);}
}

export const tokenAddresses = [
    "0xba61964dA4B1eB3606737a0031bFe70665CeAE3d", //hipo
    "0x575Ad5f3b05D76Bf8B19E9813A4D88aB1E8cF903", //wETH
    "0xB43EbF084442889a7FaEB2c93a53eA6493d83454"  //USDC
]