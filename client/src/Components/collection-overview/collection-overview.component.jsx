import React from 'react';
//Redux
import { useSelector } from 'react-redux';
import { selectShopCollectionsPreview } from '../../redux/shop/shop.selectors';
//Components
import CollectionPreview from '../collection-preview/collection-preview.component';

const CollectionOverview = () => {
    const collections = useSelector(selectShopCollectionsPreview);

    return (
        <div className="collection-overview">
            {
                collections.map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps} />)
            }
        </div>
    )
}


export default CollectionOverview;