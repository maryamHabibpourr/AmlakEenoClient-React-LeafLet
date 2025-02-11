import { useEffect, useContext } from "react";
import React from "react";
import styles from "./auth.module.scss"
import { useNavigate, useParams } from "react-router-dom"
import Axios from 'axios';
import Card from "../../components/card/Card";


//mui
import { makeStyles } from '@mui/styles';
import { CssTextField } from "../../muiSettings/Settings";
import { Typography, Button, Snackbar, Alert } from "@mui/material"
import Grid from '@mui/material/Grid2';




//Context
import { useImmerReducer } from "use-immer";
import DispatchContext from "../../Context/DispatchContext";
import StateContext from "../../Context/StateContext";



function Reset() {

  const navigate = useNavigate()
  const params = useParams()


  const GlobalState = useContext(StateContext)

  
  const initialState = {
    email: '',
  }

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchEmailChange":
        draft.email = action.emailChose;
        break;

    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)



  async function ResetPassword() {
    try {
      const response = await Axios.post(
        "https://api.amlakeeno.ir/api-auth-djoser/users/reset_{USERNAME_FIELD}/",
        {
          email: state.email
        })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <section className={styles.auth}>
      <div className={styles.container}>
        <Card cardClass={styles.card}>
          <div className={styles.titleCloseBtn}>
            <button style={{ color: "#fecc01" }}
            >
              X
            </button>
          </div>
          <div className={styles.form}>
            <form onSubmit={ResetPassword}>
              <Grid item container
                justifyContent={"center"}>
                <Typography variant='h5' >
                  بازگرداندن پسورد
                </Typography>
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
                >
                  ثبت
                </Button>
              </Grid>
            </form>
          </div>
        </Card>
      </div >
    </section >
  )
}

export default Reset