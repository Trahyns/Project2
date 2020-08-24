$(function(params) {
    // Set cursor on the search bar on page load
    $('#inlineFormInputGroup').focus();

    //Create the API URL from the user inputs, API Key and Pagination
    var api = 'https://api.giphy.com/v1/gifs/search?q=';
    var query = 'Chicago';
    var apiKey = '&api_key=bJdrGmWEmdF2gIQTv3b7jNYgFmmBzDEV';
    var lang = '&lang=es';
    var apiPagination = 15; //Default Pagination
    var flag = 0; // for normal search

    $("#submit").click(function() {

        query = $('#inlineFormInputGroup').val();

        //Display error if no input entered
        if ((query.length == 0) && (flag == 0)) {
            $(".form-inline").effect("shake");
            $("#inlineFormInputGroup").addClass("error");
        } else {
            $("#inlineFormInputGroup").removeClass("error");

            //Generate entire URL from the user input
            var url = api + query + apiKey + lang + '&limit=' + apiPagination;
            var fetchData = $.getJSON(url, gotData);

        } // end check if valid input
    }); //end submit click event

    //Display more results as per request
    $('#load-more').click(function() {
        apiPagination += 10;
        $("#submit").click();
    });

}); //document ready function end

function gotData(data) {
    //continue if API exists
    if (data.meta.status) {
        if (data.data.length > 0) {
            $(".gif-results").show();
            $('.no-result').hide();

            //Remove any existing data - used to clearing out previous searches
            if ($("div.gif-results img").length > 0) {
                $("div.gif-results img").remove();
            }

            $('div.gif-results').addClass("well");
            $('.loading-gif').css("display", "block");