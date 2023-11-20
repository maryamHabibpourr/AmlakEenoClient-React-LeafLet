import { useState, useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate} from 'react-router-dom';
import Axios from "axios";
//mui
import { Snackbar } from '@mui/material';
//persian tools
import { digitsEnToFa } from "@persian-tools/persian-tools";
//style
import styles from "./Header.module.scss";
//motion styles
import { motion } from 'framer-motion'
//pages
import { Login, Register } from '../../pages'
//icon
import { BsPlus } from "react-icons/bs"
import { MdOutlineMapsHomeWork, MdRealEstateAgent } from "react-icons/md"
import { CgMenu, CgClose } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { CgChevronRight } from 'react-icons/cg';
import { MdTransitEnterexit } from 'react-icons/md';
import { BiSolidExit } from "react-icons/bi";
import { RiUserSettingsFill } from "react-icons/ri";
import {FiArrowUpLeft} from "react-icons/fi";
import {TbArticle} from "react-icons/tb";
import {SiGotomeeting} from "react-icons/si";
//context
import StateContext from '../../Context/StateContext';
import DispatchContext from '../../Context/DispatchContext';
//compenent
import MoreList from "./moreList/MoreList"





// //defin logo
const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        املاک<span>اینو{" "}</span>.
      </h2>
    </Link>
  </div>
)



function Header() {
  const [scrollpage, setScrollPage] = useState(false)
  const [listings, setListings] = useState(false)
  const [property, setProperty] = useState(false)
  const [agencies, setAgencies] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)
  const [openMoreList, setOpenMoreList] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [openHambergureMenu, setOpenHambergureMenu] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const navigate = useNavigate()
 


  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)

  const cartItems = GlobalState.cartItems
  const cartTotalQuantity = GlobalState.cartTotalQuantity

  useEffect(() => {
    GlobalDispatch({ type: "calculateTotalQuantity" })
  }, [cartItems, GlobalDispatch]);


  //setting logout
  async function HandleLogout() {
    const confirmLogout = window.confirm("مطمئنید که می خواهید خارج شوید؟")
    if (confirmLogout) {
      try {
        const response = await Axios.post("https://api.amlakeeno.ir/api-auth-djoser/token/logout/",
          GlobalState.userToken,
          {
            headers: { Authorization: 'Token '.concat(GlobalState.userToken) }
          })
        console.log(response)
        GlobalDispatch({ type: "logout" })
        setOpenSnack(true)
      } catch (e) {
        console.log(e.response)
      }
    }
  }

  //SETTING FOR SNACKBAR
  useEffect(() => {
    if (openSnack) {
      setTimeout(() => {
        setOpenAccount(false)
        navigate(0)
      }, 1500);
    }
  }, [openSnack])


  //setting for motion
  const animateFrom = { opacity: 0, y: -40 }
  const animateTo = { opacity: 1, y: 0 }



  // setting for tabs ##########################################
  const openMenuListings = () => {
    setListings(current => !current)
    setOpenAccount(false)
    setOpenMoreList(false)
  }

  const openMenuProperty = () => {
    setProperty(current => !current)
    setOpenAccount(false)
    setOpenMoreList(false)
  }

  const openMenuAgencies = () => {
    setAgencies(current => !current)
    setOpenAccount(false)
    setOpenMoreList(false)
  }


  // setting open and close user account####################
  const openMenu = () => {
    setOpenAccount(current => !current)
    setOpenMoreList(false)
  }

  const userIcon = <FaRegUserCircle
    className={styles.AccountIcon}
    onClick={openMenu} />

  const closeIcon = <CgClose
    className={styles.CloseMenuSite}
    onClick={openMenu} />



  // setting more List aption#########################
  const openMoreMenu = () => {
    setOpenMoreList(current => !current)
    setOpenAccount(false)
  }

  
  const menuIcon = <CgMenu
    className={styles.AccountIcon}
    onClick={openMoreMenu} />

  const closeMenIcon = <CgClose
    className={styles.CloseMenuSite}
    onClick={openMoreMenu} />


  // setting open and close hamburgure menu##############################
  const openHamburgureMenu = () => {
    setOpenHambergureMenu(current => !current)
  }


  const hamMenuIcon = <CgMenu
    className={styles.HamburIcon}
    onClick={openHamburgureMenu} />

  const closehamMenuIcon = <CgClose
    className={styles.CloseMenuSiteHam}
    onClick={openHamburgureMenu} />



  //setting active tab
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");


  // fix navbar
  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true)
    } else {
      setScrollPage(false)
    }
  }
  window.addEventListener("scroll", fixNavbar)



  return (
    <header className={scrollpage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}
        <ul >
          <li onClick={openMenuListings}>
            <NavLink to="/" className={activeLink}> <MdOutlineMapsHomeWork size={20} /><p>لیست املاک </p></NavLink>
          </li>
          <li onClick={openMenuProperty}>
            <NavLink to="/addproperty" className={activeLink}><BsPlus size={20} /><p>سپردن ملک</p></NavLink>
          </li>
          <li onClick={openMenuAgencies}>
            <NavLink to="/agencies" className={activeLink}><MdRealEstateAgent size={20} /><p>آژانس های املاک</p></NavLink>
          </li>
        </ul>




        <div>
          {openMoreList ? closeMenIcon : menuIcon}
          {openMoreList && <MoreList openMoreMenu={openMoreMenu} />}
        </div>



        <div>
          {openAccount ? closeIcon : userIcon}
          {openAccount &&
            <div className={styles.modalUserContainer}>
              <motion.div className={styles.cardUserAccount}
                initial={animateFrom}
                animate={animateTo}
                transition={{ delay: 0.7 }}
              >
                {GlobalState.userIsLogged ? (

                  <div className={styles.subMenuContentContainer}>
                    <h1>حساب کابری من</h1>
                    <div className={styles.subMenuborderContainer}>
                      <span> {GlobalState.userUsername} عزیز</span>
                      <p>خوش آمدید! شما در اینجا می توانید املاک و مستغلات مورد علاقه خود را جستجو کنید، بیابید و سپس مشورت نمایید و بعد از کسب اطلاعات لازم خریداری یا اجاره نمایید. </p>
                      <div className={styles.subMenuContainerButton} onClick={openMenu} >
                        <Link onClick={HandleLogout}><BiSolidExit size={30} />خروج</Link>
                      </div>
                    </div>

                    <div className={styles.subMenuListContainer} onClick={openMenu}  >
                      <div className={styles.subMenuListContainerDiv}>
                        <Link><CgChevronRight size={20} /></Link>
                        <Link to="/profile">تنظیمات حساب کاربری</Link>
                      </div>
                      <div className={styles.subMenuListContainerDiv}>
                        <Link><CgChevronRight size={20} /></Link>
                        <Link to="/storecards"> <span>{`${digitsEnToFa(cartTotalQuantity)}`}</span>پست های ذخیره شده</Link>
                      </div>
                    </div>
                  </div>


                )
                  :

                  (<div className={styles.subMenuContentContainer}>
                    <h1>حساب کابری من</h1>
                    <div className={styles.subMenuborderContainer}>
                      <p>خوش آمدید! شما در اینجا می توانید املاک و مستغلات مورد علاقه خود را جستجو کنید، بیابید و سپس مشورت نمایید و بعد از کسب اطلاعات لازم خریداری یا اجاره نمایید.     </p>
                      <div className={styles.subMenuContainerButton} onClick={openMenu} >
                        <Link onClick={() => setRegisterOpen(true)} ><CgChevronRight size={20} />ثبت نام</Link>
                        <Link onClick={() => setLoginOpen(true)}>ورود</Link>
                      </div>
                    </div>
                  </div>)
                }

              </motion.div>
            </div>
          }
        </div>


        <div>
          {openHambergureMenu ? closehamMenuIcon : hamMenuIcon}
          {openHambergureMenu &&
            <div onClick={openHamburgureMenu} className={openHambergureMenu ?
              `${styles.appMobileContainer}  ${styles.slideBottom}` :
              `${styles.appMobileContainer}  ${styles.slideTop}`}>
              <div className={styles.appMobileContainerToyota} >
                {GlobalState.userIsLogged ?
                  (
                    <>
                      <p> حساب کاربری {GlobalState.userUsername} عزیز</p>
                      <div onClick={HandleLogout}>خروج<MdTransitEnterexit size={23} /></div>
                      <div onClick={() => navigate("/profile")}>تنظیمات حساب کاربری<RiUserSettingsFill size={23} /></div>
                      <div onClick={() => navigate("/storecards")}>پست های ذخیره شده<span style={{color:"red"}}>{`${digitsEnToFa(cartTotalQuantity)}`}</span></div>
                    </>
                  )
                  :
                  (
                    <>
                      <div onClick={() => setRegisterOpen(true)}>ثبت نام<FiArrowUpLeft size={20} /></div>
                      <div onClick={() => setLoginOpen(true)}>ورود<FiArrowUpLeft size={20} /></div>
                    </>

                  )
                }
                <div onClick={()=>navigate("/")}>لیست املاک<MdOutlineMapsHomeWork size={20} /></div>
                <div onClick={()=>navigate("/addproperty")}>سپردن ملک<BsPlus color="red"  size={20} /></div>
                <div onClick={()=>navigate("/agencies")}>آژانس های املاک<MdRealEstateAgent size={20} /></div>
                <div onClick={()=>navigate("/posts")}>مقاله ها<TbArticle size={20}/></div>
                <div onClick={()=>navigate("/commission")}>شرایط کمیسیون<SiGotomeeting  size={20}/></div>
                <div onClick={()=>navigate("/contactus")}>تماس با ما<FiArrowUpLeft size={20} /></div>
              </div>
            </div>
          }
        </div>


      </div >
      <Snackbar
        open={openSnack}
        message="با موفقیت خارج شدید !"
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
      {loginOpen && <Login setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} />}
      {registerOpen && <Register setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />}
    </header >
  )
}

export default Header
















