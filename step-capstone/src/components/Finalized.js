import React from 'react';
import TravelObject from './TravelObject';
import TimeLine from './TimeLine';
import { Grid } from '@material-ui/core'

export default class Finalized {
    
    render() {
        let compareTimeStart = (travelObjectA, travelObjectB) => {
            return (travelObjectA.timeStart < travelObjectB.timeStart)? 1: -1;
        }
        let list = this.props.list.sort(compareTimeStart);
        return (
            <Grid>
                {
                    list.map((item) => {
                        return <TravelObject
                            key={item.id}
                            data={item}
                            onRemoveItem={this.props.onRemoveItem}
                            onEditItem={this.props.onEditItem}
                            onAddItem={this.props.onAddItem}
                        />
                    })
                }
            </Grid>
        )
    }
    
}
