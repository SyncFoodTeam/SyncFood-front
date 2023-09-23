import moment from 'moment';
import React from 'react';

function DateFormater({ date }) {
    // Formate la date selon le format souhaité 'dd/MM/yyyy'
    const formattedDate = moment(date).format('DD/MM/YYYY');

    return <span>{formattedDate}</span>;
}

export default DateFormater