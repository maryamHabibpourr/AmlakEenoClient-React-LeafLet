import React, { useState, useEffect } from 'react'
import Axios from "axios"

//mui
import { CircularProgress } from '@mui/material'
import Grid from '@mui/material/Grid2';


//components
import { Map } from '../../components';
import ListingList from '../../components/listings/listingList/ListingList';
import News from '../../components/news/News';




function Home() {

  const [allListings, setAllListings] = useState([])
  const [dataIsLoading, setDataIsLoading] = useState(true)




  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await Axios.get("https://api.amlakeeno.ir/api/listings/", { cancelToken: source.token });
        console.log(response.data)
        setAllListings(response.data)
        setDataIsLoading(false)
      } catch (error) {
        console.log(error.response)
      }
    }
    GetAllListings();
    return () => {
      source.cancel()
    }
  }, [])


  if (dataIsLoading === true) {
    return (
      <Grid container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}>
        <CircularProgress />
      </Grid>
    )
  }




  return (
    <div style={{ dispaly: "flex", flexDirection: "coloumn" }}>
      <div>
        <Map allListings={allListings} />
      </div>
      <div>
        <ListingList allListings={allListings} />
      </div>
      <div>
        <News />
      </div>
    </div>
  )
}

export default Home