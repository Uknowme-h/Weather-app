<?php
header('Access-Control-Allow-Origin: *');


include 'secret.php';
include 'index.php';


$city_name=isset($_GET['city_name']) ? $_GET['city_name'] : '';

$url = 'https://api.openweathermap.org/data/2.5/forecast?q='.$city_name.'&appid='.$api_key.'&units=metric';
$data = file_get_contents($url);
$weather_data = json_decode($data, true);



if ($weather_data) {
    $city_name = $weather_data['city']['name'];
    $sql = "SELECT * FROM weather_info WHERE name = '$city_name' AND dt = CURDATE()";
    $result = $conn->query($sql);
    $dateTime = date('Y-m-d H:i:s', $weather_data['list'][0]['dt']);
    if ($result->num_rows == 0) {
        $sql = "INSERT INTO weather_info(id, name, temp, dt, main, description, icon, humidity, pressure) VALUES
         (NULL, '".$weather_data['city']['name']."', '".$weather_data['list'][0]['main']['temp']."', '".$dateTime."',
          '".$weather_data['list'][0]['weather'][0]['main']."', 
          '".$weather_data['list'][0]['weather'][0]['description']."', 
          '".$weather_data['list'][0]['weather'][0]['icon']."',
           '".$weather_data['list'][0]['main']['humidity']."',
            '".$weather_data['list'][0]['main']['pressure']."')";
        
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " .$conn->error;
        }
    } else {
        $sql = "UPDATE weather_info SET temp = '".$weather_data['list'][0]['main']['temp']."',
         main = '".$weather_data['list'][0]['weather'][0]['main']."',
          description = '".$weather_data['list'][0]['weather'][0]['description']."',
           icon = '".$weather_data['list'][0]['weather'][0]['icon']."',
            humidity = '".$weather_data['list'][0]['main']['humidity']."',
             pressure = '".$weather_data['list'][0]['main']['pressure']."' WHERE name = '$city_name' AND dt = CURDATE()";
        
        if ($conn->query($sql) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error: " .$conn->error;
        }
    }
}

?>
