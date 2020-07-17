import React from "react";
import { Slide, Card, Typography } from "@material-ui/core"
import "../../styles/SuggestionPopup.css"

export default function SuggestionPopup(props) {

    return (
        <Slide direction="up" in={props.show} mountOnEnter mountOnExit>
            <Card elevation={3} id="suggestion-component">
              
            </Card>
        </Slide>
    )
}