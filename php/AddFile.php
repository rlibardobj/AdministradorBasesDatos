<?php
$server = $_POST['server'];
$database = $_POST['db'];
$user = $_POST['user'];
$pass = $_POST['pass'];
$query = $_POST['query'];
$connectionInfo = array("Database" => $database, "UID" => $user, "PWD" => $pass);
$conn = sqlsrv_connect($server, $connectionInfo);
$return = array();
if (!$conn) {
    $return = -1; //no se puede conectar bd
} else {
    $stmt = sqlsrv_query($conn, $query);
    if ($stmt === FALSE)
        $return =-2; //error query
    else {
        $return = -3; //realizado exitosamente
    }
}
echo $return;
?>
