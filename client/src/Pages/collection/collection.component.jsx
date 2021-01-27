import React, { useState } from "react";
import "./collection.styles.scss";

import { useSelector } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem from "../../Components/collection-item/collection-item.component";
import { useParams } from "react-router-dom";
import NotFoundPage from "../not-found-page/not-found-page.component";

const CollectionPage = () => {
  const params = useParams();
  const collection = useSelector(selectCollection(params.collectionId));
  const [collectionItems, setCollectionItems] = useState(collection?.items);
  if (!collection) {
    return <NotFoundPage />;
  }

  const handleSorting = (e) => {
    let sortingOption = e.target.value;
    if (sortingOption === "priceAsc") {
      let sorted = [...collectionItems].sort((a, b) => a.price - b.price);
      setCollectionItems(sorted);
    } else if (sortingOption === "priceDes") {
      let sorted = [...collectionItems].sort((a, b) => b.price - a.price);
      setCollectionItems(sorted);
    }
  };

  const { title } = collection;
  return (
    <div className="collection-page">
      <div className="select-sorting">
        <select onChange={handleSorting} defaultValue="">
          <option value="" disabled>
            Sort by
          </option>
          <option value="priceAsc">Price - Lowest to Highest</option>
          <option value="priceDes">Price - Highest to Lowest</option>
        </select>
      </div>

      <h1 className="title">{title}</h1>
      <div className="items">
        {collectionItems.map((item) => (
          <CollectionItem
            key={item.id}
            item={item}
            parentCollection={params.collectionId}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
