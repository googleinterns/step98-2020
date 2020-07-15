const shopping = new Set(["bicycle_store",
    "book_store",
    "clothing_store",
    "jewelry_store",
    "florist",
    "shopping_mall",
    "shoe_store",
    "store"
])
const beauty = new Set([
    "beauty_salon",
    "hair_care",
    "spa"])

const entertainment = new Set(["Bowling_alley",
    "campground",
    "casino",
    "movie_theater",
    "amusement_park",
    "aquarium"])

const familyFriendly = new Set(["Amusement_park",
    "aquarium",
    "zoo",
    "Bowling_alley",
    "campground",
    "Movie_theater"])

const nightlife = new Set(["bar",
    "night_club",
    "casino"])

const outdoors = new Set(["Zoo",
    "park",
    "cemetery",
    "campground",
    "natural_feature"])

const artsAndCulture = new Set(["Art_gallery",
    "church",
    "hindu_temple",
    "museum",
    "library",
    "synagogue",
    "university"])

const sightseeing = new Set(["city_hall",
                "church",
                "cemetery",
                "university",
                "stadium",
                "hindu_temple",
                "library",
                "mosque",
                "courthouse",
                "tourist_attraction",
                "synagogue",
])
const eateries = new Set(["bakery", "cafe", "restaurant"])
const historicalSites = new Set(["church", 
                    "hindu_temple", 
                    "mosque", 
                    "synagogue", 
                    "tourist_attraction", 
                    "museum", 
                    "cemetery"])


const categories = new Map([["shopping", shopping], 
                    ["beauty", beauty], 
                    ["entertainment", entertainment], 
                    ["familyFriendly", familyFriendly, ], 
                    ["nightlife", nightlife], 
                    ["outdoors", outdoors], 
                    ["artsAndCulture", artsAndCulture], 
                    ["historicalSites", historicalSites], 
                    ["sightseeing", sightseeing], 
                    ["eateries", eateries]]);

export default categories;