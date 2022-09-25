import React, { useContext, useEffect, useState } from 'react'
import { OffChainGetAllTeamsFiltered } from '../../pages/api/offChain/get'
import Select from 'react-select'
import { OffChainContext } from '../../context/offchainContext'
const customStyles = {
	option: (provided, state) => ({
		...provided,
		color: 'black',
		padding: '6px',
	}),
	control: (provided, state) => ({
		...provided,
		padding: 0,
		borderRadius: '2px',
		fontSize: '0.875rem',
		maxHeight: '5rem',
		overflowY: 'auto',
		border: 'none',
		background: 'black',
		width: 'calc(100%)',
		borderRadius: '10px',
	}),
	placeholder: (provided, state) => ({
		...provided,
		padding: 0,
		margin: 0,
	}),
	menuList: (provided, state) => ({
		...provided,
		maxHeight: '200px',
		overflowY: 'scroll',
	}),
}

const SearchBar = () => {
	const { tagOptions, roleOptions } = useContext(OffChainContext)

	const [searchTerm, setSearchTerm] = useState('')
	const [filters, setFilters] = useState(null)
	const [openFilters, setOpenFilters] = useState(false)
	const [openFiltersDelay, setOpenFiltersDelay] = useState(false)

	const handleSwitchFilters = (event) => {
		setOpenFilters((prevState) => !prevState)
	}

	const handleChangeFilters = (key, value) => {
		setFilters((prevFilters) => ({ ...prevFilters, [key]: value }))
	}

	const handleApplyFilters = () => {
		console.log(filters)
		OffChainGetAllTeamsFiltered({ ...filters })
	}

	useEffect(() => {
		// opening
		if (openFilters) {
			setTimeout(() => {
				setOpenFiltersDelay(openFilters)
			}, 110)
		} // closing
		else
			setTimeout(() => {
				setOpenFiltersDelay(openFilters)
			}, 20)
	}, [openFilters])

	return (
		<div className={`relative w-1/2 `}>
			<div className="h-10 relative w-full">
				<input
					className="w-full h-full bg-neutral-900 rounded-xl px-3.5"
					type="text"
				/>
				<div className="absolute right-[0.3rem] top-[50%] translate-y-[-50%] flex items-center justify-center gap-1">
					<button
						className=" text-xl bg-neutral-800 rounded-xl py-0.5 px-1 hover:bg-amber-200/10"
						onClick={handleSwitchFilters}
					>
						🕵️‍♀️
					</button>
					<button
						className=" text-xl bg-neutral-800 rounded-xl py-0.5 px-1 hover:bg-amber-200/10"
						onClick={handleApplyFilters}
					>
						🔎
					</button>
				</div>
			</div>

			<div
				className={` absolute w-full z-20 border-xl bg-neutral-900 transition-all duration-200 rounded-xl mt-1 flex items-center ${
					openFilters ? 'h-28 ' : 'h-0'
				}`}
			>
				{openFiltersDelay && (
					<div className="w-full">
						<div className="">
							<div className="flex justify-between items-center py-1 px-3 gap-2.5">
								<label htmlFor="">Role</label>
								<div className="w-full">
									<Select
										onChange={(options) => {
											handleChangeFilters(
												'roles',
												options.map(
													(option) => option.value
												)
											)
										}}
										styles={customStyles}
										options={roleOptions}
										closeMenuOnSelect={false}
										isMulti
										isSearchable={false}
										placeholder="placeholder"
									/>
								</div>
							</div>

							<div className="flex justify-between items-center py-1 px-3 gap-2.5">
								<label htmlFor="">Tags</label>
								<div className="w-full">
									<Select
										onChange={(options) => {
											handleChangeFilters(
												'tags',
												options.map(
													(option) => option.value
												)
											)
										}}
										styles={customStyles}
										options={tagOptions}
										closeMenuOnSelect={false}
										isMulti
										isSearchable={false}
										placeholder="placeholder"
									/>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchBar
