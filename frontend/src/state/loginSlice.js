
import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:"login",
    initialState:{
        isLogin:false,
        isAdmin:false
    },
    reducers:{
        login:(state, action)=>{
            if(action.payload =="ADMIN"){
                return {isLogin:true, isAdmin:true}
            }else if(action.payload =="USER"){
                return {isLogin:true, isAdmin:false}
            }else{
                return {isLogin:false, isAdmin:false}
            }

        },
        logout:(state)=>{
            return {isLogin:false, isAdmin:false}
        }
    }
})

export const {login, logout} = loginSlice.actions;
const loginReducer = loginSlice.reducer;
export default loginReducer;