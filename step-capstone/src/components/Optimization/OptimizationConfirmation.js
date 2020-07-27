import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import '../../styles/Optimization.css'

export default function OptimizationConfirmation(props) {
  const [open, setOpen] = useState(true);

  const onDecline = () => {
    setOpen(false);
  }

  const onConfirm = () => {
    setOpen(false);
    props.onConfirm(props.travelObjects);
  }

  useEffect(() => { setOpen(true) }, []);

  return (
    open ?
      <Card className='optimization-confirmation'>
        <CardContent>
          <Typography variant='h5'> Here's what we have for you ...</Typography>

          <List className='optimized-schedule'>
            {props.travelObjects.map((travelObject) => {
              return (
                <ListItem key={travelObject.id}>
                  <ListItemText
                    primary={travelObject.title}
                    secondary={travelObject.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
                      ' - ' + travelObject.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  />
                </ListItem>
              )
            })}
          </List>
        </CardContent>
        <CardActions>
          <Grid container direction='row' justify='space-evenly'>
            <Button size='small' color='primary' onClick={onDecline}> Decline </Button>
            <Button size='small' color='primary' onClick={onConfirm}> Confirm </Button>
          </Grid>
        </CardActions>
      </Card>
      : ""
  )
}