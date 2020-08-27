"use strict";

$(document).ready(function () {
  function displayGifs(e) {
    e.preventDefault();
    var x = $("#inlineFormInputGroup").val().toLowerCase();
    console.log(x);
    var queryURL = "https://api.giphy.com/v1/gifs/search?" + "&api_key=bJdrGmWEmdF2gIQTv3b7jNYgFmmBzDEV&q=" + x + "&lmit=30";
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        //Get the URL from JSON
        var gifURL = results[i].images.original.url; // var giphyURL = results[i].url;
        // $(".insert-gif").attr('src', gifURL);

        var img = $('<img class="gifs">');
        img.attr('src', gifURL);
        img.appendTo('.gif-results');
      }
    });
  }

  $("#submit").click(displayGifs); // Change background of nav bar on scroll

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll > window.innerHeight - 55) {
      $(".navbar").removeClass("transparent");
    } else {
      $(".navbar").addClass("transparent");
    }
  });
});