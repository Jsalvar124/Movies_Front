import { useState, useEffect } from "react"

/* eslint-disable react/prop-types */
export function MoviesList () {

    const [movies, setMovies] = useState([])
    const [orderBy, setOrderBy] = useState("")

    const entryPoint = orderBy==="" ? 'http://localhost:3000/api/movies' : `http://localhost:3000/api/movies?orderBy=${orderBy}`
    console.log(entryPoint)

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
        const query = fields.get('query')
        setOrderBy(query)
    }
      
    return (
        <ul className='movies'>
        <form onSubmit={handleSubmit} role='search' style={{display: "block"}}>
            <label htmlFor="orderBy">Order by</label>
            <input className='form-control me-2' name="query" type='search' id="orderBy" placeholder="name, rating, views..."/>

            <button className='btn btn-outline-success' type="submit">Order</button>
        </form>
        {
          movies.map(movie => {
            return (
              <li className='movie' key={movie.id}>
                <a href={`/movies/${movie.id}`} ><h5>{movie.name}</h5></a>
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
    )
  }