import { useEffect, useContext } from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
//mui
import { Typography, Button, Snackbar, Alert } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { makeStyles } from '@mui/styles';
import { CssTextField } from "../../muiSettings/Settings";
//Context
import { useImmerReducer } from "use-immer";
import DispatchContext from "../../Context/DispatchContext";
import StateContext from "../../Context/StateContext";





const useStyles = makeStyles({
  registrationStyle: {
    backgroundColor: "var(--color-red) !important",
    color: "#fff",
    fontSize: "1rem",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "var( --color-dark-red) !important",
      transform: "translateX(5px)",
      transition: "all 0.2 ease"
    }
  },
  alert: {
    fontSize: "1rem !important"
  }
})




const Register = ({ setRegisterOpen, setLoginOpen }) => {
  const navigate = useNavigate();
  const classes = useStyles()
  const GlobalDispatch = useContext(DispatchContext)
  const GlobalState = useContext(StateContext)



  const initialState = {
    username: '',
    email: '',
    password: '',
    cPassword: '',
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,
    usernameErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    emailErrors: {
      hassErrors: false,
      errorMessage: "",
    },
    passwordErrors: {
      hassErrors: false,
      errorMessage: "",
    },
    password2HelperText: "",
    serverMessageUsername: "",
    serverMessageEmail: "",
    serverMessageSimilarPassword: "",
    serverMessageCommonPassword: "",
    serverMessageNeumericPassword: "",
    serverMessageSimilarEmailPassword: ""
  }



  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUsernameChange":
        draft.username = action.usernameChose;
        draft.usernameErrors.hasErrors = false;
        draft.usernameErrors.errorMessage = ""
        draft.serverMessageUsername = ""
        break;

      case "catchEmailChange":
        draft.email = action.emailChose;
        draft.emailErrors.hasErrors = false
        draft.emailErrors.errorMessage = ""
        draft.serverMessageEmail = ""
        break;

      case "catchPasswordChange":
        draft.password = action.passwordChose;
        draft.passwordErrors.hasErrors = false;
        draft.passwordErrors.errorMessage = "";
        draft.serverMessageSimilarPassword = "";
        draft.serverMessageCommonPassword = "";
        draft.serverMessageNeumericPassword = "";
        draft.serverMessageSimilarEmailPassword = ""
        break;

      case "catchcPasswordChange":
        draft.cPassword = action.cPasswordChose;
        if (action.cPasswordChose !== draft.password) {
          draft.password2HelperText = "رمز عبور باید شبیه باشد"
        }
        else if (action.cPasswordChose === draft.password) {
          draft.password2HelperText = ""
        }
        break;

      case 'changeSendRequest':
        draft.sendRequest = draft.sendRequest + 1
        break;

      case 'openTheSnack':
        draft.openSnack = true
        break

      case 'disableTheButton':
        draft.disabledBtn = true
        break

      case 'allowTheButton':
        draft.disabledBtn = false
        break

      case 'catchUsernameErrors':
        if (action.usernameChose.length === 0) {
          draft.usernameErrors.hasErrors = true
          draft.usernameErrors.errorMessage =
            "این فیلد نباید خالی باشد"
        }
        else if (action.usernameChose.length < 5) {
          draft.usernameErrors.hasErrors = true
          draft.usernameErrors.errorMessage =
            "نام کاربری حداقل باید هشت حرف داشته باشد."
        }
        else if (!/^([a-zA-Z0-9]+)$/.test(action.usernameChose)) {
          draft.usernameErrors.hasErrors = true
          draft.usernameErrors.errorMessage =
            "نام کاربری نباید از علائم نگارشی خاص ساخته شود"
        }
        break

      case "catchEmailErrors":
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(action.emailChose)) {
          draft.emailErrors.hasErrors = true
          draft.emailErrors.errorMessage =
            "لطفاً یک ایمیل معتبر وارد نمایید."
        }
        break

      case 'catchPasswordErrors':
        if (action.passwordChose.length < 8) {
          draft.passwordErrors.hasErrors = true;
          draft.passwordErrors.errorMessage =
            "رمز عبور باید حداقل هشت حرف باشد."
        }
        break

      case 'usernameExists':
        draft.serverMessageUsername = "این نام کاربری قبلاً ایجاد شده است."
        break

      case 'emailExists':
        draft.serverMessageEmail = "این ایمیل قبلاً به کار برده شده است."
        break

      case 'similarPassword':
        draft.serverMessageSimilarPassword = "رمز عبور بسیار شبیه به نام کاربری است."
        break

      case 'commonPassword':
        draft.serverMessageCommonPassword = "رمز عبور بسیار رایج است"
        break

      case 'numericPassword':
        draft.serverMessageNeumericPassword = "رمز عبور نباید فقط شامل عدد شود."
        break

      case 'similarEmailPassword':
        draft.serverMessageSimilarEmailPassword = "رمز عبور بسیار شبیه به ایمیل است."
        break


    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)




  
  const formSubmit = (e) => {
    e.preventDefault();
    if (
      !state.usernameErrors.hasErrors &&
      !state.emailErrors.hassErrors &&
      !state.passwordErrors.hassErrors &&
      state.password2HelperText === ""
    ) {
      dispatch({ type: "changeSendRequest" })
      dispatch({ type: 'disableTheButton' })
    }
  }

  
  
  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignUp() {
        try {
          const response = await Axios.post(
            "https://api.amlakeeno.ir/api-auth-djoser/users/",
            {
              username: state.username,
              email: state.email,
              password: state.password,
              re_password: state.cPassword,
            },
            {
              cancelToken: source.token
            }
          )
          // console.log(response)
          dispatch({ type: "openTheSnack" })
        } catch (error) {
          dispatch({ type: 'allowTheButton' })
          // console.log(error.response)
          if (error.response.data.username) {
            dispatch({ type: "usernameExists" })
          }
          else if (error.response.data.email) {
            dispatch({ type: "emailExists" })
          }
          else if (error.response.data.password[0] === 'این رمز عبور بسیار شبیه نام کاربری می‌باشد.') {
            dispatch({ type: "similarPassword" })
          }
          else if (error.response.data.password[0] === 'این رمز عبور بسیار رایج است.') {
            dispatch({ type: "commonPassword" })
          }
          else if (error.response.data.password[0] === 'رمز شما کلا عدد است') {
            dispatch({ type: "numericPassword" })
          }
          else if (error.response.data.password[0] === 'این رمز عبور بسیار شبیه email می‌باشد.') {
            dispatch({ type: "similarEmailPassword" })
          }
        }
      }
      SignUp();
      return () => {
        source.cancel()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sendRequest],)




  //SETTING FOR SNACKBAR

  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        setRegisterOpen(false)
        setLoginOpen(true)
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.openSnack])




  function HandleRegister() {
    setRegisterOpen(false)
    setLoginOpen(true)
  }




  return (
    <>
      <section className={styles.auth}>
        <div className={styles.container}>
          <Card cardClass={styles.card}>
            <div className={styles.titleCloseBtn}>
              <button
                style={{ color: "var(--color-red)" }}
                onClick={() => {
                  setRegisterOpen(false);
                }}
              >
                X
              </button>
            </div>
            <div className={styles.form}>
              <form onSubmit={formSubmit}>
                <Grid item container
                  justifyContent={"center"}>
                  <Typography variant='h6' style={{color:"var(--color-red)"}} >
                    ثبت نام
                  </Typography>
                </Grid>


                {state.serverMessageUsername ?

                  <Alert severity="error" className={classes.alert}>{state.serverMessageUsername}</Alert>

                  : ""}


                {state.serverMessageEmail ?

                  <Alert severity="error" className={classes.alert}>{state.serverMessageEmail}</Alert>

                  : ""}



                {state.serverMessageSimilarPassword ?

                  <Alert severity="error" className={classes.alert}>{state.serverMessageSimilarPassword}</Alert>

                  : ""}



                {state.serverMessageCommonPassword ?

                  <Alert severity="error" className={classes.alert}>{state.serverMessageCommonPassword}</Alert>

                  : ""}



                {state.serverMessageNeumericPassword ?

                  <Alert severity="error" className={classes.alert}>{state.serverMessageNeumericPassword}</Alert>

                  : ""}

                {state.serverMessageSimilarEmailPassword ?

                  <Alert severity="error" className={classes.alert}>{state.serverMessageSimilarEmailPassword}</Alert>

                  : ""}



                <Grid item container
                  style={{ marginTop: "1rem", fontSize: "1.5rem" }}>
                  <CssTextField
                    id="username"
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
                    onBlur={(e) =>
                      dispatch({
                        type: 'catchUsernameErrors',
                        usernameChose: e.target.value
                      })}
                    error={state.usernameErrors.hasErrors ? true : false}
                    helperText={state.usernameErrors.errorMessage}
                  />
                </Grid>


                <Grid item container
                  style={{ marginTop: "1rem" }}>
                  <CssTextField
                    id="email"
                    label="ایمیل"
                    variant="outlined"
                    value={state.email}
                    fullWidth
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 13 } }}
                    FormHelperTextProps={{ style: { fontSize: 13 } }}
                    onChange={(e) =>
                      dispatch({
                        type: 'catchEmailChange',
                        emailChose: e.target.value
                      })}
                    onBlur={(e) =>
                      dispatch({
                        type: 'catchEmailErrors',
                        emailChose: e.target.value
                      })}
                    error={state.emailErrors.hasErrors ? true : false}
                    helperText={state.emailErrors.errorMessage}
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

                    onBlur={(e) =>
                      dispatch({
                        type: 'catchPasswordErrors',
                        passwordChose: e.target.value
                      })}

                    error={state.passwordErrors.hasErrors ? true : false}
                    helperText={state.passwordErrors.errorMessage}
                  />
                </Grid>


                <Grid item container
                  style={{ marginTop: "1rem" }}>
                  <CssTextField
                    id="password2"
                    label="تکرار رمز عبور"
                    variant="outlined"
                    fullWidth
                    type='password'
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 13 } }}
                    FormHelperTextProps={{ style: { fontSize: 13 } }}
                    value={state.cPassword}
                    onChange={(e) =>
                      dispatch({
                        type: 'catchcPasswordChange',
                        cPasswordChose: e.target.value
                      })}
                    helperText={state.password2HelperText}
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
                    sx={{ backgroundColor: '#1f93ff' }}
                    className={classes.registrationStyle}
                    disabled={state.disabledBtn}
                  >
                    ثبت نام
                  </Button>

                </Grid>
              </form>
              <Grid item container justifyContent={"center"} style={{ marginTop: "1rem" }}>
                <Typography variant='small' style={{ color: "gray", fontSize: "13px" }}>
                  قبلاً ثبت نام نموده اید؟
                  <span
                    onClick={HandleRegister}
                    style={{ cursor: "pointer", color: "var(--color-red)", fontSize: "13px" }}>
                    ورود
                  </span>
                </Typography>
              </Grid>

              <Snackbar
                open={state.openSnack}
                message="ثبت نام با موفقیت انجام شد!"
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
        </div>
      </section>
    </>
  );
};

export default Register;