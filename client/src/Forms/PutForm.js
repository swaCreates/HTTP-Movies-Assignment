import React, {useState, useEffect} from 'react';

import {useParams, useHistory} from 'react-router-dom';

import axios from 'axios';

const PutForm= props => {

    const params= useParams();
    // useParams is helping us connect the editing id to the id of our url

    const history= useHistory();
    // use history is helping us use the `props.history.push() method`

    const [movieInfo, setMovieInfo]= useState({
        id: params.id,
        title: '',
        director: '',
        metascore: null,
        stars: []
    })

    useEffect(() => {

        // movieToUpdate is checking through the movieList state in app, to make sure
        // we are matching the id of the movie already in movieList to the movie we are editing
        const movieToUpdate = props.movieList.find(movie => {
            return `${movie.id}` === params.id
        })

        // then here we are setting the state of movieToUpdate to the local state
        // in our form, which is now connected to movieList
        if(movieToUpdate){
            setMovieInfo(movieToUpdate)
        }

        // we want to watch for the changes here
    }, [props.movieList, params.id]);

    const handleChanges= evt => {

        setMovieInfo({
            ...movieInfo,
            [evt.target.name] : evt.target.value
        })
    }

    const updateMovieOnServer= (movie) => {
        axios
        .put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then(() => {
        props.getMovieList();
        history.push('/');
        })
        .catch(err => console.log('This is my error: ', err));
    }

    const handleSubmit= evt => {
        evt.preventDefault();

        updateMovieOnServer(movieInfo);

    }

    const handleListOfStars = e => {
        setMovieInfo({ 
            ...movieInfo, 
            stars: e.target.value.split(', ') 
        })
    }

    return (
        <div className='putForm'>
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={handleChanges}
                    name='title'
                    placeholder='enter title'
                    type='text'
                    value={movieInfo.title}
                />
                <input
                    onChange={handleChanges}
                    name='director'
                    placeholder='enter director'
                    type='text'
                    value={movieInfo.director}
                />
                <input
                    onChange={handleChanges}
                    name='metascore'
                    placeholder='enter metascore'
                    type='number'
                    value={movieInfo.metascore}
                />
                <input
                    onChange={handleListOfStars}
                    name='stars'
                    placeholder='enter stars'
                    type='text'
                    value={movieInfo.stars}
                />
                <div className='btn'>
                    <button>submit</button>
                </div>
            </form>
        </div>
    )
}

export default PutForm;