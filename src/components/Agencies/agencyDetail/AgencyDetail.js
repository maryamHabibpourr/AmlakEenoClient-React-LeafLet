import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Axios from 'axios';
import { useImmerReducer } from "use-immer";

//Assets
import defaultProfilePicture from "../../../assets/defaultProfilePicture.jpg"

//Card
import Card from "../../card/Card"

//styles
import styles from "./َAgencyDetail.module.scss"

//MUI
import {
    Grid,
    CircularProgress,
    IconButton,
    Divider,
    Chip,
    Breadcrumbs,
    Link,
    Typography
} from "@mui/material"


//mui icon
import WatchLaterIcon from '@mui/icons-material/WatchLater';

//react Icon
import { AiFillPhone } from "react-icons/ai"


//persian tools
import { digitsEnToFa } from "@persian-tools/persian-tools";

//date
import moment from 'jalali-moment';


//mui icons
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';

function AgencyDetail() {



    const navigate = useNavigate()
    // console.log(useParams())
    const params = useParams()




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
                break
        }
    }
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)




    useEffect(() => {
        async function GetProfileInfo() {
            try {
                const response = await Axios.get(`https://api.amlakeeno.ir/api/profiles/${params.id}/`);
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




    //   const handleClick = (phoneNumber) => {
    //     window.location.href = `tel:${phoneNumber}`;
    //   };


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
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate("/agencies")}
                        style={{ cursor: "pointer", fontFamily:"YekanBakh"}}>
                          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                         آگهی کننده گان
                    </Link>
                    <Typography color="red" style={{ fontWeight: "500" }}>
                    {state.userProfile.agencyName} 
                    </Typography>
                </Breadcrumbs>
            </div>

        <div className={styles.formProfileMainContainer}>
            <Card cardClass={styles.cardprofileinfoContainer}>
                <Divider >
                    <Chip label="اطلاعات آگهی دهنده"
                        style={{
                            backgroundColor: "#f1f1f1",
                            fontSize: "15px", fontWeight: "500",
                            marginBottom: "10px"
                        }} />
                </Divider>
                <div className={styles.profileMediaCard}>
                    <img
                        src={state.userProfile.profilePic !== null
                            ? state.userProfile.profilePic
                            : defaultProfilePicture}
                        alt="picture1" />
                </div>
                <div className={styles.profileContent}>
                    <p>{state.userProfile.agencyName}</p>
                    <IconButton
                    //  onClick={handleClick(state.userProfile.phoneNumber)}
                    >
                        <AiFillPhone
                            size={30}
                            style={{
                                padding: "5px",
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                marginLeft: "5px",
                                color: "gray",
                            }}
                        /> <span style={{ color: "gary", fontSize: "1rem" }}>{digitsEnToFa(state.userProfile.phoneNumber)}</span>
                    </IconButton>
                </div>
                <div className={styles.explantion}>
                    <span>توضیحات:</span><p>{state.userProfile.bio}</p>
                </div>
            </Card >


            <div className={styles.listingCardAgencies}>

                {state.userProfile.sellerListings.map((listing) => {
                    function timeDifference() {
                        let now = moment.utc().locale('fa');
                        let post_date = moment.utc(listing.date_posted, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').locale('fa')

                        let difference = now.diff(post_date, 'days');
                        let formattedDifference = difference > 0 ? `${difference} روز پیش` : 'همین الان';

                        return digitsEnToFa(formattedDifference);
                    }
                    return (
                        <Card cardClass={styles.cardSellerAdds} key={listing.id}>
                            <div className={styles.mediacard}
                                onClick={() => navigate(`/listings/${listing.id}/`)}>
                                <img src={
                                    `https://api.amlakeeno.ir/${listing.picture1}` ?
                                        `https://api.amlakeeno.ir/${listing.picture1}` :
                                        ""} alt="pic" />
                                <span className={styles.date}>
                                    <WatchLaterIcon style={{ color: "#fff", fontSize: "15px" }} />
                                    {timeDifference()}
                                </span>
                                <span className={styles.title}>
                                    {listing.bargain_type}{"  "}{"  "}{listing.property_type}
                                </span>
                            </div>
                        </Card>

                    )
                })}

            </div>

        </div>
        </div>
    )
}

export default AgencyDetail