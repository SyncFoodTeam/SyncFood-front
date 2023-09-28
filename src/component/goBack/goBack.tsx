import './goBack.css';
import React from 'react';
import { useNavigate } from "react-router-dom";
interface goBackProps {
    name?: string;
}

const GoBack: React.FC<goBackProps> = ({
    name = ""
}) => {
    const navigate = useNavigate();

    const goBack = async (event: React.MouseEvent<HTMLElement>) => {
        console.log("goBack()");
        event.preventDefault();

        console.log(event);
        navigate(-1);
    }

    return (
        <div className='goBackWithName'>
            <div >
                <button onClick={goBack} className="returnToLastPage"><i className="fa-solid fa-arrow-left fa-xl"></i></button>
            </div>
            <div className="nameOfPage">
                {name}
            </div>
        </div>
    );
}

export default GoBack;