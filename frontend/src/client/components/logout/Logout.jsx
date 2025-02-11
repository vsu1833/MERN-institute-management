import axios from "axios"
import { useContext, useEffect } from "react"
import { baseUrl } from "../../../environment"
import { useDispatch } from "react-redux"
import { logout } from "../../../state/loginSlice"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext"

export default function Logout(){
    const {logout} = useContext(AuthContext)
  const navigate  = useNavigate()
useEffect(()=>{
    logout()
    navigate("/login")
},[])
    return(
        <>
        <h1>Log Out</h1></>
    )
}