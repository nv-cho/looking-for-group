import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

import ConnectWallet from './ConnectWallet'

import { useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { ContractContext } from '../../context/contractContext'
import { truncAddress } from '../../utils/truncAddress'

import { useChainModal } from '@rainbow-me/rainbowkit'
const Navbar = () => {
	const { userWallet, disconnect, lensMode, setLensMode } =
		useContext(ContractContext)
	const router = useRouter()

	const [toggle, setToggle] = useState(false)

	const { openChainModal } = useChainModal()

	const handleSwitchLensMode = () => {
		setLensMode((prevState) => !prevState)
	}

	return (
		<nav className="w-full flex justify-between items-center h-[5rem] mx-auto z-10 ">
			<ul className="flex items-center gap-24 text-2xl">
				<li className="blazing">
					<Link href="/">
						<span className="flex gap-1 items-center cursor-pointer">
							<img
								className="w-[3.8rem] h-[3.8rem]"
								src="logo.png"
								alt="lfg logo"
							/>
							<span>LFG</span>
						</span>
					</Link>
				</li>
				{router.pathname == '/' && (
					<>
						{userWallet.connected && userWallet.chainId === 80001 && (
							<>
								<li className="blazing ">
									<Link href="/matchup">Enter App</Link>
								</li>
							</>
						)}
					</>
				)}
			</ul>

			{router.pathname !== '/' && (
				<ul className="flex items-center gap-24 text-2xl ">
					<li className="blazing">
						<Link href="/matchup">Matchup</Link>
					</li>
					<li className="blazing">
						<Link href="/myteams">My teams</Link>
					</li>
				</ul>
			)}

			<div className="flex items-center gap-4">
				{router.pathname !== '/' && (
					<img
						src="lens.jpeg"
						className={`w-9 h-9 rounded-full cursor-pointer ${
							lensMode ? '' : 'opacity-15'
						}`}
						alt="lens logo"
						onClick={handleSwitchLensMode}
					/>
				)}

				{userWallet.connected ? (
					// Logged in
					<div className="flex flex-col items-end">
						{userWallet.chainId !== 80001 ? (
							<button
								onClick={openChainModal}
								className="buttonStandar"
							>
								Wrong network, click to switch
							</button>
						) : (
							<>
								<button
									onClick={() => {
										setToggle(!toggle)
									}}
									className="buttonStandar"
								>
									<Image
										className="invert"
										width="38rem"
										height="38rem"
										src="/user.png"
										alt="User Icon"
									/>
									<p>
										{userWallet.address &&
											truncAddress(userWallet.address)}
									</p>
								</button>

								{/* Toggle Menu  */}
								{toggle && (
									<div className="flex flex-col items-center justify-center absolute border border-white/30 mt-14 w-24 rounded-sm backdrop-blur-lg text-xl !cursor-pointer z-10">
										<Link href="/myprofile">
											<a className="flex p-1 justify-center w-full ">
												Profile
											</a>
										</Link>
										<div className="border-t-[0.1px] border-white/30 w-full" />
										<button
											onClick={() => {
												disconnect()
											}}
											className="flex p-1 justify-center w-full !cursor-pointer "
										>
											Sign out
										</button>
									</div>
								)}
							</>
						)}
					</div>
				) : (
					<ConnectWallet />
				)}
			</div>
		</nav>
	)
}

export default Navbar
