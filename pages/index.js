import Head from "next/head";
import Hero from "../components/Landing/Hero";

import AppContainer from "../Containers/AppContainer";
import Functionalities from "../components/Landing/Functionalities";

import { useEffect, useContext } from "react";
import { ContractContext } from "../context/contractContext";

const networks = [
  {
    name: "twitter",
    icon: "twitter.svg",
    link: "https://twitter.com/gonzaotc",
  },
  {
    name: "discord",
    icon: "discord.svg",
    link: "https://github.com/nv-cho/hackathons-and-dragons",
  },
  {
    name: "github",
    icon: "github.svg",
    link: "https://github.com/nv-cho/hackathons-and-dragons",
  },
];

export default function Home() {
  const { metamask } = useContext(ContractContext);

  useEffect(() => {
    metamask.on("chainChanged", () => {
      // @dev - To prevent issues and critical bugs, the best practice is to reload the page when the user changes the network
      window.location.reload();
    });

    return () => {
      metamask.removeAllListeners();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Looking for Group</title>
        <meta name="description" />
        <link rel="icon" href="logo.png" />
      </Head>

      <AppContainer className="appContainer--landing  border-blue-500">
        <div className="absolute h-[30vh] bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black flex items-center justify-center gap-8 ">
          {networks.map((item, index) => (
            <a href={item.link} key={index} target="_blank" rel="noreferrer">
              <img
                className="w-10 h-10 invert hover:scale-125 transition-all duration-200"
                src={item.icon}
                alt="network icon"
              />
            </a>
          ))}
        </div>
        <Hero />
      </AppContainer>
      <Functionalities />
    </>
  );
}
