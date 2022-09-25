const FirstBlock = () => {
  return (
    <div className="flex absolute z-10 backdrop-blur-sm h-screen w-screen items-center justify-center">
      <div className="flex flex-row gap-2 mx-20 items-center">
        <div className="flex flex-col gap-5 text-3xl text-center tracking-wide">
          <p>
            Hackathon & Dragons is a platform that seeks to be a meeting point
            for the community, made by the community.
          </p>
          <p>
            We want to create a space for people with different skills to
            connect and form groups to participate in Hackathons.
          </p>
        </div>

        <div>
          <img className="mb-20" src="./party-unscreen.gif" />
        </div>
      </div>
    </div>
  );
};

export default FirstBlock;
