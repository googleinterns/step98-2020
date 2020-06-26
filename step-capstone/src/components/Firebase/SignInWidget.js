import React from 'react';
import {FirebaseContext} from '.';
import logo from './images/logo.png';

export default class SignInWidget extends React.Component {
    static contextType = FirebaseContext;
    componentDidMount() {
        this.context.createFirebaseWidget();
    }
    render() {
        return (
            <div>
                <a className="brand-logo">
                    <img src={logo} id="logo"></img>
                    <h1>Welcome to Zed - The Smart Travel Assistant</h1>
                </a>
                <div id="firebaseui-auth-container"></div>
            </div>
        )
    }
}
