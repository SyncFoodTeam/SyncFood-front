import { BounceLoader } from 'react-spinners';
import './loader.css';
import React from 'react';


function Loader() {

    return (
        <div className='loader'>
            <BounceLoader color="#36D7B7" loading={true} size={100} />
            <div>
                <h2>Chargement en cours...</h2>

            </div>
        </div>
    );
}

export default Loader;