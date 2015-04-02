<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "popmyday-distance";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if(!isset($_GET['CP']) || $_GET['CP'] == ''){
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	$res = array();
	$sql = "SELECT  `ville_code_postal` FROM `villes_france_free` limit 0,4";
	$result = $conn->query($sql);
	//echo $sql;
	while($row = $result->fetch_assoc()) {
		$res[] = $row;
	}
	echo json_encode($res);
	
	$conn->close();
}else{
	$cp = $_GET['CP'];
	$sql = "SELECT  `ville_nom`, `ville_longitude_deg`, `ville_latitude_deg` FROM `villes_france_free` where ville_code_postal LIKE '%$cp%'";
	$result = $conn->query($sql);
	//echo $sql;
	if ($result->num_rows > 0) {
	    // on récupère uniquement la 1ère ville
	    $row = $result->fetch_assoc();;
	        echo $row["ville_latitude_deg"]. ",". $row["ville_longitude_deg"];
	} else {
	    echo "no results : $sql";
	}
	$conn->close();
} 
?>