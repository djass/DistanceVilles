	var defaultCP = $("input#cp").attr('placeholder');
	var latLngString = $.ajax({type: "GET", url: "getLatLnCP.php?CP="+defaultCP, async: false}).responseText;
	var latLn = latLngString.split(",");
	var ville1 = {"lat" :parseFloat(latLn[0]), "ln" : parseFloat(latLn[1])};

	var latLngString2 = $.ajax({type: "GET", url: "getLatLnCP.php?CP="+defaultCP, async: false}).responseText;
	var latLn2 = latLngString2.split(",");
	var ville2 = {"lat" :parseFloat(latLn2[0]), "ln" : parseFloat(latLn2[1])};

	var map;
	var geocoder;
	var bounds = new google.maps.LatLngBounds();
	var markersArray = []; 

	var origin1 = new google.maps.LatLng(ville1.lat, ville1.ln); 
	var destinationA = new google.maps.LatLng(ville2.lat, ville2.ln); 

	var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
	var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

	google.maps.event.addDomListener(window, 'load', initialize);

	var villes = {

		cp1 : 0,
		cp2 : 0,
		km : "0km",

		setCP : function(cp1, cp2){
			villes.cp1 = cp1;
			villes.cp2 = cp2;
		},

		saveDistance : function(){

			latLngString1 = $.ajax({type: "GET", url: "getLatLnCP.php?CP="+cp1, async: false}).responseText;
			latLn1 = latLngString1.split(",");
			ville1 = {"lat" :parseFloat(latLn1[0]), "ln" : parseFloat(latLn1[1])};


			latLngString2 = $.ajax({type: "GET", url: "getLatLnCP.php?CP="+cp2, async: false}).responseText;
			latLn2 = latLngString2.split(",");
			ville2 = {"lat" :parseFloat(latLn2[0]), "ln" : parseFloat(latLn2[1])};

		    locVille1 = new google.maps.LatLng(ville1.lat, ville1.ln);
		    locVille2 = new google.maps.LatLng(ville2.lat, ville2.ln);
		    var res = {};
			var service = new google.maps.DistanceMatrixService();
		  	service.getDistanceMatrix(
		    {
		      origins: [locVille1],
		      destinations: [locVille2],
		      travelMode: google.maps.TravelMode.DRIVING,
		      unitSystem: google.maps.UnitSystem.METRIC,
		      avoidHighways: false,
		      avoidTolls: false
		    }, villes.callback);
		},

		callback : function(response, status) {
		  if (status != google.maps.DistanceMatrixStatus.OK) {
		    alert('Error was: ' + status);
		  } else {
		    var origins = response.originAddresses;
		    var destinations = response.destinationAddresses;
		    var outputDiv = document.getElementById('outputDiv');
		    outputDiv.innerHTML = ''; 

		    for (var i = 0; i < origins.length; i++) {
		      var results = response.rows[i].elements; 	      
		      for (var j = 0; j < results.length; j++) {
		        villes.km =  results[j].distance.text;
		    	villes.saveInTable();	
		      }
		    }
		  }
		},

		saveInTable : function(){
		    $.ajax({type: "GET", url: "setDistanceCP.php?CP1="+villes.cp1+"&CP2="+villes.cp2+"&km="+villes.km, async: false});
		    $("span").append("<p>Sauvegarde effectu&eacute;e. ("+villes.cp1+" - "+villes.cp2+" - "+villes.km+" )</p>");
		},

		distanceForAll : function(){
			JsonCP = $.ajax({type: "GET", url: "getLatLnCP.php", async: false}).responseText;
			JsonCP = JSON.parse(JsonCP);

			$.each(JsonCP, function(idx, obj) { 
				cp1 = obj.ville_code_postal;
				$.each(JsonCP, function(idx1, obj1) { 
					cp2 = obj1.ville_code_postal;  
					villes.setCP(cp1, cp2);
		   			villes.saveDistance();
				});
			});
		}
	};

	//initialise la map
	function initialize() {
		  var opts = {
		    center: new google.maps.LatLng(55.53, 9.4),
		    zoom: 10
		  };
		  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
		  geocoder = new google.maps.Geocoder();

		  // Try HTML5 geolocation
		  if(navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		      var mypos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		      destinationA = mypos;
		      var infowindow = new google.maps.InfoWindow({
		        map: map,
		        position: destinationA,
		        content: 'Vous'
		      });

		      map.setCenter(destinationA);
		    }, function() {
		      handleNoGeolocation(true);
		    });
		  } else {
		    // Browser doesn't support Geolocation
		    handleNoGeolocation(false);
		  }
	}

	function handleNoGeolocation(errorFlag) {
		  if (errorFlag) {
		    var content = 'Error: The Geolocation service failed.';
		  } else {
		    var content = 'Error: Your browser doesn\'t support geolocation.';
		  }

		  var options = {
		    map: map,
		    position: new google.maps.LatLng(60, 105),
		    content: content
		  };

		  var infowindow = new google.maps.InfoWindow(options);
		  map.setCenter(options.position);
	}

	function calculateDistancesFromMe() {
	 if($('input#cp').val() != ''){
	 	var cp = $('input#cp').val();
	 	var latLngString = $.ajax({type: "GET", url: "getLatLnCP.php?CP="+cp, async: false}).responseText;
	    var latLn = latLngString.split(",");
	    var ville = {"lat" :parseFloat(latLn[0]), "ln" : parseFloat(latLn[1])};
	    destinationA = new google.maps.LatLng(ville.lat, ville.ln);
	 }
	 else{
	 	if(navigator.geolocation) {
	    	navigator.geolocation.getCurrentPosition(function(position) {
	      	var mypos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	      	destinationA = mypos;
	      	var infowindow = new google.maps.InfoWindow({
			map: map,
			position: destinationA,
			content: 'Vous'
			});

	      map.setCenter(destinationA);
	    }, function() {
	      handleNoGeolocation(true);
	    });
		} else {
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
		}
	}
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
		  origins: [origin1],
		  destinations: [destinationA],
		  travelMode: google.maps.TravelMode.DRIVING,
		  unitSystem: google.maps.UnitSystem.METRIC,
		  avoidHighways: false,
		  avoidTolls: false
		}, callback);
	}

	function callback(response, status) {
	  if (status != google.maps.DistanceMatrixStatus.OK) {
	    alert('Error was: ' + status);
	  } else {
	    var origins = response.originAddresses;
	    var destinations = response.destinationAddresses;
	    var outputDiv = document.getElementById('outputDiv');
	    outputDiv.innerHTML = '';
	    deleteOverlays();

	    for (var i = 0; i < origins.length; i++) {
	      var results = response.rows[i].elements;
	      addMarker(origins[i], false);
	      for (var j = 0; j < results.length; j++) {
	        addMarker(destinations[j], true);
	        outputDiv.innerHTML += "<h2>"+origins[i] + ' à ' + destinations[j]
	            + ': ' + results[j].distance.text + ' en '
	            + results[j].duration.text + '</h2>';
	      }
	    }
	  }
	}

	function addMarker(location, isDestination) {
	  var icon;
	  if (isDestination) {
	    icon = destinationIcon;
	  } else {
	    icon = originIcon;
	  }
	  geocoder.geocode({'address': location}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      bounds.extend(results[0].geometry.location);
	      map.fitBounds(bounds);
	      var marker = new google.maps.Marker({
	        map: map,
	        position: results[0].geometry.location,
	        icon: icon
	      });
	      markersArray.push(marker);
	    } else {
	      alert('Geocode was not successful for the following reason: '
	        + status);
	    }
	  });
	}

	function deleteOverlays() {
	  for (var i = 0; i < markersArray.length; i++) {
	    markersArray[i].setMap(null);
	  }
	  markersArray = [];
	}