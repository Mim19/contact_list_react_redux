import React from 'react';

import './alert.css';

const Alert = ({message, alertHandler}) =>{
    
        return(
            <div 
                className="alert alert-primary scale-in-center" 
                role="alert" 
                onClick={alertHandler}
            > 
                <i className="fas fa-info-circle fa-lg mr-4" />
                {message}
            </div>
        )
    
}

export default Alert;
