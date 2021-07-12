import shopActionTypes from "./shop.types";
import {
  firestore,
  convertShopItemsCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export const fechCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fechCollectionsSuccess = (itemsCollectionMap) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: itemsCollectionMap,
});

export const fechCollectionsError = (error) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_ERROR,
  payload: error,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const itemCollectionRef = firestore.collection("shopItems");

    dispatch(fechCollectionsStart());

    itemCollectionRef.get().then((snapshot) => {
      const itemsCollectionMap =
        convertShopItemsCollectionsSnapshotToMap(snapshot);
      dispatch(fechCollectionsSuccess(itemsCollectionMap));
    }).catch(error => dispatch(fechCollectionsError(error)))
  };
};
