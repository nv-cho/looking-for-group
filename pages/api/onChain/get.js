import { ethers } from "ethers";
import abi from "../../../components/MyTeams/abi.json";

export const OnChainGetTeamData = async (teamAddress) => {
  const metamask = window.ethereum;
  const provider = new ethers.providers.Web3Provider(metamask, "any");
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(teamAddress, abi, signer);

  const getPartyTx = await contractInstance
    .getPartyDistribution()
    .catch((error) => {
      console.log(error);
    });

  const getNameTx = await contractInstance.getPartyName().catch((error) => {
    console.log(error);
  });

  if (getPartyTx != undefined && getNameTx != undefined) {
    return { members: getPartyTx, name: getNameTx };
  }
};
