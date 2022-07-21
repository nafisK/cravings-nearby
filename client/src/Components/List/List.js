import { React, useState, createRef, useEffect } from 'react'
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from '@material-ui/core'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

import makeStyles from './styles'

export default function List({ places, childClicked, isLoading }) {
  const classes = makeStyles()
  const [type, setType] = useState('restaurant')
  const [rating, setRating] = useState('')
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    setElRefs(refs =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    )
  }, [places])

  return (
    <div className={classes.container}>
      <Typography variant='h4'>
        <Box sx={{ fontWeight: 'bold' }} style={{ color: '#4C4E52' }}>
          Food Near You
        </Box>
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size='5rem' />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id='rating'>Rating</InputLabel>
            <Select
              id='rating'
              value={rating}
              onChange={e => setRating(e.target.value)}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='3'>Above 3.0</MenuItem>
              <MenuItem value='4'>Above 4.0</MenuItem>
              <MenuItem value='4.5'>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  )
}
