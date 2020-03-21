$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  $("#users").click(function() {
    $(".options").hide();
    $(".welcome").hide();
    console.log("hello");
  });

  $(".city").hide();

  $("#restaurants").click(function() {
    $(".options").hide();
    $(".welcome").hide();
    $(".city").show();
  });
});
