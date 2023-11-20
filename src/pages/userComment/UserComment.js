import React, {useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./UserComment.module.scss"
import moment from 'jalali-moment';
import StateContext from "../../Context/StateContext"
import { useImmerReducer } from "use-immer";
import Axios from "axios"

//mui
import { Button, TextField, Typography, Snackbar } from '@mui/material';

//persian tools
import { digitsEnToFa } from "@persian-tools/persian-tools";


//components
import Login from "../auth/Login"
import Register from '../auth/Register';
import Card from "../../components/card/Card"


function UserComment({ postInfo }) {

  const GlobalState = useContext(StateContext)
  const navigate = useNavigate()
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);



  const initialState = {
    bodymessage: "",
    sendRequest: 0,
    openSnack: false,
    bodymessageErrors: {
      hasErrors: false,
      errorMessage: "",
    },
  }




  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'catchBodyInfo':
        draft.bodymessage = action.bodyMessageChosen;
        draft.bodymessageErrors.hasErrors = false;
        draft.bodymessageErrors.errorMessage = "";
        break
      case 'changeSendRequest':
        draft.sendRequest = draft.sendRequest + 1
        break;
      case 'openTheSnack':
        draft.openSnack = true
        break
      case 'catchBodyMessageErrors':
        if (action.bodyMessageChosen.length === 0) {
          draft.bodymessageErrors.hasErrors = true;
          draft.bodymessageErrors.errorMessage = "یادداشتی نوشته نشده است!";
        }
        break;
    }
  }


  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)



  function postComment() {
    if (!state.bodymessageErrors.hasErrors) {
      dispatch({ type: 'changeSendRequest' });
    }
  }



  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();
      async function CommentBody() {
        try {
          const response = await Axios.post(
            'https://api.amlakeeno.ir/api/comments/create/',
            {
              body: state.bodymessage,
              post: postInfo.id,
              user: GlobalState.userId
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${GlobalState.userToken}`
              },
              cancelToken: source.token
            },
            dispatch({ type: "openTheSnack" }),
          );
          console.log(response);
        } catch (error) {
          console.log(error.response);
        }
      }
      CommentBody();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);




  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate(0)
      }, 1500);
    }
  }, [state.openSnack])




  return (
    <div className={styles.commentComponent}>
      <Card cardClass={styles.CommentPostContainer}>
        {GlobalState.userIsLogged ? "" :
          <span>لطفاً برای فعال شدن کلید ثبت دیدگاه اول ورود نمایید<Link onClick={()=>setLoginOpen(true)} style={{ color: "blue" }}>ورود</Link></span>
        }

        <div className={styles.commentPost}>
          <TextField
            style={{ width: "100%" }}
            inputProps={{ style: { fontSize: 17 } }}
            InputLabelProps={{ style: { fontSize: 13 } }}
            label="دیدگاه جدید"
            multiline
            rows={4}
            variant="outlined"
            value={state.bodymessage}
            onChange={(e) => dispatch({
              type: 'catchBodyInfo',
              bodyMessageChosen: e.target.value
            })}
            onBlur={(e) =>
              dispatch({
                type: 'catchBodyMessageErrors',
                bodyMessageChosen: e.target.value
              })}
            error={state.bodymessageErrors.hasErrors ? true : false}
            helperText={state.bodymessageErrors.errorMessage}
          />
          <Button
            disabled={!GlobalState.userIsLogged}
            variant='contained'
            color='primary'
            onClick={postComment}
          >
            ارسال دیدگاه
          </Button>
        </div>
      </Card>

      <Card cardClass={styles.container}>
        <h3>نظرات شما:</h3>
        {postInfo.comments.map((comment) => {
          return (
            <div className={styles.dialogBox}>
              <div className={styles.dialogBody}>
                <p>{comment.body}</p>
              </div>
              <Typography className={styles.time}>
                {digitsEnToFa(moment(comment.time, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD').toString())}
              </Typography>
              <Typography className={styles.user}>
                {comment.user}
              </Typography>
            </div>
          )
        })}
      </Card>

      <Snackbar
        open={state.openSnack}
        message="با موفقیت ثبت شد  !"
        ContentProps={{
          style:
          {
            fontSize: "1rem",
            fontFamily: "YekanBakh",
            fontWeight: "500",
            background: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            color: "#fff",
            bottom: "10px"
          }
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
      {loginOpen && <Login setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} />}
      {registerOpen && <Register setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />}
    </div>
  )
}

export default UserComment