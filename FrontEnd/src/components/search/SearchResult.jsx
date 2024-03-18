import React, { useState, useEffect } from 'react';

import axios from '../../utils/axios';

import './SearchResult.css';

const base_url = 'http://localhost:8000/api/movies';

const SearchResult = ({ query }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.post(`${base_url}/search`, { keyword: query });
			setMovies(request.data);
			return request;
		}

		if (query) {
			fetchData();
		} else {
			setMovies([]);
		}
	}, [query]);

	return (
		<div className='row'>
			<h2>Search Result</h2>
			<div className='row_posters search-resul-container sc2'>
				{movies.map((movie) => {
					return (
						<img
							key={movie.id}
							className={`row_poster row_posterLarge`}
							src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
							alt={movie.original_title}
						/>
					);
				})}
			</div>
		</div>
	)
};

export default SearchResult;
