
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { request } from '../servises/servises';

let initialState = {
    GifData: [],
    totalPage : 0,
};

const gifApiCall: any = createAsyncThunk(
    'gifApiCall',
    async (data, thunkAPI) => {
        const response: any = await request('get', `https://api.giphy.com/v1/gifs/search?api_key=BvFV6zTeyxB9U8Y4SZsxL0Hn3MmHkuXq&limit=${data?.limit}&offset=${data?.offset}&q=${data?.query}`);
        return response;
    }
);

const slice = createSlice({
    name: 'giphy',
    initialState,
    reducers: {
        resetData: (state) => {
            state.GifData = []
        },


    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [gifApiCall.fulfilled]: (state, action) => {

            if (state.GifData === undefined || state.GifData.length === 0) {
             
                state.totalPage = action.payload?.data?.pagination?.total_count
                let newArr = action.payload?.data?.data?.map((item: any, index: any) => {
                    return {
                        user :  item.user
                    }
                })
                state.GifData = newArr
                console.log("action.payload?.data?.data", action.payload);

            } else {
                let newArr = action.payload?.data?.data?.map((item: any, index: any) => {
                    return {
                        user :  item.user
                    }
                })
                let newData = state.GifData;

                newData = newData.concat(newArr);
                state.GifData = newData
            }


        },


        [gifApiCall.rejected]: (state, action) => {

            console.log("action", action);

            Alert.alert("rejected")
        },

    }

});
export { gifApiCall };
export const { resetData } = slice.actions;
export default slice.reducer;
