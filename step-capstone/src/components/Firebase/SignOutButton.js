import React from 'react';
import {FirebaseContext} from '.';
import Button from '@material-ui/core/Button';

export default class SignOutButton extends React.Component {
    static contextType = FirebaseContext;
    
    render() {
        let  context = this.context;
        let handleClick = function(e) {
            e.preventDefault();
            context.auth.signOut().then(() => window.location ="index.html");
        };

        return (
            <div>
                <Button variant="contained" onClick={handleClick} style={{position: "fixed", top:"30px", right:"30px"}}>Sign out</Button>
            </div>
        )
    }
}
