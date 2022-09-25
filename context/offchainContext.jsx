import { useEffect, useState, createContext, useContext } from 'react'
import { ContractContext } from './contractContext'
import {
	OffChainGetUserData,
	OffChainGetAllTeams,
	OffChainGetUserTeams,
	OffChainGetTags,
	OffChainGetRoles,
	OffchainGetTimezones,
} from '../pages/api/offChain/get'

export const OffChainContext = createContext()

export const OffChainContextProvider = ({ children }) => {
	const [allTeams, setAllTeams] = useState([])

	const [userData, setUserData] = useState({})
	const [userTeams, setUserTeams] = useState([])

	const [tagOptions, setTagOptions] = useState([])
	const [roleOptions, setRoleOptions] = useState([])
	const [timezoneOptions, setTimezoneOptions] = useState([])

	const [loadingAppData, setLoadingAppData] = useState(true)

	const { userWallet, firstRender } = useContext(ContractContext)

	const getAppData = () => {
		setLoadingAppData(true)
		Promise.all([
			OffChainGetUserData(userWallet.address),
			OffChainGetUserTeams(userWallet.address),
			OffChainGetAllTeams(),
		])
			.then((data) => {
				setUserData(data[0])
				setUserTeams(data[1])
				setAllTeams(data[2])
			})
			.catch((error) => console.log(error))
			.finally(() => {
				setLoadingAppData(false)
			})
	}

	useEffect(() => {
		if (!firstRender) {
			if (userWallet.connected) {
				getAppData()

				Promise.all([
					OffChainGetTags(),
					OffChainGetRoles(),
					OffchainGetTimezones(),
				]).then((response) => {
					const tags = response[0].map((role) => {
						return { value: role, label: role }
					})

					const roles = response[1].map((role) => {
						return { value: role, label: role }
					})

					setTagOptions(tags)
					setRoleOptions(roles)
					setTimezoneOptions(response[2])
				})
			}
		}
	}, [firstRender, userWallet])

	return (
		!firstRender && (
			<OffChainContext.Provider
				value={{
					allTeams,
					userTeams,
					userData,
					setUserTeams,
					setUserData,
					getAppData,
					loadingAppData,
					tagOptions,
					roleOptions,
					timezoneOptions,
				}}
			>
				{children}
			</OffChainContext.Provider>
		)
	)
}
