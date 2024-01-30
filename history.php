<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include 'index.php';
$city_name=
isset($_GET['city_name']) ? $_GET['city_name'] : '';

$sql = "SELECT * FROM weather_info WHERE name = '".$city_name."' AND dt >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) ORDER BY dt ASC;";

$result = $conn->query($sql);

// Fetch data as an associative array
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
$conn->close();
echo json_encode($data);

?>
