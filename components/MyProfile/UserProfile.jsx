import { useContext, useState, useRef, useEffect } from 'react'
import Select from 'react-select'
import Image from 'next/image'

import { OffChainContext } from '../../context/offchainContext'
import { ContractContext } from '../../context/contractContext'

import { truncAddress } from '../../utils/truncAddress'
import { imageCompressor } from '../../utils/compressor'
import { convertToBase64 } from '../../utils/convertToBase64'
import { OffChainModifyUserData } from '../../pages/api/offChain/post.js'

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

const UserProfile = ({ props }) => {
	const { userWallet } = useContext(ContractContext)
	const {
		userData,
		userTeams,
		tagOptions,
		roleOptions,
		timezoneOptions,
		getAppData,
		loadingAppData,
	} = useContext(OffChainContext)

	const [editMode, setEditMode] = useState(false)
	const [selectedTags, setSelectedTags] = useState([])
	const [selectedRoles, setSelectedRoles] = useState([])

	const [imagesObjectURL, setImagesObjectURL] = useState({
		avatarURL: '',
		coverURL: '',
	})

	const [compressedAvatar, setCompressedAvatar] = useState('')
	const [compressedCover, setCompressedCover] = useState('')

	const [defaultValuesTag, setDefaultValuesTag] = useState({})
	const [defaultValuesRole, setDefaultValuesRole] = useState({})

	const nicknameInput = useRef()

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

	useEffect(() => {
		setImagesObjectURL({ avatarURL: '', coverURL: '' })
	}, [editMode])

	const imageHandler = (event) => {
		if (event.target.value.length > 0) {
			const file = event.target.files[0]

			if (file && file.type.substr(0, 5) === 'image') {
				if (event.target.id === 'profileAvatar') {
					setImagesObjectURL((prev) => ({
						...prev,
						avatarURL: URL.createObjectURL(file),
					}))
					imageCompressor(file, setCompressedAvatar)
				} else {
					setImagesObjectURL((prev) => {
						return {
							...prev,
							coverURL: URL.createObjectURL(file),
						}
					})
					imageCompressor(file, setCompressedCover)
				}
			}
		}
	}

	const formHandler = async (e) => {
		e.preventDefault()
		let base64avatar = ''
		let base64cover = ''

		if (compressedAvatar) {
			base64avatar = await convertToBase64(compressedAvatar)
		}

		if (compressedCover) {
			base64cover = await convertToBase64(compressedCover)
		}

		const roles = selectedRoles.map((role) => role.value)
		const tags = selectedTags.map((tag) => tag.value)

		const payload = {
			nickname: nicknameInput.current.value,
			avatar: base64avatar,
			cover: base64cover,
			socialLinks: [
				{ name: 'discord', link: e.target.discord.value },
				{ name: 'twitter', link: e.target.twitter.value },
				{ name: 'github', link: e.target.github.value },
				{ name: 'linkedin', link: e.target.linkedin.value },
			],
			level: e.target.level.value,
			timezone: e.target.timezone.value,
			idea: e.target.idea.value,
			roles: roles,
			tags: tags,
		}

		OffChainModifyUserData(userWallet.address, payload)
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setImagesObjectURL({
					avatarURL: '',
					coverURL: '',
				})
				getAppData()
				setEditMode(false)
			})
	}

	return (
		<>
			{loadingAppData ? (
				<p className="text-4xl">Loading...</p>
			) : (
				<div className="relative">
					<div className="mb-[3.5rem]">
						{editMode ? (
							<div className="h-60 w-full bg-neutral-900">
								<label
									htmlFor="profileCover"
									className="flex w-full h-full cursor-pointer"
								>
									{userData?.cover ||
									imagesObjectURL.coverURL ? (
										<div className="relative flex w-full h-full justify-center items-center">
											<div className="absolute flex-col w-full h-full">
												<div className="flex flex-col w-full h-full justify-center items-center">
													<p>Select Cover </p>
													🦄
												</div>
											</div>
											<Image
												objectFit="cover"
												layout="fill"
												src={
													imagesObjectURL.coverURL ==
													''
														? userData?.cover
														: imagesObjectURL.coverURL
												}
												alt="profile cover"
												style={{
													opacity: '0.5',
												}}
											/>
										</div>
									) : (
										<div className="flex flex-col w-full h-full items-center justify-center">
											<p>Select Cover </p>
											🦄
										</div>
									)}
								</label>
								<input
									id="profileCover"
									type="file"
									accept=".jpeg, .png, .jpg"
									onChange={imageHandler}
									className="hidden h-full w-full"
								/>
							</div>
						) : (
							<div className="h-60 w-full bg-neutral-900">
								<div className="relative flex w-full h-full items-center justify-center">
									{userData?.cover && (
										<Image
											layout="fill"
											objectFit="cover"
											src={userData.cover}
											alt="profile avatar"
											priority={true}
										/>
									)}
								</div>
							</div>
						)}

						{editMode ? (
							<div className="absolute h-48 w-48 translate-y-[-80%] translate-x-[20%] rounded-full border-[2px] border-black bg-neutral-900">
								<label
									htmlFor="profileAvatar"
									className="cursor-pointer flex w-full h-full"
								>
									{userData?.avatar ||
									imagesObjectURL.avatarURL ? (
										<div className="relative flex items-center">
											<div className="absolute flex-col w-full h-full">
												<div className="flex flex-col w-full h-full justify-center items-center">
													<p>Select Avatar </p>
													🦄
												</div>
											</div>
											<Image
												objectFit="cover"
												width={200}
												height={200}
												src={
													imagesObjectURL.avatarURL ==
													''
														? userData?.avatar
														: imagesObjectURL.avatarURL
												}
												alt="team avatar"
												style={{
													borderRadius: '100%',
													opacity: '0.5',
												}}
											/>
										</div>
									) : (
										<div className="flex flex-col w-full h-full items-center justify-center">
											<p>Select Avatar </p>
											🦄
										</div>
									)}
									<input
										id="profileAvatar"
										type="file"
										accept=".jpeg, .png, .jpg"
										onChange={imageHandler}
										className="hidden h-full w-full"
									/>
								</label>
							</div>
						) : (
							<div className="absolute h-48 w-48 translate-y-[-80%] translate-x-[20%] rounded-full border-[2px] border-black bg-neutral-900">
								{userData?.avatar && (
									<Image
										layout="fill"
										objectFit="cover"
										src={userData.avatar}
										alt="profile avatar"
										style={{
											borderRadius: '100%',
										}}
									/>
								)}
							</div>
						)}
					</div>

					<div className="mt-11 flex flex-col gap-5 mb-14 border-red-500 px-2 text-base 2xl:text-lg">
						<div className="flex flex-row gap-5 items-center border-b-[1px] border-white/10 pb-4">
							<div className="flex items-center gap-4 border-blue-500 mt-1">
								{editMode ? (
									<input
										type="text"
										placeholder="Nickname"
										className="inputStandard"
										defaultValue={userData?.name}
										ref={nicknameInput}
									/>
								) : (
									<h3 className="text-xl">
										{userData.name
											? userData.name +
											  ' - ' +
											  truncAddress(userData.address)
											: 'No nickname - ' +
											  truncAddress(userData.address)}
									</h3>
								)}
							</div>

							<button
								className="hover:-translate-y-1 duration-300"
								onClick={() => setEditMode(!editMode)}
							>
								🖋
							</button>
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
										<>
											{userData.roles?.length > 0 ? (
												<div className="flex flex-row flex-wrap min-w-[10rem] max-w-[20rem] h-fit max-h-[9rem] border-[1px] border-white/80 rounded-lg shadow-lg mt-1 bg-[rgba(10,60,0,0.8)] gap-1 p-2 overflow-y-scroll">
													{userData.roles.map(
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
											) : (
												<p>No roles settled</p>
											)}
										</>
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
											{timezoneOptions
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
										<>
											{userData.tags?.length > 0 ? (
												<div className="flex flex-row flex-wrap min-w-[10rem] max-w-[20rem] h-fit max-h-[9rem] border-[1px] border-white/80 rounded-lg shadow-lg mt-1 bg-[rgba(10,60,0,0.8)] gap-1 p-2 overflow-y-scroll">
													{userData.tags.map(
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
											) : (
												<p>No interests setted</p>
											)}
										</>
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
												defaultValue={
													userData.socialLinks[0]
														?.link
												}
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
												defaultValue={
													userData.socialLinks[1]
														?.link
												}
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
												defaultValue={
													userData.socialLinks[2]
														?.link
												}
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
												defaultValue={
													userData.socialLinks[3]
														?.link
												}
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

export default UserProfile
