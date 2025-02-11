import { useEffect, useMemo, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom"
import Axios from 'axios';
import { useImmerReducer } from "use-immer";
import styles from "./listingUpdate.module.scss"


//context
import StateContext from "../../../Context/StateContext";


//MUI
import {
  Typography,
  Button,
  TextField,
  Snackbar,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip
} from "@mui/material"
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid2';


//data property
import {
  bargainTypeOptions,
  listingTypeOptions,
  propertyTypeOptions,
  propertyStatusOptions,
  BuildingFaceOptions,
  RoomNumberOptions,
  BuildingApearenceOptions,
  FloorCoveringOptions,
  KitchenApearenceOptions,
  WcTypeOptions,
  HeatingSystemOptions,
  coolingSystemOptions,
  houseDocumentStatusOptions,
  HouseDocumentTypeOptions,
  AdvertiserTypeOptions,
} from "../../addProperty/DataProperty"
import Card from "../../card/Card";




const useStyles = makeStyles({
  formContainer: {
    width: "75%",
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
  RejectButtom:{
    marginTop:"10px",
    fontSize:"1.1rem",
    background:"#ece4e4",
    "&:hover": {
      backgroundColor: "#e10a1d",
    }
  }
})




function ListingUpdate({ listingData, closeDialog }) {

  const classes = useStyles()
  const navigate = useNavigate()
  const GlobalState = useContext(StateContext)


  ///seting for state#####################################################################
  const initialState = {
    bargainTypeValue: listingData.bargain_type,
    listingTypeValue: listingData.listing_type,
    propertyTypeValue: listingData.property_type,
    areaMetereValue: listingData.area_metere,
    buildingAgeValue: listingData.age_of_building,
    priceForSaleValue: listingData.price_for_sale,
    rentPerMonthValue: listingData.rent_per_month,
    numberOfFloorOfBuildingValue: listingData.number_of_floor_of_building,
    numberOfUnitPerFloorValue: listingData.number_of_unit_per_floor,
    floorOfBuildingValue: listingData.floor_of_building,
    nameOfPropertyOwnerValue: listingData.name_of_property_owner,
    addressOfBuildingValue: listingData.address_of_building,
    descriptionValue: listingData.description,
    poolValue: listingData.pool,
    elevatorValue: listingData.elevator,
    parkingValue: listingData.parking,
    balconyValue: listingData.balcony,
    lobbyValue: listingData.lobby,
    guardValue: listingData.guard,
    warehouseValue: listingData.warehouse,
    jacuzziValue: listingData.Jacuzzi,
    propertyStatusValue: listingData.property_status,
    buildingFaceValue: listingData.building_face,
    roomNumberValue: listingData.rooms,
    buildingApearenceValue: listingData.building_apearence,
    floorCoveringValue: listingData.floor_covering,
    kitchenApearenceValue: listingData.kitchen_apearence,
    wcTypeValue: listingData.wc_type,
    heatingSystemValue: listingData.heating_system,
    coolingSystemValue: listingData.cooling_system,
    houseDocumentStatusValue: listingData.house_document_status,
    houseDocumentTypeValue: listingData.house_document_type,
    advertiserTypeValue: listingData.advertiser,
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,

  }



  ///setting for action or in other words for set state##########################################
  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchBargianTypeChange":
        draft.bargainTypeValue = action.bargainTypeChose;
        break;
      case "catchListingTypeChange":
        draft.listingTypeValue = action.listingTypeChose;
        break;
      case "catchPropertyTypeChange":
        draft.propertyTypeValue = action.propertyTypeChose;
        break

      case "catchAreaMetereChange":
        draft.areaMetereValue = action.areaMetreChose;
        break;
      case "catchBuildingAgeChange":
        draft.buildingAgeValue = action.buildingAgeChose;
        break;
      case "catchPriceForSaleChange":
        draft.priceForSaleValue = action.priceForSaleChose;
        break;
      case "catchRentPerMonthChange":
        draft.rentPerMonthValue = action.rentPerMonthChose;
        break;
      case "catchNumberOfFloorOfBuildingChange":
        draft.numberOfFloorOfBuildingValue = action.numberOfFloorOfBuildingChose;
        break;
      case "catchNnumberOfUnitPerFloorChange":
        draft.numberOfUnitPerFloorValue = action.numberOfUnitPerFloorChose;
        break;
      case "catchFloorOfBuildingChange":
        draft.floorOfBuildingValue = action.floorOfBuildingChose;
        break;
      case "catchNameOfPropertyOwnerChange":
        draft.nameOfPropertyOwnerValue = action.nameOfPropertyOwnerChose;
        break;
      case "catchAddressOfBuildingChange":
        draft.addressOfBuildingValue = action.addressOfBuildingChose;
        break;
      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChose;
        break;
      //check box##############################################
      case "catchPoolChange":
        draft.poolValue = action.poolChose;
        break;
      case "catchElevatorChange":
        draft.elevatorValue = action.elevatorChose;
        break;
      case "catchParkingChange":
        draft.parkingValue = action.parkingChose;
        break;
      case "catchBalconyChange":
        draft.balconyValue = action.balconyChose;
        break;
      case "catchLobbyChange":
        draft.lobbyValue = action.lobbyChose;
        break;
      case "catchGuardChange":
        draft.guardValue = action.guardChose;
        break;
      case "catchWarehouseChange":
        draft.warehouseValue = action.warehouseChose;
        break;
      case "catchJacuzziChange":
        draft.jacuzziValue = action.jacuzziChose;
        break;
      //detail selectin object############################

      case "catchPropertyStatusChange":
        draft.propertyStatusValue = action.propertyStatusChose;
        break;
      case "catchBuildingFaceChange":
        draft.buildingFaceValue = action.buildingFaceChose;
        break;
      case "catchRoomNumbeChange":
        draft.roomNumberValue = action.roomNumberChose;
        break;
      case "catchBuildingApearencehange":
        draft.buildingApearenceValue = action.buildingApearenceChose;
        break;
      case "catchFloorCoveringcehange":
        draft.floorCoveringValue = action.floorCoveringChose;
        break;
      case "catchKitchenApearencechange":
        draft.kitchenApearenceValue = action.kitchenApearenceChose;
        break;
      case "catchwcTypechange":
        draft.wcTypeValue = action.wcTypeChose;
        break;
      case "catchHeatingSystemChange":
        draft.heatingSystemValue = action.heatingSystemChose;
        break;
      case "catchCoolingSystemChange":
        draft.coolingSystemValue = action.coolingSystemChose;
        break;
      case "catchHouseDocumentStatusChange":
        draft.houseDocumentStatusValue = action.houseDocumentStatusChose;
        break;
      case "catcHouseDocumentTypeChange":
        draft.houseDocumentTypeValue = action.houseDocumentTypeChose;
        break;
      case "catchAdvertiserTypeChange":
        draft.advertiserTypeValue = action.advertiserTypeChose;
        break;

      //related to getting info
      case 'changeSendRequest':
        draft.sendRequest = draft.sendRequest + 1
        break;
      //relate dto the sanck bar
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





  ////setting for submit#####################################################################
  const formSubmit = (e) => {
    e.preventDefault();
    // console.log("the form has been submitted")
    dispatch({ type: "changeSendRequest" })
    dispatch({ type: 'disableTheButton' })

  }
  //axis for submit for send Request###################################################
  useEffect(() => {
    if (state.sendRequest) {
      async function UpdateProperty() {
        const formData = new FormData()
        if (state.bargainTypeValue === "فروش" || state.bargainTypeValue === "رهن کامل") {
          formData.append("bargain_type", state.bargainTypeValue);
          formData.append("listing_type", state.listingTypeValue);
          formData.append("property_type", state.propertyTypeValue);
          formData.append("area_metere", state.areaMetereValue);
          formData.append("age_of_building", state.buildingAgeValue);
          formData.append("price_for_sale", state.priceForSaleValue);
          formData.append("rent_per_month", 0);
          formData.append("number_of_floor_of_building", state.numberOfFloorOfBuildingValue);
          formData.append("number_of_unit_per_floor", state.numberOfUnitPerFloorValue);
          formData.append("floor_of_building", state.floorOfBuildingValue);
          formData.append("name_of_property_owner", state.nameOfPropertyOwnerValue);
          formData.append("address_of_building", state.addressOfBuildingValue);
          formData.append("description", state.descriptionValue);
          formData.append("pool", state.poolValue);
          formData.append("elevator", state.elevatorValue);
          formData.append("balcony", state.parkingValue);
          formData.append("parking", state.balconyValue);
          formData.append("lobby", state.lobbyValue);
          formData.append("guard", state.guardValue);
          formData.append("warehouse", state.warehouseValue);
          formData.append("Jacuzzi", state.jacuzziValue);
          formData.append("property_status", state.propertyStatusValue);
          formData.append("building_face", state.buildingFaceValue);
          formData.append("rooms", state.roomNumberValue);
          formData.append("building_apearence", state.buildingApearenceValue);
          formData.append("floor_covering", state.floorCoveringValue);
          formData.append("kitchen_apearence", state.kitchenApearenceValue);
          formData.append("wc_type", state.wcTypeValue);
          formData.append("heating_system", state.heatingSystemValue);
          formData.append("cooling_system", state.coolingSystemValue);
          formData.append("house_document_status", state.houseDocumentStatusValue);
          formData.append("house_document_type", state.houseDocumentTypeValue);
          formData.append("advertiser", state.advertiserTypeValue);
          formData.append("seller", GlobalState.userId);
        }
        else if (state.bargainTypeValue === "اجاره") {
          formData.append("bargain_type", state.bargainTypeValue);
          formData.append("listing_type", state.listingTypeValue);
          formData.append("property_type", state.propertyTypeValue);
          formData.append("area_metere", state.areaMetereValue);
          formData.append("age_of_building", state.buildingAgeValue);
          formData.append("price_for_sale", state.priceForSaleValue);
          formData.append("rent_per_month", state.rentPerMonthValue);
          formData.append("number_of_floor_of_building", state.numberOfFloorOfBuildingValue);
          formData.append("number_of_unit_per_floor", state.numberOfUnitPerFloorValue);
          formData.append("floor_of_building", state.floorOfBuildingValue);
          formData.append("name_of_property_owner", state.nameOfPropertyOwnerValue);
          formData.append("address_of_building", state.addressOfBuildingValue);
          formData.append("description", state.descriptionValue);
          formData.append("pool", state.poolValue);
          formData.append("elevator", state.elevatorValue);
          formData.append("balcony", state.parkingValue);
          formData.append("parking", state.balconyValue);
          formData.append("lobby", state.lobbyValue);
          formData.append("guard", state.guardValue);
          formData.append("warehouse", state.warehouseValue);
          formData.append("Jacuzzi", state.jacuzziValue);
          formData.append("property_status", state.propertyStatusValue);
          formData.append("building_face", state.buildingFaceValue);
          formData.append("rooms", state.roomNumberValue);
          formData.append("building_apearence", state.buildingApearenceValue);
          formData.append("floor_covering", state.floorCoveringValue);
          formData.append("kitchen_apearence", state.kitchenApearenceValue);
          formData.append("wc_type", state.wcTypeValue);
          formData.append("heating_system", state.heatingSystemValue);
          formData.append("cooling_system", state.coolingSystemValue);
          formData.append("advertiser", state.advertiserTypeValue);
          formData.append("seller", GlobalState.userId);
        }
        try {
          const response = await Axios.patch(`https://api.amlakeeno.ir/api/listings/${listingData.id}/update/`, formData);
          console.log(response.data)
          dispatch({ type: "openTheSnack" })
        } catch (e) {
          console.log(e.response)
          dispatch({ type: "allowTheButton" })
        }
      }
      UpdateProperty()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sendRequest])



  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate(0)
      }, 1500);
    }
  }, [state.openSnack])



  //seting for text in the textfield price
  function PriceDisplay() {
    if (state.bargainTypeValue === "فروش") {
      return "قیمت فروش به تومان*"
    }
    else if (state.bargainTypeValue === "رهن کامل") {
      return "رهن کامل به تومان*"
    }
    else if (state.bargainTypeValue === "اجاره") {
      return "رهن یا ودیعه به تومان*"
    }
    else {
      return "قیمت*"
    }
  }

  return (

    <div className={styles.formContainer}>
      <Card cardClass={styles.cardContainer}>
        <form onSubmit={formSubmit}>
          <Grid item container
            justifyContent={"center"}>
            <Typography variant='h5' style={{ color: "gray", marginBottom: "20px" }} >
              به روز رسانی اطلاعات ملک
            </Typography>
          </Grid>

          <Divider >
            <Chip label="اطلاعات مهم اولیه" style={{ backgroundColor: "#fecc01", fontSize: "15px" }} />
          </Divider>

          <Grid item container justifyContent="space-between">
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="bargainType"
                label="نوع معامله*"
                variant="standard"
                inputProps={{ style: { fontSize: 15, color: "success" } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.bargainTypeValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchBargianTypeChange',
                    bargainTypeChose: e.target.value
                  })}


                select
                SelectProps={{
                  native: true,
                }}>
                {bargainTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="listingType"
                label="نوع مکان*"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.listingTypeValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchListingTypeChange',
                    listingTypeChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}>
                {listingTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="propertyType"
                label="نوع ساختمان*"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.propertyTypeValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchPropertyTypeChange',
                    propertyTypeChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}>
                {propertyTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="propertyType"
                label="تعداد اتاق*"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.roomNumberValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchRoomNumbeChange',
                    roomNumberChose: e.target.value
                  })}




                select
                SelectProps={{
                  native: true,
                }}>
                {RoomNumberOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}

              </TextField>
            </Grid>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="area-metere"
                type="number"
                label="زیربنا(مترمربع)*"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                variant="standard"
                value={state.areaMetereValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchAreaMetereChange',
                    areaMetreChose: e.target.value
                  })}

              />
            </Grid>

            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="price"
                type="number"
                label={PriceDisplay()}
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                variant="standard"
                value={state.priceForSaleValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchPriceForSaleChange',
                    priceForSaleChose: e.target.value
                  })}

              />
            </Grid>
          </Grid>
          <Grid item container justifyContent="space-between">
            {state.bargainTypeValue === "اجاره" ? (
              <Grid item xs={12} md={5}
                style={{ marginTop: "1rem" }}>
                <TextField
                  id="rentPerMonth"
                  type="number"
                  label="اجاره (ماهیانه)*"
                  variant="standard"
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{ style: { fontSize: 17 } }}
                  FormHelperTextProps={{ style: { fontSize: 13 } }}
                  disabled={state.bargainTypeValue === "رهن کامل" || state.bargainTypeValue === "فروش" ? true : false}
                  value={state.rentPerMonthValue}
                  fullWidth
                  onChange={(e) =>
                    dispatch({
                      type: 'catchRentPerMonthChange',
                      rentPerMonthChose: e.target.value
                    })}
                />
              </Grid>
            )
              :
              ("")}
          </Grid>

          <Grid item container justifyContent="space-between" style={{ marginBottom: "30px" }}>
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="buildingAge"
                type="number"
                label="سن ساختمان به سال*"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.buildingAgeValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchBuildingAgeChange',
                    buildingAgeChose: e.target.value
                  })}

              />
            </Grid>
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="buildingFace"
                label="جهت ملک"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.buildingFaceValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchBuildingFaceChange',
                    buildingFaceChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}>
                {BuildingFaceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}

              </TextField>
            </Grid>
          </Grid>



          <Divider style={{ margin: "10px 0px" }}>
            <Chip label="اطلاعات مهم ثانویه" style={{ backgroundColor: "#fecc01", fontSize: "15px" }} />
          </Divider>

          <Grid item container justifyContent="space-between">
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="numberOfFloorOfBuilding"
                type="number"
                label="تعداد طبقات ساختمان*"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.numberOfFloorOfBuildingValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchNumberOfFloorOfBuildingChange',
                    numberOfFloorOfBuildingChose: e.target.value
                  })}
              />
            </Grid>
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="rentPerMonth"
                type="number"
                label="تعداد واحد در هر طبقه* "
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.numberOfUnitPerFloorValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchNnumberOfUnitPerFloorChange',
                    numberOfUnitPerFloorChose: e.target.value
                  })}

              />
            </Grid>
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="floorOfBuilding"
                type="number"
                label="طبقه ملک*"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.floorOfBuildingValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchFloorOfBuildingChange',
                    floorOfBuildingChose: e.target.value
                  })}

              />
            </Grid>
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="propertyStatuse"
                label="وضعیت ملک"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.propertyStatusValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchPropertyStatusChange',
                    propertyStatusChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}

              >
                {propertyStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item container justifyContent="space-between" style={{ marginTop: "10px" }}>
            <Grid item xs={12} md={2}
              style={{ marginTop: "10px" }}>
              <FormControlLabel
                control={<Checkbox checked={state.poolValue} onChange={(e) =>
                  dispatch({
                    type: "catchPoolChange",
                    poolChose: e.target.checked
                  })} />}
                label="استخر" />
            </Grid>


            <Grid item xs={12} md={2}
              style={{ marginTop: "10px" }}>
              <FormControlLabel
                control={<Checkbox checked={state.elevatorValue} onChange={(e) =>
                  dispatch({
                    type: "catchElevatorChange",
                    elevatorChose: e.target.checked
                  })} />}
                label="آسانسور" />
            </Grid>

            <Grid item xs={12} md={2}
              style={{ marginTop: "10px" }}>
              <FormControlLabel
                control={<Checkbox checked={state.parkingValue} onChange={(e) =>
                  dispatch({
                    type: "catchParkingChange",
                    parkingChose: e.target.checked
                  })} />}
                label="پارکینگ" />
            </Grid>

            <Grid item xs={12} md={2}
              style={{ marginTop: "10px" }}>
              <FormControlLabel
                control={<Checkbox checked={state.balconyValue} onChange={(e) =>
                  dispatch({
                    type: "catchBalconyChange",
                    balconyChose: e.target.checked
                  })} />}
                label="بالکن"
              />
            </Grid>
          </Grid>


          <Grid item container justifyContent="space-between" style={{ marginBottom: "40px" }}>
            <Grid item xs={12} md={2}
              style={{ marginTop: "1rem" }}>
              <FormControlLabel
                control={<Checkbox checked={state.lobbyValue} onChange={(e) =>
                  dispatch({
                    type: "catchLobbyChange",
                    lobbyChose: e.target.checked
                  })} />}
                label="لابی" />
            </Grid>


            <Grid item xs={12} md={2}
              style={{ marginTop: "1rem" }}>
              <FormControlLabel
                control={<Checkbox checked={state.guardValue} onChange={(e) =>
                  dispatch({
                    type: "catchGuardChange",
                    guardChose: e.target.checked
                  })} />}
                label="نگهبان" />
            </Grid>

            <Grid item xs={12} md={2}
              style={{ marginTop: "1rem" }}>
              <FormControlLabel
                control={<Checkbox checked={state.warehouseValue} onChange={(e) =>
                  dispatch({
                    type: "catchWarehouseChange",
                    warehouseChose: e.target.checked
                  })} />}
                label="انباری" />
            </Grid>

            <Grid item xs={12} md={2}
              style={{ marginTop: "1rem" }}>
              <FormControlLabel
                control={<Checkbox checked={state.jacuzziValue} onChange={(e) =>
                  dispatch({
                    type: "catchJacuzziChange",
                    jacuzziChose: e.target.checked
                  })} />}
                label="جکوزی"
              />
            </Grid>
          </Grid>

          <Divider>
            <Chip label="اطلاعات جانبی" style={{ backgroundColor: "#fecc01", fontSize: "15px" }} />
          </Divider>


          <Grid item container justifyContent="space-between">
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="buildingApearenc"
                label="ظاهر ساختمان"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.buildingApearenceValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchBuildingApearencehange',
                    buildingApearenceChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}>
                {BuildingApearenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="FloorCovering"
                label="پوشش کف ملک"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.floorCoveringValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchFloorCoveringcehange',
                    floorCoveringChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}>
                {FloorCoveringOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}

              </TextField>
            </Grid>

          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="buildingApearenc"
                label="نوع سرویس"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.wcTypeValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchwcTypechange',
                    wcTypeChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}>
                {WcTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="kitchenApearence"
                label="آشپزخانه"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.kitchenApearenceValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchKitchenApearencechange',
                    kitchenApearenceChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}>
                {KitchenApearenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}

              </TextField>
            </Grid>


          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="FloorCovering"
                label="نوع سیستم گرمایشی"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.heatingSystemValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchHeatingSystemChange',
                    heatingSystemChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}>
                {HeatingSystemOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}

              </TextField>
            </Grid>
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="kitchenApearence"
                label="نوع سیستم سرمایشی"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.coolingSystemValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchCoolingSystemChange',
                    coolingSystemChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}>
                {coolingSystemOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}

              </TextField>
            </Grid>
          </Grid>
          {state.bargainTypeValue === "فروش" ? (
            <Grid item container justifyContent="space-between">
              <Grid item xs={12} md={5}
                style={{ marginTop: "1rem" }}>
                <TextField
                  id="HouseDocumentStatus"
                  label="وضعیت سند"
                  variant="standard"
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{ style: { fontSize: 17 } }}
                  FormHelperTextProps={{ style: { fontSize: 13 } }}
                  value={state.houseDocumentStatusValue}
                  fullWidth
                  onChange={(e) =>
                    dispatch({
                      type: 'catchHouseDocumentStatusChange',
                      houseDocumentStatusChose: e.target.value
                    })}

                  select
                  SelectProps={{
                    native: true,
                  }}>
                  {houseDocumentStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={5}
                style={{ marginTop: "1rem" }}>
                <TextField
                  id="FloorCovering"
                  label="نوع سند"
                  variant="standard"
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{ style: { fontSize: 17 } }}
                  FormHelperTextProps={{ style: { fontSize: 13 } }}
                  value={state.houseDocumentTypeValue}
                  fullWidth
                  onChange={(e) =>
                    dispatch({
                      type: 'catcHouseDocumentTypeChange',
                      houseDocumentTypeChose: e.target.value
                    })}

                  select
                  SelectProps={{
                    native: true,
                  }}

                >
                  {HouseDocumentTypeOptions.map((option) => (
                    <option key={option.value} value={option.value} >
                      {option.label}
                    </option>
                  ))}

                </TextField>
              </Grid>
            </Grid>

          )
            :
            ("")}

          <Grid item container justifyContent="space-between">
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="nameOfPropertyOwner"
                type="text"
                label="اسم مالک "
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.nameOfPropertyOwnerValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchNameOfPropertyOwnerChange',
                    nameOfPropertyOwnerChose: e.target.value
                  })}
              />
            </Grid>
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="kitchenApearence"
                label="آگهی کننده"
                variant="standard"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
                FormHelperTextProps={{ style: { fontSize: 13 } }}
                value={state.advertiserTypeValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchAdvertiserTypeChange',
                    advertiserTypeChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: true,
                }}>
                {AdvertiserTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}

              </TextField>
            </Grid>
          </Grid>
          <Grid item container justifyContent="space-between"
            style={{ marginTop: "1rem" }}>
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="addressOfBuilding"
                type="text"
                label="آدرس دقیق ملک"
                variant="outlined"
                multiline
                rows={4}
                value={state.addressOfBuildingValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchAddressOfBuildingChange',
                    addressOfBuildingChose: e.target.value
                  })}
              />
            </Grid>
            <Grid item xs={12} md={5}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="description"
                label="توضیحات"
                variant="outlined"
                multiline
                rows={4}
                value={state.descriptionValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchDescriptionChange',
                    descriptionChose: e.target.value
                  })}
              />
            </Grid>

          </Grid>

          <Grid item container justifyContent="cenetr"  flexDirection="column"  spacing={2}
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
            <Button 
            className={classes.RejectButtom}
            variant="contained" 
            fullWidth
            onClick={closeDialog}>انصراف</Button>
          </Grid>
        </form>
      </Card>
      <Snackbar
        open={state.openSnack}
        message="اطلاعات با موفقیت به روز رسانی شد"
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
    </div>
  )
}

export default ListingUpdate
