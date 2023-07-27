import './noData.css';
import React from 'react';


function NoDataComponent() {
    console.log("NoDataComponentComponent");

    return (
        <div className='errorMessage'>
           Pas de données !
        </div>
    );
}

export default NoDataComponent;