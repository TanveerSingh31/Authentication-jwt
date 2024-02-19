import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import fetchTokenData from '../../utils/fetchTokenData';
import config from '../../config.json';

async function getTasksCreated(){
    let { userId } = fetchTokenData() || {};
    
    if(!userId) return {count: 0};

    return axios.get(`${config.BASE_URL}tasksCreated`, {
        params: { userId }
    });
}

let data =  await getTasksCreated();

const initialState = {
    value : data.data
}

const addTask = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        increment: (state) => {state.value.count += 1}
    }
});

export const {increment} = addTask.actions;
export default addTask.reducer;