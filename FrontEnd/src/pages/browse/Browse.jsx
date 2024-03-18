import React from 'react';

import MovieList from '../../components/browse/MovieList';
import requests from '../../utils/requests';
import Banner from '../../components/browse/Banner';
import Nav from '../../components/browse/Nav';

import './Browse.css';

function Browse() {
	return (
		<div className="app">
			<Nav />
			<Banner />
			<MovieList title="Original" isLargeRow fetchUrl={requests.fetchNetflixOriginals} />
			<MovieList title="Trending" fetchUrl={requests.fetchTrending} />
			<MovieList title="Top Rated" fetchUrl={requests.fetchTopRated} />
			<MovieList title="Action" fetchUrl={requests.fetchActionMovies} />
			<MovieList title="Comedy" fetchUrl={requests.fetchComedyMovies} />
			<MovieList title="Horror" fetchUrl={requests.fetchHorrorMovies} />
			<MovieList title="Romance" fetchUrl={requests.fetchRomanceMovies} />
			<MovieList title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
		</div>
	);
}

export default Browse;

