import React, { useState, useContext, useEffect } from 'react'
import { useImmerReducer } from 'use-immer';
import { useNavigate} from "react-router-dom"


// استایل‌ها را از فایل بالا ایمپورت می‌کنیم:
import {
  CardWrapper,
  CardInner,
  CardMedia,
  CardBody,
  CardTitle,
  CardTitleInfo,
  MetaInfo,
  MetaList,
  TagsCta,
  Tags,
  CtaGrp,
  CtaLink,
  Price,
  PriceInfo,
  PriceText,
  Status,
  Date,
  PicLength
} from './ListingCardStyle';

// ری‌اکت آیکون‌ها
import { MdLocationOn } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";

// دارایی‌ها (عکس پیش‌فرض)
import cam from "../../../assets/camera.jpg";

// کتابخانه‌های جانبی برای تاریخ جلالی، مپ، کانتکست و ...:
import moment from 'jalali-moment';
import {  IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';

// کانتکست پروژه
import DispatchContext from "../../../Context/DispatchContext";
import StateContext from "../../../Context/StateContext";

// سایر کامپوننت‌ها و پاپ‌آپ‌ها
import { Login, Register, MediaSharing } from "../../../pages";

// آیکون‌های بوک‌مارک، لایک و ...
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

// برای کپی لینک
import LinkComponent from "../../linkComponent/LinkComponent";
import { CopyToClipboard } from 'react-copy-to-clipboard';


//persian tools
import { convertDigits } from "persian-helpers";


const ListingCard = ({ listing }) => {
  const GlobalDispatch = useContext(DispatchContext);
  const GlobalState = useContext(StateContext);
  const navigate = useNavigate()

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  // کنترل Hover برای انیمیشن
  const [isHovered, setHovered] = useState(false);
  const animateCardMedia = isHovered ? { height: "0" } : { height: "270px" };
  const showMeta = { opacity: 1, height: "auto" };
  const hideMeta = { opacity: 0, height: 0 };
  const animateMeta = isHovered ? hideMeta : showMeta;
  const animateMetaList = isHovered ? showMeta : hideMeta;

  const transition = {
    duration: 0.25,
    type: "spring",
    bounce: 0.2,
    ease: "easeIn",
  };

  // لینک آگهی جهت اشتراک‌گذاری
  const link = `https://amlakeeno.ir/listings/${listing.id}`;

  const initialState = {
    mapInstance: null,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "getMap":
        draft.mapInstance = action.mapData;
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  function TheMapComponent() {
    const map = useMap();
    dispatch({ type: 'getMap', mapData: map });
    return null;
  }

  // بررسی اینکه آیا قبلاً در بوک‌مارک‌های کاربر بوده یا نه
  useEffect(() => {
    const itemInCart = GlobalState.cartItems.find(item => item.id === listing.id);
    setIsAddedToCart(!!itemInCart);
  }, [GlobalState.cartItems, listing.id]);

  // افزودن به بوک‌مارک
  function addToCart(listing) {
    if (GlobalState.userIsLogged) {
      GlobalDispatch({ type: "addCartItem", payload: listing });
      setIsAddedToCart(true);
    } else {
      // اگر لاگین نکرده باشد پاپ‌آپ لاگین را باز کن
      setLoginOpen(true);
    }
  }

  // حذف از بوک‌مارک
  const removeFromCart = (cart) => {
    GlobalDispatch({ type: "removeCardItem", payload: cart });
    setIsAddedToCart(false);
  };

  // تابع لایک/آنلایک
  const handleToggleLike = () => {
    if (GlobalState.userIsLogged) {
      GlobalDispatch({ type: "toggleLike", payload: listing.id });
    } else {
      setLoginOpen(true);
    }
  };
  const isCardLiked = GlobalState.isLiked.includes(listing.id);

  // قیمت هر متر
  const PriceEachMeter = listing.price_for_sale / listing.area_metere;
  const convertedPrice = convertDigits(
    Math.round(PriceEachMeter)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );

  // تعداد عکس‌ها
  const listingPictures = [
    listing.picture1,
    listing.picture2,
    listing.picture3,
    listing.picture4,
    listing.picture5,
    listing.picture6,
  ].filter(picture => picture !== null).length;

  // محاسبه زمان سپری شده از انتشار آگهی
  function timeDifference() {
    let now = moment.utc().locale('fa');
    let post_date = moment.utc(listing.date_posted, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').locale('fa');

    let difference = now.diff(post_date, 'days');
    let formattedDifference = difference > 0 ? `${difference} روز پیش` : 'همین الان';

    return convertDigits(formattedDifference);
  }




  return (
    // به جای <Card> از <CardWrapper> + <CardInner> استفاده می‌کنیم
    <CardWrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      key={listing.id}
    >
      <CardInner>
        <CardMedia animate={animateCardMedia} transition={transition}>
          {listing.picture1 ? (
            <img src={listing.picture1} alt="picture1" />
          ) : (
            <img src={cam} alt="picture3" />
          )}

          <Status>
            {listing.borough} <MdLocationOn size={25} color="var(--light-green)" />
          </Status>

          <Date>
            <WatchLaterIcon style={{ color: "#fff", fontSize: "15px" }} />
            {timeDifference()}
          </Date>

          <PicLength>
            <AiOutlineCamera size={15} color="#fff" />
            {convertDigits(listingPictures)}
          </PicLength>
        </CardMedia>

        <CardBody>
          <CardTitle>
            <CardTitleInfo>
              {listing.bargain_type}{"  "}{listing.property_type}
            </CardTitleInfo>
            <CardTitleInfo>
              {convertDigits(listing.area_metere)} متری
            </CardTitleInfo>
          </CardTitle>

          {!isHovered && (
            <MetaInfo animate={animateMeta}>
              <PriceInfo>
                {listing.bargain_type === "فروش" ? (
                  <span>قیمت کل :</span>
                ) : (
                  <span>ودیعه:</span>
                )}
                <Price>
                  <PriceText>
                    {convertDigits(listing.price_for_sale, { separator: true })} تومان
                  </PriceText>
                </Price>
              </PriceInfo>

              {listing.bargain_type === "فروش" && (
                <PriceInfo>
                  <span>قیمت هر متر:</span>
                  <Price>
                    <PriceText>{convertDigits(convertedPrice, { separator: true })}</PriceText>
                  </Price>
                </PriceInfo>
              )}
              {listing.bargain_type === "رهن کامل" && (
                <PriceInfo>
                  <span>  اجاره ماهیانه:</span>
                  <Price>
                    <PriceText>رایگان</PriceText>
                  </Price>
                </PriceInfo>
              )}

              {listing.bargain_type === "اجاره" &&
                listing.rent_per_month > 0 && (
                  <PriceInfo>
                    <span>اجاره ماهیانه:</span>
                    <Price>
                      <PriceText>
                        {convertDigits(listing.rent_per_month , { separator: true })} تومان
                      </PriceText>
                    </Price>
                  </PriceInfo>
                )}
            </MetaInfo>
          )}

          <TagsCta animate={animateMetaList}>
            <Tags onClick={() => state.mapInstance.flyTo([listing.latitude, listing.longitude], 16)}>
              مشاهده مکان روی نقشه
            </Tags>
            <CtaGrp>
              <CtaLink  onClick={() => navigate(`/listings/${listing.id}/`)}>
                مشاهده جزئیات
              </CtaLink>
            </CtaGrp>
          </TagsCta>

          <Grid item container style={{ height: "15rem", marginTop: "1rem" }}>
            <MapContainer center={[35.73087557318668, 51.35107070174615]} zoom={14} scrollWheelZoom>
              <TileLayer
                attribution=""
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <TheMapComponent />
              <Marker position={[listing.latitude, listing.longitude]} />
            </MapContainer>
          </Grid>

          <MetaList animate={animateMetaList}>
            {/* بوک‌مارک */}
            <IconButton style={{ marginBottom: '10px' }}>
              {isAddedToCart ? (
                <BookmarkIcon
                  onClick={() => removeFromCart(listing)}
                  size={24}
                  style={{ color: 'gray', margin: '5px', position: 'relative' }}
                />
              ) : (
                <BookmarkBorderIcon
                  onClick={() => addToCart(listing)}
                  size={24}
                  style={{ color: 'gray', margin: '5px', position: 'relative' }}
                />
              )}
            </IconButton>

            {/* لایک */}
            <IconButton style={{ marginBottom: '10px' }} onClick={handleToggleLike}>
              {isCardLiked ? (
                <FavoriteIcon size={24} style={{ color: 'red', position: 'relative' }} />
              ) : (
                <FavoriteBorderIcon size={24} style={{ color: 'gray', position: 'relative' }} />
              )}
            </IconButton>

            {/* کپی لینک */}
            <CopyToClipboard text={link}>
              <IconButton style={{ marginBottom: '10px' }}>
                <LinkComponent link={link} />
              </IconButton>
            </CopyToClipboard>

            {/* اشتراک‌گذاری */}
            <IconButton style={{ marginBottom: '10px' }} onClick={() => setShareOpen(true)}>
              <ShareIcon size={24} style={{ color: "gray", position: "relative" }} />
            </IconButton>
          </MetaList>
        </CardBody>

        {/* پاپ‌آپ‌های لاگین، رجیستر و اشتراک‌گذاری */}
        {loginOpen && (
          <Login setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} />
        )}
        {registerOpen && (
          <Register setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />
        )}
        {shareOpen && (
          <MediaSharing setShareOpen={setShareOpen} />
        )}
      </CardInner>
    </CardWrapper>
  );
};

export default ListingCard;
