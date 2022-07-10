import { useEffect, useState } from "react"
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import Image from "next/image"

import ape from "../public/ape.jpg"
import ether from "../public/ether.png"
const index = () => {
  const [currentAccount , setCurrAccount] = useState("");
  const [connected  ,setConnected]= useState(false);
  const [balance , setBalance] = useState('');

    const failMessage = 'Please install MetaMask & connect Youe MetaMask';
    const successMessage= 'Your wallet has been successfully connected';

    const INFURA_ID = "6e17e460a5c247d18a66d7cd5c13c83e";
    const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

    const hasMetaMaskConnected = async()=>{

      //Checks if the client has ethereum
      if(!window.ethereum){
       return console.log("No Account")
      }

      const account = await window.ethereum.request({
        method : "eth_accounts"
      })

      if(account.length){
        setCurrAccount(account[0]);
      }else{
        console.log("Fail");
      }

      const address = '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8';
      const balance = await provider.getBalance(address);
      const showBalance = `${ethers.utils.formatEther(balance)}`
      console.log(showBalance);
      setBalance(showBalance);
    }

    const cWallet = async()=>{
if(!window.ethereum) return console.log(failMessage);

const account =await window.ethereum.request({method : "eth_requestAccounts"});
setCurrAccount[account[0]];
window.location.reload;
    }
    
    useEffect(()=>{
      hasMetaMaskConnected();

      async function accountChanged(){
        window.ethereum.on('accountsChanged' , async function(){
          const accounts = await window.ethereum.request({
            method : "eth_accounts"
          });

          if(accounts.length){
setCurrAccount(accounts[0]);
          }else{
            window.location.reload();
          }
        })
      }

 
      accountChanged();
    } ,[])
  return (
    <div className="card-containter">
      {!currentAccount ? "" : <span className="pro">PRO</span>}
      <Image src={ape}  alt="profile" width={80} height={80} />
      <h3>Check Ether</h3>

      {!currentAccount ? (
        <>
        <div className="message">
          <p>{failMessage}</p>
        </div>
        <Image src={ether} width={100} height={100} alt='ether' />
        <p>Welcome to the Ether account Balance Checker</p>
        </>
      ) : (
        <>
        <h6>
          Verified <span className="tick">&#1004;</span>
        </h6>
        <p>Ehter account and balance checker 
          <br />
        </p>
        <div className="buttons">
          <button className="primary ghost" onClick={()=>{

          }}>Enter Account Details</button>
        </div>
        </>
      )}

      {!currentAccount && !connected  ? (
<div classsName="buttons">
<button className="primary" onClick={()=>cWallet()}>Connect Wallet</button>
</div>
      ) : (
<div className="skills">
<h6>
  Your Ether : 
</h6>
<ul>
  <li>Account</li>
  <li>{currentAccount}</li>
  <li>Balance</li>
  <li>{balance}</li>
</ul>
</div>
)}
    </div>
  )
}

export default index