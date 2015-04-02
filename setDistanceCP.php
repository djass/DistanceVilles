<?php 
 
   $CP1 = $_GET['CP1'];
   $CP2 = $_GET['CP2'];
   $km = $_GET['km']; 
   	
     
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

   $sql = "INSERT INTO `popmyday-distance`.`distances_villes_france` (`id`, `cp1`, `cp2`, `distance`) VALUES (NULL, '$CP1', '$CP2', '$km');";

   if ($conn->query($sql) === TRUE) {
       echo "New record created successfully";
   } else {
       echo "Error: " . $sql . "<br>" . $conn->error;
   }

   $conn->close();
?>