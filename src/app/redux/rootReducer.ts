import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSliceReducer from "./reducers/userSlice";

const persistConfig = {
    key: "root",
    storage: storage,
  };
  
  const rootReducer = combineReducers({
    user: userSliceReducer,
  });
  
  // export default rootReducer;
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export default persistedReducer;