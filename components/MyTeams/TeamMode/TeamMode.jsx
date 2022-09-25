import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Tooltip } from '@nextui-org/react'

import { truncAddress } from '../../../utils/truncAddress'

const TeamMode = ({ team, setTreasuryMode, setEditMode }) => {
	useEffect(() => {
		console.log(team)
	}, [team])

	const copyDiscord = (member) => {
		if (member.socialLinks.length > 0 && member.socialLinks[0].link != '') {
			navigator.clipboard.writeText(member.socialLinks[0].link)
		}
	}

	return (
		<div className="justify-between2xl:p-2 flex h-full w-full flex-col 2xl:text-lg">
			{/* HIGHER BLOCK */}
			<div className="flex h-full w-full flex-row gap-10 2xl:gap-20">
				{/* PHOTO BLOCK (LEFT) */}
				<div className="flex w-2/12 flex-col items-center justify-center gap-6 ">
					{team.avatar?.length > 10 ? (
						<span className="">
							<img
								src={team.avatar}
								alt=""
								className="h-[12rem] w-[12rem] rounded-full"
							/>
						</span>
					) : (
						<div className="flex h-[12rem] w-[12rem] items-center justify-center rounded-full border-[1px] border-white/50 bg-white/15 text-2xl">
							🦄
						</div>
					)}
					<div className="flex flex-col items-center justify-center gap-2">
						<h2 className="mb-1 text-center text-2xl leading-6 text-primary">
							{team.name}
						</h2>
						<p className="italic">{team.slogan}</p>
					</div>
				</div>

				{/* DESCRIPTION BLOCK (RIGHT) */}
				<div className="flex w-10/12 flex-col justify-between">
					{/* TEAM DISTRIBUTION BLOCK (TOP)*/}
					<div className="mb-6 flex justify-between gap-16">
						{/* MEMBERS BLOCK (LEFT)*/}
						<div className="flex w-6/12 flex-col">
							<div className="flex items-center justify-between ">
								<h3 className="mb-1 text-xl text-amber-300">
									Members
								</h3>
								<Tooltip
									contentColor=""
									color="invert"
									onClick={() => {
										navigator.clipboard.writeText(team.code)
									}}
									content={
										<p className="!font-Lusitana text-base tracking-wide text-primaryLight 2xl:text-lg ">
											Click here to copy the code to
											invite a new member!
										</p>
									}
									placement="top"
								>
									<Image
										src="/invite.png"
										height={25}
										width={25}
										alt="Invite icon"
										className="invert"
									/>
								</Tooltip>
							</div>
							{team.members.map((member, index) => (
								<div
									key={index}
									className="flex flex-row items-center justify-between gap-10 text-lg"
								>
									<div className="w-1/3">
										<Link href={`#`} className="">
											<p className="cursor-pointer">
												{member.name
													? member.name
													: truncAddress(
															member.address
													  )}
											</p>
										</Link>
									</div>
									<p className="w-1/2">{member.role}</p>
									<Tooltip
										color="invert"
										onClick={() => {
											copyDiscord(member)
										}}
										content={
											<p className="!font-Lusitana text-base tracking-wide text-primaryLight 2xl:text-lg ">
												Click here to copy the code to
												invite a new member!
											</p>
										}
										placement="top"
									>
										<Image
											src="/discord.svg"
											height={10}
											width={10}
											alt="Discord copy code user icon"
										/>
									</Tooltip>
								</div>
							))}
							{/* IDEA BLOCK (BOTTOM)*/}
							<div className="h-full w-full mt-4">
								<h3 className="mb-1 text-xl text-amber-300">
									Idea
								</h3>
								<p>
									{team?.idea
										? team.idea
										: 'The team has not selected an idea yet'}
								</p>
							</div>
						</div>
						{/* TREASURE BLOCK (RIGHT)*/}
						<div className="flex h-full w-6/12 flex-col justify-between gap-3">
							<div className="flex h-full flex-col rounded-sm">
								<h3 className="mb-1 text-lg text-amber-300">
									Party Treasure
								</h3>
								{team.isContractDeployed ? (
									<p>
										The party treasure is already deployed
										and working.
									</p>
								) : (
									<p>
										No party treasure has not yet been
										deployed.
									</p>
								)}
								<button
									className="btn--golden mt-8 w-[62%]"
									onClick={() => {
										setTreasuryMode(true)
									}}
								>
									{team.isContractDeployed
										? 'View party treasure'
										: 'Create party treasure'}
								</button>
							</div>
						</div>
					</div>
					<div className="flex flex-row justify-end gap-2">
						<button
							className="btn--golden flex items-center justify-center gap-2 !px-6"
							onClick={() =>
								setEditMode({
									display: true,
									team: team,
								})
							}
						>
							<p>Edit team</p>
							<Image
								width={15}
								height={15}
								src="/edit.png"
								alt="edit button icon"
							/>
						</button>
						<a
							src={team.discordURL}
							target="_blank"
							rel="noreferrer"
							className="btn--golden flex items-center justify-center gap-2 !px-6"
						>
							<p>View channel</p>
							<Image
								width={15}
								height={15}
								src="/discord.svg"
								alt="Discord channel button icon"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TeamMode
