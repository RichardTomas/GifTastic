$( document ).ready(function() {
  console.log( "ready!" );
});

var animalArray = ["cat", "dog", "horse"];

// function for displaying animal results and querying Giphy API
function displayAnimalData() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ animal +"&api_key=l2oSCQzbYgpO1Fj4A9K6H9MWCYr0HUHu&limit=10";

  $.ajax({
          url: queryURL,
          method: "GET"
      }).done(function(response) {
        console.log(response);

        var results = response.data;
        console.log(response)

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='items'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.addClass("gif");
            animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#animalView").prepend(gifDiv);
            }

        // listener for clicks on gifs from animate to still
        $(".gif").on("click", function() {
          var state = $(this).attr("data-state");
            console.log(this);

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
        });
        // clears div for displaying gifs
        $("button").click(function(){
          $("#animalView").empty();
});
  }); 

};

// function for rendering buttons to page
function renderButtons() {
  $("#animalButtons").empty();
  for (var i = 0; i < animalArray.length; i++) {
    var button = $('<button class="btn btn-primary">');
    button.addClass("animal");
    button.attr("data-name", animalArray[i]);
    button.text(animalArray[i]);
    $("#animalButtons").append(button);
  };
};

// listener for submit button
$("#addAnimal").on("click", function(event) {
      event.preventDefault();
      var animal = $("#animal-input").val().trim();
      animalArray.push(animal);
      console.log(animalArray);
      renderButtons();
      $("#animal-input").val("");
});



$(document).on("click", ".animal", displayAnimalData);


renderButtons();  