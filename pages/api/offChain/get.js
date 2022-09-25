const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const OffChainGetUserData = async (address) => {
	const url = `${NEXT_PUBLIC_BASE_URL}/users/${address}`

	const response = await fetch(url)
	const data = await response.json()

	return data
}

export const OffChainGetAllTeams = async () => {
	const url = `${NEXT_PUBLIC_BASE_URL}/teams`

	const response = await fetch(url)
	const data = await response.json()
	return data
}

export const OffChainGetAllTeamsFiltered = async (filters) => {
	let filterQuery = '?'
	for (const key in filters) {
		filterQuery =
			filterQuery + 'filters[' + key + ']=' + filters[key].join() + '&'
	}
	console.log(`/teams${filterQuery}`)
	const url = `${NEXT_PUBLIC_BASE_URL}/teams?${filters}`

	const response = await fetch(url)
	const data = await response.json()
	console.log(data)
	return data
}

export const OffChainGetUserTeams = async (userAddress) => {
	const url = `${NEXT_PUBLIC_BASE_URL}/teams?address=${userAddress}`

	const response = await fetch(url)
	const data = await response.json()
	return data
}

export const OffChainGetTeamById = async (id) => {
	const url = `${NEXT_PUBLIC_BASE_URL}/teams/${id}`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

export const OffchainGetTimezones = async () => {
	const url = `${NEXT_PUBLIC_BASE_URL}/users/timezones`
	const response = await fetch(url)
	const data = await response.json()

	return data
}

export const OffChainGetTags = async () => {
	const url = `${NEXT_PUBLIC_BASE_URL}/teams/tags`
	const response = await fetch(url)
	const data = await response.json()

	return data
}

export const OffChainGetRoles = async () => {
	const url = `${NEXT_PUBLIC_BASE_URL}/users/roles`

	const response = await fetch(url)
	const data = await response.json()

	return data
}

// export const getTeamsData = async () => {
//   const response = await fetch("https://www.balldontlie.io/api/v1/teams");
//   const data = await response.json();
//   return data;
// };

// export const getUserData = async (address) => {
//   const response = await fetch("https://www.balldontlie.io/api/v1/players");
//   const data = await response.json();
//   return {
//     address: data.address,
//     name: data.name,
//     level: data.level,
//     email: data.email,
//     avatar: data.avatar,
//     timezone: data.timezone,
//   };
// };

// /* API calls used in the my teams section */

// export const getMyTeams = async (userAddress) => {
//   const response = await fetch(`https://www.balldontlie.io/api/v1/teams/${id}`);
//   const data = await response.json();

//   @dev - data will be an array of objects like this:

//   return [{
//     idea: data.idea,
//     legend: data.legend,
//     partyPhoto: data.partyPhoto,
//     maxNumbers: data.maxNumbers,
//     members: [
//       {
//         social: {
//           name: data.name,
//           avatar: data.avatar,
//           links: data.links // array of links,
//         },
//         party: {
//           address: data.address,
//           roles: data.roles // array of roles
//           percentage: data.percentage,
//           concensus: data.consensus // boolean,
//         },
//       },
//     ],
//   }];
// };
