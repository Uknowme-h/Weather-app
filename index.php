
<?php
include 'secret.php';
$conn = mysqli_connect($host, $username, $password, $dbname);


if(!$conn){
    die('Could not connect: ' );
}else{
    echo 'Connected successfully';
}

?>
  