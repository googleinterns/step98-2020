import React from 'react';
import {FirebaseContext} from '.';

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
                <button id="sign-out" onClick={handleClick}>Sign out</button>
            </div>
        )
    }
}
