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
    Grid,
    Link,
} from "@mui/material"

//mui icon
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';

//components
import UserComment from '../../userComment/UserComment';
import Card from "../../../components/card/Card"


function PostDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const GlobalState = useContext(StateContext)



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





    const [userLike, setUserLike] = useState(state.postInfo.user_like);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);



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




    const handleLike = () => {
        const likeDislikeValue = !userLike;
        const userId = GlobalState.userId;
        const postId = state.postInfo.id;

        Axios.post(`https://api.amlakeeno.ir/api/posts/${state.postInfo.id}/like_dislike/`,
            {
                user_id: userId,
                post_id: postId,
                like_dislike: likeDislikeValue
            })
            .then(response => {
                setUserLike(likeDislikeValue);
                setLikeCount(response.data.like_count);
                setDislikeCount(response.data.dislike_count);
            })
            .catch(error => {
                console.log(error);
            });
    };



    const handleDislike = () => {
        const likeDislikeValue = !userLike;
        const userId = GlobalState.userId;
        const postId = state.postInfo.id;

        Axios.post(`https://api.amlakeeno.ir/api/posts/${state.postInfo.id}/like_dislike/`,
            {
                user_id: userId,
                post_id: postId,
                like_dislike: likeDislikeValue
            })
            .then(response => {
                setUserLike(likeDislikeValue);
                setLikeCount(response.data.like_count);
                setDislikeCount(response.data.dislike_count);
            })
            .catch(error => {
                console.log(error);
            });
    };







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
            <div className={styles.cardContentImage}>
                <Card cardClass={styles.cardConetntPost}>
                    <h1>{state.postInfo.post_name}</h1>
                    <p>{state.postInfo.description}</p>
                    {/* <button onClick={handleLike}>
                        <FontAwesomeIcon icon={userLike ? faThumbsUp : faThumbsDown} />
                    </button>
                    <p>Like Count: {state.postInfo.like_count}</p>
                    {likeCount}

                    <button onClick={handleDislike}>
                        <FontAwesomeIcon icon={userLike ? faThumbsDown : faThumbsUp} />
                    </button>
                    <p>Dislike Count: {state.postInfo.dislike_count}</p>
                    {dislikeCount} */}
                </Card>

                <Card cardClass={styles.picturePost}>
                    <img src={state.postInfo.image} alt="picture1" />
                </Card>
            </div>

            <div className={styles.commentSction}>
                <UserComment postInfo={state.postInfo} />
            </div>
        </div>
    )
}

export default PostDetail