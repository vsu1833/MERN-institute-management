import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../environment";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {

    const [auth, setAuth] = useState(false);
    const [checked, setChecked] = useState(false);
    useEffect(() => {

        axios.get(`${baseUrl}/user/is-admin`).then(resp => {
            setAuth(resp.data.success)
            setChecked(true)
            console.log("Auth", resp)
        }).catch(e => {
            setChecked(true)
            console.log("Errror auth", e)
        })
    }, [])


return(<>

{checked && auth && children}
{checked && !auth && <Navigate to={'/login'}/>}
</>)

}