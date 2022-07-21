import React from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import { Search } from '@material-ui/icons/'
import useStyles from './styles'

export default function Header() {
  const classes = useStyles()
  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h5' className={classes.title}>
            Travel Advisor
          </Typography>
          <Box display='flex'>
            <Typography variant='h6' className={classes.title}>
              Exploring new places
            </Typography>
            {/* <Autocomplete onLoad={} onPlaceChanged={}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <Search />
                </div>
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Autocomplete> */}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}
