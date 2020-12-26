import React from 'react';
import './spinner.styles.scss';


const Spinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="spinner-container" />
        </div>
    )
}

export default Spinner;


/*
we can use an HOC :
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <div className="spinner-overlay">
            <div className="spinner-container" />
        </div>
    ) : (
            <WrappedComponent {...otherProps} />
        )
}


export default WithSpinner;
*/