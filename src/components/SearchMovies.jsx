import { useState, useEffect } from "react"

/* eslint-disable react/prop-types */
export function SearchMovies () {

    const [movies, setMovies] = useState([])
    const [queryName, setQueryName] =useState(null)
    const [queryType, setQueryType] =useState(null)
    const [queryGenre, setQueryGenre] =useState(null)

    const entryPoint = `http://localhost:3000/api/movies/filter?name=${queryName}&type=${queryType}&genre=${queryGenre}`

    useEffect(() => {
        fetch(entryPoint)
          .then(response => {
            return response.json()
          })
          .then(movies => {
            console.log(movies)
            setMovies(movies)
          })
          .catch(error => console.log(error))
      }, [entryPoint])

      const handleSubmit = (event) =>{
        event.preventDefault()
        const fields = new FormData(event.target)
        setQueryName(fields.get('name'))
        setQueryGenre(fields.get('genre'))
        setQueryType(fields.get('type'))
    }

    return (
        <>
        <ul className='movies'>
        <form onSubmit={handleSubmit} action="" method="post" style={{display: "block"}}>
            <label htmlFor="name">Filter by Name</label>
            <input className='form-control me-2' type="text" id="name" name="name" placeholder="Batman, Her..."/>

            <label htmlFor="type">Filter by Type</label>
            <input className='form-control me-2' type="text" id="type" name="type" placeholder="movie, series" />

            <label htmlFor="genre">Filter by Genre</label>
            <input className='form-control me-2' type="text" id="genre" name="genre" placeholder="drama, action, comedy" />

            <button className='btn btn-outline-success' type="submit">Filter</button>
        </form>
        {
          movies.map(movie => {
            return (
              <li className='movie' key={movie.id}>
                <h5>{movie.name}</h5>
                <div className="infoContainer">
                    <i className="fa-solid fa-film">{" "+movie.genre}</i>
                    <i className="fa-solid fa-eye">{movie.views}</i>
                    <i className="fa-solid fa-star">{movie.rating}</i>
                </div>
                <img src={movie.image} alt={movie.name} />
              </li>
            )
          })
        }
      </ul>
      </>
    )
  }