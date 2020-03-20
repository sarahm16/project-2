const express = require('express');
const https = require('https');
var searchQuery = "https://api.yelp.com/v3/businesses/search";

let searchLocation;

// MAIN-TODO Need to complete string assembly for ajax request

// Parameters
// TODO Term (string) (search term) -- Required
// Just search "restaurant"
searchQuery += "/term/restaurant";

// TODO Location (string) -- REQUIRED
// Need to provide as lat/long (decimal), so give user option to search for restaurants within a certain city?

// 1. Get desired restaurant location by name
// 2. Find long/lat based on city name

// TODO Radius (int) -- Optional
// Suggested search radius in meters, probably convert kms to freedom units, default radius of 10 miles maybe?

// if radius exists, return radius
// else return 10 miles

// TODO Categories -- Optional
// Do we want users to be able to narrow it down to a type of food then search restaurants within that category

// TODO limit and offset (int) -- REQUIRED
// limit is the # of businesses to return, offset is the list of returned business results by this amount
// e.g. Page 1 - limit 50, offset 0
//      Page 2 - limit 50, offset 50
//      Page 3 - limit 50, offset 100 and etc.

// Need to consider the maximum number of restaurants to load (one at a time, but how many? Until all options are exhausted?)

// TODO price (string) -- Optional
// Give user the option to limit loaded restaurants based on the price.
// Type 1,2,3 to search for tiers 1, 2, and 3. Goes from 1 to 4 dollar signs.

// TODO open_now (boolean) -- Optional
// Returns only open restaurants

// TODO open_at (int) -- Optional
// If specified, will return businesses open at the given time (must present as unix time)

// Make the AJAX call

https.get(searchQuery), (res) => {
    let data = '';

    res.on ('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(JSON.parse(data).explanation);
    });

    res.on('error', (err) => {
        if (err) throw err;
    });
};


