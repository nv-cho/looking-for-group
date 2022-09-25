// 		<div className="flex flex-row gap-7 w-full h-full items-center">
// 			{/* AVATAR-NAME-SLOGAN BLOCK */}

// 			<div className="flex flex-col text-center items-center border-2 h-full">
// 				{team.avatar?.length > 10 ? (
// 					<span className="">
// 						<img
// 							src={team.avatar}
// 							alt=""
// 							className="rounded-full h-[12rem] w-[12rem]"
// 						/>
// 					</span>
// 				) : (
// 					<div className="flex items-center justify-center rounded-full h-[12rem] w-[12rem] border-[1px] border-white/50 bg-white/15 text-2xl">
// 						🦄
// 					</div>
// 				)}

// 				<div className="flex flex-col gap-2 mt-6">
// 					<h2 className="text-center text-2xl text-primary">
// 						{team.name}
// 					</h2>
// 					<p className="italic">{team.slogan}</p>
// 				</div>
// 			</div>

// 			{/* MEMBERS-BLOCK */}
// 			<div className="grid grid-rows-2 grid-cols-2">
// 				<div className="flex flex-col border-red-500">
// 					<div className="flex items-center justify-between">
// 						<h3 className="mb-1 text-xl text-amber-300">Members</h3>
// 						<Tooltip
// 							contentColor="invert"
// 							color="invert"
// 							onClick={() => {
// 								navigator.clipboard.writeText(team.code)
// 							}}
// 							content={
// 								<p className="!font-Lusitana text-base tracking-wide text-primaryLight 2xl:text-lg ">
// 									Click here to copy the code to invite a new
// 									member!
// 								</p>
// 							}
// 							placement="top"
// 						>
// 							<img
// 								src="invite.png"
// 								className="relative left-[3px] h-7 w-7 invert"
// 								alt="Invite icon"
// 							/>
// 						</Tooltip>
// 					</div>

// 					{team.members.map((member, index) => (
// 						<div
// 							key={index}
// 							className="flex flex-row items-center justify-between gap-10 text-lg"
// 						>
// 							<div className="w-1/3">
// 								<Link href={`#`} className="">
// 									<p className="cursor-pointer">
// 										{member.name
// 											? member.name
// 											: truncAddress(member.address)}
// 									</p>
// 								</Link>
// 							</div>
// 							<p className="w-1/2">
// 								{member.roles?.length > 0 && member.roles[0]}
// 							</p>

// 							<Tooltip
// 								color="invert"
// 								onClick={() => {
// 									copyDiscord(member)
// 								}}
// 								content={
// 									<p className="!font-Lusitana text-base tracking-wide text-primaryLight 2xl:text-lg ">
// 										Click here to copy the code to invite a
// 										new member!
// 									</p>
// 								}
// 								placement="top"
// 							>
// 								<img
// 									src={`/discord.svg`}
// 									className="h-12 w-12 invert"
// 									alt="discord icon"
// 								/>
// 							</Tooltip>
// 						</div>
// 					))}
// 				</div>

// 				<div className="h-full w-full">
// 					<h3 className="mb-1 text-xl text-amber-300">Idea</h3>
// 					<p>
// 						{team?.idea
// 							? team.idea
// 							: 'The team has not selected an idea yet'}
// 					</p>
// 				</div>
// 			</div>

// 			{/* PARTY TREASURE-BUTTONS BLOCK */}
// 			<div className="flex flex-col w-6/12 p-2 h-[90%] gap-3 border border-white/40 rounded-sm self-center">
// 				<div className="flex flex-col h-full justify-between ">
// 					<div>
// 						<h3 className="mb-1 text-lg text-amber-300">
// 							Party Treasure
// 						</h3>

// 						{team.isContractDeployed ? (
// 							<p>
// 								The party treasure is already deployed and
// 								working.
// 							</p>
// 						) : (
// 							<p>No party treasure has not yet been deployed.</p>
// 						)}
// 					</div>

// 					<button
// 						className="btn--golden self-center w-[75%] mb-2"
// 						onClick={() => {
// 							setTreasuryMode(true)
// 						}}
// 					>
// 						{team.isContractDeployed
// 							? 'View party treasure'
// 							: 'Create party treasure'}
// 					</button>
// 				</div>

// 				<div className="flex flex-row justify-center gap-2">
// 					<button
// 						className="btn--golden flex items-center justify-center gap-2 !px-6"
// 						onClick={() =>
// 							setEditMode({
// 								display: true,
// 								team: team,
// 							})
// 						}
// 					>
// 						<p>Edit team</p>
// 						<Image
// 							width={15}
// 							height={15}
// 							src="/edit.png"
// 							alt="edit button icon"
// 						/>
// 					</button>

// 					<a
// 						src={team.discordURL}
// 						target="_blank"
// 						rel="noreferrer"
// 						className="btn--golden flex items-center justify-center gap-2 !px-6"
// 					>
// 						<p>View channel</p>
// 						<Image
// 							width={15}
// 							height={15}
// 							src="/discord.svg"
// 							alt="Discord channel button icon"
// 						/>
// 					</a>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
