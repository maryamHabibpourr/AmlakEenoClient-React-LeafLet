import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"

//mui
import {
    CircularProgress,
    Grid,
    Breadcrumbs,
    Link,
    Typography
} from '@mui/material'
import styles from "./Posts.module.scss"
import Card from "../../../components/card/Card"


//mui icons
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';



//setting text#################
const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };


function Posts() {


    const [allPosts, setAllPosts] = useState([])
    const [dataIsLoading, setDataIsLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        const source = Axios.CancelToken.source();
        async function GetAllPosts() {
            try {
                const response = await Axios.get("https://api.amlakeeno.ir/api/posts/", { cancelToken: source.token })
                console.log(response.data)
                setAllPosts(response.data)
                setDataIsLoading(false)
            }
            catch (error) {
                console.log(error.response)
            }
        }
        GetAllPosts();
        return () => {
            source.cancel()
        }
    }, [])


    if (dataIsLoading === true) {
        return (
            <Grid container
                justifyContent="center"
                alignItems="center"
                style={{ height: "100vh" }}>
                <CircularProgress />
            </Grid>
        )
    }


    return (
        <div className={styles.postPageContainer}>
            <div className={styles.breadCrumbsContainer}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate("/")}
                        style={{ cursor: "pointer" }}>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        صفحه اصلی
                    </Link>
                    <Typography color="red" style={{ fontWeight: "500" }}>
                        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                         مقاله ها
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className={styles.postContainer}>
                {allPosts && allPosts.map((posts) => {
                    return (
                        <Card cardClass={styles.cardContiner} key={posts.id} >
                            <div class={styles.postImage}  onClick={() => navigate(`/posts/${posts.id}/`)}>
                                <img src={`https://api.amlakeeno.ir/${posts.image}`} alt="picture2" />
                            </div>
                            <div className={styles.postContent}>
                                <h2>{posts.post_name} </h2>
                                <p>{shortenText(posts.description, 18)}</p>
                            </div>
                        </Card>
                    )
                })}

            </div>
        </div>
    )
}

export default Posts