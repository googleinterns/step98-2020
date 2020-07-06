import React, {useState, useEffect} from 'react';
import '../styles/TimeLine.css';
import DateFnsUtils from '@date-io/date-fns';
import {
 MuiPickersUtilsProvider,
 KeyboardDatePicker,
} from '@material-ui/pickers';
import { isValid } from 'date-fns';

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
      <KeyboardDatePicker style={{    
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


function Header(props) {
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
        .
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

function handleOnClickInterval(idV) {
  console.log(idV);
}

function OneHourInterval(props) {
  return (
    <div className="OneHourInterval">
      <tr className="OneHourInterval">
          <td className="headcol">{props.idV + ":00"}</td>
          <td className="Interval" id={props.idV +":00"} onClick={() => handleOnClickInterval(props.idV + ":00")}></td>
      </tr>
      <tr className="OneHourInterval">
        <td className="headcol"></td>
        <td className="Interval" id={props.idV + ":30"} onClick={() => handleOnClickInterval(props.idV + ":30")}></td>
      </tr>
    </div>
  )
}
export default function TimeLine(props) {
  return (
    <div className="overall">
        <div className="calendar">
          <Header 
            displayDate = {props.displayDate}
            onChangeDisplayDate = {props.onChangeDisplayDate}  
          />

          <div className="outer">
            <div className="wrap"> 
              <table className="offset">
                <tbody>
                  <tr></tr>
                  <OneHourInterval idV="0" />
                  <OneHourInterval idV="1" />
                  <OneHourInterval idV="2" />
                  <OneHourInterval idV="3" />
                  <OneHourInterval idV="4" />
                  <OneHourInterval idV="5" />
                  <OneHourInterval idV="6" />
                  <OneHourInterval idV="7" />
                  <OneHourInterval idV="8" />
                  <OneHourInterval idV="9" />
                  <OneHourInterval idV="10" />
                  <OneHourInterval idV="11" />
                  <OneHourInterval idV="12" />
                  <OneHourInterval idV="13" />
                  <OneHourInterval idV="14" />
                  <OneHourInterval idV="15" />
                  <OneHourInterval idV="16" />
                  <OneHourInterval idV="17" />
                  <OneHourInterval idV="18" />
                  <OneHourInterval idV="19" />
                  <OneHourInterval idV="20" />
                  <OneHourInterval idV="21" />
                  <OneHourInterval idV="22" />
                  <OneHourInterval idV="23" />

                  <tr>
                    <td className="headcol"></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>

    </div>
  );
}