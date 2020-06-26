import React from 'react';
import {FirebaseContext} from '.';

export default class SignInWidget extends React.Component {
    static contextType = FirebaseContext;
    componentDidMount() {
        this.context.createFirebaseWidget();
    }
    render() {
        return (
            <div>
                <div id="firebaseui-auth-container"></div>
            </div>
        )
    }
}
