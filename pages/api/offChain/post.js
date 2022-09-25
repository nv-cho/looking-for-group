const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

/* --------------- API calls for teams things --------------- */

export const OffChainCreateTeam = async (teamData) => {
	const url = `${NEXT_PUBLIC_BASE_URL}/teams`

	const payload = {
		address: teamData.deployerAddress,
		name: teamData.name,
		idea: teamData.idea,
		slogan: teamData.slogan,
		avatar: teamData.avatar ? teamData.avatar : '',
		isPublic: teamData.isPublic,
		tags: teamData.tags,
		lookingFor: teamData.lookingFor,
		maxMembers: teamData.maxMembers,
	}

	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(payload),
	})
	const data = await response.json()

	return data
}

export const OffChainEditTeam = async (teamData, teamId) => {
	const url = `${NEXT_PUBLIC_BASE_URL}/teams/${teamId}`

	const payload = {
		address: teamData.deployerAddress,
		name: teamData.name,
		idea: teamData.idea,
		slogan: teamData.slogan,
		avatar: teamData.avatar ? teamData.avatar : '',
		isPublic: teamData.isPublic,
		tags: teamData.tags,
		lookingFor: teamData.lookingFor,
		maxMembers: teamData.maxMembers,
	}

	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'PUT',
		body: JSON.stringify(payload),
	})
	const data = await response.json()

	return data
}

export const OffChainSetAddressTeam = async (id, address, name, maxMembers) => {
	const url = `${NEXT_PUBLIC_BASE_URL}/teams/${id}`

	const payload = {
		address: address,
		name: name,
		isContractDeployed: true,
		maxMembers: maxMembers,
	}

	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'PUT',
		body: JSON.stringify(payload),
	})
	const data = await response.json()

	return data
}

export const OffChainJoinTeam = async (address, teamId) => {
	const url = `${NEXT_PUBLIC_BASE_URL}/teams/join`

	const payload = {
		address: address,
		code: teamId,
	}

	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(payload),
	})
	const data = await response.json()

	return data
}

/* --------------- API calls for user things --------------- */

export const OffChainModifyUserData = async (userAddress, newInformation) => {
	const url = `${NEXT_PUBLIC_BASE_URL}/users/${userAddress}`

	const payload = {
		name: newInformation.nickname,
		avatar: newInformation.avatar,
		cover: newInformation.cover,
		socialLinks: newInformation.socialLinks,
		level: newInformation.level,
		timezone: newInformation.timezone,
		idea: newInformation.idea,
		roles: newInformation.roles,
		tags: newInformation.tags,
	}

	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'PUT',
		body: JSON.stringify(payload),
	})

	console.log(response)

	// const data = await response.json()

	// return data
}

export const joinTeam = async (teamData) => {
	// const response = await fetch("https://www.balldontlie.io/api/v1/teams");
	// const data = await response.json();
	// return data;
}

export const leaveTeam = async (teamData) => {
	// const response = await fetch("https://www.balldontlie.io/api/v1/teams");
	// const data = await response.json();
	// return data;
}
