/* eslint-disable default-case */
import react, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import Axios from 'axios';
import { useImmerReducer } from "use-immer";
import Card from "../../card/Card"
//context
import StateContext from "../../../Context/StateContext";
//styles
import styles from "./ProfileUpdate.module.scss"
//Icons
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
//MUI
import {
  Button,
  TextField,
  Snackbar,
} from "@mui/material"
import Grid from '@mui/material/Grid2';
import { makeStyles } from '@mui/styles';

//persian tools
import { convertDigits } from "persian-helpers";




const useStyles = makeStyles({
  registrationStyle: {
    backgroundColor: "#82050f !important",
    border:"#82050f !important",
    color: "white !important",
    fontSize: "1rem",
    // marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "gray !important"
    }
  },
  pictureBtn: {
    backgroundColor: "white !important",
    color: "black !important",
    fontSize: "0.8rem",
    // marginLeft: "1rem",
    marginBottom:"15px",
    border: "2px dotted red !important",
  },

})



const ProfileUpdate = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const GlobalState = useContext(StateContext)



 
  

  const initialState = {
    agencyNameValue: convertDigits(props.userProfile.agencyName),
    phoneNumberValue: convertDigits(props.userProfile.phoneNumber),
    bioValue: convertDigits(props.userProfile.bio),
    profilePictureValue: props.userProfile.profilePic,
    uploadedPicture: [],
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,

  }



  
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case 'catchAgencyNameChange':
        draft.agencyNameValue = convertDigits(action.agencyNameChose)
        break

      case 'catchPhoneNumberChange':
        draft.phoneNumberValue = convertDigits(action.phoneNumberChose)
        break

      case 'catchBioChange':
        draft.bioValue = convertDigits(action.bioChose)
        break


      case 'catchUploadedPicture':
        draft.uploadedPicture = action.pictureChose
        break

      case "catchProfilePictureChange":
        draft.profilePictureValue = action.profilePictureChose
        break


      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1
        break

      case 'openTheSnack':
        draft.openSnack = true
        break

      case 'disableTheButton':
        draft.disabledBtn = true
        break

      case 'allowTheButton':
        draft.disableBtn = false
        break


    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)






  // useEffect for catch picture profile########################################

  useEffect(() => {
    if (state.uploadedPicture[0]) {
      dispatch({
        type: "catchProfilePictureChange",
        profilePictureChose: state.uploadedPicture[0]
      })
    }
  }, [state.uploadedPicture[0]])



  ////setting for submit#####################################################################
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "changeSendRequest" })
    dispatch({ type: 'disableTheButton' })
  }

  //axis for submit for send Request###################################################
  useEffect(() => {
    if (state.sendRequest) {
      async function UpadteProfile() {
        const formData = new FormData()
        if (
          typeof state.profilePictureValue === "string" ||
          state.profilePictureValue === null
        ) {
          formData.append("agency_name", state.agencyNameValue);
          formData.append("phone_number", state.phoneNumberValue);
          formData.append("bio", state.bioValue);
          formData.append("seller", GlobalState.userId);

        } else {
          formData.append("agency_name", state.agencyNameValue);
          formData.append("phone_number", state.phoneNumberValue);
          formData.append("bio", state.bioValue);
          formData.append("profile_picture", state.profilePictureValue);
          formData.append("seller", GlobalState.userId);
        }

        try {
          const response = await Axios.patch(`https://api.amlakeeno.ir/api/profiles/${GlobalState.userId}/update/`, formData);
          console.log(response.data)
          dispatch({ type: "openTheSnack" })
        } catch (e) {
          console.log(e.response)
          dispatch({ type: "allowTheButton" })
        }
      }
      UpadteProfile()
    }

  }, [state.sendRequest])


  // setting for after login##########################################
  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate(0)
      }, 1500);
    }
  }, [state.openSnack])




  

  //setting for showing name if the picture
  function ProfilePictureDispaly() {
    if (typeof state.profilePictureValue !== "string") {
      return (
        <ul>
          {state.profilePictureValue ? <li>{state.profilePictureValue.name}</li> : ""}
        </ul>
      )
    }
    else if (typeof state.profilePictureValue === "string") {
      return (
        <Grid item
          style={{ marginTop: "0.5rem", marginRight: "auto", marginLeft: "auto" }}>
          <img src={props.userProfile.profilePic}
            style={{ height: "5rem", width: "5rem" }} alt="picture2" />
        </Grid>
      )
    }
  }




  return (
    <div className={styles.formContainer}>
      <Card cardClass={styles.cardContainer}>
        <form onSubmit={formSubmit}>

          <Grid item container
            style={{ marginTop: "1rem" }}>
            <TextField
              id="agencyName"
              label="نام*"
              variant="outlined"
              value={state.agencyNameValue}
              onChange={(e) => dispatch({
                type: 'catchAgencyNameChange',
                agencyNameChose: e.target.value
              })}
              fullWidth
            />
          </Grid>
          <Grid item container
            style={{ marginTop: "1rem" }}>
            <TextField
              id="phoneNumber"
              label="شماره تلفن*"
              variant="outlined"
              fullWidth
              value={state.phoneNumberValue}
              onChange={(e) => dispatch({
                type: 'catchPhoneNumberChange',
                phoneNumberChose: e.target.value
              })}
            />
          </Grid>
          <Grid item container
            style={{ marginTop: "1rem" }}>
            <TextField
              id="bio"
              label="توضیحات"
              variant="outlined"
              multiline
              rows={6}
              fullWidth
              value={state.bioValue}
              onChange={(e) => dispatch({
                type: 'catchBioChange',
                bioChose: e.target.value
              })}
            />
          </Grid>

          <Grid item container>
            {ProfilePictureDispaly()}
          </Grid>

          <Grid container spacing={2}  style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
          <Grid item size={6}
            style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
            xs={6}>
            <Button
              component="label"
              variant='contained'
              fullWidth
              type='submit'
              className={classes.pictureBtn}
            >
              آپلود عکس 
              <input type="file"
                accept="image/png, image/gif, image/jpeg"
                hidden
                onChange={(e) => dispatch({
                  type: "catchUploadedPicture",
                  pictureChose: e.target.files
                })}
              />
              <DownloadForOfflineIcon style={{ marginRight: "10px" }} />
            </Button>
          </Grid>

         

          <Grid item size={6}
            style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
            xs={8}>
            <Button
              variant='contained'
              fullWidth
              type='submit'
              className={classes.registrationStyle}
              disabled={state.disabledBtn}
            >
              به روز رسانی
            </Button>
          </Grid>
          </Grid>
        </form>
      </Card>


      <Snackbar
        open={state.openSnack}
        message="به روز رسانی با موفقیت انجام شد"
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

  )
}

export default ProfileUpdate