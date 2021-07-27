import { createSlice } from "@reduxjs/toolkit"

const viewSlice = createSlice({
    name: "view",
    initialState: {view: 'home'},
    reducers:{
        changeView (state, action) {
            state.view = action.payload;
        }
    },
})

export const { changeView } = viewSlice.actions
export default viewSlice.reducer