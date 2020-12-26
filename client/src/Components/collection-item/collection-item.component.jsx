import React from 'react';
import './collection-item.styles.scss';

import CustomButton from '../custom-button/custom-button.component';

import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cart/cart.action';
import { Link } from 'react-router-dom';

const CollectionItem = ({ item, parentCollection }) => {
    const dispatch = useDispatch();
    const { imageUrl, name, price, id } = item;
    return (
        <div className="collection-item">
            <Link to={`/shop/${parentCollection}/${id}`} className="product-page-link">
                <div className="image" style={{
                    backgroundImage: `url(${imageUrl})`,
                }} />
                <div className="collection-footer">
                    <span className="name"> {name} </span>
                    <span className="price"> {price}$ </span>
                </div>
            </Link>
            <CustomButton inverted onClick={() => dispatch(addItem(item))}>ADD TO CART</CustomButton>
        </div>
    )
}

export default CollectionItem;