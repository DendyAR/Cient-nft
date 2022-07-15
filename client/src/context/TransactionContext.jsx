import React, { useEffect , useState  } from "react";
import {ethers} from 'ethers'

import { contractABI, contractAddress } from "../utils/constans";

export const TransactionContext = React.createContext();

const {ethereum} = window

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
    return transactionsContract;
  };

export const TransactionsProvider= ({ children }) =>  {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setformData] = useState({ addressTo: '', amount: '', keyword: '', message: '', })
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [transaction, setTransaction] = useState([]);

    const handleChange = (e, name) => {
      setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");

        const transactionsContract = createEthereumContract();

        const availabelTransactions = await transactionsContract.getAllTransactions();

        const struccturedTransactions = availabelTransactions.map((transaction) => ({
          addressTo:  transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18 )
        })) 
        console.log(struccturedTransactions);
        setTransaction(struccturedTransactions)
      } catch (error) {
        console.log(error);
      }
    }

    const checkIfWalletIsConnected = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length) {
          setCurrentAccount(accounts[0]);
          getAllTransactions();
        } else {
          console.log("No accounts found");
        }
      } catch (error) {
        console.log(error);
      }
        
    }

    const checkIfTransactionExist = async () => {
      try {
        const transactionsContract = createEthereumContract();
        const transactionCount = await transactionsContract.getTransactionCount();
      
        window.localStorage.setItem("transactionnCount", transactionCount)

      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    }

    const connectWallet = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
  
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
  
        setCurrentAccount(accounts[0]);
        window.location.reload();
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };


    const sendTransaction = async () => {
        try {
            if (ethereum) {
              const { addressTo, amount, keyword, message } = formData;
              const transactionsContract = createEthereumContract();
              const parsedAmount = ethers.utils.parseEther(amount)

              await ethereum.request({
               method: "eth_sendTransaction",
                 params: [{
                   from: currentAccount,
                     to: addressTo,
                       gas: "0x5208",
                         value: parsedAmount._hex,
          }],
        });
      
              const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      
              setIsLoading(true);
              console.log(`Loading - ${transactionHash.hash}`);
              await transactionHash.wait();
              console.log(`Success - ${transactionHash.hash}`);
              setIsLoading(false);
      
              const transactionsCount = await transactionsContract.getTransactionCount();
      
              setTransactionCount(transactionsCount.toNumber());
              window.location.reload();
            } else {
              console.log("No ethereum object");
            }
          } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
          }
          
    }

    useEffect(() => {
        checkIfWalletIsConnected()
        checkIfTransactionExist()
    }, []);

    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setformData, handleChange, sendTransaction , transaction , isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}