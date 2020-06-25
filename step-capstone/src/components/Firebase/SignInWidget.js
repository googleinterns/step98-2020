import React from 'react';
import {FirebaseContext} from '.';

export default class SignInWidget extends React.Component {
    static contextType = FirebaseContext;
    constructor(props) {
        super(props);
        this.state = {authState: this.props.authState};
    }
    componentDidMount() {
        if (!this.props.authState) {
            this.context.createFirebaseWidget();
        }
    }
    render() {
        const display = (this.state.authState)? "block" : "none";
        const displayObject = {display: display};
        return (
            <div>
                <div id="firebaseui-auth-container" style={displayObject}></div>
            </div>
        )
    }
}
