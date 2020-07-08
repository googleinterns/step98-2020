import React from 'react';
import {useEffect, useState, useRef} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
 MuiPickersUtilsProvider,
 KeyboardDatePicker,
} from '@material-ui/pickers';
 
/*Given 2 Date objects, return true if they have the same date; return false otherwise */
const sameDate = (timeA, timeB) => {
    return (timeA.getDate() === timeB.getDate() && timeA.getMonth() === timeB.getMonth() && timeA.getFullYear() === timeB.getFullYear());
}
  
function PickDisplayDate(props) {
    const [displayDate, setDisplayDate] = useState(props.displayDate);

    useEffect(() => {
        setDisplayDate(props.displayDate);
    }, [props.displayDate])

    useEffect(() => {
        props.onChangeDisplayDate(displayDate);
    }, [displayDate])

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} id="timeline">
        <KeyboardDatePicker 
            style={{    
            maxWidth: "141px",
            position: "relative",
            left: "15px"}}

            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="displayDate"
            label="Display Date"
            value={displayDate}
            onChange={setDisplayDate}
            />
        </MuiPickersUtilsProvider>
    )
    }

    function ArrowLeft(props) {
    const handleOnClick = () => {
        var prevDay = new Date(props.displayDate);
        prevDay.setDate(prevDay.getDate() - 1);
        props.onChangeDisplayDate(prevDay);
    }
    return (
        <div className="icon secondary chevron_left" onClick={handleOnClick}>‹</div>
    )
}

function ArrowRight(props) {
    const handleOnClick = () => {
        var nextDay = new Date(props.displayDate);
        nextDay.setDate(nextDay.getDate() + 1);
        props.onChangeDisplayDate(nextDay);
    }
    return (
        <div className="icon secondary chevron_left" style={{left: "15px"}} onClick={handleOnClick}>›</div>
    )
}
  
  
export default function FinalizedHeader(props) {
    return (
      <div>
        <header className="header">
          <div className="calendar__title">
            <ArrowLeft 
              displayDate = {props.displayDate}
              onChangeDisplayDate = {props.onChangeDisplayDate}
            />
            <button className="secondary">EST</button>
            <PickDisplayDate 
              displayDate = {props.displayDate}
              onChangeDisplayDate = {props.onChangeDisplayDate}
            />
            <ArrowRight 
              displayDate = {props.displayDate}
              onChangeDisplayDate = {props.onChangeDisplayDate}
            />
          </div> 
          <div className="gap"></div>
        </header>
  
        <table>
          <thead className="header name">
            <tr>
              <th className="headcol"></th>
              <th>Finalized</th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
  