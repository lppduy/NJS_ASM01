import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import Browse from './pages/browse/Browse';
import Search from './pages/search/Search';

import './App.css';
import NotFound from './pages/notfound/NotFound';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Browse />} />
				<Route path="/search" element={<Search />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
