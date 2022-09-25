import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import { ToastContainer } from 'react-toastify'
import { toastSetter } from '../../../pages/_app'
import Select from 'react-select'

import { convertToBase64 } from '../../../utils/convertToBase64'
import { imageCompressor } from '../../../utils/compressor'
import { ContractContext } from '../../../context/contractContext'
import { OffChainContext } from '../../../context/offchainContext'
import {
	OffChainCreateTeam,
	OffChainEditTeam,
} from '../../../pages/api/offChain/post'

const customStyles = {
	option: (provided, state) => ({
		...provided,
		color: 'black',
		padding: '6px',
	}),
	control: (provided, state) => ({
		...provided,
		padding: 0,
		borderRadius: '2px',
		fontSize: '0.875rem',
		maxHeight: '5rem',
		overflowY: 'scroll',
		border: 'none',
	}),
	placeholder: (provided, state) => ({
		...provided,
		padding: 0,
		margin: 0,
	}),
	menuList: (provided, state) => ({
		...provided,
		maxHeight: '200px',
		overflowY: 'scroll',
	}),
}

const CreateTeamModal = ({
	createTeamModal,
	editTeamModal,
	onCloseTeamCreation,
	onCloseTeamEdition,
}) => {
	const { userWallet } = useContext(ContractContext)
	const {
		getAppData: refetch,
		tagOptions,
		roleOptions,
	} = useContext(OffChainContext)
	const { team } = editTeamModal

	const [image, setImage] = useState('')
	const [commpressedFile, setCompressedFile] = useState('')

	const [selectedTags, setSelectedTags] = useState([])
	const [selecetedRoles, setSelectedRoles] = useState([])

	const [defaultValuesTag, setDefaultValuesTag] = useState(null)
	const [defaultValuesRole, setDefaultValuesRole] = useState(null)

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)

		if (team) {
			let defaultRoles = []
			let defaultTags = []

			if (team.lookingFor.length > 0) {
				defaultRoles = team.lookingFor.map((role) => {
					return { label: role, value: role }
				})
			}

			if (team.tags.length > 0) {
				defaultTags = team.tags.map((tag) => {
					return { label: tag, value: tag }
				})
			}

			if (defaultRoles.length > 0 && defaultTags.length > 0) {
				setDefaultValuesRole({ defaultValue: defaultRoles })
				setDefaultValuesTag({ defaultValue: defaultTags })
			} else if (defaultRoles.length > 0) {
				setDefaultValuesRole({ defaultValue: defaultRoles })
			} else if (defaultTags.length > 0) {
				setDefaultValuesTag({ defaultValue: defaultTags })
			} else {
				setDefaultValuesRole({})
				setDefaultValuesTag({})
			}
		} else if (createTeamModal == true) {
			setDefaultValuesRole({})
			setDefaultValuesTag({})
		}
	}, [team, createTeamModal])

	useEffect(() => {
		if (defaultValuesRole != null && defaultValuesTag != null) {
			setLoading(false)
		}
	}, [defaultValuesRole, defaultValuesTag])

	const avatarHandler = (event) => {
		if (event.target.value.length > 0) {
			const file = event.target.files[0]
			if (file && file.type.substr(0, 5) === 'image') {
				setImage(URL.createObjectURL(file))
				imageCompressor(file, setCompressedFile)
			}
		}
	}

	const closeModalHandler = () => {
		setImage('')

		if (createTeamModal) {
			onCloseTeamCreation()
		} else {
			onCloseTeamEdition()
		}
	}

	const onCreateTeam = async (event) => {
		event.preventDefault()

		let base64img = ''
		let tags
		let roles

		if (
			event.target.teamName.value !== '' &&
			event.target.teamMaxMembers.value !== ''
		) {
			if (commpressedFile) {
				base64img = await convertToBase64(commpressedFile)
			}

			if (selectedTags.length > 0 && selecetedRoles.length > 0) {
				tags = selectedTags.map((tag) => tag.value)
				roles = selecetedRoles.map((role) => role.value)
			}

			const teamData = {
				deployerAddress: userWallet.address,
				name: event.target.teamName.value,
				idea: event.target.teamIdea.value,
				slogan: event.target.teamSlogan.value,
				maxMembers: +event.target.teamMaxMembers.value,
				isPublic: event.target.teamVisibility.checked,
				avatar: base64img,
				tags: tags,
				lookingFor: roles,
			}

			OffChainCreateTeam(teamData)
				.then((response) => {
					toastSetter(
						'Party ' +
							response.name +
							' created sucessfully!, code: ' +
							response.code,
						'success'
					)
					refetch()
				})
				.catch((error) => {
					console.log(error)
					toastSetter('The party creation has failed.', 'error')
				})
				.finally(() => {
					setImage('')
					setCompressedFile('')
					setSelectedRoles([])
					setSelectedTags([])
					setDefaultValuesRole({})
					setDefaultValuesTag({})
					onCloseTeamCreation()
				})
		} else {
			toastSetter(
				'Team name and members quantity cannot be empty.',
				'error'
			)
		}
	}

	const onEditTeam = async (event) => {
		event.preventDefault()

		let base64img = ''
		let tags
		let roles

		if (
			event.target.teamName.value !== '' &&
			event.target.teamMaxMembers.value !== ''
		) {
			if (commpressedFile) {
				base64img = await convertToBase64(commpressedFile)
			}

			if (selectedTags.length > 0 && selecetedRoles.length > 0) {
				tags = selectedTags.map((tag) => tag.value)
				roles = selecetedRoles.map((role) => role.value)
			}

			const teamData = {
				deployerAddress: userWallet.address,
				name: event.target.teamName.value,
				idea: event.target.teamIdea.value,
				slogan: event.target.teamSlogan.value,
				maxMembers: +event.target.teamMaxMembers.value,
				isPublic: event.target.teamVisibility.checked,
				avatar: base64img,
				tags: tags,
				lookingFor: roles,
			}

			OffChainEditTeam(teamData, team.id)
				.then((response) => {
					toastSetter('Party edited with success', 'success')
					refetch()
				})
				.catch((error) => {
					console.log(error)
					toastSetter('The party edition has failed.', 'error')
				})
				.finally(() => {
					setImage('')
					setCompressedFile('')
					setSelectedRoles([])
					setSelectedTags([])
					setDefaultValuesRole({})
					setDefaultValuesTag({})
					onCloseTeamEdition()
				})
		} else {
			toastSetter(
				'Team name and members quantity cannot be empty.',
				'error'
			)
		}
	}

	return (
		!loading && (
			<>
				<ToastContainer limit={2} />
				{(createTeamModal || editTeamModal.display) && (
					<div className="fixed z-30 flex h-full w-full items-center justify-center backdrop-brightness-[30%]">
						<div className="appContainer--myteams !h-[90%] w-[70%] justify-start rounded-xl border-[1px] border-white/30 p-5 text-primaryLight shadow-lg backdrop-blur-lg">
							<div className="mb-2 flex items-center justify-between">
								<h1 className="">
									🧙{' '}
									{createTeamModal
										? 'Create your team'
										: 'Edit your team'}
								</h1>
								<span
									className="cursor-pointer text-xl text-white"
									onClick={closeModalHandler}
								>
									X
								</span>
							</div>
							<form
								className="flex flex-col gap-4 h-[90%]"
								onSubmit={
									createTeamModal ? onCreateTeam : onEditTeam
								}
							>
								<div className="flex flex-row justify-center h-full gap-10">
									<div className="flex flex-col gap-5 w-1/2">
										{createTeamModal ? (
											<div className="flex h-36 w-full items-center justify-center">
												<div
													className={`flex h-[142px] w-[142px] items-center justify-center rounded-full ${
														image == '' && 'border'
													}`}
												>
													<label
														htmlFor="teamAvatar"
														className="cursor-pointer flex w-full h-full"
													>
														{image ? (
															<Image
																width={142}
																height={142}
																src={image}
																alt="team avatar"
																objectFit="cover"
																objectPosition="center"
																style={{
																	borderRadius:
																		'100%',
																}}
															/>
														) : (
															<div className="flex flex-col w-full h-full items-center justify-center">
																<p>
																	Select
																	Avatar{' '}
																</p>
																🦄
															</div>
														)}

														<input
															id="teamAvatar"
															type="file"
															accept=".jpeg, .png, .jpg"
															onChange={
																avatarHandler
															}
															className="hidden h-full w-full"
														/>
													</label>
												</div>
											</div>
										) : (
											<div className="flex h-36 w-full items-center justify-center">
												<div
													className={`flex h-[142px] w-[142px] items-center justify-center rounded-full ${
														team?.avatar == '' &&
														'border'
													}`}
												>
													<label
														htmlFor="teamAvatar"
														className="cursor-pointer flex w-full h-full"
													>
														{team?.avatar ||
														image ? (
															<div className="relative">
																<div className="absolute flex-col w-full h-full">
																	<div className="flex flex-col w-full h-full justify-center items-center">
																		<p>
																			Select
																			Avatar{' '}
																		</p>
																		🦄
																	</div>
																</div>
																<Image
																	objectFit="cover"
																	width={142}
																	height={142}
																	src={
																		image ==
																		''
																			? team?.avatar
																			: image
																	}
																	alt="team avatar"
																	style={{
																		borderRadius:
																			'100%',
																		opacity:
																			'0.5',
																	}}
																/>
															</div>
														) : (
															<div className="flex flex-col w-full h-full items-center justify-center">
																<p>
																	Select
																	Avatar{' '}
																</p>
																🦄
															</div>
														)}
														<input
															id="teamAvatar"
															type="file"
															accept=".jpeg, .png, .jpg"
															onChange={
																avatarHandler
															}
															className="hidden h-full w-full"
														/>
													</label>
												</div>
											</div>
										)}

										<div className="flex flex-col gap-1">
											<label htmlFor="teamName">
												Name:
											</label>
											<input
												className="rounded-sm py-[9px] px-2 text-sm text-black "
												type="text"
												name="teamName"
												id="teamName"
												maxLength={35}
												placeholder="The Infinite Garden Protectors"
												defaultValue={team?.name}
											/>
										</div>

										<div className="flex flex-col gap-1">
											<label htmlFor="teamSlogan">
												Slogan:
											</label>
											<input
												className="rounded-sm py-[9px] px-2 text-sm text-black "
												type="text"
												name="teamSlogan"
												id="teamSlogan"
												maxLength={55}
												placeholder="To the moon and beyond"
												defaultValue={team?.slogan}
											/>
										</div>

										<div className="flex items-center justify-evenly gap-2 mt-2">
											<div className="flex items-center gap-2">
												<label htmlFor="teamMaxMembers">
													Team size
												</label>
												<input
													className="w-12 rounded-sm py-1.5 px-2 text-xs text-black "
													type="text"
													name="teamMaxMembers"
													id="teamMaxMembers"
													maxLength={1}
													placeholder="Max 8"
													defaultValue={
														team?.maxMembers
													}
													onChange={(event) => {
														const regex =
															new RegExp(
																'^[1-8]$'
															)

														if (
															!regex.test(
																event.target
																	.value
															)
														) {
															event.target.value =
																''
														}
													}}
												/>
											</div>

											<div className="flex w-fit items-center gap-1">
												<label htmlFor="teamVisibility">
													Make team public?
												</label>
												<input
													className="h-4 w-4"
													type="checkbox"
													name="teamVisibility"
													id="teamVisibility"
													defaultChecked={
														team?.isPublic
													}
												/>
											</div>
										</div>
									</div>

									<div className="flex flex-col w-1/2 h-full  gap-4 2xl:h-auto">
										<div className="flex flex-col gap-1">
											<label htmlFor="teamRoles">
												Roles needed:
											</label>

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
										</div>

										<div className="flex flex-col gap-1">
											<label htmlFor="teamTags">
												Tags:
											</label>

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
										</div>

										<div className="flex flex-col gap-1">
											<label htmlFor="teamIdea">
												Idea:
											</label>
											<textarea
												type="text"
												name="teamIdea"
												id="teamIdea"
												className="resize-none rounded-sm py-1.5 px-2 text-sm text-black min-h-[125px]"
												defaultValue={team?.idea}
												maxLength="500"
												placeholder={
													'Write your idea here, or let this field empty if your team is still looking for ideas'
												}
											/>
										</div>
									</div>
								</div>

								<button className="btn--golden" type="submit">
									{createTeamModal
										? 'Confirm creation'
										: 'Confirm edition'}
								</button>
							</form>
						</div>
					</div>
				)}
			</>
		)
	)
}

export default CreateTeamModal
