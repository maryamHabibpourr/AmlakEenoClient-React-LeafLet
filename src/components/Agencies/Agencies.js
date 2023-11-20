import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Axios from 'axios';
import { useImmerReducer } from "use-immer";
import { motion } from 'framer-motion';
//icon
import { CgChevronLeft } from 'react-icons/cg'
//Assets
import defaultProfilePicture from "../../assets/defaultProfilePicture.jpg"
//styles
import styles from "./Agency.module.scss"
//MUI
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material"
//mui icons
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
//components
import { MediaSharing } from "../../pages";
//persian tools
import { digitsEnToFa } from "@persian-tools/persian-tools";



function Agencies() {
  const navigate = useNavigate()

  const [shareOpen, setShareOpen] = useState(false)


  const initialState = {
    dataIsLoading: true,
    agenciesList: []
  }

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'catchAgencies':
        draft.agenciesList = action.agenciesArray
        break

      case "loadingDone":
        draft.dataIsLoading = false
        break
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)









  useEffect(() => {
    async function GetAgencies() {
      try {
        const response = await Axios.get(`https://api.amlakeeno.ir/api/profiles/`);
        console.log(response.data)
        dispatch({
          type: "catchAgencies",
          agenciesArray: response.data
        })
        dispatch({ type: 'loadingDone' })
      } catch (e) {
        console.log(e.response)
      }

    }
    GetAgencies()
  }, [])



  //for paginate
  const [noOfElemment, setNoOfEllemment] = useState(40)
  const slice = state.agenciesList.slice(0, noOfElemment)
  const loadMore = () => {
    setNoOfEllemment(noOfElemment + noOfElemment)
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



  //setting for motion
  const animateFrom = { opacity: 0, y: -40 }
  const animateTo = { opacity: 1, y: 0 }



  return (
    <div className={styles.agencyPage}>
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
            آگهی کنندگان
          </Typography>
        </Breadcrumbs>
      </div>

      <div className={styles.agencyContainer}>
        {slice.map((agency) => {
          function PropertiesDispaly() {
            if (agency.seller_listings.length === 0) {
              return (
                <Button disabled size="small" >
                  ملکی ثبت نشده است
                </Button>
              )
            }
            else if (agency.seller_listings.length === 1) {
              return (
                <Button size="small" onClick={() => navigate(`/agencies/${agency.seller}`)}>
                  یک ملک ثبت شده است
                </Button>
              )
            }
            else {
              return (
                <Button size="small" onClick={() => navigate(`/agencies/${agency.seller}`)}>
                  {digitsEnToFa(agency.seller_listings.length)} ملک ثبت شده است
                </Button>
              )
            }
          }

          function DetailDispaly() {
            if (agency.seller_listings.length === 0) {
              return (
                <Button disabled size="small" >
                  غیرفعال
                </Button>
              )
            }
            else {
              return (
                <span onClick={() => navigate(`/agencies/${agency.seller}`)}>
                  جزئیات
                </span>
              )
            }
          }


          if (agency.agency_name && agency.phone_number)
            return (
              <div className={styles.cardContainer}>
                <div className={styles.containerCardOne}>
                  <img src={agency.profile_picture ? agency.profile_picture : defaultProfilePicture} alt="cars" />
                </div>
                <div className={styles.containerCardMiddele}>
                  <h3 className={styles.pinOne}>{agency.agency_name}</h3>
                  <span>{PropertiesDispaly()}</span>
                </div>

                <div className={styles.containerCardTow}>
                  <div><span>{DetailDispaly()}</span>< CgChevronLeft /></div>
                  <div></div>
                  <div onClick={() => setShareOpen(true)}><span>به اشتراک گذاری</span>< CgChevronLeft /></div >
                </div>

              </div>
            )
        })}
      </div>
      <motion.div className={styles.moreDispaly}
        initial={animateFrom}
        animate={animateTo}
        onClick={() => loadMore()}
        transition={{ delay: 0.20}}
      >
        <button onClick={() => loadMore()}>مشاهده بیشتر</button>
      </motion.div>
      {shareOpen && <MediaSharing setShareOpen={setShareOpen} />}
    </div>
  )
}

export default Agencies