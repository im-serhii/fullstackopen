import React from 'react'

const Search = ({query, queryHandler}) => {
	return (
		<input onChange={queryHandler} value={query} placeholder='Search' />
	)
}
export default Search
