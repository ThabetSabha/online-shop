import React from "react";
import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";
import { useRouteMatch, Link } from "react-router-dom";

const CollectionPreview = ({ title, items, routeName }) => {
  const match = useRouteMatch();
  return (
    <div className="collection-preview">
      <Link to={`${match.path}${routeName}`}>
        <h1 className="title"> {title.toUpperCase()}</h1>
      </Link>

      <div className="preview">
        {items
          .filter((item, index) => index < 4)
          .map((item) => (
            <CollectionItem
              key={item.id}
              item={item}
              parentCollection={routeName}
            />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
