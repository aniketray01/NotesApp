import { configureStore } from "@reduxjs/toolkit";
import SliceReducer  from './Slice';

const store = configureStore(
    {
        reducer:{
            paste:SliceReducer,
        },
    }
)

export default store;