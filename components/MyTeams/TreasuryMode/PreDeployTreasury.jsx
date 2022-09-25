import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import { Loading } from '@nextui-org/react'
import { ethers } from 'ethers'

import { ToastContainer } from 'react-toastify'
import { toastSetter } from '../../../pages/_app'
import 'react-toastify/dist/ReactToastify.css'

import { ContractContext } from '../../../context/contractContext'
import { OffChainContext } from '../../../context/offchainContext'

import { OffChainSetAddressTeam } from '../../../pages/api/offChain/post'
import { onChainDeployParty } from '../../../pages/api/onChain/post'
import { truncAddress } from '../../../utils/truncAddress'

const PreDeployTreasury = ({ team, setIsPartyDeployed }) => {
	const [toastifyLimited, setToastifyLimited] = useState(false)
	const [deployDisabled, setDeployDisabled] = useState(true)
	const [txState, setTxState] = useState(false)

	const [percentages, setPercentages] = useState(
		new Array(team.members.length).fill(100 / team.members.length)
	)

	const { members } = team
	const { signer } = useContext(ContractContext)
	const { getAppData: refetch } = useContext(OffChainContext)

	useEffect(() => {
		const totalPercentage = percentages.reduce((acc, perc) => {
			return acc + perc
		}, 0)
		if (totalPercentage === 100) {
			setDeployDisabled(false)
		} else setDeployDisabled(true)
	}, [percentages])

	const partyMembers = members.map((member, index) => ({
		percentage: percentages[index],
		memberAddress: ethers.utils.getAddress(member.address),
	}))

	const preDeployValidation = () => {
		if (deployDisabled) {
			if (!toastifyLimited) {
				toastSetter(
					'The sum of the percentages must be 100%',
					'warning'
				)
				setToastifyLimited(true)
				setTimeout(() => {
					setToastifyLimited(false)
				}, 2500)
			}
			return false
		} else if (txState.waitingTx || txState.waitingConfirmation) {
			return false
		} else {
			return true
		}
	}

	const deployTeam = async (signer, name, partyMembers) => {
		if (preDeployValidation()) {
			Promise.resolve(
				onChainDeployParty(signer, name, partyMembers, setTxState)
			).then((txReceipt) => {
				if (txReceipt === 0) {
					toastSetter('Transaction rejected by the user', 'warning')
				} else {
					if (txReceipt.status === 1) {
						toastSetter(
							'Party Treasure created sucessfully!',
							'success'
						)

						OffChainSetAddressTeam(
							team.id,
							txReceipt.contractAddress,
							team.name,
							team.maxMembers
						)
							.then(() => {
								refetch()
							})
							.finally(() => {
								setTimeout(() => {
									setIsPartyDeployed(true)
								}, 400)
							})
					} else {
						toastSetter('Transaction failed', 'error')
					}
				}
			})
		}
	}
	const onChangePercentage = (value, index) => {
		if (value < 0 || value > 100) return
		if (value.toString().length > 3) return
		setPercentages((prevState) =>
			prevState.map((item, i) => (i !== index ? item : +value))
		)
	}

	return (
		<>
			<ToastContainer limit={2} />

			<h1 className="text-semibold text-2xl text-primary">
				Party Treasury Creation
			</h1>

			{/* {isEditing && (
        <input
          className="text-black p-1 w-[14rem]"
          placeholder="Type here the new name"
          ref={nameInput}
        />
      )} */}

			{/* {isEditing ? (
        <div className="flex flex-col gap-3">
          <button onClick={editTeamName} className="btn--red">
            Change name
          </button>
          <button onClick={leaveParty} className="btn--yellow">
            Leave the party
          </button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(!isEditing)} className="btn--red">
          Edit
        </button>
      )} */}

			<div className="flex h-full gap-4">
				{/* LEFT BLOCK */}
				<div className="w-7/12 2xl:w-8/12 ">
					<div className="flex h-full max-w-[95%] flex-col justify-around 2xl:max-w-[60%] 2xl:text-lg min-h-[200px]">
						<p>
							<span className="italic text-primary">
								{team.name}
							</span>{' '}
							party treasury is about to be created. The party
							will receive their unique address where the team is
							gonna receive the prizes.
						</p>

						<div className="flex flex-col gap-1">
							<p>
								We are on the Polygon Mumbai Testnet and working
								on possible bridges and solutions to receive
								more currencies than Matic, and non fungibles in
								the next iteration.
							</p>
							<p>
								The deploy is optimized to cost aprox half a
								cent.
							</p>
						</div>
					</div>
				</div>
				{/* RIGHT BLOCK BLOCK */}
				<div className="flex w-5/12 flex-col justify-between gap-3 rounded border-[1px] border-white/30 2xl:w-4/12 ">
					<div className="">
						{team.members.map((member, index) => (
							<div
								key={index}
								className="flex items-center justify-between border-b-[1px] border-amber-200/30 py-1.5 px-1.5 "
							>
								<div className="flex items-center gap-1 border-red-500 ">
									<Link
										href={`/user/${member.address}`}
										className=""
									>
										<span className="flex cursor-pointer items-center">
											<img
												className={`h-7 w-7 invert`}
												src={
													member.image
														? member.image
														: 'user.png'
												}
												alt=""
											/>
											{member.name
												? member.name
												: truncAddress(member.address)}
										</span>
									</Link>
									<p>{'- Fullstack Developer'}</p>
								</div>

								<div className="relative flex">
									<input
										onChange={(e) => {
											onChangePercentage(
												e.target.value,
												index
											)
										}}
										value={percentages[index]}
										type="number"
										max="100"
										min="0"
										className={`w-[3.75rem] ${
											percentages[index].toString()
												.length == 100
												? 'pl-[0.4rem]'
												: ''
										} rounded-[1px] bg-amber-200/80 py-1 px-2.5 text-sm text-black`}
									/>
									<span className="absolute top-[50%] right-2 translate-y-[-50%] border-l-[1px] border-black/20 pl-2 text-black">
										%
									</span>
								</div>
							</div>
						))}
					</div>

					<button
						onClick={() => {
							deployTeam(signer, team.name, partyMembers)
						}}
						className={`btn--golden ${
							deployDisabled ||
							txState.waitingConfirmation ||
							txState.waitingTx
								? 'disabled'
								: ''
						}`}
						disabled={deployDisabled}
					>
						{txState.waitingConfirmation ? (
							<span className="flex items-center justify-center gap-2">
								<Loading size="xs" color="warning" />
								Waiting confirmation...
							</span>
						) : txState.waitingTx ? (
							<span className="flex items-center justify-center gap-2">
								<Loading size="xs" color="warning" />
								Waiting transaction...
							</span>
						) : (
							'Deploy Party Treasure'
						)}
					</button>
				</div>
			</div>
		</>
	)
}

export default PreDeployTreasury
