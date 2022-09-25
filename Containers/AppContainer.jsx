import React from 'react'
import Navbar from '../components/Navbar/Navbar'

const AppContainer = ({ className, children }) => {
	return (
		// appContainer is 100% wider and sets the background for each page.
		<div className={`appContainer ${className}`}>
			{/* appSubcontainer is w-11/12 wider contains each page. */}
			<div className="subContainer">
				<header className="w-full">
					<Navbar />
				</header>
				<main className="w-full">{children}</main>
			</div>
		</div>
	)
}

export default AppContainer
