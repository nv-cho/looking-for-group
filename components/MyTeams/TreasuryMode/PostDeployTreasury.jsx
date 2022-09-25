import { useEffect, useState } from 'react'
import Link from 'next/link'

import { truncAddress } from '../../../utils/truncAddress'
import { OnChainGetTeamData } from '../../../pages/api/onChain/get'

const PostDeployTreasury = ({ team }) => {
	const [onChainData, setOnChainData] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		OnChainGetTeamData(team.address)
			.then((response) => {
				setOnChainData(response)
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => setLoading(false))
	}, [])

	return (
		!loading && (
			<div className="flex flex-row w-full h-full gap-3">
				<div className="flex flex-col gap-6 justify-start w-[100%]">
					<div className="flex">
						<h1 className="text-xl">
							Team address: {team.address}
						</h1>
					</div>

					<div>
						<h1 className="text-xl mb-1">{onChainData?.name}</h1>
						{onChainData?.members?.map((member, index) => {
							return (
								<div
									key={index}
									className="flex w-fit items-center justify-between border-b-[1px] border-amber-200/30 p-1.5 mb-1"
								>
									<div className="flex items-center gap-1">
										<Link
											href={`/user/${member[0]}`}
											className=""
										>
											<span className="flex cursor-pointer items-center">
												<img
													className="h-7 w-7 invert"
													src={'user.png'}
													alt="user icon"
												/>
												{onChainData?.members?.length >
													0 &&
													truncAddress(member[0])}
											</span>
										</Link>
										<p>{'- %' + member[1]}</p>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	)
}

export default PostDeployTreasury
