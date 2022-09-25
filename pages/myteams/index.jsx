import Image from 'next/image'
import { useState, useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import { toastSetter } from '../_app'

import Team from '../../components/MyTeams/Team'
import AppContainer from '../../Containers/AppContainer'
import CreateTeamModal from '../../components/MyTeams/modals/CreateTeamModal'
import JoinTeamModal from '../../components/MyTeams/modals/JoinTeamModal'

import { OffChainContext } from '../../context/offchainContext'

const Index = () => {
	const { userTeams } = useContext(OffChainContext)

	const [createTeamModal, setCreateTeamModal] = useState(false)
	const [joinTeamModal, setJoinTeamModal] = useState(false)
	const [editMode, setEditMode] = useState(false)

	const onCloseTeamCreation = () => {
		setCreateTeamModal(false)
	}

	const onCloseTeamEdition = () => {
		setEditMode({ display: false, team: null })
	}

	return (
		<>
			<ToastContainer limit={2} />
			<CreateTeamModal
				createTeamModal={createTeamModal}
				onCloseTeamCreation={onCloseTeamCreation}
				editTeamModal={editMode}
				onCloseTeamEdition={onCloseTeamEdition}
			/>

			<JoinTeamModal
				isOpen={joinTeamModal}
				closeModal={setJoinTeamModal}
			/>

			<AppContainer className="appContainer--myteams">
				<div className="mb-10 flex min-h-[80vh] flex-col gap-8">
					<div className="mt-6 flex w-fit flex-row gap-3 px-3 py-2">
						<button
							onClick={() => {
								if (userTeams.length >= 7) {
									toastSetter(
										'You can create a maximun of 5 teams.',
										'warning'
									)
									return
								}
								setCreateTeamModal(true)
							}}
							className="btn--golden flex items-center gap-2 !px-6"
						>
							<Image
								width={25}
								height={25}
								src="/team.png"
								alt="Team Icon"
							/>
							Create Team
						</button>
						<button
							className="btn--golden flex items-center gap-2 !px-6 "
							onClick={() => {
								if (userTeams.length >= 7) {
									toastSetter(
										'You can join a maximun of 5 teams.',
										'warning'
									)
									return
								}
								setJoinTeamModal(true)
							}}
						>
							Join team
							<Image
								width={35}
								height={35}
								src="/message.png"
								alt="Message Icon"
							/>
						</button>
					</div>
					{userTeams.map((team, index) => (
						<Team
							key={index}
							team={team}
							setEditMode={setEditMode}
						/>
					))}
				</div>
			</AppContainer>
		</>
	)
}

export default Index
