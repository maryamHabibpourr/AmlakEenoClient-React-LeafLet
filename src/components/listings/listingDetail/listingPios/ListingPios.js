import React, { useState, useEffect } from 'react'
import Card from "../../../card/Card"
import styles from "./ListingPios.module.scss"
//react leafLet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from "leaflet"
// import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//svg Icons
import stadiumIconPng from "../../../../assets/Mapicons/stadium.png";
import hospitalIconPng from "../../../../assets/Mapicons/hospital.png";
import universityIconPng from "../../../../assets/Mapicons/university.png";
//MUI
import { Chip, Divider, Typography } from "@mui/material"
//react icons
import { FaUniversity } from "react-icons/fa"
import { FaHospitalAlt } from "react-icons/fa"
import { MdStadium } from "react-icons/md"
//persian tools
import { convertDigits } from "persian-helpers";


function ListingPios({ listingInfo }) {

    const stadiumIcon = new Icon({
        iconUrl: stadiumIconPng,
        iconSize: [40, 40],
    })

    const hospitalIcon = new Icon({
        iconUrl: hospitalIconPng,
        iconSize: [40, 40],
    })

    const universityIcon = new Icon({
        iconUrl: universityIconPng,
        iconSize: [40, 40],
    })


    const [isBlinking, setIsBlinking] = useState(false);

    const blinkingIcon = L.icon({
        iconUrl: universityIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
    });



    const blinkingIconAnimated = L.icon({
        ...blinkingIcon.options,
        className: 'blinking-marker',
    });



    // Toggle the blinking effect
    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlinking((prevIsBlinking) => !prevIsBlinking);
        }, 1000);
        return () => clearInterval(interval);
    }, []);





    return (
        <div className={styles.MapInterestAreaContainer}>
            <Card cardClass={styles.MapInterestCardContainer}>
                <Divider style={{ margin: "10px 0px 30px 0px" }}>
                    <Chip label="این مکان نزدیک است به: " style={{ backgroundColor: "var( --color-red )", color: "#fff", fontSize: "15px", fontWeight: "500" }} />
                </Divider>
                <div className={styles.carditemContainer}>
                    <div className={styles.cardItemInfo}>

                        {listingInfo.listing_pois_within_10km.map(poi => {
                            function DegreeToRadian(coordinate) {
                                return (coordinate * Math.PI) / 180;
                            }

                            function CalculateDistance() {
                                const latitude1 = DegreeToRadian(listingInfo.latitude)
                                const longitude1 = DegreeToRadian(listingInfo.longitude)

                                const latitude2 = DegreeToRadian(poi.location.coordinates[0])
                                const longitude2 = DegreeToRadian(poi.location.coordinates[1])


                                const latDiff = latitude2 - latitude1;
                                const lonDiff = longitude2 - longitude1;
                                const R = 6371000 / 1000;

                                const a =
                                    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
                                    Math.cos(latitude1) *
                                    Math.cos(latitude2) *
                                    Math.sin(lonDiff / 2) *
                                    Math.sin(lonDiff / 2);
                                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                                const d = R * c;

                                const dist =
                                    Math.acos(
                                        Math.sin(latitude1) * Math.sin(latitude2) +
                                        Math.cos(latitude1) *
                                        Math.cos(latitude2) *
                                        Math.cos(lonDiff)
                                    ) * R;
                                return dist.toFixed(2);
                            }


                            function PoiIconReact() {
                                if (poi.type === "استادیوم") {
                                    return <MdStadium style={{ fontSize: "2rem", color: "gray" }} />;
                                }
                                else if (poi.type === "بیمارستان") {
                                    return <FaHospitalAlt style={{ fontSize: "2rem", color: "gray" }} />
                                }
                                else if (poi.type === "دانشگاه") {
                                    return <FaUniversity style={{ fontSize: "2rem", color: "gray" }} />
                                }
                            }
                            return (
                                <Card cardClass={styles.cardPio} key={poi.id}>
                                    <Typography style={{ fontSize: "15px" }}>{convertDigits(poi.name)}</Typography>
                                    <div>
                                        <Typography variant="subtitle1">{PoiIconReact()}</Typography>
                                        {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                                        <Typography style={{ fontSize: "15px" }}>{convertDigits(CalculateDistance())} کیلومتر</Typography>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>


                    <div className={styles.cardMapInfo}>
                        <MapContainer
                            center={[listingInfo.latitude, listingInfo.longitude]}
                            zoom={16} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker
                                position={[listingInfo.latitude, listingInfo.longitude]}
                            //  icon={isBlinking ? blinkingIconAnimated : blinkingIcon}
                            >
                                <Popup>
                                    {listingInfo.property_type}
                                </Popup>
                            </Marker>


                            {listingInfo.listing_pois_within_10km.map(poi => {
                                function PoiIcon() {
                                    if (poi.type === "استادیوم") {
                                        return stadiumIcon;
                                    }
                                    else if (poi.type === "بیمارستان") {
                                        return hospitalIcon;
                                    }
                                    else if (poi.type === "دانشگاه") {
                                        return universityIcon;
                                    }
                                }
                                return (
                                    <Marker
                                        key={poi.id}
                                        position={[
                                            poi.location.coordinates[0],
                                            poi.location.coordinates[1]]}
                                        icon={PoiIcon()}
                                    >
                                        <Popup>
                                            {poi.name}
                                        </Popup>
                                    </Marker>
                                )
                            })}
                        </MapContainer>
                    </div>
                </div>
            </Card>
        </div>

    )
}


export default ListingPios




