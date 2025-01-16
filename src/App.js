import logo from './logo.svg';
import './App.css';
const {ethers}=require("ethers");
//require('dotenv').config();
const privatekey='498aadcadfa423bb76eb27dae00924554f995deb17f21da80edae4525c151acb';
const infuraurl='https://eth-mainnet.g.alchemy.com/v2/iJT7eyuN1irRVbhKyA1V-7dpTTIT6fQm';
const amt=ethers.parseEther('0.0001');
const provider=new ethers.JsonRpcProvider(infuraurl);
const destadd='0x963cA95751bFa23abB796Bba1Bbc704e85108D15';
const wallet=new ethers.Wallet(privatekey,provider);

const sendtx=async ()=>{
try{
  const tx = await wallet.sendTransaction({
    to: destadd,
    value: amt
  });

  const transaction = await tx.wait();
  console.log("this is the transaction:",transaction.hash);

}
catch(error){
console.log("this is the error:",error);

}
};



function App() {
  return (
    <div className="App">
    <button onClick={sendtx}>Pay here</button>
    </div>
  );
}

export default App;
