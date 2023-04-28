import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios';


/* eslint-disable react/prop-types */
export function MovieDetail () {
    
    const [movie, setMovie] = useState([])
    const [userRating, setUserRating] = useState("")
    const [userWatched, setUserWatched] = useState("")
    const { movieId } = useParams()
    const userId = localStorage.userId

    console.log("movie id is ",movieId)
    const entryPoint = `http://localhost:3000/api/movies/${movieId}`

    useEffect(() => { //fetch Specific movie by id.
        fetch(entryPoint)
          .then(response => {
            return response.json()
          })
          .then(movie => {
            console.log(movie)
            setMovie(movie)
          })
          .catch(error => console.log(error))
      }, [entryPoint])

      const entrypointRatings = `http://localhost:3000/api/users/${userId}/rating/${movieId}`

      useEffect(() => { //fetch user ratings, for user logged
        fetch(entrypointRatings)
          .then(response => {
            return response.json()
          })
          .then(ratingResponse => {
            console.log(ratingResponse)
            const movieRating = ratingResponse.movieRating
            setUserRating(movieRating.rating)
            setUserWatched(movieRating.watched)
          })
          .catch(error => console.log(error))
      }, [entrypointRatings])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fields = new FormData(event.target)
        try {
            const response = await axios.post(`http://localhost:3000/api/movies/${movieId}/watch-rate`, {
                userId: localStorage.userId,
                rating: fields.get('rating'),
                watched: fields.get('watched')==='on'? 1: 0,
                movieId: movieId
        })
        console.log(response.data); 
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <> 
        <form onSubmit={handleSubmit} style={{display: "block", minWidth: "150px"}}>
            <h3>Hi {localStorage.username}</h3>
            <label htmlFor="rating">Your Rating</label>
            <input className='form-control me-2' type="number" min={1} max={5} id="rating" name="rating" placeholder="1-5"/>

            <label htmlFor="watched">Did you watch it?</label>
            <input type="checkbox" id="watched" name="watched" placeholder="movie, series" /> Watched
            <br />
            <button className='btn btn-outline-success' type="submit">Update</button>
        </form>
        <ul className="movies mx-4">
              <li className='movie'>
                <h5>{movie.name}</h5>
                <div className="infoContainer">
                    <i className="fa-solid fa-film">{" "+movie.genre}</i>
                    <i className="fa-solid fa-eye">{movie.views}</i>
                    <i className="fa-solid fa-star">{movie.rating}</i>
                </div>
                <img src={movie.image} alt={movie.name} />
              </li>
              <li className='movie' >
              <div className="infoContainer2"  >
                    <label htmlFor="">Genre</label>
                    <i className="fa-solid fa-film ">{" "+movie.genre}</i>
                    <label htmlFor="">Number of Views</label>
                    <i className="fa-solid fa-eye">{" "+movie.views}</i>
                    <label htmlFor="">Type</label>
                    <i className="fa-solid fa-video">{" "+movie.type}</i>
                    <label htmlFor="">Average Rating</label>
                    <i className="fa-solid fa-star">{" "+movie.rating}</i>
                    <label htmlFor="">Your Rating</label>
                    <i className="fa-solid fa-video">{" "+userRating}</i>
                    <label htmlFor="">Watched Status</label>
                    <i className="fa-solid fa-eye">{" "+userWatched}</i>
                </div>
              </li>
      </ul>
      </>
    )
    }