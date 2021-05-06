import * as actions from "./shop-actions";
import ShopActionTypes from "./shop-types";

import createMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const mockStore = createMockStore([thunkMiddleware])

it("should create an action to get shop data", () => {
  const expectedAction = {
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
  };
  expect(actions.fetchCollectionsStart()).toEqual(expectedAction);
});

it("should create an action to get successful data", () => {
  const expectedAction2 = {
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: undefined,
  };
  expect(actions.fetchCollectionsSuccess()).toEqual(expectedAction2);
});

it("should create an action to handle errors", () => {
  const expectedAction3 = {
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: undefined,
  };
  expect(actions.fetchCollectionsFailure()).toEqual(expectedAction3);
});

it("handles requesting data", () => {
    const store = mockStore()
    store.dispatch(actions.fetchCollectionsStart)
    const action = store.getActions()
    console.log('actions', action)
  const expectedAction3 = {
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
  };

  expect(actions[0]).toEqual(expectedAction3);
});
 