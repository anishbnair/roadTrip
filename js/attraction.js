

//Fetch the origin & destination place id 
	var originPlaceId = localStorage.getItem('markPoint0'); 
	//var destPlaceId = localStorage.getItem('Destination'); 
	//var markers[]; 
//Get the API key 
	const paramKey = "AIzaSyAPXm9QmxaInN3DegD3IayRg1BQrWlC9rA" ; 
	const placesKey  = "AIzaSyAMqtL7DW6EbTOWa7WrqR2uH8aV-smIsNA"; 
	var placesQueryUrl; 
	var latlngArray ; 
	var latOrigin ; 
	var lngOrigin ; 
	var originLocation; 

		//Invoke the Places API to actually get the info you want. 
	const radius=5000000; 
	const rankby='prominence'; 
	var minPrice=0;  
	var maxPrice=5;
	var keyword = "point_of_interest"; 

//For CORS 
//	const proxyurl = "https://cors-anywhere.herokuapp.com/";
//Build the complete URL query 	
//tHERE WILL NEED TO BE AN IF ELSE OR A LOOP FOR EACH OF THE WAYPOINTS
	var queryURL = 
		"https://maps.googleapis.com/maps/api/place/details/json?placeid="
		+originPlaceId+"&key="+paramKey; 
    console.log(queryURL); 

    var placesUrl = 
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" ; 
    /*+ originLocation +
	"&radius="+radius+
	"&minprice="+minPrice+"&maxprice="+maxPrice+
	"&keyword="+keyword+
	"&key="+paramKey; */


//Invoke the Place Details API to get the latlng required to invoke 
//places API		
//EVENTUALLY HAVE TO BE A LOOP FOR EACH OF THE PLACEIDS
		$(document).ready( function(){
			$('#submit').on('click', function(event){

				$.ajax({
					url: queryURL,
			        method: "GET"
					}).done(function(response){
						
						latlngArray = response.result.geometry.location; 
						latOrigin = response.result.geometry.location.lat; 
						lngOrigin = response.result.geometry.location.lng; 
						originLocation = latOrigin+ ',' + lngOrigin; 

						placesQueryUrl = placesUrl + originLocation +
									"&radius="+radius+
									//"&minprice="+minPrice+"&maxprice="+maxPrice+
									//"&keyword="+keyword+
									"&key="+placesKey; 
									console.log(placesQueryUrl)

												
					$.ajax({
						url: placesQueryUrl, 
						method: "GET"
					}).done(function(result){
							console.log(result); 
						var counter = result.results.length; 
						if (result.results.length < 6 ){
							counter = result.results.length
						}
						else
							counter = 6; 

						for (i = 0; i < counter; i++) {
                			var poiName = result.results[i].name;
                			var paraText = result.results[i].vicinity;
                			var photoRef = result.results[i].photos[0].photo_reference; 
                			var img = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photoRef+"&key="+placesKey; 
                			console.log(poiName, photoRef, img); 
                			$("#abc").attr("src", img); 
                			$(".header").text(poiName); 
                			$(".para").text(poiName);

           			 }
				})

						
					}); 

				
				
			})

		})






				

				


