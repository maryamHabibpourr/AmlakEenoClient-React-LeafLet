import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import Axios from 'axios';
import Card from "../card/Card"
//Assets
import defaultProfilePicture from "../../assets/defaultProfilePicture.jpg"
//styles
import styles from "./profileUpdate/ProfileUpdate.module.scss"
import { useImmerReducer } from "use-immer";
//context
import StateContext from "../../Context/StateContext";
//MUI
import {
    Grid,
    Typography,
    Button,
    CircularProgress,
    Breadcrumbs,
     Link,
} from "@mui/material"
import { makeStyles } from '@mui/styles';
//mui icons
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
//components
import ProfileUpdate from "./profileUpdate/ProfileUpdate";
//persian tools
import { digitsEnToFa } from "@persian-tools/persian-tools";




const useStyles = makeStyles({
    formContainer: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3rem",
        border: "5px solid black",
        padding: "3rem"
    },
    registrationStyle: {
        backgroundColor: "green",
        color: "white",
        fontSize: "1.1rem",
        marginLeft: "1rem",
        "&:hover": {
            backgroundColor: "blue"
        }
    },
    pictureBtn: {
        backgroundColor: "blue",
        color: "white",
        fontSize: "0.8rem",
        border: "1px solid black",
        marginLeft: "1rem",
    },
    dispalyPrpertyBtn: {
        color: "#e10a1d",
        fontSize: "1rem",
        fontWeight: "800"
    }
})



function Profile() {

    const classes = useStyles()
    const navigate = useNavigate()
    const GlobalState = useContext(StateContext)


    const initialState = {
        userProfile: {
            agencyName: "",
            phoneNumber: "",
            profilePic: "",
            bio: "",
            sellerId: "",
            sellerListings: [],

        },
        dataIsLoading: true,
    }


    function ReducerFunction(draft, action) {
        // eslint-disable-next-line default-case
        switch (action.type) {
            case 'catchUserProfileInfo':
                draft.userProfile.agencyName = action.profileObject.agency_name;
                draft.userProfile.phoneNumber = action.profileObject.phone_number;
                draft.userProfile.profilePic = action.profileObject.profile_picture;
                draft.userProfile.bio = action.profileObject.bio;
                draft.userProfile.sellerListings = action.profileObject.seller_listings;
                draft.userProfile.sellerId = action.profileObject.seller
                break

            case "loadingDone":
                draft.dataIsLoading = false
        }
    }
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)




    

    useEffect(() => {
        async function GetProfileInfo() {
            try {
                const response = await Axios.get(`https://api.amlakeeno.ir/api/profiles/${GlobalState.userId}`);
                console.log(response.data)
                dispatch({
                    type: "catchUserProfileInfo",
                    profileObject: response.data
                })
                dispatch({ type: 'loadingDone' })
            } catch (e) {
                console.log(e.response)
            }

        }
        GetProfileInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    


    function PropertiesDispaly() {
        if (state.userProfile.sellerListings.length === 0) {
            return (
                <Button disabled className={classes.dispalyPrpertyBtn}>
                    هیچ ملکی توسط شما ثبت نشده است.
                </Button>
            )
        }
        else if (state.userProfile.sellerListings.length === 1) {
            return (
                <Button className={classes.dispalyPrpertyBtn} onClick={() => navigate(`/agencies/${state.userProfile.sellerId}`)}>
                    یک ملک توسط شما ثبت شده است.
                </Button>
            )
        }
        else {
            return (
                <Button className={classes.dispalyPrpertyBtn} onClick={() => navigate(`/agencies/${state.userProfile.sellerId}`)}>
                    {digitsEnToFa(state.userProfile.sellerListings.length)}  آگهی ملک توسط شما ثبت شده است!
                </Button>
            )
        }
    }





    function WelcomDispaly() {
        if (
            state.userProfile.agencyName === null ||
            state.userProfile.agencyName === "" ||
            state.userProfile.phoneNumber === null ||
            state.userProfile.phoneNumber === ""
        ) {
            return (
                <Grid item container justifyContent="space-between" alignItems="center" flexDirection="column">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5"
                            style={{ color: "#35A299", fontSize: "1rem", fontWeight: "700", }}>
                            <span style={{ color: "green", fontSize: "1.1rem" }}>{GlobalState.userUsername}</span>{" "}
                            خوش آمدید!{" "}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5"
                            style={{ color: "#35A299", fontSize: "1rem", fontWeight: "700", marginTop: "10px" }}>
                            لطفا فرم زیر را تکمیل نمایید!
                        </Typography>
                    </Grid>
                </Grid>
            )
        }
        else {
            return (
                <Grid item container justifyContent="space-between" alignItems="center" flexDirection="column"
                >
                    <Grid item xs={12} md={6} alignItems="center">
                        <img
                            style={{ height: "8rem", width: "10rem" , borderRadius:"50%"}}
                            src={state.userProfile.profilePic !== null
                                ? state.userProfile.profilePic
                                : defaultProfilePicture}
                            alt="picture1" />
                    </Grid>

                    <Grid item xs={12} md={6} alignItems="center">
                        <Typography variant="h5"
                            style={{ textAlign: "center", marginTop: "1rem", color: "gray", fontSize: "1.1rem" }}>
                            <span style={{ color: "green", fontSize: "1.1rem" }}>{GlobalState.userUsername}</span>
                            عزیز خوش آمدید{" "}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} alignItems="center">
                        <Typography variant="h5"
                            style={{ color: "#35A299", textAlign: "center", fontSize: "1rem", fontWeight: "700", marginTop: "10px" }}>
                            {PropertiesDispaly()}
                        </Typography>
                    </Grid>
                </Grid>
            )
        }

    }



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
        <div className={styles.formProfileContainer}>
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
                          تنظیمات حساب کاربری
                    </Typography>
                </Breadcrumbs>
            </div>
            <Card cardClass={styles.cardprofileinfoContainer}>
                {WelcomDispaly()}
            </Card >
            <ProfileUpdate userProfile={state.userProfile} />
        </div>
    )
}

export default Profile