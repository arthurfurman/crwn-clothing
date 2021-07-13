import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsAsArray = createSelector(
  [selectCollections],
  (collections) => Object.values(collections)
);

export const selectCollectionsAsArrayForFirestore = createSelector(
  [selectCollections],
  (collections) =>
    Object.values(collections).map((collection) => ({
      title: collection.title,
      items: collection.items,
    }))
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections
      ? Object.values(collections).map((collection) => ({
          ...collection,
          items: collection.items.slice(0, 4),
        }))
      : []
);

// using memoize to memoize selectCollection function with different collectionUrlParam variations
export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
);

export const selectIsFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
