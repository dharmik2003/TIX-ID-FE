import { createSlice } from "@reduxjs/toolkit";
import { showTheaterData } from "../Thunk/TheaterDataThunk";
import { InitialStateTheater } from "../../Types/DataTypes";

// export interface InitialState{
//     theaterData: TheaterData[],
//     theaterloading: boolean,
//     error: String,
// }

export const TheaterDataSlice=createSlice({
    name:"schedule",
    initialState:{
        theaterData:[],
         theaterloading: false,
        error: "",
    } as InitialStateTheater,
    reducers:{
        showAllTheaterData:(state,action)=>{
            console.log("sate moviedata TheaterData",state.theaterData)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(showTheaterData.pending, (state) => {
            state.theaterloading = true;
        })
        // showTheaterData from thunk
        .addCase(showTheaterData.fulfilled, (state, action) => {
            state.theaterloading = false;
            state.theaterData = action.payload;
        })
        .addCase(showTheaterData.rejected, (state, action) => {
            state.theaterloading = false;
            state.error = action.payload as string;
        })
    }
})


export const {showAllTheaterData} = TheaterDataSlice.actions;
export default TheaterDataSlice.reducer;