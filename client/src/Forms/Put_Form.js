import React, {useState} from 'react';

import axios from 'axios';

const Put_Form= () => {

    const [info, setInfo]= useState({
        id: Date.now(),
        title: '',
        director: '',
        metascore: '',
        star: []
    })

    return (
        <div>
            <form>
                <input 
                    name='title'
                    placeholder='enter title'
                    type='text'
                    value={info.title}
                />
                <input
                    name='director'
                    placeholder='enter director'
                    type='text'
                    value={info.director}
                />
                <input
                    name='metascore'
                    placeholder='enter metascore'
                    type='number'
                    value={info.metascore}
                />
                <input
                    name='stars'
                    placeholder='enter stars'
                    type='text'
                    value={info.stars}
                />
            </form>
        </div>
    )
}

export default Put_Form;