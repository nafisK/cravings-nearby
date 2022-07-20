import { useEffect, useState } from 'react'

import { CssBaseline, Grid } from '@material-ui/core'

import Header from './Components/Header/Header'
import List from './Components/List/List'
import Map from './Components/Map/Map'

import { getPlacesData } from './api/index'

function App() {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})

  // was set to null in video
  const [bounds, setBounds] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => [
        setCoordinates({ lat: latitude, lng: longitude }),
      ]
    )
  }, [])

  useEffect(() => {
    getPlacesData(bounds.ne, bounds.sw)
      .then(data => {
        setPlaces(data)
        console.log('app', data)
      })
      .catch(err => console.log(err))
  }, [coordinates, bounds])

  return (
    <>
      <CssBaseline></CssBaseline>
      <Header />

      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places}/>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
