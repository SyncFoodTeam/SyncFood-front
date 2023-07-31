import './errorComponent.css';
import '../../theme/theme.css';
import React from 'react';


interface errorProps {
    
    name: string,
    value: string,
    resourceNotFound: boolean,
    searchedLocation: string
}

const ErrorComponent: React.FC<errorProps> = ({
    name = '',
    value = '',
    resourceNotFound = false,
    searchedLocation = ''
}) => {
    return (
        <div>
            {value}
        </div>


    );
}

export default ErrorComponent;
