import {useEffect, useState} from 'react';
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard.jsx'

const API_URL = 'http://www.omdbapi.com?apikey=b0b2097b';

const movie1 = {
    "Title": "The Lord of the Rings: The Two Towers",
    "Year": "2002",
    "imdbID": "tt0167261",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Lord of the rings');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                 ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                 )
            };

        </div>
    );
}

export default App