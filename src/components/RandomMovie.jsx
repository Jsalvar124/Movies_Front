import { useState, useEffect } from "react"

/* eslint-disable react/prop-types */
export function RandomMovie () {

    const [movie, setRandomMovie] = useState([])

    const entryPoint = 'http://localhost:3000/api/movies/random'

    useEffect(() => {
        fetch(entryPoint)
          .then(response => {
            return response.json()
          })
          .then(movie => {
            console.log(movie)
            setRandomMovie(movie)
          })
          .catch(error => console.log(error))
      }, [])


    return (
        <> 
        <ul>
              <h3>Random Movie</h3>
              <li className='movie' key={movie.id}>
                <h5>{movie.name}</h5>
                <div className="infoContainer">
                    <i className="fa-solid fa-film">{" "+movie.genre}</i>
                    <i className="fa-solid fa-eye">{movie.views}</i>
                    <i className="fa-solid fa-star">{movie.rating}</i>
                </div>
                <img src={movie.image} alt={movie.name} />
              </li>
      </ul>
      </>
    )
    }