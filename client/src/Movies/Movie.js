import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

import {Link} from 'react-router-dom';

function Movie({ addToSavedList, getMovieList }) {

  const params= useParams();
  // useParams is helping us connect the editing id to the id of our url

  const history= useHistory();
  // use history is helping us use the `props.history.push() method`

  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovieOnServer= id => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then((res) => {
      console.log(res);
      // make axios call from app to call the list of movies again
      getMovieList();
      history.push('/')
    })
    .catch(err => console.log('This is my error: ', err));

  }

  const deleteMessage= () => {
    deleteMovieOnServer(params.id);
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        SAVE
      </div>

      <Link className='edit-button' to={`/update-movie/${movie.id}`}>EDIT</Link>
      <Link onClick={deleteMessage} className='delete-button' to={`/update-movie/${movie.id}`}>DELETE</Link>
    </div>
  );
}

export default Movie;
