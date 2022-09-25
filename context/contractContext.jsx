import React, { useEffect } from "react";
import { createContext, useState } from "react";

import { useRouter } from "next/router";

import { ethers } from "ethers";
import { useAccount, useDisconnect, useNetwork } from "wagmi";

import abi from "../components/MyTeams/abi.json";
import bytecode from "../components/MyTeams/bytecode.json";

export const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
  const [userWallet, setUserWallet] = useState({
    address: null,
    connected: false,
  });
  const [lensMode, setLensMode] = useState(false)
  const [firstRender, setFirstRender] = useState(true);


  const { address, status } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const router = useRouter();

  let metamask;
  let provider;
  let signer;

  /*
    @dev - This firstRenders states are for prevent to this variables be assigned in the server side (the first render), because they need data from the client side (metamask specifically).
    @dev - This prevention are also in the _app file and also in the return of this context provider. This means that all the props sended to the children components will be null in the first render (because of this the component in the _app is not going to render the first time).
  */

  if (!firstRender) {
    metamask = window.ethereum;
    provider = new ethers.providers.Web3Provider(metamask, "any");
    signer = provider.getSigner();
  }

  useEffect(() => {
    if (status === "connected") {
      setUserWallet({ address, connected: true, chainId: chain.id });
    } else if (
      status === "disconnected" ||
      address === undefined ||
      chain.id !== 80001
    ) {
      router.push("/");
      setUserWallet({ address: null, connected: false, chainId: null });
    }
  }, [status, address, chain]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
  }, [firstRender]);

  return (
    !firstRender && (
      <ContractContext.Provider
        value={{
          userWallet,
          setUserWallet,
          provider,
          signer,
          metamask,
          firstRender,
          disconnect,
          lensMode,
          setLensMode
        }}
      >
        {children}
      </ContractContext.Provider>
    )
  );
};
