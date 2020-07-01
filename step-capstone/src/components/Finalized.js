import React from 'react';
import ReactDOM from 'react-dom';
import TravelObject from './TravelObject';
import TimeLine from './TimeLine';
import { Grid } from '@material-ui/core'

export default class Finalized extends React.Component {
    /* Assuming that all of those events are currently on the same day */
    getAssociatedDiv(timeStart) {
        let output = timeStart.getHours().toString();
        if (timeStart.getMinutes() < 30) {
            return output + ":00";
        }
        else {
            return output + ":30";
        }
    }

    getHeightPercentage(timeStart, timeEnd) {
        let dif = timeEnd.getHours()*60 + timeEnd.getMinutes() - timeStart.getHours()*60 - timeStart.getMinutes();
        return dif*48.0/30-16;
    }

    getTopPixel(timeStart) {
        let dif = (timeStart.getMinutes() < 30)? timeStart.getMinutes() : timeStart.getMinutes() - 30;
        return dif/30.0*48;
    }

    sorting() {
        //TO DO: sort the props.list before rendering
    }

    componentDidUpdate() {
        let zIndex = 1;
        this.props.list.forEach((sample) => {
            let div = this.getAssociatedDiv(sample.timeStart);
            let height = this.getHeightPercentage(sample.timeStart, sample.timeEnd);
            let top = this.getTopPixel(sample.timeStart);
            ReactDOM.render(
                <TravelObject
                    key={sample.id}
                    data={sample}
                    onRemoveItem={this.props.onRemoveItem}
                    onEditItem={this.props.onEditItem}
                    onAddItem={this.props.onAddItem}
                    styleConfig={{
                        top: top.toString() + "px",
                        height: height.toString() + "px",
                        width: "228px",
                        overflowY: "scroll",
                        position: "absolute",
                        zIndex: zIndex.toString()}}
    
                />,
                document.getElementById(div)
            );
            zIndex += 1;
        });
        
    }

    render() {
        return (
            <TimeLine />
        )
    }
    
}
