export default class User {
    constructor(email, displayName, trips) {
        this.email = email;
        this.displayName = displayName;
        this.trips = trips;
    }
    getEmail = () => this.email;
    getDisplayName = () => this.displayName;
    getTrips = () => this.trips;
}