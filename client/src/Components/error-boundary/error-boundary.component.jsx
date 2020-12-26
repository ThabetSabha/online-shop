import React from 'react';
import './error-boundary.styles.scss';

class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = {
            hasErrored: false,
        }
    }

    static getDerivedStateFromError(error) {
        return { hasErrored: true };
    }

    
    render() {
        const { hasErrored } = this.state;
        if (hasErrored) {
            return (
                <div className="error-image-overlay">
                    <div className="error-image" style={{ backgroundImage: "url(https://i.imgur.com/g3hgqe8.png)" }} />
                    <h2>Sorry, This page is broken</h2>
                </div>
            )
        }
        return this.props.children;

    }
}

export default ErrorBoundary;