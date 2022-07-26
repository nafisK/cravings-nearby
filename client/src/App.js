import { useEffect, useState } from 'react'

import { colors, CssBaseline, Grid } from '@material-ui/core'
import toast, { Toaster } from 'react-hot-toast'

import Header from './Components/Header/Header'
import List from './Components/List/List'
import Map from './Components/Map/Map'

import { getPlacesData } from './api/index'

function App() {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadToast, setloadToast] = useState(false)

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
    setIsLoading(true)
    getPlacesData(bounds.ne, bounds.sw)
      .then(data => {
        setPlaces(data)
        console.log('app', data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [coordinates, bounds])

  useEffect(() => {
    setloadToast(true)
  }, [])

  const notify = () => toast('Restaurants found in your location!')

  return (
    <>
      <div>
        {loadToast && notify() && setloadToast(false)}
        <Toaster />
      </div>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid
        container
        spacing={3}
        style={{ width: '100%', backgroundColor: 'rgb(244 244 245)' }}
      >
        {/* Items Scroll */}
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>

        {/* Map */}
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
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
