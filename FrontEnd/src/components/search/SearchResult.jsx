import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './SearchResult.css';

const base_url = 'http://localhost:8000/api/movies';

const SearchResult = ({ data, onReceivePageInfo }) => {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const request = await axios.post(`${base_url}/search`, {
					keyword: data.query,
					genre: data.genre,
					mediaType: data.mediaType,
					language: data.language,
					year: data.year,
					page: data.page,
				});
				setMovies(request.data.results);
				setError(null); // Clear error
				return request;
			} catch (error) {
				setError(error.response.data.message); // Set error message from backend
				setMovies([]); // Clear movies
			}
		}

		if (data.query) {
			fetchData().then(request => {
				if (request) {
					onReceivePageInfo({
						page: request.data.page > 0 ? request.data.page : 1,
						totalPages: request.data.total_pages,
						totalResults: request.data.results.length,
					});
				}
			});
		} else {
			setMovies([]);
		}
	}, [data.query]);

	return (
		<div className='row'>
			<h2>Search Result</h2>
			{error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
			<div className='row_posters search-resul-container sc2'>
				{movies.map((movie) => (
					<img
						key={movie.id}
						className={`row_poster row_posterLarge`}
						src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
						alt={movie.original_title}
					/>
				))}
			</div>
		</div>
	);
};

export default SearchResult;