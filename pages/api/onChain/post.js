import { ContractFactory } from "ethers";

import abi from "../../../components/MyTeams/abi.json";
import bytecode from "../../../components/MyTeams/bytecode.json";

/*
    @dev - This function is used to deploy the smart contract that represents and contains the team information.
    @dev - We have to validate that the sum of the percentages of the members is 100%
    @dev - We have to validate that the members have consensus with each other
    @dev - We have to validate that the team has at least 1 member and not more than 6
    
    @param - teamName: string
    @param - members: array of the members of the team
    @param - signer: signer of the transaction
    
    @return - address of the deployed smart contract
  */

export const onChainDeployParty = async (
  signer,
  partyName,
  partyMembers,
  setTxState
) => {
  try {
    setTxState({
      waitingConfirmation: true,
      waitingTx: false,
      error: false,
      txHash: null,
    });
    const factory = new ContractFactory(abi, bytecode.object, signer);
    const contract = await factory.deploy(partyName, partyMembers);
    setTxState({
      waitingConfirmation: false,
      waitingTx: true,
      error: false,
      txHash: null,
    });

    const txReceipt = await contract.deployTransaction.wait();
    setTxState({
      waitingConfirmation: false,
      waitingTx: false,
      error: false,
      txHash: null,
    });
    return txReceipt;
  } catch (error) {
    console.log(error);
    setTxState({
      waitingConfirmation: false,
      waitingTx: false,
      error: true,
      txHash: null,
    });
    return 0;
  }
};

/*
    @dev - This function is used to edit the team name
    @dev - We have to validate that the input is not empty
    @dev - We have to validate that the input is not the same as the current name
    @dev - We have to validate that there is a team concensus to change the name

    @param - teamName: string
  */

export const onChainEditPartyName = async () => {
  if (
    nameInput.current.value != "" &&
    nameInput.current.value != name &&
    membersConsensus
  ) {
    const editNameTx = await contractInstance
      .setPartyName(nameInput.current.value)
      .catch((error) => {
        alert("There was an error changing the team name");
        console.log(error);
      });

    if (editNameTx != undefined) {
      const editNameTxReceipt = await editNameTx.wait();

      if (editNameTxReceipt.status === 1) {
        alert("Team name changed successfully");
        setIsEditing(false);
      } else {
        alert("Something went wrong");
      }
    }
  } else {
    alert(
      "Everyone has to be ready to change the team name and the input cannot be empty and the name cannot be the same"
    );
  }
};

/* 
    @dev - This function is used to leave the party, automatically sends the msg.sender as a parameter.
*/

export const onChainLeaveParty = async () => {
  const verify = window.confirm("Are you sure you want to leave the team?");

  if (verify) {
    const leavePartyTx = await contractInstance.leaveParty().catch((error) => {
      alert("There was an error leaving the team");
      console.log(error);
    });

    if (leavePartyTx != undefined) {
      const leavePartyTxReceipt = await leavePartyTx.wait();

      if (leavePartyTxReceipt.status === 1) {
        alert("Leave the party was successful");
        setIsEditing(false);
      } else {
        alert("Something went wrong");
      }
    }
  }
};
