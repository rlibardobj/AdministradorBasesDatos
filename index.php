<!DOCTYPE html">
<html>

    <head>
        <title>SQL SERVER ADMIN</title>
        <meta charset="UTF-8" />      
        <link href='img/sql.png' rel='shortcut icon' type='image/png'>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
         <!-- CSS - JS -->
        <link rel="stylesheet" type="text/css" media="all" href="css/index.css" />               
        <script type="text/javascript" src="js/index.js"></script>     
         <!-- Login -->
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
        <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <link rel="shortcut icon" href="../favicon.ico"> 
        <link rel="stylesheet" type="text/css" href="css/style.css" />
	<script src="js/modernizr.custom.63321.js"></script>       
        <!--Graphic GOOGLE API-->
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script type="text/javascript">
            // Load the Visualization API and the piechart package.
            google.load('visualization', '1.0', {'packages': ['corechart']});
            // Set a callback to run when the Google Visualization API is loaded.
            google.setOnLoadCallback(drawChart);
            // Callback that creates and populates a data table,
            // instantiates the pie chart, passes in the data and
            // draws it.
            function drawChart() {
                // Create the data table.
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Topping');
                data.addColumn('number', 'Slices');
                data.addRows([
                    ['FG1', 3],
                    ['FG2', 1],
                    ['FG3', 1],
                    ['FG4', 1],
                    ['FG5', 2]
                ]);
                // Set chart options
                var options = {'title': 'Administrador de Base de Datos SQL server',
                    'width': 800,
                    'height': 700};
                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.PieChart(document.getElementById('graphic'));
                chart.draw(data, options);
            }
        </script>
    </head>


    <body>

        <div class="contenido">
            <header>
                <img src="img/sql.jpg" border="3" />
            </header>
            <hr>
            <nav>
                <li><a href="#">Principal</a></li>
                <li><a href="#">Crear Base de Datos</a></li>
                <li><a href="#">Añadir FileGroup</a></li>
                <li><a href="#">Añadir Archivos a FG</a></li>
                <li><a id="conexion" href="#">Conexión a BD</a></li>
            </nav>           
            <br><br><hr><br>
            <center>
            <h1>Estadisticas de uso</h1>
            </center>
            
            
            <div id="background"></div>
            <section id="dialog" class="dialog" title="Conectar a la Base de Datos">
		<form class="form-1" method="post" action="javascript:conexion();" >
                	<p class="field">
                        	<input type="text" name="login" placeholder="Servidor">
				<i class=""></i>
			</p>
			<p class="field">
				<input type="password" name="password" placeholder="Base Datos">
				<i class=""></i>
			</p>
			<p class="field">
				<input type="text" name="login" placeholder="Usuasrio">
				<i class="icon-user icon-large"></i>
			</p>
			<p class="field">
				<input type="password" name="password" placeholder="Contraseña">
				<i class="icon-lock icon-large"></i>
			</p>
			<p class="submit">
				<button type="submit" name="submit"><i class="icon-arrow-right icon-large"></i></button>
			</p>
		</form>
	  </section>
        <section>
            <div id="graphic"></div>
        </section>   
        </div>

   </body>
</html>

 <?php

?>
