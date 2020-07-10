import React from 'react';
import {FirebaseContext} from '.';
import '../../styles/Home.css'

export default class SignInWidget extends React.Component {
    static contextType = FirebaseContext;
    componentDidMount() {
        this.context.createFirebaseWidget();
    }
    render() {
        return (
           <div id="firebaseui-auth-container"></div>
        )
    }
}
