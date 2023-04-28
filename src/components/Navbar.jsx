import { Routes, Route, Link } from 'react-router-dom'
import { Login } from './Login'
import { MoviesList } from './MoviesList'
import { RandomMovie } from './RandomMovie'
import { SearchMovies } from './SearchMovies'
import { MovieDetail } from './MovieDetail'
import { Home } from './Home'

// import staticMovies from '../mock/movies.json'

const Navbar = () => {

    return (
        <>
    <header>
      <nav className="navbar  navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">WebFlix</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/movies">Movies</Link>
              <Link className="nav-link" to="/random">Random</Link>
              <Link className="nav-link" to="/search">Search</Link>
              <Link className="nav-link" to="/login">Login</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <div className='page'>
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movies' element={<MoviesList />} />
                <Route path='/random' element={<RandomMovie />} />
                <Route path='/search' element={<SearchMovies />} />
                <Route path='/login' element={<Login />} />
                <Route path='/movies/:movieId' element={<MovieDetail />} />
            </Routes>
        </main>
      </div>
    </>
    )
}

export default Navbar