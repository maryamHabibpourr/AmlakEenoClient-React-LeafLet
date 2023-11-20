import React from "react";
import styles from "./auth.module.scss"
import { useNavigate, useParams } from "react-router-dom"
import Axios from 'axios';
import { Button } from "@mui/material"







const Activation = () => {

    const navigate = useNavigate()
    const params = useParams()


    async function ActivationHandler() {
        try {
            const response = await Axios.post(
                "https://rameshgr.ir/api-auth-djoser/users/activation/",
                {
                    uid: params.uid,
                    token: params.token
                })
            navigate("/login")
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <div className={styles.formMainContainer}>
            <div className={styles.formContainer}>
                <p>
                    لطفاً برای فعال شدن حساب کاربری روی کلید زیر کلیک نمایید!
                </p>
                <Button variant="contained"
                    style={{
                        marginTop: "1rem", marginLeft: "50px",
                        marginRight: "50px", fontSize: "1.5rem", fontWeight: "400"
                    }}
                    onClick={ActivationHandler}
                >
                    فعال
                </Button>
            </div>
        </div>
    )
}

export default Activation