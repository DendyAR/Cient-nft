import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext.jsx";
import dummyData from "../utils/dummyData.js";
import { shortenAddress } from "../utils/shortenAddress.js";
import useFetch from "../hooks/useFetch.jsx";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {

  const gifUrl = useFetch({ keyword })


  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] min-w-full flex-col p-3 rounded-md hover:shadow-2xl">
       <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://rinkeby.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://rinkeby.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
            <br/>
            <p className="text-white text-base ">Message: {message}</p>
            </>
          )}

          <img 
          src={gifUrl || url }
          alt="gif"
          className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover py-2"
          />

          <div className="flex justify-center items-center">
          <div className=" bg-black p-3 w-60 px-5 rounded-3xl -mt-5 shadow-2xl ">
             <p className="text-[#37c7da] font-blod ">{timestamp}</p> 
          </div>
          </div>
          


        </div>
      </div>
    </div>
  );
};

const Transaction = () => {
  const { currentAccount , transaction } = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
    <div className="flex flex-col md:p-12 py-12 px-4">
      {currentAccount ? (
        <h3 className="text-white text-3xl text-center my-2">
          Latest Transactions
        </h3>
      ) : (
        <h3 className="text-white text-3xl text-center my-2">
          Connect your account to see the latest transactions
        </h3>
      )}

      <div className="flex flex-wrap justify-center items-center mt-10">
        {transaction.reverse().map((transaction, i) => (
          <TransactionsCard key={i} {...transaction} />
        ))}
      </div>
    </div>
  </div>
  );
};

export default Transaction;
