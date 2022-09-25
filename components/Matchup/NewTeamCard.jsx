import React from 'react'

export const NewTeamCard = ({ team, userData }) => {
	console.log(team)
	return (
		<div className="w-full 2xl:w-[calc(50%-0.5rem)] rounded-xl bg-neutral-900 flex relative ]">
			<div className="w-[14vw] h-[14vw] 2xl:w-[10vw] 2xl:h-[10vw] p-4 relative">
				<img
					src={team.avatar}
					className="h-full w-full relative rounded-full "
					alt=""
				/>
				{/* <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-transparent via-neutral-900 to-neutral-900"></div> */}
			</div>
			<div className="border-2 ">
				<h3>{team.name}</h3>
				<p>{team.idea}</p>
			</div>
		</div>
	)
}
