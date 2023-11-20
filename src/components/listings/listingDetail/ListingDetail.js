import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Axios from 'axios';
import { useImmerReducer } from "use-immer";

//date
import moment from 'jalali-moment';

//styles
import styles from "./ListingDetail.module.scss";
import Card from "../../card/Card"

//Assets
import defaultProfilePicture from "../../../assets/defaultProfilePicture.jpg"
import camera from "../../../assets/camera.jpg"


//components
import ListingUpdate from "../listingUpdate/ListingUpdate";
import ListingPios from "./listingPios/ListingPios";
import { MediaSharing } from "../../../pages"


//pages
import { Login, Register } from '../../../pages'


//context
import StateContext from "../../../Context/StateContext";
import DispatchContext from "../../../Context/DispatchContext";


//MUI
import {
  Grid,
  Typography,
  CircularProgress,
  IconButton,
  Breadcrumbs,
  Link,
  Button,
  Dialog,
  Snackbar,
} from "@mui/material"



//Mui ICons
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';


//react Icons
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"
import { FcCheckmark } from "react-icons/fc"
import { RiCheckboxCircleLine } from "react-icons/ri"
import { AiFillPhone } from "react-icons/ai"
import { FaUser } from "react-icons/fa"
import { BiGridVertical } from "react-icons/bi"
import { GiCheckMark } from "react-icons/gi"
import { MdLocationOn } from "react-icons/md"



//copy
import LinkComponent from "../../linkComponent/LinkComponent";
import { CopyToClipboard } from 'react-copy-to-clipboard';


//persian tools
import { halfSpace, digitsEnToFa, numberToWords, addCommas } from "@persian-tools/persian-tools";



function ListingDetail() {

  const navigate = useNavigate()
  const params = useParams()

  const link = `https://amlakeeno.ir/listings/${params.id}`;

  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [shareOpen, setShareOpen] = useState(false)




  const initialState = {
    dataIsLoading: true,
    listingInfo: "",
    sellerProfileInfo: "",
    openSnack: false,
    disabledBtn: false,
    openSnackLogin: false,
  }


  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'catchListingInfo':
        draft.listingInfo = action.listingObject;
        break

      case "loadingDone":
        draft.dataIsLoading = false
        break

      case "catchSellerProfileInfo":
        draft.sellerProfileInfo = action.profileObject
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
      case 'openTheSnackLogiIn':
        draft.openSnackLogin = true
        break

    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)





  //setting for slider
  const [currentPicture, setCurrentPicture] = useState(0);

  const listingPictures = [
    state.listingInfo.picture1,
    state.listingInfo.picture2,
    state.listingInfo.picture3,
    state.listingInfo.picture4,
    state.listingInfo.picture5,
    state.listingInfo.picture6,
  ].filter((picture) => picture !== null)


  function NextPicture() {
    if (currentPicture === listingPictures.length - 1) {
      return setCurrentPicture(0)
    }
    else {
      return setCurrentPicture(currentPicture + 1)
    }
  }


  function PreviousPicture() {
    if (currentPicture === 0) {
      return setCurrentPicture(listingPictures.length - 1)
    }
    else {
      return setCurrentPicture(currentPicture - 1)
    }
  }



  //for edit listingInfo by seller
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  // const handleClick = (phoneNumber) => {
  //   window.location.href = `tel:${phoneNumber}`;
  // };



  //setting for hover Icon
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleIconHover = (iconName) => {
    setHoveredIcon(iconName);
  };

  const handleIconLeave = () => {
    setHoveredIcon(null);
  };


  const renderIconText = (iconName) => {
    switch (iconName) {
      case 'save':
        return <div className={`${styles.dialogBody}  ${styles.save}`}>
          <span className={styles.tip}>&nbsp;</span>
          <div className={styles.bodyMessage}>
            <span classname={styles.save} >ذخیره</span>
          </div>
        </div>
      case 'heart':
        return <div className={`${styles.dialogBody}  ${styles.heart}`}>
          <span className={styles.tip}>&nbsp;</span>
          <div className={styles.bodyMessage}>
            <span classname={styles.save} >لایک</span>
          </div>
        </div>

      case 'link':
        return <div className={`${styles.dialogBody}  ${styles.copy}`}>
          <span className={styles.tip}>&nbsp;</span>
          <div className={styles.bodyMessage}>
            <span classname={styles.save} >کپی</span>
          </div>
        </div>
      case 'share':
        return <div className={`${styles.dialogBody}  ${styles.share}`}>
          <span className={styles.tip}>&nbsp;</span>
          <div className={styles.bodyMessage}>
            <span classname={styles.save} >اشتراکگذاری</span>
          </div>
        </div>
      default:
        return '';
    }
  };



  // Check if the item is already in the cart when logging in
  useEffect(() => {
    const itemInCart = GlobalState.cartItems.find(item => item.id === state.listingInfo.id);
    setIsAddedToCart(!!itemInCart);
  }, [GlobalState.cartItems, state.listingInfo.id]);




  // setting for add to cart
  const addToCart = (listingInfo) => {
    if (GlobalState.userIsLogged) {
      GlobalDispatch({ type: "addCartItem", payload: listingInfo });
      setIsAddedToCart(true);
    } else if (!GlobalState.userIsLogged) {
      setLoginOpen(true)
    }
  }



  // function for remove item
  const removeFromCart = (cart) => {
    GlobalDispatch({
      type: "removeCardItem",
      payload: cart
    });
    setIsAddedToCart(false);
  };



  //function for like
  const handleToggleLike = () => {
    if (GlobalState.userIsLogged) {
      GlobalDispatch({
        type: "toggleLike",
        payload: state.listingInfo.id
      });
    } else if (!GlobalState.userIsLogged) {
      setLoginOpen(true)
    }
  };

  const isCardLiked = GlobalState.isLiked.includes(state.listingInfo.id);



  useEffect(() => {
    async function GetListingInfo() {
      try {
        const response = await Axios.get(`https://api.amlakeeno.ir/api/listings/${params.id}/`);
        console.log(response.data)
        dispatch({
          type: "catchListingInfo",
          listingObject: response.data
        })
      } catch (e) {
        console.log(e.response)
      }
    }
    GetListingInfo()
  }, [])



  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/")
      }, 1500);
    }
  }, [state.openSnack])



  useEffect(() => {
    if (state.listingInfo) {
      async function GetProfileInfo() {
        try {
          const response = await Axios.get(`https://api.amlakeeno.ir/api/profiles/${state.listingInfo.seller}/`);
          console.log(response.data)
          dispatch({
            type: "catchSellerProfileInfo",
            profileObject: response.data
          })
          dispatch({ type: 'loadingDone' })
        } catch (e) {
          console.log(e.response)
        }

      }
      GetProfileInfo()
    }
  }, [state.listingInfo])



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




  // const now = moment().locale('fa').format('YYYY/MM/DD , HH:mm:ss').toString();
  // console.log("now", now)
  // const post_date = moment(state.listingInfo.date_posted, 'YYYY/MM/DD HH:mm:ss').locale('fa').endOf('jMonth').format('YYYY/MM/DD , HH:mm:ss').toString()
  // console.log("post_date", post_date)
  // const timeDifference = now.fromNow(post_date);
  // console.log(timeDifference);



  function timeDifference() {
    let now = moment.utc().locale('fa');
    let post_date = moment.utc(state.listingInfo.date_posted, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').locale('fa');

    let difference = now.diff(post_date, 'days');
    let formattedDifference = difference > 0 ? `${difference} روز پیش` : 'همین الان';

    return digitsEnToFa(formattedDifference);
  }







  async function DeleteHandler() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing"
    )
    if (confirmDelete) {
      try {
        const response = await Axios.delete(`https://api.amlakeeno.ir/api/listings/${params.id}/delete/`)
        console.log(response.data)
        dispatch({ type: "openTheSnack" })
        dispatch({ type: 'disableTheButton' })

      } catch (e) {
        console.log(e.response.data)
        dispatch({ type: "allowTheButton" })

      }
    }
  }




  //setting price for each meter
  const PriceEachMeter = state.listingInfo.price_for_sale / state.listingInfo.area_metere




  function RegisterAct() {
    setLoginOpen(false)
    setRegisterOpen(true)
  }




  return (
    <div className={styles.listingDetailContainer} >

      <div className={styles.fixedIcons}>
        <IconButton style={{ marginBottom: '10px' }}
          onMouseEnter={() => handleIconHover('save')}
          onMouseLeave={handleIconLeave}
        >
          {isAddedToCart ? (
            <BookmarkIcon
              onClick={() => removeFromCart(state.listingInfo)}
              size={24}
              style={{ color: 'gray', margin: '5px', position: 'relative' }} />
          ) : (
            <BookmarkBorderIcon
              onClick={() => addToCart(state.listingInfo)}
              size={24}
              style={{ color: '#fff', margin: '5px', position: 'relative' }} />
          )}
        </IconButton>
        {hoveredIcon === 'save' && <span>{renderIconText('save')}</span>}




        <IconButton
          style={{ marginBottom: '10px' }}
          onMouseEnter={() => handleIconHover('heart')}
          onMouseLeave={handleIconLeave}
          onClick={handleToggleLike}
        >
          {isCardLiked ? (
            <FavoriteIcon size={24} style={{ color: 'red', position: 'relative' }} />
          ) : (
            <FavoriteBorderIcon size={24} style={{ color: '#fff', position: 'relative' }} />
          )}
        </IconButton>
        {hoveredIcon === 'heart' && <span>{renderIconText('heart')}</span>}






        <CopyToClipboard text={link} >
          <IconButton
            style={{ marginBottom: '10px' }}
            onMouseEnter={() => handleIconHover('link')}
            onMouseLeave={handleIconLeave}
          >
            <LinkComponent link={link} />
          </IconButton>
        </CopyToClipboard>
        {hoveredIcon === 'link' && <span>{renderIconText('link')}</span>}



        <IconButton
          style={{ marginBottom: '10px' }}
          onMouseEnter={() => handleIconHover('share')}
          onMouseLeave={handleIconLeave}
          onClick={() => setShareOpen(true)}
        >
          <ShareIcon
            size={24}
            style={{ color: "#fff", position: "relative" }} />
        </IconButton>
        {hoveredIcon === 'share' && <span>{renderIconText('share')}</span>}
      </div>



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

          <Typography color="gray" style={{ fontWeight: "500" }}>
            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {"  "}{"  "}{halfSpace(state.listingInfo.bargain_type)}{"  "}{"  "}
            {"  "}{halfSpace(state.listingInfo.property_type)}{" "}{" "}
            {/* <MdLocationOn sx={{ mr: 0.5 }} fontSize="inherit" />
            {digitsEnToFa(state.listingInfo.borough)} */}
          </Typography>
        </Breadcrumbs>
        <div className={styles.oclock}>
          <span style={{
            marginRight: "2px",
            justifyContent: "center"
          }}>
            <WatchLaterIcon
              style={{
                color: "gray",
                fontSize: "18px",
                marginLeft: "1px"
              }} />
          </span>
          <span
            style={{
              fontWeight: "500",
              color: "gray"
            }}>
            {timeDifference()}</span>
        </div>
      </div>





      <div className={styles.cardContentImage}>
        <Card cardClass={styles.cardConetntListing}>
          <h5>اطلاعات ملک:</h5>
          {state.listingInfo.bargain_type === "فروش" && <h4><GiCheckMark style={{ color: "#757575" }} />{numberToWords(state.listingInfo.price_for_sale)}<span>تومان</span></h4>}
          {state.listingInfo.bargain_type === "رهن کامل" || state.listingInfo.bargain_type === "اجاره" ? <h4><GiCheckMark style={{ color: "#757575" }} />{numberToWords(state.listingInfo.price_for_sale)}<span> تومان رهن یا ودیعه </span></h4> : ""}
          {state.listingInfo.bargain_type === "اجاره" && <h4><GiCheckMark style={{ color: "#757575" }} />{numberToWords(state.listingInfo.rent_per_month)}<span> تومان اجاره ماهیانه </span></h4>}
          <h4><GiCheckMark style={{ color: "#757575" }} />{digitsEnToFa(state.listingInfo.area_metere)}<span>متر زیربنا</span></h4>
          <h4><GiCheckMark style={{ color: "#757575" }} /><span>دارای {"  "}</span>{state.listingInfo.rooms}</h4>
          <h4><GiCheckMark style={{ color: "#757575" }} /><span>  طبقه   </span>{digitsEnToFa(state.listingInfo.floor_of_building)}<span>{" "}از{" "}</span>{state.listingInfo.number_of_floor_of_building === null || state.listingInfo.number_of_floor_of_building === "" ? "" : <span>{digitsEnToFa(state.listingInfo.number_of_floor_of_building)}</span>}</h4>
          {state.listingInfo.number_of_unit_per_floor === null || state.listingInfo.number_of_unit_per_floor === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} />{digitsEnToFa(state.listingInfo.number_of_unit_per_floor)}<span> واحد در هر طبقه</span></h4>}
          {state.listingInfo.listing_type === null || state.listingInfo.listing_type === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span> نوع مکان  </span>{state.listingInfo.listing_type}<span> می باشد </span></h4>}
          {state.listingInfo.age_of_building === null || state.listingInfo.age_of_building === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} />{digitsEnToFa(state.listingInfo.age_of_building)}<span> سال ساخت است</span></h4>}
          {state.listingInfo.building_face === null || state.listingInfo.building_face === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span>  جهت  </span>{state.listingInfo.building_face}</h4>}
          {state.listingInfo.building_apearence === "سایر" || state.listingInfo.building_apearence === null || state.listingInfo.building_apearence === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span>  ظاهر ساختمان  </span>{state.listingInfo.building_apearence}<span> {""}می باشد{""}</span></h4>}
          {state.listingInfo.floor_covering === "سایر" || state.listingInfo.floor_covering === null || state.listingInfo.floor_covering === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span>  کف ساختمان  </span>{state.listingInfo.floor_covering}<span>{" "}است{" "}</span></h4>}
          {state.listingInfo.kitchen_apearence === "سایر" || state.listingInfo.kitchen_apearence === null || state.listingInfo.kitchen_apearence === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span>  آشپزخانه </span>{state.listingInfo.kitchen_apearence}<span>{" "} است{" "}</span></h4>}
          {state.listingInfo.wc_type === null || state.listingInfo.wc_type === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span>  سرویس  </span>{state.listingInfo.wc_type}</h4>}
          {state.listingInfo.heating_system === "سایر" || state.listingInfo.heating_system === null || state.listingInfo.heating_system === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span>سیستم گرمایشی </span>{state.listingInfo.heating_system}</h4>}
          {state.listingInfo.cooling_system === "سایر" || state.listingInfo.cooling_system === null || state.listingInfo.cooling_system === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span>سیستم سرمایشی  </span>{state.listingInfo.cooling_system}</h4>}
          {state.listingInfo.advertiser === null || state.listingInfo.advertiser === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span>  آگهی دهنده  </span>{state.listingInfo.advertiser}<span>{" "}است{" "}</span></h4>}
          {state.listingInfo.name_of_property_owner === null || state.listingInfo.name_of_property_owner === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span>  اسم مالک  </span>{state.listingInfo.name_of_property_owner}<span>{" "}است{" "}</span></h4>}
          {state.listingInfo.property_status === null || state.listingInfo.property_status === "" ? "" : <h4><GiCheckMark style={{ color: "#757575" }} /><span>  ملک </span>{state.listingInfo.property_status}<span>{" "}است{" "}</span></h4>}
          {state.listingInfo.bargain_type === "فروش" ? (
            <>
              {state.listingInfo.house_document_status === null || state.listingInfo.house_document_status === "" ? "" : <h4><FcCheckmark /><span>  وضعیت سند  </span>{state.listingInfo.house_document_status}<span>{" "}است{" "}</span></h4>}
              {state.listingInfo.house_document_type === null || state.listingInfo.house_document_type === "" ? "" : <h4><FcCheckmark /><span> نوع سند  </span>{state.listingInfo.house_document_type}<span>{" "}است{" "}</span></h4>}
            </>
          ) : ("")}
        </Card>


        {listingPictures.length > 0 ? (
          <Card cardClass={styles.thumbnailPicturesStyle}>
            {listingPictures.map((picture, index) => {
              return (
                <img
                  key={index}
                  src={picture}
                  alt="thumbnail"
                  onClick={() => setCurrentPicture(index)}
                  className={index === currentPicture ? styles.activeThumbnail : styles.thumbnail}
                />
              )
            })}
            <IoIosArrowUp onClick={PreviousPicture} size={20} className={styles.rightArrow} />
            <IoIosArrowDown onClick={NextPicture} size={20} className={styles.leftArrow} />
          </Card>) : ("")}


        {listingPictures.length > 0 ? (
          <Card cardClass={styles.pictureSlider}>
            {listingPictures.map((picture, index) => {
              return (
                <div key={index}>
                  {index === currentPicture ? (
                    <img src={picture}
                      alt="pictures" />)
                    :
                    ("")}
                </div>
              )
            })}
          </Card>) : (<Card cardClass={styles.pictureSlider}>
            <img style={{ color: "gray" }}
              src={camera}
              alt="camera" />
          </Card>)}
      </div>






      <div className={styles.sellerInformationContainer}>
        <Card cardClass={styles.cardInfoContainerFaxilites}>
          <h5>سایر امکانات:</h5>
          <div style={{width:"100%", display: 'flex', flexWrap: 'wrap', justifyContent: "flex-start", padding: '5px', marginTop: '5px' }}>
            {state.listingInfo.balcony ? (
              <Grid item style={{ display: "flex" , margin:"3px"}} xs={12} md={6}>
                <RiCheckboxCircleLine style={{ color: "#757575", fontSize: "1.2rem" }} />
                <Typography variant="h6" style={{ fontSize: "1rem" }}>بالکن</Typography>
              </Grid>)
              : ("")}

            {state.listingInfo.pool ? (
              <Grid item style={{ display: "flex", margin:"3px" }} xs={12} md={6}>
                <RiCheckboxCircleLine style={{ color: "#757575", fontSize: "1.2rem" }} />
                <Typography variant="h6" style={{ fontSize: "1rem" }}>استخر</Typography>
              </Grid>)
              : ("")}


            {state.listingInfo.elevator ? (
              <Grid item style={{ display: "flex" , margin:"3px"}} xs={12} md={6}>
                <RiCheckboxCircleLine style={{ color: "#757575", fontSize: "1.2rem" }} />
                <Typography variant="h6" style={{ fontSize: "1rem" }}>آسانسور</Typography>
              </Grid>)
              : ("")}

            {state.listingInfo.lobby ? (
              <Grid item style={{ display: "flex", margin:"3px" }} xs={12} md={6}>
                <RiCheckboxCircleLine style={{ color: "#757575", fontSize: "1.2rem" }} />
                <Typography variant="h6" style={{ fontSize: "1rem" }}>لابی</Typography>
              </Grid>)
              : ("")}


            {state.listingInfo.parking ? (
              <Grid item style={{ display: "flex", margin:"3px" }} xs={12} md={6}>
                <RiCheckboxCircleLine style={{ color: "#757575", fontSize: "1.2rem" }} />
                <Typography variant="h6" style={{ fontSize: "1rem" }}>پارکینگ</Typography>
              </Grid>)
              : ("")}

            {state.listingInfo.guard ? (
              <Grid item style={{ display: "flex", margin:"3px" }} xs={12} md={6}>
                <RiCheckboxCircleLine style={{ color: "#757575", fontSize: "1.2rem" }} />
                <Typography variant="h6" style={{ fontSize: "1rem" }}>نگهبان</Typography>
              </Grid>)
              : ("")}

            {state.listingInfo.warehouse ? (
              <Grid item style={{ display: "flex", margin:"3px" }} xs={12} md={6}>
                <RiCheckboxCircleLine style={{ color: "#757575", fontSize: "1.2rem" }} />
                <Typography variant="h6" style={{ fontSize: "1rem" }}>انباری</Typography>
              </Grid>)
              : ("")}

            {state.listingInfo.Jacuzzi ? (
              <Grid item style={{ display: "flex", margin:"3px" }} xs={12} md={6}>
                <RiCheckboxCircleLine style={{ color: "#757575", fontSize: "1.2rem" }} />
                <Typography variant="h6" style={{ fontSize: "1rem" }}>جکوزی</Typography>
              </Grid>)
              : ("")}
          </div>
          <br />
          {state.listingInfo.address_of_building === null || state.listingInfo.address_of_building === "" ? "" : <h4><span>  آدرس دقیق ملک : </span>{digitsEnToFa(state.listingInfo.address_of_building)}</h4>}
          {state.listingInfo.description === null || state.listingInfo.description === "" ? "" : <h4><span >    توضیحات : </span>{digitsEnToFa(state.listingInfo.description)}</h4>}
        </Card>
        <Card cardClass={styles.cardInfoContainer}>
          <h4>آگهی گذار</h4>
          <div className={styles.InfoContainer}>
            <Grid item xs={12} md={6}>
              <img
                src={state.sellerProfileInfo.profile_picture !== null
                  ? state.sellerProfileInfo.profile_picture
                  : defaultProfilePicture}
                alt="picture1"
                onClick={() => navigate(`/agencies/${state.sellerProfileInfo.seller}`)} />
            </Grid>

            <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-start" xs={12} md={6}>
              <Grid item>
                <Typography variant="h5"
                  style={{ textAlign: "center", marginTop: "1rem", color: "gray" }}>
                  <IconButton>
                    <FaUser
                      size={30}
                      style={{
                        padding: "5px",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        marginLeft: "5px",
                        color: "gray",
                      }} /><span style={{ color: "gary", fontSize: "1rem" }}>{digitsEnToFa(state.sellerProfileInfo.agency_name)}</span>
                  </IconButton>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5"
                  style={{ textAlign: "center", marginTop: "5px" }}>
                  <IconButton
                  //  onClick={handleClick(state.sellerProfileInfo.phone_number)}
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
                    /> <span style={{ color: "gary", fontSize: "1rem", fontFamily:"YekanBakh" }}>{digitsEnToFa(state.sellerProfileInfo.phone_number)}</span>
                  </IconButton>
                </Typography>
              </Grid>
              <Grid item onClick={() => navigate(`/agencies/${state.sellerProfileInfo.seller}`)}>
                <Typography variant="h5"
                  style={{ textAlign: "center", marginTop: "5px", fontFamily:"YekanBakh" }}>
                  <IconButton>
                    <BiGridVertical
                      size={30}
                      style={{
                        padding: "5px",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        marginLeft: "5px",
                        color: "gray",
                      }} /><span style={{ color: "gary", fontSize: "1rem", fontFamily:"YekanBakh" }}> سایر آگهی های آگهی گذار</span>
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>
          </div>



          {GlobalState.userId == state.listingInfo.seller ?
            (<Grid item container justifyContent="space-around" style={{ marginTop: "1rem" }}>
              <Button
                style={{ backgroundColor: 'white', color: '#333333' }}
                variant="contained"
                onClick={handleClickOpen}
              >
                ویرایش
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={DeleteHandler}
                disabled={state.disabledBtn}>
                حذف
              </Button>
              <Dialog open={open} onClose={handleClose} fullScreen >
                <ListingUpdate
                  listingData={state.listingInfo}
                  closeDialog={handleClose} />
              </Dialog>
            </Grid>)
            :
            ("")
          }

        </Card>
      </div>



      <div>
        <ListingPios listingInfo={state.listingInfo} />
      </div>

      {/* <Card cardClass={styles.explanationCardContainer}>
          <h4><span>زمان آگهی : </span> {moment(state.listingInfo.date_posted, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('YYYY/MM/DD , HH:mm:ss').toString()}</h4>
          <h4>{now}</h4>
        </Card> */}

      <Snackbar
        open={state.openSnack}
        message="حذف با موفقیت انجام شد!"
        ContentProps={{
          style:
          {
            fontSize: "1rem",
            fontFamily: "YekanBakh",
            fontWeight: "500",
            background: "#FFA28B",
            justifyContent: "center",
            color: "black"
          }
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />

      {shareOpen && <MediaSharing setShareOpen={setShareOpen} />}
      {loginOpen && <Login setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} />}
      {registerOpen && <Register setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />}
    </div >
  )
}

export default ListingDetail