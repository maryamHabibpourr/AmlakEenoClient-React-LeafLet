import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"

//mui
import {
    CircularProgress,
    Breadcrumbs,
    Link,
    Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import styles from "./News.module.scss"

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


function News() {

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
            <div className={styles.titleNewsContainer}>
                <h2>اخبار تهران</h2> 
            </div>
            <div className={styles.postList}>
                <div className={styles.postContainer}>
                    {allPosts.map((post) => (
                        <div key={post.id} className={styles.postCard}>
                            <div class={styles.postImage} onClick={() => navigate(`/posts/${post.id}/`)}>
                                <img src={`https://api.amlakeeno.ir/${post.image}`} alt="picture2" />
                            </div>
                            <div className={styles.postContent} onClick={() => navigate(`/posts/${post.id}/`)}>
                                <h3>{post.post_name}</h3>
                                <p>{shortenText(post.description,200)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.postTitleContainer}>
                    <h2>مطالب مهم</h2>
                    <div className={styles.postTitleListCard}>
                        {allPosts.map((post) => (
                            <p key={post.id} onClick={() => navigate(`/posts/${post.id}/`)}>
                                {shortenText(post.post_name, 25)}
                            </p>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default News