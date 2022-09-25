export const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.readAsDataURL(file)
		fileReader.onload = () => {
			const b64 = fileReader.result.split(',')[1]

			resolve(b64)
		}
		fileReader.onerror = (error) => {
			reject(error)
		}
	})
}
