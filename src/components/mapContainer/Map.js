
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./Map.module.scss"
//react leafLet
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import { Icon } from 'leaflet';
//icons
import houseIconPng from "../../assets/Mapicons/house.png";
import apartmentIconPng from "../../assets/Mapicons/apartment.png";
import officeIconPng from "../../assets/Mapicons/office.png";



function Map({ allListings }) {
  const navigate = useNavigate()


  //setting for Icons 
  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40, 40],
  })
  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [40, 40],
  })
  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [40, 40],
  })


  return (
    <div className={styles.mContainer}>
      <MapContainer center={[35.79818421731143, 51.43191553840492]} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {allListings.map((listing) => {
          function IconDispaly() {
            if (listing.listing_type === "مسکونی") {
              return houseIcon
            } else if (listing.listing_type === "اداری") {
              return officeIcon
            } else if (listing.listing_type === "تجاری") {
              return apartmentIcon
            }
          }
          return (
            <Marker
              key={listing.id}
              icon={IconDispaly()}
              position={[
                listing.latitude,
                listing.longitude
              ]}>


              <Popup>
                <h2 style={{textAlign:"center",
                 fontSize:"15px",
                 fontFamily:"YekanBakh",
                  fontWeight:"500",
                   marginBottom:"5px"}}>{listing.bargain_type}{"  "}{listing.property_type}</h2>
                <img src={listing.picture1}
                  alt='picture1'
                  style={{ height: "10rem", width: "14rem", cursor: "pointer" }}
                  onClick={() => navigate(`/listings/${listing.id}/`)} />
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div >
  )
}

export default Map





