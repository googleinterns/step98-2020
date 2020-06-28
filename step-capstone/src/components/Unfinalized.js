import React from 'react';
import TravelObject from './TravelObject';
import { Grid } from '@material-ui/core'

export default class Unfinalized {
    
    render() {
        return (
            <div>
                <Grid>
                {
                    this.props.list.map((item) => {
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
            </div>
            
        )
    }
    
}