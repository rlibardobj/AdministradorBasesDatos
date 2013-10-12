document.write("<script language=\"JavaScript\" type=\"text/JavaScript\" src=\"https://www.google.com/jsapi\"></script" + ">");



/*  Variables de Conexión  */
var server;
var db;
var user;
var pass;

$(function() {
    $('#conexion').click(function() {
        $('#background').animate({
            'opacity': '.80'
        });
        $('#background').css('display', 'block');
        $('#background').click(function() {
            $(".ui-dialog-content").dialog("close");
            $('#background').hide();
        });
        $("#dialog").dialog({
            height: 350,
            width: 400
        });
        $('#dialog').bind('dialogclose', function(event) {
            $('#background').hide();
        });
    });
});


function drawChart(int) {
    // Create the data table.
    var nombre = 'graphic' + int;
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
        'width': 500,
        'height': 400};
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById(nombre));
    chart.draw(data, options);

}

function conexion(query) {
    server = document.getElementById("serverName").value;
    db = document.getElementById("dataBase").value;
    user = document.getElementById("userName").value;
    pass = document.getElementById("password").value;
    cantidad = 3;
    div = "";
    $(document).ready(function() {
        $.ajax({
            url: "sql_server.php",
            type: "post",
            dataType : 'json',
            data: {server: server,
                db: db,
                user: user,
                pass: pass,
                query: query
            }
        }).done(function(response) {
            if (response == -1) {
                alert("Error de conexion");
            }
            else {
                if (response == -2) {
                    alert("Error de consulta sql");
                }
                else {
                    alert(response);
                    //Oculta ventana emergente
                    $(".ui-dialog-content").dialog("close");
                    $('#background').hide();
                    //Construir los Div para los n graficos
                    for (index = 0; index < cantidad; ++index) {
                        div += "<br><hr><br><center><h2>Gráfico Número" + index + " </h2></center>+<div id='graphic" + index + "'" + "+ class='graphic'></div>";
                    }
                    //Construir gráficos individualmente
                    $("#graphic_area").html(div);
                    for (index = 0; index < cantidad; ++index) {
                        drawChart(index);
                    }
                }
            }
        });
    });

}



