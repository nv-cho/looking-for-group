import { useContext } from 'react'

import AppContainer from '../../Containers/AppContainer'
import UserProfile from '../../components/MyProfile/UserProfile'
import LensProfile from '../../components/MyProfile/LensProfile'

import { ContractContext } from '../../context/contractContext'

const MyProfile = () => {
	const { lensMode } = useContext(ContractContext)

	return (
		<AppContainer className="appContainer--myteams">
			{lensMode ? <LensProfile /> : <UserProfile />}
		</AppContainer>
	)
}

export default MyProfile
