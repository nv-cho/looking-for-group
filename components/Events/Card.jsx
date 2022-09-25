import Image from "next/image";

const Card = ({ team, modalHandler }) => {
  return (
    <div className="flex flex-col px-3 pt-3 shadow-lg items-center justify-center h-fit border">
      <h1 className="text-center text-xl">{team.name}</h1>
      <Image
        width="120rem"
        height="120rem"
        src="/orb.png"
        alt="Magic orb representing a team"
      />
      <div>
        <h2 className="text-xl text-center mb-1">This team needs: </h2>
        <ul className="flex flex-col gap-2 text-lg">
          {team.roles.frontend === false && (
            <li className="flex gap-1 justify-start items-center">
              <Image
                width="25rem"
                height="25rem"
                src="/archer.png"
                alt="Magic orb representing a team"
              />
              Frontend developer
            </li>
          )}

          {team.roles.backend === false && (
            <li className="flex gap-1 justify-start items-center">
              <Image
                width="25rem"
                height="25rem"
                src="/warrior.png"
                alt="Magic orb representing a team"
              />
              Backend developer
            </li>
          )}

          {team.roles.designer === false && (
            <li className="flex gap-1 justify-start items-center">
              <Image
                width="25rem"
                height="25rem"
                src="/mage.png"
                alt="Magic orb representing a team"
              />
              UI/UX designer
            </li>
          )}
        </ul>
      </div>
      <button
        onClick={modalHandler}
        className="border border-purple-900 bg-purple-600/30 m-3 w-full rounded-sm hover:-translate-y-1 duration-150"
      >
        VIEW
      </button>
    </div>
  );
};

export default Card;
