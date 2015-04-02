<!DOCTYPE html>
<html>
  <head>
    <title>Distance Matrix service</title>
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="https://bootswatch.com/flatly/bootstrap.css">
    
  </head>
  <body>

    <div id="content-pane">
      <div id="inputs">
        <p><button type="button" onclick="calculateDistancesFromMe();">Get the distance</button></p>
        <p><button type="button" onclick="initialize();">Detect my location</button></p>
        <p><button type="button" onclick="villes.distanceForAll();">Save all distances</button></p>
        <p><input type="text" id="cp" placeholder="75017"></input></p>
        <p><span></span></p>
      </div>
      <div id="outputDiv"></div>
    </div>

    <div id="map-canvas"></div>
    
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
    <script src="js/jquery-1.11.2.js"></script>
    <script src="js/main.js"></script>
    <script>  
  
		
    </script>
  </body>
</html>