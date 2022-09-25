import { useState } from "react";
import PreDeployTreasury from "./PreDeployTreasury";
import PostDeployTreasury from "./PostDeployTreasury";

const TreasuryMode = ({ team, setTreasuryMode }) => {
  const [isPartyDeployed, setIsPartyDeployed] = useState(false);

  return (
    <div className="h-full w-full flex flex-col justify-between gap-3">
      <div className="h-full flex flex-col justify-between  ">
        {isPartyDeployed || team.isContractDeployed ? (
          <PostDeployTreasury team={team} />
        ) : (
          <PreDeployTreasury
            team={team}
            setIsPartyDeployed={setIsPartyDeployed}
          />
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setTreasuryMode(false);
          }}
          className="btn btn--brown flex items-center gap-1 !py-1 !px-5 "
        >
          <img
            src="back.png"
            className="w-7 h-7 relative right-[3px]"
            alt="return icon"
          />
          <p>Back</p>
        </button>
      </div>
    </div>
  );
};

export default TreasuryMode;
