import React from 'react'
import { Box, Grid, Typography, Card, CardContent } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import Flight from './Flight'
import Hotel from './Hotel'

export default function TravelObject(props) {
    let content = null;
    switch (props.data.type) {
        case 'event':
            content = <Typography variant="h4" gutterBottom>Event!</Typography>
            break;
        case 'flight':
            content = <Flight {...props.data} />
            break;
        case 'hotel':
            content = <Hotel {...props.data}/>
            break;
        default:
            return null;
    }

    return (
        <Card>
            <CardContent>
                <Grid container direction="row">
                    <Grid item xs>
                        <Box mr={10} width="100%" height="100%">
                            {content}
                        </Box>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Edit
                                    onClick={() => props.onEditItem(props.data.id)}
                                />
                            </Grid>
                            <Grid item>
                                <Delete
                                    onClick={() => props.onRemoveItem(props.data.id)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}