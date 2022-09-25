import { useContext, useRef } from "react";

import { ToastContainer } from "react-toastify";
import { toastSetter } from "../../../pages/_app";

import { ContractContext } from "../../../context/contractContext";
import { OffChainContext } from "../../../context/offchainContext";
import { OffChainJoinTeam } from "../../../pages/api/offChain/post";

const JoinTeamModal = ({ isOpen, closeModal }) => {
  const { userWallet } = useContext(ContractContext);
  const { getAppData: refetch } = useContext(OffChainContext);
  const teamCode = useRef();

  const onJoinTeam = () => {
    const alphanumericRegex = /^[0-9a-zA-Z]+$/;

    if (
      teamCode.current.value.length == 6 &&
      alphanumericRegex.test(teamCode.current.value)
    ) {
      OffChainJoinTeam(userWallet.address, teamCode.current.value)
        .then((response) => {
          toastSetter(
            "Party " + response.name + " joined sucessfully!",
            "success"
          );
          refetch();
        })
        .catch((error) => {
          console.log(error);
          toastSetter("The party join has failed.", "error");
        })
        .finally(() => {
          closeModal();
        });
    } else {
      toastSetter("The party code is invalid.", "error");
    }
  };

  return (
    <>
      <ToastContainer limit={2} />
      {isOpen && (
        <div className="fixed z-30 flex h-full w-full items-center justify-center backdrop-brightness-[30%]">
          <div className="appContainer--myteams p-5 !h-fit w-1/3 rounded-xl border-[1px] border-white/30 text-primaryLight shadow-lg backdrop-blur-lg">
            <div className="flex flex-col gap-8">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col gap-4 w-full items-center justify-center">
                  <h1 className="text-3xl">🧙 Join a team</h1>
                  <p className="">(you will need the team code)</p>
                </div>
                <span
                  className="cursor-pointer text-xl text-white"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  X
                </span>
              </div>
              <div className="flex flex-col gap-3 w-fit mx-auto justify-center">
                <input
                  className="rounded-sm py-1.5 px-2 text-xs text-black"
                  type="text"
                  placeholder="9Zu1GiX"
                  maxLength="6"
                  ref={teamCode}
                />
                <button onClick={onJoinTeam} className="btn--yellow w-full">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinTeamModal;
