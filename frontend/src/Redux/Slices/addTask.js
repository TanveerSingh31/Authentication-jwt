import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import fetchTokenData from '../../utils/fetchTokenData';
import config from '../../config.json';

const getTasksCreated = async () => {
    let { userId } = fetchTokenData() || {};
    
    if(!userId) return {count: 0};

    return axios.get(`${config.BASE_URL}tasksCreated`, {
        params: { userId }
    });
}


const initialState = {
    value : { count: 0 }
}

const addTask = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setValue: (state, action) => { console.log("payload: ", action.payload); state.value.count = action.payload.count},
        increment: (state) => {state.value.count += 1}
    }
});

const {increment, setValue} = addTask.actions;
export default addTask.reducer;
export { increment, setValue, getTasksCreated };
