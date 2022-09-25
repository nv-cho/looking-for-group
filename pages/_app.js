import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ContractContextProvider } from "../context/contractContext";
import { OffChainContextProvider } from "../context/offchainContext";
import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Flip, toast } from "react-toastify";


export const toastSetter = (message, type) => {
  toast[type](message, {
    theme: "dark",
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    transition: Flip, // Slide is also OK.
    limit: 2,
    toastClassName: "dark-toast",
  });
};

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.mainnet, chain.optimism, chain.polygon],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
  }, [firstRender]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={darkTheme()} chains={chains}>
        <ContractContextProvider>
          <OffChainContextProvider>
            <NextUIProvider disableBaseline>
              {!firstRender && <Component {...pageProps} />}
            </NextUIProvider>
          </OffChainContextProvider>
        </ContractContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
