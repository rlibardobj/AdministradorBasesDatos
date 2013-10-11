<?php



function connectionBD(){
    /*$server = "localhost\SQL2012";
    $connectionInfo = array("Database" => "transportePublico_semana7", "UID" => "sa", "PWD" => "12345");
    $conn = sqlsrv_connect($server, $connectionInfo);
    if (!$conn) {
        die("Could not connect to database");
    }
    $sql = "select name from BD_InfoKB";
    $stmt = sqlsrv_query($conn, $sql);
    if ($stmt === FALSE)
        die(print_r(sqlsrv_errors(), true));
    /*echo "<table border =1>";
    while (sqlsrv_fetch($stmt)) {
        $id = sqlsrv_get_field($stmt, 0);
        echo "<tr><td>$id</td></tr>";
    }
    echo "</table>";*/
    echo "hola";
}
?>
