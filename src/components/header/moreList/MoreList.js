import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
//motion styles
import { motion } from 'framer-motion'

//styles
import styles from "./MoreList.module.scss"

//icon
import { CgChevronRight } from 'react-icons/cg';

//mui
import Divider from '@mui/material/Divider';



function MoreList({ openMoreMenu }) {

    const navigate = useNavigate()




    //setting for motion
    const animateFrom = { opacity: 0, y: -40 }
    const animateTo = { opacity: 1, y: 0 }





    return (
        <div className={styles.modalMoreItemContainer}>
            <motion.div className={styles.cardMoreItemAccount}
                initial={animateFrom}
                animate={animateTo}
                transition={{ delay: 0.7 }}
            >
                <div className={styles.subMoreItemContentContainer} onClick={openMoreMenu}>
                    <div onClick={()=>navigate("/commission")} className={styles.subMoreItemContainerDiv}>
                        <Link><CgChevronRight size={20} /></Link>
                        <Link>کمیسیون املاک</Link>
                    </div>
                    <Divider orientation="vertical" flexItem style={{background:"red"}}/>
                    <div onClick={()=>navigate("/contactus")} className={styles.subMoreItemContainerDiv}>
                        <Link><CgChevronRight size={20} /></Link>
                        <Link>تماس با ما </Link>
                    </div>
                    <Divider orientation="vertical" flexItem style={{background:"red"}}/>
                    <div onClick={()=>navigate("/posts")} className={styles.subMoreItemContainerDiv} >
                        <Link><CgChevronRight size={20} /></Link>
                        <Link>مقاله ها </Link>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default MoreList