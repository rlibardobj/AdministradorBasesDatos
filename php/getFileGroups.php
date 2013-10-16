<?php
$server = $_POST['server'];
$database = $_POST['db'];
$user = $_POST['user'];
$pass = $_POST['pass'];
$query = "select data_space_id,name from sys.data_spaces";// $_POST['query'];
$connectionInfo = array("Database" => $database, "UID" => $user, "PWD" => $pass);
$conn = sqlsrv_connect($server, $connectionInfo);
$return = array();
if (!$conn) {
    $return = -1;//no se puede conectar bd
} else {
    $stmt = sqlsrv_query($conn, $query);
    if ($stmt === FALSE)
        $return = -2;
    else {
        while (sqlsrv_fetch($stmt)) {
            $return[] = array(
                'id' => sqlsrv_get_field($stmt, 0),
                'name' => sqlsrv_get_field($stmt, 1)
            );
        }
    }
}
echo json_encode($return);
?>