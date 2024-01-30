<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include 'index.php';
$city = isset($_GET['city_name']) ? $_GET['city_name'] : '';

// Perform SQL query to fetch data
$sql = "SELECT * FROM weather_info where name = '".$city."' AND  dt = CURDATE()";
$result = $conn->query($sql);

// Fetch data as an associative array
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
$conn->close();
echo json_encode($data);
?>

