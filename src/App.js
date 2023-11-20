import React, { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";


//toast

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import {
  Home,
  Login,
  Register,
  Reset,
  StoreCard,
  NotFound,
  ScrollToTop,
  ContactUs,
  Commission,
  Posts,
  PostDetail,
  Layout,
} from "./pages"
import {
  AddProperty,
  Agencies,
  AgencyDetail,
  Footer,
  Header,
  ListingDetail,
  Profile
}
  from "./components"
import Activation from "./pages/auth/Activation";

//MUI
import CssBaseline from '@mui/material/CssBaseline';
import { Snackbar, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { cacheRtl, theme } from "./muiSettings/Settings"



//context
import DispatchContext from './Context/DispatchContext';
import StateContext from './Context/StateContext';
import { useImmerReducer } from "use-immer"



function App() {

  const [openSnack, setOpenSnack] = useState(false);

  //state and dispatch values
  const initialState = {
    userUsername: localStorage.getItem('theUserusename'),
    userEmail: localStorage.getItem('theUserEmail'),
    userId: localStorage.getItem('theUseId'),
    userToken: localStorage.getItem('theUserToken'),
    userIsLogged: localStorage.getItem('theUserusename') ? true : false,
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    cartTotalQuantity: 0,
    isLiked: JSON.parse(localStorage.getItem("likedCards")) || [],

  }




  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchToken":
        draft.userToken = action.tokenValue;
        break
      case 'userSignIn':
        draft.userUsername = action.usernameInfo
        draft.userEmail = action.emailInfo
        draft.userId = action.IdInfo;
        draft.userIsLogged = true
        break
      case 'logout':
        draft.userIsLogged = false
        break
      case "addCartItem":
        // console.log("addCartItem:", action.payload);
        const listingIndex = draft.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        // console.log("Listing index:", listingIndex);
        if (listingIndex >= 0) {
          draft.cartItems[listingIndex].cartQuantity += 1;
        } else {
          const tempListing = { ...action.payload, cartQuantity: 1 };
          draft.cartItems.push(tempListing);
        }
        // console.log("Updated cartItems:", draft.cartItems);
        localStorage.setItem("cartItems", JSON.stringify(draft.cartItems));
        setOpenSnack(true)// Set openSnack to true
        break;


      case "removeCardItem":
        // console.log("remove item:", action.payload)
        const newCartItem = draft.cartItems.filter(
          (item) => item.id !== action.payload.id
        )
        //  console.log("newCartItem :", newCartItem);
        draft.cartItems = newCartItem;
        localStorage.setItem("cartItems", JSON.stringify(draft.cartItems));
        break

      case "clearCardItems":
        draft.cartItems = [];
        localStorage.setItem("cartItems", JSON.stringify(draft.cartItems));
        break

      case "calculateTotalQuantity":
        const array = [];
        draft.cartItems.map((item) => {
          const { cartQuantity } = item;
          const quantity = cartQuantity;
          return array.push(quantity);
        });
        const totalQuantity = array.reduce((a, b) => {
          return a + b;
        }, 0);
        draft.cartTotalQuantity = totalQuantity;
        break;
      case "toggleLike":
        // console.log("toggleLike:", action.payload);
        const index = draft.isLiked.indexOf(action.payload);
        if (index !== -1) {
          draft.isLiked.splice(index, 1);
          localStorage.setItem("likedCards", JSON.stringify(draft.isLiked));
        } else {
          draft.isLiked.push(action.payload);
          localStorage.setItem("likedCards", JSON.stringify(draft.isLiked));
        }
        break;
      default:
        break;
    }
  }



  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)



  useEffect(() => {
    if (state.userIsLogged) {
      localStorage.setItem('theUserusename', state.userUsername)
      localStorage.setItem('theUserEmail', state.userEmail)
      localStorage.setItem('theUseId', state.userId)
      localStorage.setItem('theUserToken', state.userToken)
    }
    else {
      localStorage.removeItem('theUserusename')
      localStorage.removeItem('theUserEmail')
      localStorage.removeItem('theUseId')
      localStorage.removeItem('theUserToken')
      localStorage.removeItem('likedCards')
      localStorage.removeItem('cartItems')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.userIsLogged])




  useEffect(() => {
    if (openSnack) {
      setTimeout(() => {
        setOpenSnack(false);
      }, 1500);
    }
  }, [openSnack])




  return (
    <>
      <StyledEngineProvider injectFirst>
        <ToastContainer />
        <CssBaseline />
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <StateContext.Provider value={state}>
              <DispatchContext.Provider value={dispatch}>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Layout><Home /></Layout>}/>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/reset" element={<Reset />} />
                  <Route path="/username/reset/confirm/:uid/:token" element={<Activation />} />
                  <Route path="/listings/:id" element={<Layout><ListingDetail /></Layout>} />
                  <Route path="/addproperty" element={<Layout><AddProperty /></Layout>} />
                  <Route path="/profile" element={<Layout><Profile /></Layout>} />
                  <Route path="/agencies" element={<Layout><Agencies /></Layout>} />
                  <Route path="/agencies/:id" element={<Layout><AgencyDetail /></Layout>} />
                  <Route path="/storecards" element={<Layout><StoreCard /></Layout>} />
                  <Route path="*" element={<Layout><NotFound /></Layout>} />
                  <Route path="/contactus" element={<ContactUs />} />
                  <Route path="/posts" element={<Layout><Posts /></Layout>} />
                  <Route path="/posts/:id" element={<Layout><PostDetail /></Layout>} />
                  <Route path="/commission" element={<Layout><Commission/></Layout>}/>
                </Routes>
              </DispatchContext.Provider>
            </StateContext.Provider>
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
      <Snackbar
        open={openSnack}
        message="آیتم ذخیره شد!"
        ContentProps={{
          style:
          {
            fontSize: "1rem",
            fontFamily: "YekanBakh",
            fontWeight: "500",
            background: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            color: "#fff",
            bottom: "20px",
          }
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />

    </>
  );
}

export default App;
