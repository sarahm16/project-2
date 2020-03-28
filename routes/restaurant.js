// const yelp = require('yelp-fusion');
// const client = yelp.client('CfJsK0imSbCC04VXKuXZP2fd6UwnnmroGUxGl3xKIimg8ytZBYh3AdZDkPa0JygWzXv2NuutlXHXc8G7thannqJI-PPKEYOHynD_BR8_082Hyx6e_AIQtgvWmCN8XnYx');
const yelpKey = 'CfJsK0imSbCC04VXKuXZP2fd6UwnnmroGUxGl3xKIimg8ytZBYh3AdZDkPa0JygWzXv2NuutlXHXc8G7thannqJI-PPKEYOHynD_BR8_082Hyx6e_AIQtgvWmCN8XnYx';
const mapKey = "JprhJCXYJMxRCpTODmFal0wPQh9T04hp"; // NEED TO ENCRYPT KEYS BUT HOW DO I DO THAT

var mapQuery = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapKey}&location=`;

const $ = require('ajax');
const axios = require('axios');
// Future endeavors
let radius = false;
let price = false;
let openAt = false;

/**
 * This is the main function that takes in a searchString generated by buildSearchQuery() and calls the Yelp Fusion API to retrieve a list of 10 restaurants.
 *
 * @param {}  - This function does not take in any params
 * @return {String} - This function returns a searchQuery for the yelp api
 *
 * @example
 *
 *     main();
 */
async function main() {
    //let searchString = await buildSearchQuery();
    let searchString = 'https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=47.603229&longitude=-122.33028&radius=16094&limit=10&offset=0&open_now=true';
    getRestaurantData(searchString);
};

/**
 * This is the function that builds the searchQuery string to provide to the yelp Fusion API
 *
 * @param {}  - This function does not take in any params
 * @return {String} - This function returns a searchQuery for the yelp api
 *
 * @example
 *
 *     main();
 */
async function buildSearchQuery() {
    searchQuery = "https://api.yelp.com/v3/businesses/search?";
    // By default add api key param
    // By default add this param // REQUIRED
    // console.log(`Before: ${searchQuery}`);

    searchQuery = addStringParam(searchQuery);  // Works
    // console.log(`After adding search term: ${searchQuery}`);

    // Adds the params for lat and long of the searched city // REQUIRED
    // let temp = await getCityLatLong(); // Works
    searchQuery = await getCityLatLong(searchQuery);
    // console.log(`After adding lat/long: ${searchQuery}`);


    searchQuery = addRadiusParam(searchQuery); // FUNCTIONAL
    searchQuery = addLimAndOffParam(searchQuery); // FUNCTIONAL
    searchQuery = addPriceParam(searchQuery); // FUNCTIONAL
    searchQuery = addOpenNowParam(searchQuery); // FUNCTIONAL
    searchQuery = addOpenAtParam(searchQuery); // FUNCTIONAL

    // console.log(`After: ${searchQuery}`);
    return searchQuery;
}


// Parameters
// Term (string) (search term) -- Required
function addStringParam(searchQuery) {
  // Just search "restaurant"

  searchQuery += "term=restaurant";
  return searchQuery;
};

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
async function getCityLatLong(searchQuery) {
  // mapLocation = $("#submit-city").val();
  mapQuery += "Seattle";

  await $.ajax({
    // method: 'GET',
    url: mapQuery,
    success: (res) => {
      let latitude;
      let long;
      let temp;

      // console.log(`After being accepted into getCityLatLong: ${searchQuery}`);

      latitude = res.results[0].locations[0].displayLatLng.lat;
      long = res.results[0].locations[0].displayLatLng.lng;

      // console.log(latitude, long);

      temp = `&latitude=${latitude}&longitude=${long}`;
      // console.log(`temp: ${temp}`);
      searchQuery += temp;
      // console.log(`After being augmented by getCityLatLong: ${searchQuery}`);


    }

  });
  // console.log(searchQuery);
  return searchQuery;

}

// Radius (int) -- Optional
// Suggested search radius in meters, probably convert kms to freedom units, default radius of 10 miles maybe?

// if radius exists, return radius
function addRadiusParam(searchQuery) {
    // if (radius) {
    //   let radiusNum = $("#someInputField").val();
    //   searchQuery += `&radius=${radiusNum}`;
    //
    // } else {
    //   searchQuery += '&radius=16094';
    //   return searchQuery;
    // }
  searchQuery += '&radius=16094';
  return searchQuery;
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
function addLimAndOffParam(searchQuery) {
  searchQuery += `&limit=10&offset=0`; // Need to find a way to increment the offset by 10 for every time we access 10 restaurants
  return searchQuery;
}

// Need to consider the maximum number of restaurants to load (one at a time, load 10 restaurants at a time)

// price (string) -- Optional
// Give user the option to limit loaded restaurants based on the price.
// Type 1,2,3 to search for tiers 1, 2, and 3. Goes from 1 to 4 dollar signs.
function addPriceParam(searchQuery) {
  if (price) {
    searchQuery += `&price=${price}`; // Need to find a way to input 1, 1,2, 1,2,3, and 1,2,3,4 individually
  }
  return searchQuery;
};


// open_now (boolean) -- Optional
// Returns only open
function addOpenNowParam(searchQuery) {
    searchQuery += "&open_now=true";
  return searchQuery;
};


// TODO open_at (int) -- Optional
// If specified, will return businesses open at the given time (must present as unix time)
function addOpenAtParam(searchQuery) {
  if (openAt) { // Open at MUST be converted to unix time if we want this function
    searchQuery += `$open_at=${openAt}`;

  }
  return searchQuery;
}


// Make the AJAX call
async function getRestaurantData(searchQuery) {
  axios({
    method: 'get',
    url: searchQuery,
    responseType: 'stream',
    headers: {
      'Authorization': `Bearer ${yelpKey}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }
      .then(async (res) => {

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          let completeData = JSON.parse(data);

          let restaurants = [];
          for (let i = 0; i < 10; i++) {
            let restaurant = {
              name: completeData[index].name,
              imgUrl: completeData[index].image_url
            };
            restaurants.push(restaurant);
          }
          return restaurants;
        })
      })
      .catch((err) => {
        if (err) throw err;
      })
      .then(() => {
        console.log('Pushing restaurants into array');
      })
  })
};



module.exports.main = main;



