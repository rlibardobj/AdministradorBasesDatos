document.write("<script language=\"JavaScript\" type=\"text/JavaScript\" src=\"https://www.google.com/jsapi\"></script" + ">");



/*  Variables de Conexión  */
var server;
var db;
var user;
var pass;
var fileGroups = 0;

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

$(function() {
    $('#AddFileGroup').click(function() {
        $('#background').animate({
            'opacity': '.80'
        });
        $('#background').css('display', 'block');
        $('#background').click(function() {
            $(".ui-dialog-content").dialog("close");
            $('#background').hide();
        });
        $("#NewFileGroup").dialog({
            height: 200,
            width: 400
        });
        $('#NewFileGroup').bind('dialogclose', function(event) {
            $('#background').hide();
        });
    });
});

$(function() {
    $('#newDatabase').click(function() {
        $('#background').animate({
            'opacity': '.80'
        });
        $('#background').css('display', 'block');
        $('#background').click(function() {
            $(".ui-dialog-content").dialog("close");
            $('#background').hide();
        });
        $("#createDatabase").dialog({
            height: 350,
            width: 400
        });
        $('#createDatabase').bind('dialogclose', function(event) {
            $('#background').hide();
        });
    });
});


function drawChart(int, uso, archivo) {
    // Create the data table.
    var nombre = 'graphic' + int;
    var sin_uso = 100 - uso;
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Espacio Disponible', sin_uso],
        ['Espacio Usado', uso]
    ]);
    // Set chart options
    var options = {'title': 'Porcentajes para el archivo: ' + archivo,
        is3D: true,
        'width': 500,
        'height': 400};
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById(nombre));
    chart.draw(data, options);

}

function conexion() {
    server = document.getElementById("serverName").value;
    db = document.getElementById("dataBase").value;
    user = document.getElementById("userName").value;
    pass = document.getElementById("password").value;
    $(document).ready(function() {
        $.ajax({
            url: "php/conexion.php",
            type: "post",
            dataType: 'json',
            data: {server: server,
                db: db,
                user: user,
                pass: pass
            }
        }).done(function(response) {
            if (response == -1) {
                alert("Error de conexión");
            }
            else {
                if (response == -2) {
                    alert("Error de consulta sql");
                }
                else {
                    //Oculta ventana emergente
                    $(".ui-dialog-content").dialog("close");
                    $('#background').hide();
                    //Construir los Div para los n graficos
                    if (response.length > 0)
                        div = "";
                    for (index = 0; index < response.length; ++index) {
                        if (index > 0 && (response[index - 1].fg == response[index].fg)) {
                            div += "<br><div id='graphic" + index + "'" + "+ class='graphic'></div>";
                        }
                        else {
                            div += "<br><hr><br><center><h2>Gráfico para el FileGroup: " + response[index].fg + "</h2></center><div id='graphic" + index + "'" + "+ class='graphic'></div>";
                        }
                    }
                    //Construir gráficos individualmente
                    $("#graphic_area").html(div);
                    for (index = 0; index < response.length; ++index) {
                        drawChart(index, response[index].use, response[index].file);
                    }
                }
            }
        });
    });
}

function AddFileGroup() {
    var fileGroup = document.getElementById("FGName").value;
    $(document).ready(function() {
        $.ajax({
            url: "php/AddFileGroup.php",
            type: "post",
            //dataType: 'json',
            data: {server: server,
                db: db,
                user: user,
                pass: pass,
                fileGroup: fileGroup
            }
        }).done(function(response) {
            alert("hola");
            if (response == -1) {
                alert("Error de conexion");
            }
            else {
                if (response == -2) {
                    alert("Error de consulta sql");
                }
                else {
                    if (response == 5)
                        alert("FileGroup añadido con éxito");
                    else
                        alert("Went Through php but nothing happened");
                }
            }
        });
    }
    );
}

function addField() {
        fileGroups++;
        var container = document.getElementById("databaseCreation");
        var input = document.createElement("input");
        input.type = "text";
        input.name = "filegroup" + fileGroups;
        container.appendChild(input);
}


