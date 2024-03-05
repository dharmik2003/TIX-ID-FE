import { createSlice } from "@reduxjs/toolkit";
import { showUpcomaingData } from "../Thunk/UpcommaingThunk";
import { UpMovie } from "../../Types/DataTypes";

    export interface InitialState{
        upcomingData: UpMovie[],
        upcomingloading: boolean,
        error: String,
    }

    export const UpcommaingSlice=createSlice({
    name:"upcomingMovie",
    initialState: {
        upcomingData: [],
        upcomingloading: false,
        error: "",
    } as InitialState,
    reducers:{
        showAllUpcommainData:(state,action)=>{
            console.log("upcoming data",state.upcomingData)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(showUpcomaingData.pending, (state) => {
            state.upcomingloading = true;
        })
        .addCase(showUpcomaingData.fulfilled, (state, action) => {
            state.upcomingloading = false;
            state.upcomingData = action.payload;
        })
        .addCase(showUpcomaingData.rejected, (state, action) => {
            state.upcomingloading = false;
            state.error = action.payload as string;
        })
    }
})

    // export const UpcommaingSlice=createSlice({
    //     name:"showUpcomaingData",
    //     initialState:{
    //         upcomingData:[],
    //         upcomingloading: false,
    //         error: "",
    //     } as InitialState,

    //     reducers:{
    //         showAllUpcommainData:(state,action)=>{
    //             console.log("upcommaing data",state.upcomingData)
    //         }
    //     },
    //     extraReducers:(builder)=>{
    //         builder
    //         .addCase(showUpcomaingData.pending, (state) => {
    //             state.upcomingloading = true;
    //         })
    //         // showTheaterData from thunk
    //         .addCase(showUpcomaingData.fulfilled, (state, action) => {
    //             state.upcomingloading = false;
    //             state.upcomingData = action.payload;
    //         })
    //         .addCase(showUpcomaingData.rejected, (state, action) => {
    //             state.upcomingloading = false;
    //             state.error = action.payload as string;
    //         })
    //     }
    // })


    export const {showAllUpcommainData} = UpcommaingSlice.actions;
    export default UpcommaingSlice.reducer;