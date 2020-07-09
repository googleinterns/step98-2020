import React from 'react';
import TravelObject from './TravelObject';
import { Grid, Typography } from '@material-ui/core';
import TripSettingPopover from "./TripSettingPopover";

function Header(props) {

    function dropDownFunc(e) {
        e.preventDefault();
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    return (
        <div>
            <header className="header">
                <div className="calendar__title">
                    <div className="dropdown">

                        <button onClick={dropDownFunc} className="dropbtn">Menu</button>
                        <div id="myDropdown" className="dropdown-content">
                            <a href="#">Home</a>
                            <a href="#">Sign out</a>
                        </div>

                    </div>

                    <TripSettingPopover
                        button={true}
                        tripSetting={props.tripSetting}
                        onEditTripSetting={props.onEditTripSetting}
                    />

                </div>
                <div className="gap"></div>
            </header>

            <table>
                <thead className="header-name">
                    <Typography variant="h6" gutterBottom>Ideas</Typography>
                </thead>
            </table>
        </div>
    )
}

export default class Unfinalized extends React.Component {

    render() {
        return (
            <div>
                <Header
                    tripSetting={this.props.tripSetting}
                    onEditTripSetting={this.props.onEditTripSetting}
                />
                <Grid style={{ position: "absolute", top: "120px", width: "300px" }}>
                    {
                        this.props.list.map((item) => {
                            return <TravelObject
                                key={item.id}
                                data={item}
                                onRemoveItem={this.props.onRemoveItem}
                                onEditItem={this.props.onEditItem}
                                onAddItem={this.props.onAddItem}
                                styleConfig={{ position: "relative", top: "1px" }}
                            />
                        })
                    }
                </Grid>
            </div>

        )
    }

}