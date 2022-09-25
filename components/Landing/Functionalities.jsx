import React from 'react'

const functions = [
	{
		title: 'Matchmaking',
		description: [
			'Look for your ideal party members. Create your team or join an already created one.',
			'Maybe you are a solo-hacker looking for designers and business planners.',
			'Or perhaps you want to develop that incredible idea but you need developers.',
			'Create your profile with your skills, timezone, expertise, preferences and match!',
			,
		],
		image: 'https://www.pngplay.com/wp-content/uploads/11/World-Of-Warcraft-PNG-Photo-Image.png',
	},
	{
		title: 'Party treasure',
		description: [
			'When your party is ready, deploy the Party Treasure Smart Contract, and let the code rule over the trust.',
			'The party members can decide how much every member will receive. ',
			'Also, we will help you to divide non-fungible prizes with various different options.',
			'As the platform is open source, we allow people to come with their own non-fungible division modules. ',
		],
		image: 'treasure.png',
	},

	{
		title: "Level-up, gain experience, reputation, NFT's, POAPs, Merch, and more!",
		description: [
			'Your party is an evolving entity. By building through hackathons & dragons, your team will gain experience every time you participate in a code conquest. ',
			'Each time the team submit a project, it will be shared in the Dashboard, the team gain experience, a POAP will be emited and the most active teams will receive extra rewards!',
		],

		image: 'https://i.pinimg.com/originals/2c/fb/e6/2cfbe6fcfd7f6153929f7c5f449a7585.png',
	},
]

const Functionalities = ({ className }) => {
	return (
		<div
			className={`${className} w-full h-full bg-black text-white flex flex-col items-center`}
		>
			<div className="w-10/12 h-full flex flex-col items-center  ">
				{functions.map((item, index) => (
					<div
						key={index}
						className={`w-full 2xl:w-11/12 justify-between flex border-b last:border-b-0 border-amber-100/15 pb-10 mb-10 2xl:pb-14 2xl:mb-14 ${
							index % 2 == 0 ? 'flex-row-reverse' : ''
						}`}
					>
						<img
							className="object-contain  h-[245px]  2xl:h-[265px] rounded "
							src={item.image}
							alt="functionality image"
						/>
						<div className="flex flex-col">
							<h3 className="text-[1.9rem] text-primary mb-3 2xl:mb-3.5">
								{item.title}
							</h3>
							<span className="px-1 text-primaryLight text-[1.2rem] max-w-[51vw] 2xl:max-w-[45vw]">
								{item.description.map((item, index) => (
									<p key={index} className="mb-1.5 2xl:mb-2">
										{item}
									</p>
								))}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Functionalities
