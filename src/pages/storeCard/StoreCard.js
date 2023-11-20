import React, { useEffect, useContext } from "react";
import styles from "./StoreCard.module.scss";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";

//assets
import camera from "../../assets/camera.jpg"


//persian tools
import { digitsEnToFa } from "@persian-tools/persian-tools";


//mui
import {Typography, Breadcrumbs, Link} from "@mui/material"
import { makeStyles } from '@mui/styles';
import { Button } from "@mui/material";
//mui icons
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
//Context
import DispatchContext from "../../Context/DispatchContext";
import StateContext from "../../Context/StateContext";



const useStyles = makeStyles({
  registrationStyle: {
    backgroundColor: "green",
    color: "white",
    fontSize: "12px",
    marginLeft: "20px",
    marginRight: "20px",
    "&:hover": {
      backgroundColor: "blue"
    }

  },


})





const StoreCard = () => {

  const classes = useStyles()
  const GlobalDispatch = useContext(DispatchContext)
  const GlobalState = useContext(StateContext)
  const cartItems = GlobalState.cartItems
  const navigate = useNavigate()

  const removeFromCart = (cart) => {
    GlobalDispatch({
      type: "removeCardItem",
      payload: cart
    });
  };

  const clearCart = () => {
    GlobalDispatch({
      type: "clearCardItems",
    });
  };


  useEffect(() => {
    GlobalDispatch({ type: "calculateTotalQuantity" })
  }, [cartItems, GlobalDispatch]);



  return (
    <section>
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
              آگهی های ذخیره شده 
            </Typography>
          </Breadcrumbs>
        </div>
      <div className={styles.table}>
        {cartItems.length === 0 ? (
          <Card cardClass={styles.cardContainer}>
            <p>آگهی ذخیره شده توسط شما وجود ندارد.</p>
            <br />
            <div>
              <a href="/"> مشاهده آگهی ها &larr;</a>
            </div>
          </Card>
        )
          :
          (<Card cardClass={styles.cardContainer}>
            <table>
              <thead>
                <tr>
                  <th>ش</th>
                  <th>آگهی</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  return (
                    <tr key={cart.id}  >
                      <td>{digitsEnToFa(index + 1)}</td>
                      <td onClick={() => navigate(`/listings/${cart.id}`)}>
                        <p>
                          <b>{cart.bargain_type}</b>
                        </p>
                       
                        <img
                          src={cart.picture1 ? cart.picture1 : camera}
                          alt={cart.listing_type}
                       
                        />
                     
                      </td>

                      <td className={styles.icons}>
                        <IconButton aria-label="delete">
                          <DeleteIcon onClick={() => removeFromCart(cart)} />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <Button
                variant='contained'
                type='submit'
                onClick={clearCart}
                className={classes.registrationStyle}
              >
                حذف همه
              </Button>
              <div>
                <a href="/"> صفحه اصلی &larr;</a>
              </div>
            </div>
          </Card>
          )}


      </div>
    </section>
  );
};

export default StoreCard

