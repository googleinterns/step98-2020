import React from 'react';
import TravelObject from './TravelObject';
import '../styles/TimeLine.css';

function Header() {
  return (
    <div>
      <header className="header">
              <button className="secondary">EST</button>
              <div className="calendar__title">
                <div className="icon secondary chevron_left">‹</div>
                <h1 className="duration"><span></span><strong>18 JAN – 21 JAN</strong> 2016</h1>
                <div className="icon secondary chevron_left">›</div>
              </div> 
              <div className="gap"></div>
          </header>
        
          <table>
              <thead className="header">
                <tr>
                  <th className="headcol"></th>
                  <th>Finalized</th>
                </tr>
              </thead>
            </table>
    </div>
  )
}
function OneHourInterval(props) {
  return (
    <div className="OneHourInterval">
      <tr className="OneHourInterval">
          <td className="headcol">{props.idV + ":00"}</td>
          <td id={props.idV +":00"}></td>
      </tr>
      <tr className="OneHourInterval">
        <td className="headcol"></td>
        <td id={props.idV + ":30"}></td>
      </tr>
    </div>
  )
}
export default function TimeLine() {
  return (
    <div className="overall">
        <div className="calendar">
          <Header />

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