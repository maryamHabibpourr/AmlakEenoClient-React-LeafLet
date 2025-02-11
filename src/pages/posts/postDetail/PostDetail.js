import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Axios from 'axios';
import { useImmerReducer } from "use-immer";
import StateContext from "../../../Context/StateContext"
import styles from "./Postdetail.module.scss";



//MUI
import {
    Typography,
    Breadcrumbs,
    CircularProgress,
    Link,
} from "@mui/material"
import Grid from '@mui/material/Grid2';


//mui icon
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';

//components
import UserComment from '../../userComment/UserComment';



function PostDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const GlobalState = useContext(StateContext)
    const [allPosts, setAllPosts] = useState([])



    const initialState = {
        dataIsLoading: true,
        postInfo: "",
    }


    function ReducerFunction(draft, action) {
        // eslint-disable-next-line default-case
        switch (action.type) {
            case 'catchPostInfo':
                draft.postInfo = action.postObject;
                break

            case "loadingDone":
                draft.dataIsLoading = false
                break
        }
    }
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)






    useEffect(() => {
        async function GetPostInfo() {
            try {
                const response = await Axios.get(`https://api.amlakeeno.ir/api/posts/${params.id}/`);
                console.log(response.data)
                dispatch({
                    type: "catchPostInfo",
                    postObject: response.data
                })
                dispatch({ type: 'loadingDone' })
            } catch (e) {
                console.log(e.response)
            }
        }
        GetPostInfo()
    }, [params.id])




    useEffect(() => {
        async function GetAllPosts() {
            try {
                const response = await Axios.get("https://api.amlakeeno.ir/api/posts/");
                setAllPosts(response.data);
            } catch (e) {
                console.log(e.response)
            }
        }
        GetAllPosts();
    }, [])




    if (state.dataIsLoading === true) {
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
        <div className={styles.postDetailContainer}>
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
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate("/posts")}
                        style={{ cursor: "pointer" }}>
                        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        مقاله ها
                    </Link>

                    <Typography color="red" style={{ fontWeight: "500" }}>
                        {state.postInfo.post_name}
                    </Typography>
                </Breadcrumbs>
            </div>


            <div className={styles.mainContentDetailComponent}>
                <div className={styles.cardContentImage}>
                    <div className={styles.picturePost}>
                        <img src={state.postInfo.image} alt="picture1" />
                    </div>
                    <h1>{state.postInfo.post_name}</h1>
                    <p>{state.postInfo.description}</p>

                </div>
                <div className={styles.postListContainer}>
                    <h2>مطالب مهم</h2>
                    <div className={styles.postList}>
                        {allPosts.map((post) => (
                            <p key={post.id} onClick={() => navigate(`/posts/${post.id}/`)}>{post.post_name}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.commentSction}>
                <UserComment postInfo={state.postInfo} />
            </div>
        </div>
    )
}

export default PostDetail