import React, { useState, useContext, useEffect } from 'react'
import { useImmerReducer } from 'use-immer';

//styled component 
import {
  Card, CardBody,
  CardMedia, CardTitle, CtaGrp, CtaLink,
  MetaInfo, MetaList, PicLength,
  Price, PriceInfo, PriceText, Status,
  CardTitleInfo, Tags, TagsCta, Date
} from './ListingCardStyle'


//react-icons
import { MdLocationOn } from "react-icons/md"
import {AiOutlineCamera} from "react-icons/ai"

//assets
// import camera from "../../../assets/camera.jpg"

import cam from "../../../assets/camera.jpg"


//date
import moment from 'jalali-moment';

//mui
import { Grid, IconButton, } from '@mui/material'
import WatchLaterIcon from '@mui/icons-material/WatchLater';


//react leafLet
import { MapContainer, TileLayer } from 'react-leaflet'
import { Marker, useMap } from 'react-leaflet'


//Context
import DispatchContext from "../../../Context/DispatchContext";
import StateContext from "../../../Context/StateContext";

//component
import { Login, Register } from '../../../pages';
import { MediaSharing } from "../../../pages"

//Mui ICons
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

//copy
import LinkComponent from "../../linkComponent/LinkComponent";
import { CopyToClipboard } from 'react-copy-to-clipboard';


//persian tools
import { addCommas , digitsEnToFa, numberToWords } from "@persian-tools/persian-tools";



const ListingCard = ({ listing }) => {

  const GlobalDispatch = useContext(DispatchContext)
  const GlobalState = useContext(StateContext)

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [shareOpen, setShareOpen] = useState(false)


  const [isHovered, setHovered] = useState(false)
  const animateCardMedia = isHovered ? { height: "0" } : { height: "270px" }
  const showMeta = { opacity: 1, height: "auto" };
  const hideMeta = { opacity: 0, height: 0 };
  const animateMeta = isHovered ? hideMeta : showMeta;
  const animateMetaList = isHovered ? showMeta : hideMeta



  const transition = {
    duration: 0.25,
    type: "spring",
    bounce: 0.2,
    ease: "easeIn",

  }



  const link = `https://amlakeeno.ir/listings/${listing.id}`;





  const initialState = {
    mapInstance: null,
  }


  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "getMap":
        draft.mapInstance = action.mapData;
        break;
      default:
        break;
    }
  }


  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)




  function TheMapComponent() {
    const map = useMap()
    dispatch({ type: 'getMap', mapData: map })
    return null;
  }



  // Check if the item is already in the cart when logging in
  useEffect(() => {
    const itemInCart = GlobalState.cartItems.find(item => item.id === listing.id);
    setIsAddedToCart(!!itemInCart);
  }, [GlobalState.cartItems, listing.id]);




  // setting for add to cart
  function addToCart(listing) {
    if (GlobalState.userIsLogged) {
      GlobalDispatch({ type: "addCartItem", payload: listing });
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
        payload: listing.id
      });
    } else if (!GlobalState.userIsLogged) {
      setLoginOpen(true)
    }
  };

  const isCardLiked = GlobalState.isLiked.includes(listing.id);



  //setting price for each meter
const PriceEachMeter = listing.price_for_sale / listing.area_metere;
const convertedPrice = digitsEnToFa(Math.round(PriceEachMeter).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));


  //setting for count pictures
  const listingPictures = [
    listing.picture1,
    listing.picture2,
    listing.picture3,
    listing.picture4,
    listing.picture5,
    listing.picture6,
  ].filter(picture => picture !== null).length





  function timeDifference() {
    let now = moment.utc().locale('fa');
    let post_date = moment.utc(listing.date_posted, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').locale('fa');

    let difference = now.diff(post_date, 'days');
    let formattedDifference = difference > 0 ? `${difference} روز پیش` : 'همین الان';

    return digitsEnToFa(formattedDifference);
  }





  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      key={listing.id}>

      <CardMedia animate={animateCardMedia} transition={transition} >
        {listing.picture1 !== null ? (
          <img src={listing?.picture1} alt='picture1' />
        )
          :
          (

            <img src={cam} alt='picture3' />

          )
        }
        <Status>
          {listing.borough} <MdLocationOn size={25} color='var(--light-green)' />
        </Status>
        <Date>
          <WatchLaterIcon style={{ color: "#fff", fontSize: "15px" }} />
          {timeDifference()}
        </Date>
        <PicLength>
        <AiOutlineCamera size={15} color='#fff'/>{digitsEnToFa(listingPictures)}
        </PicLength>
      </CardMedia>


      <CardBody>
        <CardTitle>
          <CardTitleInfo>{listing.bargain_type}{"  "}{"  "}{listing.property_type}</CardTitleInfo>
          <CardTitleInfo>{digitsEnToFa(listing.area_metere)}{" "}متری</CardTitleInfo>
        </CardTitle>
        {!isHovered && (


          <MetaInfo animate={animateMeta}>
            <PriceInfo>
              {listing.bargain_type === "فروش" ?
                (<span>قیمت کل :</span>)
                :
                (<span> ودیعه:</span>)
              }
              <Price>
                <PriceText>{digitsEnToFa(addCommas(listing.price_for_sale))}{" "}تومان</PriceText>
              </Price>
            </PriceInfo>
            {listing.bargain_type === "فروش" &&
              <PriceInfo>
                <span>قیمت هر متر:</span>
                <Price>
                  <PriceText>{addCommas(convertedPrice)}</PriceText>
                </Price>
              </PriceInfo>
            }
            {(listing.bargain_type === "اجاره" &&
              listing.bargain_type !== null &&
              listing.bargain_type !== "" &&
              listing.bargain_type !== 0) ? (
              <PriceInfo>
                <span>اجاره ماهیانه:</span>
                <Price>
                  <PriceText>{digitsEnToFa(addCommas(listing.rent_per_month))}{" "}تومان</PriceText>
                </Price>
              </PriceInfo>
            )
              :
              ("")
            }
          </MetaInfo>
        )}





        <TagsCta animate={animateMetaList}>
          <Tags onClick={() => state.mapInstance.flyTo([listing.latitude, listing.longitude], 16)}>مشاهده مکان روی نقشه</Tags>
          <CtaGrp>
            <CtaLink href={`/listings/${listing.id}`}>مشاهده جزئیات</CtaLink>
          </CtaGrp>
        </TagsCta>


        <Grid item container style={{ height: "15rem", marginTop: "1rem" }}>
          <MapContainer center={[35.73087557318668, 51.35107070174615]} zoom={14} scrollWheelZoom={true}>
            <TileLayer
              attribution=''
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TheMapComponent />
            <Marker
              position={[listing.latitude, listing.longitude]}
            >
            </Marker>
          </MapContainer>
        </Grid>

        <MetaList animate={animateMetaList}>

          <IconButton style={{ marginBottom: '10px' }}
          >
            {isAddedToCart ? (
              <BookmarkIcon
                onClick={() => removeFromCart(listing)}
                size={24}
                style={{ color: 'gray', margin: '5px', position: 'relative' }} />
            ) : (
              <BookmarkBorderIcon
                onClick={() => addToCart(listing)}
                size={24}
                style={{ color: 'gray', margin: '5px', position: 'relative' }} />
            )}
          </IconButton>





          <IconButton
            style={{ marginBottom: '10px' }}
            onClick={handleToggleLike}
          >
            {isCardLiked ? (
              <FavoriteIcon size={24} style={{ color: 'red', position: 'relative' }} />
            ) : (
              <FavoriteBorderIcon size={24} style={{ color: 'gray', position: 'relative' }} />
            )}
          </IconButton>







          <CopyToClipboard text={link}>
            <IconButton
              style={{ marginBottom: '10px' }}
            >
              <LinkComponent link={link} />
            </IconButton>
          </CopyToClipboard>





          <IconButton
            style={{ marginBottom: '10px' }}
            onClick={() => setShareOpen(true)}
          >
            <ShareIcon
              size={24}
              style={{ color: "gray", position: "relative" }} />
          </IconButton>
        </MetaList>
      </CardBody>
      {loginOpen && <Login setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} />}
      {registerOpen && <Register setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />}
      {shareOpen && <MediaSharing setShareOpen={setShareOpen} />}
    </Card >
  )
}

export default ListingCard