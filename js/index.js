document.write("<script language=\"JavaScript\" type=\"text/JavaScript\" src=\"https://www.google.com/jsapi\"></script" + ">");

/*  Variables de Conexión  */
var server;
var db;
var user;
var pass;
var fileGroups = 0;

/**
 * Accion para el evento del boton Conexión de bd.
 * @returns {undefined}
 */
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

/**
 * Acción para el vento del boton añadir Filegruop.
 * @returns {undefined}
 */
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

<<<<<<< HEAD
=======

>>>>>>> 357f89e4291341c0ae5d8974799685953d288098

/**
 * Método encargado de realizar un solo gráfico.
 * @param {type} int Número del elemento que desea graficar.
 * @param {type} uso Cantidad de uso del archivo.
 * @param {type} archivo Nombre del archivo.
 * @returns {undefined}
 */
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

/**
 * Método que realiza almacena los datos de la conexión a la base de datos.
 * @returns {undefined}
 */
function conexion() {
    server = document.getElementById("serverName").value;
    db = document.getElementById("dataBase").value;
    user = document.getElementById("userName").value;
    pass = document.getElementById("password").value;
    //alert(server);
    if (server == "" || db == "" || user == "" || password == "") {
        alert("Todos los datos son requeridos");
    }
    else {
        //limpiar los datos
        $("#serverName").val("");
        $("#dataBase").val("");
        $("#userName").val("");
        $("#password").val("");
        crearGraficos();
    }
}

/**
 * Método encargado de crear los gráficos dinamicamente
 * @returns {undefined}
 */
function crearGraficos() {
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
                server = null
                db = null
                user = null
                pass = null
            }
            else {
                if (response == -2) {
                    booleanConexion = "0";
                    server = null;
                    db = null;
                    user = null;
                    pass = null;
                    ;
                }
                else {
                    booleanConexion = "1";
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
                    $("#titulo").html("Estadistícas de uso");
                    $("#graphic_area").html(div);
                    for (index = 0; index < response.length; ++index) {
                        drawChart(index, response[index].use, response[index].file);
                    }
                }
            }
        });
    });
}


/*Método encargado de agregar un Filegroup a la base de datos*/
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
            if (response == -1) {
                alert("Error de conexion");
            }
            else {
                if (response == -2) {
                    alert("Ingrese el nombre del nuevo FileGroup");
                }
                else {
                    if (response == 5)
                        alert("FileGroup añadido con éxito");
                    else
                        alert("Error de conexión");
                }
            }
        });
    }
    );
<<<<<<< HEAD
}

=======
}


/**
 * Valida los valores del formulario para realizar la conexión
 * @returns {undefined} 
 */
function crearBaseDatos() {
    if (server == null | db == null | user == null | password == null) {
        alert("No existe una conexión")
    }
    else {
        var div = "";
        $("#graphic_area").html(div);
    }
}

/**
 * Realiza la interfaz de acuerdo a los datos almacenados en la base de datos
 * para añadir archivos a un filegroup
 * @returns {undefined}
 */
function anadirArchivo() {
    if (server == null | db == null | user == null | password == null) {
        alert("No existe una conexión")
    }
    else {
        $(document).ready(function() {
            $.ajax({
                url: "php/getFileGroups.php",
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
                        //Construir los filegroup
                        if (response.length > 0)
                            div = "<br><hr><br><div id='contentFilegroup'><form><center><h4>Seleccione el Filegroup que desea crear un archivo: </h4></center><center><table><br>";
                        for (index = 0; index < response.length; ++index) {
                            div += "<tr><td><input type='radio' name='fg' value='male" + response[index].name + "'>" +
                                    response[index].id + " " + response[index].name + "</td></tr>";
                        }
                        div += "</table></center></form>";
                        //formulario almacenar datos del nuevo archivo
                        div += "<br><br><center><h4>Complete los siguientes datos:</h4><center>"+
                               "<form class='form-1' method='post' action='javascript:conexion();' >"+                                
                               "<input id='nombreArchivo' type='text' name='newfile' placeholder='Nombre del archivo'>"+
                               "<input id='tamañoInicial' type='text' name='newfile' placeholder='Tamaño inicial del archivo'>"+
                               "<input id='tamañoMaximo' type='text' name='newfile' placeholder='Tamaño máximo del archivo'>"+
                               "<input id='tamañoCrecimiento' type='text' name='newfile' placeholder='Tamaño crecimiento'>"+
                               "</form></div>";
                        
                        
                        $("#titulo").html("Archivo a un FileGroup");
                        $("#graphic_area").html(div);
                    }
                }
            });
        });
    }
}

>>>>>>> 357f89e4291341c0ae5d8974799685953d288098
function addField() {
        fileGroups++;
        var container = document.getElementById("databaseCreation");
        var input = document.createElement("input");
        input.type = "text";
        input.name = "filegroup" + fileGroups;
        container.appendChild(input);
}


