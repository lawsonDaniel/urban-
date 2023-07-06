"use client";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSliceReducer from "./reducers/userSlice";
import parkSliceReducer from "./reducers/parkSlice";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  user: userSliceReducer,
  park: parkSliceReducer,
});

// export default rootReducer;
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
