import React from 'react';
import './menu-item.styles.scss';
import { useRouteMatch, Link } from 'react-router-dom';

const MenuItem = ({ title, size, imageUrl, linkUrl }) => {
    const match = useRouteMatch();
    
    return (
        <Link to={`${match.path}${linkUrl}`}
            className={`menu-item ${size}`}>

            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`,
            }} />

            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>

        </Link>
    )
}

export default MenuItem;