<?php

$server = $_POST['server'];
$database = $_POST['db'];
$user = $_POST['user'];
$pass = $_POST['pass'];
$query = "select ds.name, df.name, convert(float,allocated_extent_page_count * 100) / convert(float,total_page_count) as usepercentage from 
       sys.dm_db_file_space_usage dfsu inner join sys.database_files df on dfsu.file_id = df.file_id
       inner join sys.data_spaces ds on df.data_space_id = ds.data_space_id";// $_POST['query'];
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
                'fg' => sqlsrv_get_field($stmt, 0),
                'file' => sqlsrv_get_field($stmt, 1),
                'use' => sqlsrv_get_field($stmt, 2),
            );
        }
    }
}
echo json_encode($return);
?>
