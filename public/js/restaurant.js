const mapKey = "JprhJCXYJMxRCpTODmFal0wPQh9T04hp"; // NEED TO ENCRYPT KEYS BUT HOW DO I DO THAT
const yelpKey = "Hb6aX_W6vp4XnTdk0V53KQpvXNGQ7BaIk_eCv-rmwiwyJdC0c2ij-2yG19dNp-KLKNZb8RUNbyOAQ7fnOTYFlbvD_2fhk6geLH8S6w_3it3JQGFz95kHe0IzZmd2XnYx";
const https = require("https");
var mapQuery = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapKey}&location=`;
let radius = false;
let price = false;
let openAt = false;

main;

function main() {
    let searchString = buildSearchQuery();
    getRestaurantData(searchString);
};

function buildSearchQuery() {
    let searchQuery = "https://api.yelp.com/v3/businesses/search?";
    // By default add this param // REQUIRED
    addStringParam();
    // Adds the params for lat and long of the searched city // REQUIRED
    getCityLatLong();
    addRadiusParam();
    addLimAndOffParam();
    addPriceParam();
    addOpenNowParam();
    addOpenAtParam();

    return searchQuery;
}

// Parameters
// Term (string) (search term) -- Required
function addStringParam() {
  // Just search "restaurant"
  searchQuery += "term=restaurant";
}

// Location (string) -- REQUIRED
// Need to provide as lat/long (decimal), so give user option to search for restaurants within a certain city?

// 1. Get desired restaurant location by name
//      Need id or class of field that this will come from (input field probably?)


// 2a. get lat/long based on user location
function getCurrentLatLong(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb, showError);
  } else {
    console.error("Geolocation is not supported by this browser");
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}


// 2b. Find long/lat based on city name
//      Use mapquest dev api for retrieving the coordinates
//      Make the AJAX call to retrieve the coordinates
function getCityLatLong() {
  mapQuery = $(#submit-city).val();
  https.get(mapQuery),
    res => {
      let data = "";
      let lat;
      let long;

      res.on("data", chunk => {
        data += chunk;
      });

      // At this point, turn into JSON and retrieve results.displayLatLng.lat and results.displayLatLng.lng
      res.on("end", () => {
        let obj;
        console.log(data);
        obj = JSON.parse(data);
        lat = obj.results.displayLatLng.lat;
        long = obj.results.displayLatLng.lng;
        searchQuery += `&latitude=${lat}&longitude=${long}`
      });

      res.on("error", err => {
        if (err) throw err;
      });
    };
}

// Radius (int) -- Optional
// Suggested search radius in meters, probably convert kms to freedom units, default radius of 10 miles maybe?

// if radius exists, return radius
function addRadiusParam() {
    if (radius) {
        let radiusNum = $(#someInputField).val();
        searchQuery += `&radius=${radiusNum}`;
    } else {
     searchQuery += '&radius=16094';
    }
};

// else return 10 miles - DEFAULT
// if (radius) { searchQuery += '&radius=16094' };

// TODO Categories -- Optional
// Do we want users to be able to narrow it down to a type of food then search restaurants within that category

// limit and offset (int) -- REQUIRED
// limit is the # of businesses to return, offset is the list of returned business results by this amount
// e.g. Page 1 - limit 50, offset 0
//      Page 2 - limit 50, offset 50
//      Page 3 - limit 50, offset 100 and etc.
function addLimAndOffParam() {
    searchQuery += `&limit=10&offset=0`; // Need to find a way to increment the offset by 10 for every time we access 10 restaurants
}

// Need to consider the maximum number of restaurants to load (one at a time, load 10 restaurants at a time)

// price (string) -- Optional
// Give user the option to limit loaded restaurants based on the price.
// Type 1,2,3 to search for tiers 1, 2, and 3. Goes from 1 to 4 dollar signs.
function addPriceParam() {
  if (price) {
    searchQuery += `&price=${price}`; // Need to find a way to input 1, 1,2, 1,2,3, and 1,2,3,4 individually
  }
};


// open_now (boolean) -- Optional
// Returns only open
function addOpenNowParam() {
    searchQuery += "&open_now=true";
};


// TODO open_at (int) -- Optional
// If specified, will return businesses open at the given time (must present as unix time)
function addOpenAtParam() {
  if (openAt) { // Open at MUST be converted to unix time if we want this function
    searchQuery += `$open_at=${openAt}`;
  }
}


// Make the AJAX call

function getRestaurantData(searchQuery) {
  https.get(searchQuery),
    res => {
      let data = "";

      res.on("data", chunk => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(data).explanation);

        // create a data object of the restaurant info
        let completeData = JSON.parse(data);

        // build array of restaurant data and return it
        let restaurants = [];
        for (let i = 0; i < 10; i++) {
          let restaurant = {
            name: completeData[index].name,
            imgUrl: completeData[index].image_url
          };
          restaurants.push(restaurant);
        }
         return restaurants;
      });

      res.on("error", err => {
        if (err) throw err;
      });
    };
}

