var da_Obj = {
	mah_buttons: ["Bubbles","Kittens","Sunset","California","Vaporwave"],
	gimme_buttons: function(Arr){

		$("#da_buttons").empty();

		for (i=0;i<Arr.length;i++){

			//console.log(Arr[i]);

			var da_div = $("<div>"); //create div element

			da_div.addClass("me_button");

			da_div.text(Arr[i]);

			$("#da_buttons").append(da_div);

		}//end of for loop

	},//end of gimme_buttons
	titleCase: function(string){

        var titleArr = string.split(" ")

        //loops through movie title array and splits words into
        //first letter and the remainder of the word
        for (i=0;i<titleArr.length;i++){
          //first letter is uppercased
          var upper = titleArr[i][0].toUpperCase();
          //rest of word is the string sliced at index 1
          var rest = titleArr[i].slice(1).toLowerCase();
          //word string recombined and replaces original word from .split array
          titleArr[i] = upper + rest;
        }
        
        //once loop through title array complete, individual words of title are recombined with " " inbetween.
        var title = titleArr.join(" ")

        return title;

	},//end of titleCase
	push_Me_Maybe: function(string){

		var check_me = da_Obj.mah_buttons.indexOf(string);

		if(check_me === -1){

			da_Obj.mah_buttons.push(string);

		}
		else{

			alert("My guy, dead ass this already in the array!");

		}

	},//end push_Me_Maybe
	create_me_maybe: function(string,child_string){
		if(child_string.indexOf(string) === -1){
			//console.log("Check!");
			return true;
		}
		else{
			return false;
		}
	},
	query_me: function(query){

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=77a0da655a8449369635934c78d5ec4b&limit=10";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          //console.log(response)

          for(var obj in response.data){

            /*if(obj === "Poster"){
              
              response[obj] = "<img src='" + response[obj] +"' alt='" + movie + "'>"

            }

            if(obj === "Ratings"){

              response[obj] = JSON.stringify(response[obj]);

            };*/

            //$("#movies-view").append(obj + ": " + response[obj] + "<br>");
            console.log(obj + ": " + response.data[obj].images.fixed_height.url + "; "
            	+ response.data[obj].images.fixed_height_still.url + "<br>");

          }
          //$("#movie-view").append(JSON.stringify(response));

        });

	},

};//end of da_Obj
//console.log("Test")
	
$(document).on("click",".me_button",function(){

	//console.log("Been clicked, my guy!");

	var dis_text = $(this).text()

	//test to see if this ajax result already exists

	var test = $("#da_ajax").children().text();

	//console.log(test.indexOf(dis_text));

	var check = da_Obj.create_me_maybe(dis_text,test);

	//console.log(check);

	//end test

	if(check){

		var mo_div = $("<div>");

		mo_div.addClass("ajax_result");

		mo_div.text(dis_text);

		$("#da_ajax").prepend(mo_div);

		//console.log("This is an AJAX button!")

		da_Obj.query_me(dis_text)

	}
	else{

		alert("This already exists!")

	}

	

	//Activity 06-03: AJAX_to_HTML

	

});

$(document).on("click","#form_button",function(){

	//console.log("Dead ass, don't click me again!")

	var title = da_Obj.titleCase($("#da_input").val().trim());

	//console.log("Ayo MA! Check this out: " + title);

	da_Obj.push_Me_Maybe(title);

	da_Obj.gimme_buttons(da_Obj.mah_buttons);

});

da_Obj.gimme_buttons(da_Obj.mah_buttons);