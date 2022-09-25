import { useContext, useEffect, useState } from 'react'
import { NewTeamCard } from '../../components/Matchup/NewTeamCard'
import SearchBar from '../../components/Matchup/SearchBar'

import TeamCard from '../../components/Matchup/TeamCard'
import AppContainer from '../../Containers/AppContainer'

import { OffChainContext } from '../../context/offchainContext'
import { OffChainGetTeamById } from '../api/offChain/get'

const Index = () => {
	const { allTeams, userData } = useContext(OffChainContext)

	const [publicTeams, setPublicTeams] = useState([])

	useEffect(() => {
		if (allTeams.length > 0) {
			const publicTeams = allTeams.filter((team) => team.isPublic)
			setPublicTeams(publicTeams)
		}
	}, [allTeams])

	return (
		<AppContainer className="appContainer--events">
			<SearchBar />
			<div className="relative right-[2rem] mt-[1.5rem] flex max-h-[calc(100vh-6.5rem)] w-full flex-wrap gap-2 overflow-y-scroll scrollbar-hide 2xl:max-h-[calc(100vh-6.5rem)] 2xl:pt-[1.5rem] ">
				{publicTeams.map((team, index) => {
					return (
						<TeamCard key={index} team={team} userData={userData} />
					)
				})}
			</div>
			{/* <div className="mt-4 flex flex-wrap gap-[1rem] relative w-[calc(100%-5rem)]">
				{publicTeams.map((team, index) => (
					<NewTeamCard key={index} team={team} userData={userData} />
				))}
			</div> */}
		</AppContainer>
	)
}

export default Index
