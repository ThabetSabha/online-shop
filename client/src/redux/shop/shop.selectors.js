import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
)

export const selectShopCollectionsPreview = createSelector(
    [selectShopCollections],
    (collections) => collections ? Object.keys(collections).map(key => collections[key]) : [],
)


//not really memoized. need to use loadash.memoize
export const selectCollection = (collectionUrlParam) => createSelector(
    [selectShopCollections],
    (collections) => collections ? collections[collectionUrlParam] : null
)

export const selectIsCollectionLoading = createSelector(
    [selectShop],
    (shop) => shop.isCollectionLoading
)

export const selectCollectionItem = (paramsObj) => createSelector(
    [selectShopCollections],
    (collections) => collections[paramsObj.collectionId].items.find(item => {return (item.id === Number(paramsObj.itemId))})
)