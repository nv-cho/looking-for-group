const Hero = () => {
  const texts = [
    // "Time to level-up, dear Web3 adventurer.",
    "Looking for group is the decentralized tool to go when you want to get the most out of a hackathon.",
    "We created the space for people with different skills to connect and hack together.",
    // "Party making system leveraging the etherical power of Smart Contracts. ",
  ];

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-5rem)] relative ">
      <div className="">
        <h1 className="text-amber-600 text-[4.8rem] mt-[10vh] 2xl:mt-[14vh] 2xl:mb-[0.5rem]  drop-shadow-[0_0_3px_rgb(0,0,0,1)] ">
          Looking for Group
        </h1>
        <div className="flex flex-col text-[1.175rem] 2xl:text-[1.25rem] gap-1.5 2xl:gap-3 tracking-wide w-[60%] 2xl:w-[55%] pl-2 ">
          {texts.map((text, index) => (
            <p
              className="mb-1 drop-shadow-[0_0_5px_rgb(0,0,0,0.7)]"
              key={index}
            >
              {text}
            </p>
          ))}
          <p className="mb-1 drop-shadow-[0_0_5px_rgb(0,0,0,0.7)]">
            Party making system leveraging the etherical power of
            <span className="text-purple-400"> Smart Contracts.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

{
  /* <div>
          <img className="mb-20" src="./party-unscreen.gif" />
        </div> */
}
