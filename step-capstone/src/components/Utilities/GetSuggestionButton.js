import React from 'react';
import { Fab } from '@material-ui/core'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';


export default function GetSuggestionButton(props) {

    const handleClick = (event) => {
        props.onClick();
    }

    return (
        <div>
            <Fab color="secondary" aria-label="suggestion" onClick={handleClick}>
                <EmojiObjectsIcon />
            </Fab>
        </div>
    )
}