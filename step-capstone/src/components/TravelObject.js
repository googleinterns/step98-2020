import React from 'react'
import { Box, Grid, Typography, Card, CardContent } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import Flight from './Flight'

export default function TravelObject(props) {
    let content = null;
    switch (props.type) {
        case 'event':
            content = <Typography variant="h4" gutterBottom>Event!</Typography>
            break;
        case 'flight':
            content = <Flight />
            break;
        case 'hotel':
            content = <Typography variant="h4" gutterBottom>Hotel!</Typography>
            break;
        default:
            return null;
    }
    return (
        <Card>
            <CardContent>
                <Grid container direction="row" justify="flex-end" alignItems="center">
                    <Box mr={10} width="100%" height="100%">
                        {content}
                    </Box>
                    <Grid item>
                        <Grid container direction="column">
                            <Edit
                                onClick={() => console.log("editing")}
                            />
                            <Delete
                                onClick={() => console.log("deleting")}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}