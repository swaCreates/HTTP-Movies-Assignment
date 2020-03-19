import React, {useState, useEffect} from 'react';

import {useParams, useHistory} from 'react-router-dom';

import axios from 'axios';

const Put_Form= props => {

    const params= useParams();

    const history= useHistory();

    const [movieInfo, setMovieInfo]= useState({
        id: params.id,
        title: '',
        director: '',
        metascore: null,
        stars: []
    })

    useEffect(() => {
        const movieToUpdate = props.movieList.find(movie => {
            return `${movie.id}` === params.id
        })

        if(movieToUpdate){
            setMovieInfo(movieToUpdate)
        }

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

    const handleChangesOnStar = e => {
        setMovieInfo({ ...movieInfo, stars: e.target.value.split(', ') })
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
                    onChange={handleChangesOnStar}
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

export default Put_Form;