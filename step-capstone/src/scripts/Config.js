 /*
    * param: 
    * config: an object with three fields: 
    *  1. userCategories: a  String array of categories 
    *  2. userBudget: an integer for budget
    *  3. radius: a string integer radius object 
    *  4. timeRange: free time range [startDate, endDate]
    *  5. coordinates: an object for coordinates
    * return the suggestions : an array of PlaceObject already sorted based on score
 */
export default class Config {
    constructor(userCategories, userBudget, radius, timeRange, coordinates) {
        this.userCategories = userCategories;
        this.userBudget = userBudget;
        this.radius = radius;
        this.timeRange = timeRange;
        this.coordinates = coordinates;
    }
}