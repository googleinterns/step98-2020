export default class User {
    constructor(email, displayName) {
        this.email = email;
        this.displayName = displayName;
    }
    getEmail = () => this.email;
    getDisplayName = () => this.displayName;
    
}