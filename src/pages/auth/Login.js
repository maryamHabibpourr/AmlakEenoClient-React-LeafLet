import { useState, useEffect, useContext } from "react";
import styles from "./auth.module.scss";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Axios from 'axios';
import { useImmerReducer } from "use-immer";

//mui
import { makeStyles } from '@mui/styles';
import { CssTextField } from "../../muiSettings/Settings";
import {  Typography, Button, Snackbar, Alert } from "@mui/material"
import Grid from '@mui/material/Grid2';



//Context
import DispatchContext from "../../Context/DispatchContext";
import StateContext from "../../Context/StateContext";



//pages
import Register from './Register'


const useStyles = makeStyles({
  registrationStyle: {
    backgroundColor: "var(--color-red) !important",
    color: "#fff",
    fontSize: "1rem",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "var( --color-dark-red)",
      transform: "translateX(5px)",
      transition: "all 0.2 ease"
    }
  },
  alert: {
    fontSize: "1rem !important"
  }

})





const Login = ({setRegisterOpen, setLoginOpen }) => {

  const navigate = useNavigate();
  const classes = useStyles()
  const GlobalDispatch = useContext(DispatchContext)
 


  const initialState = {
    username: '',
    email: '',
    password: '',
    cPassword: '',
    sendRequest: 0,
    token: '',
    openSnack: false,
    disabledBtn: false,
    serverError: false,

  }


  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchUsernameChange":
        draft.username = action.usernameChose;
        draft.serverError = false;
        break;

      case "catchPasswordChange":
        draft.password = action.passwordChose;
        draft.serverError = false;
        break;


      case 'changeSendRequest':
        draft.sendRequest = draft.sendRequest + 1
        break;

      case 'catchToken':
        draft.token = action.tokenValue
        break

      case 'openTheSnack':
        draft.openSnack = true
        break

      case 'disableTheButton':
        draft.disabledBtn = true
        break

      case 'allowTheButton':
        draft.disabledBtn = false
        break

      case 'catchServerError':
        draft.serverError = true;
        break
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)




  //setting loggin user#######
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "changeSendRequest" })
    dispatch({ type: 'catchToken' })
    dispatch({ type: 'disableTheButton' })
  }

  
  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignIn() {
        try {
          const response = await Axios.post(
            "https://api.amlakeeno.ir/api-auth-djoser/token/login",
            {
              username: state.username,
              password: state.password,
            },
            {
              cancelToken: source.token
            }
          )
          console.log(response)
          dispatch({ type: 'catchToken', tokenValue: response.data.auth_token })
          GlobalDispatch({ type: 'catchToken', tokenValue: response.data.auth_token })
        } catch (error) {
          console.log(error.response)
          dispatch({ type: 'allowTheButton' })
          dispatch({ type: "catchServerError" })
        }
      }
      SignIn();
      return () => {
        source.cancel()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sendRequest],)




  //Get user Info
  useEffect(() => {
    if (state.token !== "") {
      const source = Axios.CancelToken.source();
      async function GetUserInfo() {
        try {
          const response = await Axios.get(
            "https://api.amlakeeno.ir/api-auth-djoser/users/me/",
            {
              headers: { 'Authorization': 'Token '.concat(state.token) }
            },
            {
              cancelToken: source.token
            }
          )
          console.log(response)
          GlobalDispatch({
            type: 'userSignIn',
            usernameInfo: response.data.username,
            emailInfo: response.data.email,
            IdInfo: response.data.id
          })
          dispatch({ type: "openTheSnack" })
        } catch (error) {
          console.log(error.response)
        }
      }
      GetUserInfo();
      return () => {
        source.cancel()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token],)



  //SETTING FOR SNACKBAR
  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        setLoginOpen(false)
        navigate(0)
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.openSnack])



function RegisterAct(){
  setLoginOpen(false)
  setRegisterOpen(true)
}



  return (
    <section className={styles.auth}>
      <div className={styles.container}>
        <Card cardClass={styles.card}>
          <div className={styles.titleCloseBtn}>
            <button style={{ color: "#e10a1d" }}
              onClick={() => {
                setLoginOpen(false);
              }}
            >
              X
            </button>
          </div>
          <div className={styles.form}>
            <form onSubmit={formSubmit}>
              <Grid item container
                justifyContent={"center"}>
                <Typography variant='h6' style={{ color: "#e10a1d" }}>
                  ورود
                </Typography>
              </Grid>
              {state.serverError ? (
                <Alert severity="error" className={classes.alert}>رمز عبور یا نام کاربری اشتباه است.</Alert>
              ) : (
                ""
              )}
              <Grid item container
                style={{ marginTop: "1rem", fontSize: "1.5rem" }}>
                <CssTextField
                  id="phoneNumber"
                  label="نام کاربری"
                  variant="outlined"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  FormHelperTextProps={{ style: { fontSize: 13 } }}
                  fullWidth
                  value={state.username}
                  onChange={(e) =>
                    dispatch({
                      type: 'catchUsernameChange',
                      usernameChose: e.target.value
                    })}
                  error={state.serverError ? true : false}
                />
              </Grid>


              <Grid item container
                style={{ marginTop: "1rem" }}>
                <CssTextField
                  id="password"
                  label="رمز عبور"
                  variant="outlined" fullWidth
                  value={state.password}
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  FormHelperTextProps={{ style: { fontSize: 13 } }}
                  type='password'

                  onChange={(e) =>
                    dispatch({
                      type: 'catchPasswordChange',
                      passwordChose: e.target.value
                    })}
                  error={state.serverError ? true : false}
                />
              </Grid>


              <Grid item container
                style={{
                  marginTop: "1rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "2rem"
                }}
                xs={8}>

                <Button
                  variant='contained'
                  fullWidth
                  type='submit'
                  className={classes.registrationStyle}
                  disabled={state.disabledBtn}
                >
                  ورود
                </Button>
              </Grid>
            </form>
            <Grid item container justifyContent={"center"} style={{ marginTop: "1rem" }}>
              <Typography variant='small' style={{ color: "gray",fontSize:"13px" }}>
                قبلاً ثبت نام نموده اید؟
                <span
                  onClick={RegisterAct}
                  style={{ cursor: "pointer", color: "var(--color-red)",fontSize:"13px" }}>
                  ثبت نام
                </span>
              </Typography>
            </Grid>
            
            <Snackbar
              open={state.openSnack}
              message="با موفقیت وارد شدید !"
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

          </div>
        </Card>
      </div >
    </section >
  )
}

export default Login