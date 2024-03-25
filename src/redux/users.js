import { createSlice } from "@reduxjs/toolkit"

const Users = createSlice({
    name: "users-slice",
    initialState: {
        users: []
    },
    reducers: {
        ADD_USERS: (state, action) => {
            state.users.push(action.payload);
        },
        EDIT_USER: (state, action) => {
            // logic here
        }
    }
});

export const { ADD_USERS, EDIT_USER } = Users.actions;
const userReducer = Users.reducer;
export default userReducer;