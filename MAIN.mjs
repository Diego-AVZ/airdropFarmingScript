import Web3 from 'web3';
import * as tokens from './tokens.mjs';
import * as dex from './dex1.mjs';

const url = 'https://rpc.ankr.com/scroll_sepolia_testnet';
const myAddress = "0x85dEee2d87C40DcD459A07EBa7371bf535435b52";
const prvKey = "5f0a23a7629a71d49261db38dd2c30c00468995723b215e5dce6111a9ad65d6b";
const web3 = new Web3(url);


const addressHipo = "0xba61964dA4B1eB3606737a0031bFe70665CeAE3d";
const addressWeth = "0x575Ad5f3b05D76Bf8B19E9813A4D88aB1E8cF903"; 
const addressUsdc = "0xB43EbF084442889a7FaEB2c93a53eA6493d83454";
const addressUsdt = "0xB43EbF084442889a7FaEB2c93a53eA6493d83454";
const addressLP = "0x16A396740aB388e256d6e3facD462F080DBA9470";

console.log("Swapping " + 50000000000000000 + " ETH for USDC");
await dex.SwapETHForToken(addressUsdc, 50000000000000000);
var usdcBalance = await tokens.getTokenBalance(addressUsdc);
console.log("Approving . . . " + usdcBalance + " USDCs");
await tokens.approveTokens(addressUsdc, usdcBalance, dex.addressDex1);
console.log("Swap 50% USDC for HIPO token...");
await dex.SwapTokensForTokens(addressUsdc,addressHipo,usdcBalance);
var hipoBalance = await tokens.getTokenBalance(addressHipo);
usdcBalance = usdcBalance = await tokens.getTokenBalance(addressUsdc);
console.log("Update Balances:  # USDC => " + usdcBalance + " # HIPO => " + hipoBalance + " . . .  Let's approve then . . .");
await tokens.approveTokens(addressHipo, hipoBalance, dex.addressDex1);
await tokens.approveTokens(addressUsdc, usdcBalance, dex.addressDex1);
console.log("Both tokens Approved OK");
console.log("Adding Liquidity . . .");
await dex.addLiquidity(addressHipo, addressUsdc, hipoBalance, usdcBalance);
console.log("Liquidity Deposited In DEX => OK");
console.log("Delay init. wait 15Segs - - -");
await delay(15000);
console.log("Delay Finished - - - Let's Remove Liquidity");
var LPbalance = await tokens.getTokenBalance(addressLP);
await tokens.approveTokens(addressLP,LPbalance,dex.addressDex1);
var toRemove = Math.floor((Number(LPbalance)*9999)/10000);
await dex.removeLiquidity(addressHipo,addressUsdc,Number.parseInt(toRemove));
console.log("Liquidity is in your wallet OK Liquidity Remove OK");
console.log("Approving tokens . . . to exchange for ETH");

var hipoBalance = await tokens.getTokenBalance(addressHipo);
await tokens.approveTokens(addressHipo,hipoBalance,dex.addressDex1);
await dex.SwapTokensForTokens(addressHipo,addressUsdc,hipoBalance);
var usdcBalance = await tokens.getTokenBalance(addressUsdc);
await tokens.approveTokens(addressUsdc,usdcBalance,dex.addressDex1);

await dex.SwapTokensForETH(addressUsdc,usdcBalance);

console.log("Both token Swaps OK . . .");
console.log("Initial ETH amount . . . " + 50000000000000000);



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
