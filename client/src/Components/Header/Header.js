import { React, useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import { Search, Fastfood } from '@material-ui/icons/'
import useStyles from './styles'

export default function Header({ setCoordinates }) {
  const classes = useStyles()
  const [autoComplete, setAutoComplete] = useState(null)

  const onLoad = autoComplete => {
    setAutoComplete(autoComplete)
  }

  const onPlacesChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat()
    const lng = autoComplete.getPlace().geometry.location.lng()
    setCoordinates({ lat, lng })
  }

  return (
    <div>
      <AppBar position='static' color='white'>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant='h5'
            className={classes.title}
            style={{ color: '#EC407A' }}
          >
            <Fastfood style={{ color: '#EC407A' }} />
            Cravings
          </Typography>
          <Box display='flex'>
            <Typography
              variant='h6'
              className={classes.title}
              style={{ color: '#4C4E52' }}
            >
              Explore new areas
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlacesChanged}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <Search style={{ color: '#EC407A' }} />
                </div>
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}
