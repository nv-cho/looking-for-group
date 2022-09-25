import Image from 'next/image'
import Select from 'react-select'
import { useContext, useState, useEffect } from 'react'

import { OffChainContext } from '../../context/offchainContext'

// mocked data
const lensProfile = {
	handle: 'lookingForGroup.lens',
	bio: '🐲 Decentralized platform for finding and creating teams of builders 🌱',
	coverPicture: {
		original: {
			url: '',
		},
	},
	picture: {
		original: {
			url: '',
		},
	},
	stats: {
		totalPosts: 5,
		totalFollowers: 10,
		totalFollowing: 20,
	},
}

const customStyles = {
	option: (provided, state) => ({
		...provided,
		color: 'black',
		padding: '6px',
	}),
	control: (provided, state) => ({
		...provided,
		padding: 0,
		marginTop: '0.25rem',
		borderRadius: '2px',
		fontSize: '0.875rem',
		maxHeight: '5rem',
		maxWidth: '22rem',
		overflowY: 'scroll',
		border: '1px solid white/80%',
		backgroundColor: 'rgba(10,60,0,0.8)',
		borderRadius: '0.375rem',

		'::-webkit-scrollbar': {
			display: 'none',
		},
	}),
	placeholder: (provided, state) => ({
		...provided,
		padding: 0,
		margin: 0,
	}),
	menuList: (provided, state) => ({
		...provided,
		maxHeight: '200px',
		maxWidth: '22rem',
		overflowY: 'scroll',
	}),
}

const LensProfile = () => {
	const {
		userData,
		userTeams,
		tagOptions,
		roleOptions,
		timezones = [
			'GMT-3',
			'GMT-2',
			'GMT-1',
			'GMT',
			'GMT+1',
			'GMT+2',
			'GMT+3',
		],
		getAppData,
		loadingAppData,
	} = useContext(OffChainContext)

	const [editMode, setEditMode] = useState(false)

	const [selectedTags, setSelectedTags] = useState([])
	const [selectedRoles, setSelectedRoles] = useState([])

	const [defaultValuesTag, setDefaultValuesTag] = useState({})
	const [defaultValuesRole, setDefaultValuesRole] = useState({})

	useEffect(() => {
		if (Object.keys(userData).length > 0) {
			let defaultRoles
			let defaultTags

			if (userData.tags.length > 0) {
				defaultTags = userData.tags.map((tag) => {
					return { value: tag, label: tag }
				})
				setDefaultValuesTag({ defaultValue: defaultTags })
			}

			if (userData.roles.length > 0) {
				defaultRoles = userData.roles.map((role) => {
					return { value: role, label: role }
				})
				setDefaultValuesRole({ defaultValue: defaultRoles })
			}
		}
	}, [userData])

	const formHandler = async (e) => {
		e.preventDefault()

		const roles = selectedRoles.map((role) => role.value)
		const tags = selectedTags.map((tag) => tag.value)

		const payload = {
			socialLinks: [
				e.target.discord.value,
				e.target.twitter.value,
				e.target.github.value,
				e.target.linkedin.value,
			],
			level: e.target.level.value,
			timezone: e.target.timezone.value,
			idea: e.target.idea.value,
			roles: roles,
			tags: tags,
		}

		OffChainModifyUserData(lensProfile.handle, payload)
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				getAppData()
			})
	}

	return (
		<>
			{loadingAppData ? (
				<p className="text-4xl">Loading...</p>
			) : (
				<div className="relative">
					<div className="h-60 w-full bg-neutral-900">
						<div className="relative flex w-full h-full items-center justify-center">
							{lensProfile.coverPicture?.original?.url && (
								<Image
									layout="fill"
									objectFit="cover"
									src={
										lensProfile.coverPicture?.original?.url
									}
									alt="profile avatar"
								/>
							)}
						</div>
					</div>

					<div className="absolute h-48 w-48 translate-y-[-80%] translate-x-[20%] rounded-full border-[2px] border-black bg-neutral-900">
						{lensProfile.picture?.original?.url && (
							<Image
								layout="fill"
								objectFit="cover"
								src={lensProfile.picture?.original?.url}
								alt="profile avatar"
								style={{
									borderRadius: '100%',
								}}
							/>
						)}
					</div>

					<div className="mt-11 flex flex-col gap-5 mb-14 border-red-500 px-2 text-base 2xl:text-lg">
						<div className="flex items-center justify-between  border-b-[1px] border-white/10 pb-4">
							<div className="flex items-center gap-4 border-blue-500 ml-2">
								<h3 className="text-xl">
									{lensProfile?.handle && lensProfile.handle}
								</h3>

								<button
									className="hover:-translate-y-1 duration-300"
									onClick={() => setEditMode(!editMode)}
								>
									🖋
								</button>

								<button className="btn--thin !h-[2rem] !w-[5rem] !bg-primary">
									Follow
								</button>
							</div>

							<div className="flex">
								<p className="mx-1">
									Posts: {lensProfile.stats?.totalPosts}
								</p>
								<p className="mx-1">
									Followers:{' '}
									{lensProfile.stats?.totalFollowers}
								</p>
								<p className="mx-1">
									Following:{' '}
									{lensProfile.stats?.totalFollowing}
								</p>
							</div>
						</div>

						<form
							onSubmit={formHandler}
							className="flex flex-col gap-4 my-4"
						>
							<div className="flex">
								<span className="flex flex-col mb-2 w-full">
									<p className="text-lg text-secondary">
										Roles
									</p>
									{editMode ? (
										<Select
											onChange={(options) => {
												setSelectedRoles(options)
											}}
											styles={customStyles}
											options={roleOptions}
											closeMenuOnSelect={false}
											isMulti
											isSearchable={false}
											{...defaultValuesRole}
										/>
									) : (
										<div className="flex flex-row flex-wrap min-w-[10rem] max-w-[20rem] h-fit max-h-[9rem] border-[1px] border-white/80 rounded-lg shadow-lg mt-1 bg-[rgba(10,60,0,0.8)] gap-1 p-2 overflow-y-scroll">
											{userData?.roles?.map(
												(role, index) => {
													return (
														<p
															key={index}
															className="w-fit h-fit text-sm text-black px-2 py-1 rounded-sm bg-white/80"
														>
															{role}
														</p>
													)
												}
											)}
										</div>
									)}
								</span>

								<span className="flex flex-col mb-2 w-full">
									<p className="text-lg text-secondary">
										Expertise
									</p>
									{editMode ? (
										<select
											id="level"
											className="inputStandard"
											defaultValue={userData?.level}
										>
											<option value="NEWBIE">
												Newbie
											</option>
											<option value="BEGINNER">
												Beginner
											</option>
											<option value="INTERMEDIATE">
												Intermediate
											</option>
											<option value="EXPERT">
												Expert
											</option>
										</select>
									) : (
										<p className>
											{userData.level
												? userData.level
												: 'Expertise not setted'}
										</p>
									)}
								</span>

								<span className="flex flex-col mb-2 w-full">
									<p className="text-lg text-secondary">
										Timezone
									</p>
									{editMode ? (
										<select
											id="timezone"
											className="inputStandard"
											defaultValue={userData?.timezone}
										>
											{timezones
												.sort()
												.map((timezone, index) => {
													return (
														<option
															key={index}
															value={timezone}
														>
															{timezone}
														</option>
													)
												})}
										</select>
									) : (
										<p className>
											{userData.timezone
												? userData.timezone
												: 'Timezone not setted'}
										</p>
									)}
								</span>
							</div>

							<div className="flex">
								<span className="flex flex-col mb-2 w-1/3 pr-2">
									<p className="text-lg text-secondary">
										Interests
									</p>

									{editMode ? (
										<Select
											onChange={(options) => {
												setSelectedTags(options)
											}}
											styles={customStyles}
											options={tagOptions}
											closeMenuOnSelect={false}
											isMulti
											isSearchable={false}
											{...defaultValuesTag}
										/>
									) : (
										<div className="flex flex-row flex-wrap min-w-[10rem] max-w-[20rem] h-fit max-h-[9rem] border-[1px] border-white/80 rounded-lg shadow-lg mt-1 bg-[rgba(10,60,0,0.8)] gap-1 p-2 overflow-y-scroll">
											{userData?.tags?.map(
												(tag, index) => {
													return (
														<p
															key={index}
															className="w-fit h-fit text-sm text-black px-2 py-1 rounded-sm bg-white/80"
														>
															{tag}
														</p>
													)
												}
											)}
										</div>
									)}
								</span>

								<span className="flex flex-col mb-2 w-2/3">
									<p className="text-lg text-secondary">
										Idea
									</p>

									{editMode ? (
										<textarea
											id="idea"
											className="inputStandard"
											placeholder="Tell us about your idea"
											defaultValue={userData?.idea}
										/>
									) : (
										<p className>
											{userData.idea
												? userData.idea
												: 'No idea setted'}
										</p>
									)}
								</span>
							</div>

							<span className=" flex flex-col mb-2 w-full">
								<p className="text-lg text-secondary">Teams:</p>

								<p>
									{userData.teams?.length > 0
										? userData?.teams?.map(
												(item, index) => item.name
										  )
										: 'No team'}
								</p>
							</span>

							<span className="flex flex-col mb-2">
								<p className="text-lg text-secondary">
									Social networks
								</p>

								{editMode ? (
									<div className="flex flex-col gap-3 mt-2">
										<span className="flex gap-3 items-center">
											<Image
												src="/icons/discord.svg"
												width="30"
												height="30"
												alt="Discord Icon"
											/>
											<input
												id="discord"
												className="inputStandard"
											/>
											<button
												type="submit"
												className="ml-36 btn--yellow"
											>
												SUBMIT
											</button>
										</span>

										<span className="flex gap-3 items-center">
											<Image
												src="/icons/github.svg"
												width="30"
												height="30"
												alt="Github Icon"
											/>
											<input
												id="github"
												className="inputStandard"
											/>
										</span>

										<span className="flex gap-3 items-center">
											<Image
												src="/icons/linkedin.svg"
												width="30"
												height="30"
												alt="Linkedin Icon"
											/>
											<input
												id="linkedin"
												className="inputStandard"
											/>
										</span>

										<span className="flex gap-3 items-center">
											<Image
												src="/icons/twitter.svg"
												width="30"
												height="30"
												alt="Twitter Icon"
											/>
											<input
												id="twitter"
												className="inputStandard"
											/>
										</span>
									</div>
								) : (
									<>
										{userData.socialLinks?.length > 0 ? (
											<div className="flex flex-col gap-3 mt-2">
												{userData.socialLinks.map(
													(social, index) => {
														return (
															<span
																key={index}
																className="flex gap-3 items-center"
															>
																<Image
																	src={`/icons/${social.name}.svg`}
																	width="30"
																	height="30"
																	alt={`${social.name} Icon`}
																/>
																<input
																	id="github"
																	className="inputStandard"
																	disabled
																	value={
																		social.link
																	}
																/>
															</span>
														)
													}
												)}
											</div>
										) : (
											<p>No social links setted</p>
										)}
									</>
								)}
							</span>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default LensProfile
