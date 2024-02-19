import { configureStore } from '@reduxjs/toolkit';
import addTaskReducer from './Slices/addTask.js';


const store = configureStore({
    reducer: addTaskReducer
});


export default store;