import './App.css';
import { useState } from 'react';
import { BrowserProvider, Wallet, parseEther,parseUnits ,JsonRpcProvider,Contract } from "ethers";

// Use an environment variable to store private keys instead of hardcoding them (for security).
const privatekey = '47658aadcadfa423bb76eb27dae00924554f995deb17f21da80edae4525c151acb76';
const infuraurl = 'https://eth-mainnet.g.alchemy.com/v2/iJT7eyuN1irRVbhKyA1V-7dpTTIT6fQm';
const destadd = '0x963cA95751bFa23abB796Bba1Bbc704e85108D15';

// Create a provider for interacting with Ethereum
const provider = new JsonRpcProvider(infuraurl);
const newprovider= new JsonRpcProvider('https://evm-rpc.sei-apis.com');


// Create a wallet using the private key and provider
const wallet = new Wallet(privatekey, newprovider);

function App() {
  const [addresss, setAddress] = useState("");
  const [signer, setSigner] = useState(null);
  const [tranamt, setTrans] = useState("");
  const [tokenadd,setTokad]= useState("");


  const sendtx = async () => {
    try {
      const amt = parseEther(tranamt); // Convert amount to Wei

      const tx = await wallet.sendTransaction({
        to: destadd,
        value: amt
      });

      const receipt = await tx.wait();
      console.log("Transaction successful:", receipt.transactionHash);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const login = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Ethereum account found:", accounts[0]);
        setAddress(accounts[0]);

        const provider = new BrowserProvider(window.ethereum);
        const pkey=""
        const sig = await provider.getSigner(); // Get signer
        setSigner(sig);
        console.log("Connected signer:", sig);
      } else {
        console.error("Ethereum provider not found.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }

  

  };
  const swaptoken=async ()=>{
    const routeadd='0xa4cF2F53D1195aDDdE9e4D3aCa54f556895712f2';
    const routabi=[
      "function swapExactSEIForTokens(uint amountOutMin,address[] calldata path,address to,uint deadline) external payable returns(uint[] memory amounts)"];
    const routcont= new Contract(routeadd,routabi,signer);
    const path =['0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7',tokenadd];
    const deadline= Math.floor(Date.now()/1000)+60*3;
    const amountin= parseUnits(tranamt,18);
    const swap =await routcont.swapExactSEIForTokens(0,path,addresss,deadline,{value:amountin});
    console.log("this is the tranaction hash",swap.hash);
    await swap.wait();
    console.log("confirmed");
    
};   

  return (
    <div className="App">
      <input 
        type="number" 
        placeholder="Enter amount (ETH)" 
        value={tranamt} 
        onChange={(e) => setTrans(e.target.value)} 
      />
      <input
      type='text'
      placeholder='enter token address'
      value={tokenadd}
      onChange={(e)=> setTokad(e.target.value)}
      />
      <button onClick={swaptoken}>Swap here</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
