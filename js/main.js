$(document).ready(function() {
    //wehn the from "search" is submitted, do this function 
    $("#submit").submit(searchGIFY)
})


function searchGIFY(e) {
    // prevents the original function of submit and doesnt reload page.
    e.preventDefault();

    //url must have http or https when using chrome or will get CORS error
    var url = 'https://api.giphy.com/v1/gifs/search?';
    //make everything lowercase incase api doesnt accept capital letters
    var query = $("#inlineFormInputGroup").val().toLowerCase();
    var apiKey = 'bJdrGmWEmdF2gIQTv3b7jNYgFmmBzDEVHk';


    //api key must go first for authorization to api
    $.ajax({
        url: url,
        dataType: 'JSON',
        data: {
            'api_key': apiKey,
            'q': query
        },
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {

                var showDiv = $("<div class='gif-results'>");

                var rating = data[i].rating;
                var defaultAnimatedSrc = data[i].images.fixed_height.url;
                var staticSrc = data[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
                showImage.addClass("gif");
                showImage.attr("src", staticSrc);
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#getdata").prepend(showDiv);

            }
        }
    });
}
//Create the API URL from the user inputs, API Key and Pagination