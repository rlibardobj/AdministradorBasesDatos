<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Respaldos BD</title>
        <style>
            .marcado {
                border: 1px solid blue;
                background-color: lightblue;
            }
            .desmarcado {
                border: 1px solid blue;
                background-color: white;
            }

            #table_light {
                colspan: 2;
            }
        </style>
        <script>
            function marcar(obj) {
                if (obj.checked)
                    obj.parentNode.parentNode.className = "marcado";
                else
                    obj.parentNode.parentNode.className = "desmarcado";
            }
        </script>
    </head>
    <body>
        <?php
        $sql = "backup database transportePublico ";
        foreach ($_GET as $key => $value) {
            $sql.= $sql."FILE = '$key'";
        }
        $sql = substr($sql, 0, strlen($sql) - 2);
        $sql.= " to disk = 'E:\BD2\\transportePublico.bak'";
        echo $sql;
        $serverName = "localhost"; //serverName\instanceName
        $connectionInfo = array("Database" => "transportePublico", "UID" => "sa", "PWD" => "12345");
        $conn = sqlsrv_connect($serverName, $connectionInfo);
        if (!$conn) {
            die("Could not connect to database");
        }
        $sql = "select name from BD_InfoKB";
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt === FALSE)
            die(print_r(sqlsrv_errors(), true));
        echo "<center>";
        echo "<h1>Respaldo de la Base de Datos Transporte Público</h1>";
        echo "<form>";
        echo "<table border =1 cellspacing = 0px id = \"table_light\">";
        $i = 0;
        while (sqlsrv_fetch($stmt)) {
            $id = sqlsrv_get_field($stmt, 0);
            echo "<tr id = \"fila$i\"><td><input onclick = \"marcar(this)\" type = \"checkbox\" name=\"$id\"></td>";
            echo "<td>$id</td></tr>";
            $i = $i + 1;
        }
        echo "</table>";
        echo "<br>";
        echo "</form>";
        echo "<input type = \"submit\" value = \"Ejecutar Respaldo\">";
        echo "</center>";
        ?>
    </body>
</html>
