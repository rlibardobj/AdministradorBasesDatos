<?php

$server = $_POST['server'];
$database = $_POST['db'];
$user = $_POST['user'];
$pass = $_POST['pass'];
$fileGroup = $_POST['fileGroup'];
$query = "alter database $database add filegroup $fileGroup";
$connectionInfo = array("Database" => $database, "UID" => $user, "PWD" => $pass);
$conn = sqlsrv_connect($server, $connectionInfo);
$return = "";
if (!$conn) {
    $return = -1; //no se puede conectar bd
} else {
    $stmt = sqlsrv_query($conn, $query);
    if ($stmt === FALSE)
        $return = -2;
    else {
        $return = 5;
    }
}
echo $return;
?>
