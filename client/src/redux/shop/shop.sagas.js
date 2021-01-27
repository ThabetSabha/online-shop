import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

function* fetchCollections() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

function* onFetchCollectionsStart() {
  yield takeLatest("FETCH_COLLECTIONS_START", fetchCollections);
}

export function* shopSagas() {
  yield all([call(onFetchCollectionsStart)]);
}
