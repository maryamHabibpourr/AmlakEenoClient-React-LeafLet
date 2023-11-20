import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

//style
import styles from "./Contacus.module.scss"

//assets video
import home from "../../assets/home.mp4"

//react icons
import { Button } from '@mui/material';


import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function ContactUs() {
    const vidRef = useRef();
    const navigate = useNavigate()



    const handleRefresh = () => {
        navigate(-1)
    };


    useEffect(() => {
        vidRef.current.play()
    }, [])


    return (
        <div className={styles.modalContainer}>
            <div className={styles.MainContainer}>
                <div className={styles.videoContainer}>
                    <video
                        ref={vidRef}
                        src={home}
                        type="video/mp4"
                        loop
                        controls={false}
                        muted
                    />
                    <div className={styles.appVideoOverlay}>
                        <div className={styles.appVideoOverlayCircle}>
                            <h1>املاک اینو</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.contentOntactus}>
                    <h4>تماس با ما</h4>
                    <p>هم وطن عزیز! شما از طریق ما می توانید املاک و مستغلات مورد علاقه خود را بیابید و سپس مشورت نمایید و بعد از کسب اطلاعات لازم خریداری یا اجاره نمایید. </p>
                    {/* <span>شماره تماس: ۰۲۱۲۵۲۱</span> */}
                    <Button onClick={handleRefresh}
                        variant="outlined"
                        endIcon={<ArrowBackIcon
                            style={{ marginRight: "2px", marginTop: "10px" }} />}>
                        بازگشت
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ContactUs