import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => {
        return (
          <button onClick={openConnectModal} className="buttonStandar">
            <p>Connect Wallet</p>
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;
