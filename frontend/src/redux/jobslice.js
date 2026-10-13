import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allJobss:[],
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        //actions
        setAllJobs:(state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state, action) => {
            state.singleJob = action.payload;
        },
        // YAHAN CHANGE KIYA HAI: setAllJobs ki jagah setAllJobss likha hai
        setAllJobss:(state, action) => {
            state.allJobss = action.payload;
        },
        setsearchJobByText:(state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setsearchedQuery:(state, action) => {
            state.searchedQuery = action.payload;
        }
    }
})
export const {setAllJobs, setSingleJob, setAllJobss, setsearchJobByText, setAllAppliedJobs, setsearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;