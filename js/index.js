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
        if(server == null || db == null || user == null || pass == null){
            alert("No existe una conexión");
        }
        else{
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
        }
    });
});

/**
 * Comprueba que los input solo acepten números
 * @param {type} evt
 * @returns {Boolean}
 */
function onlyNumbers(evt) {
    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

/**
 * Comprueba que no existan espacios en blanco
 * @param {type} e eventp
 * @returns {Boolean}
 */
function notspace(evt)
{
    var e = evt || event;
    if (e.keyCode == 32)
        return false;
}

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

/**
 * Método encargado de agregar un Filegroup a la base de datos 
 * @returns {undefined} 
 */
function AddFileGroup() {
    var fileGroup = document.getElementById("FGName").value;
    $(document).ready(function() {
        $.ajax({
            url: "php/AddFileGroup.php",
            type: "post",
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
                    if (response == 5) {
                        alert("FileGroup añadido con éxito");
                        $(".ui-dialog-content").dialog("close");
                        $('#background').hide();
                        $("#FGName").val("");


                    }
                    else
                        alert("Error de conexión");
                }
            }
        });
    }
    );
}

/**
 * Valida los valores del formulario para realizar la conexión
 * @returns {undefined} 
 */
function crearBaseDatos() {
    if (server == null | db == null | user == null | password == null) {
        alert("No existe una conexión");
    }
    else {
        div = 0;
        var div = "";
        $("#graphic_area").html(div);
    }
}

/**
 * Realiza la interfaz de acuerdo a los datos almacenados en la base de datos
 * para añadir archivos a un filegroup
 * @returns {undefined}
 */
function anadirArchivoGUI() {
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
                            div = "<br><hr><br><div id='contentFilegroup'><form name='addfile'><center><h4>Seleccione el Filegroup que desea crear un archivo: </h4></center><center><table><br>";
                        for (index = 0; index < response.length; ++index) {
                            div += "<tr><td><input type='radio' name='fg' value='" + response[index].name + "'>" +
                                    response[index].id + " " + response[index].name + "</td></tr>";
                        }
                        div += "</table></center></form>";
                        //formulario almacenar datos del nuevo archivo
                        div += "<br><br><center><h4>Complete los siguientes datos:</h4><center>" +
                                "<form class='form-1' method='post' action='javascript:anadirArchivo();' >" +
                                "<input id='nombreArchivo' type='text' name='newfile'  onkeypress='return notspace();' placeholder='Nombre del archivo'>" +
                                "<input id='tamañoInicial' type='text' name='newfile' onkeypress='return onlyNumbers();' placeholder='Tamaño inicial del archivo en MB'>" +
                                "<input id='tamañoMaximo' type='text' name='newfile' onkeypress='return onlyNumbers();' placeholder='Tamaño máximo del archivo en MB'>" +
                                "<input id='tamañoCrecimiento' type='text' name='newfile' onkeypress='return onlyNumbers();' placeholder='Tamaño crecimiento en MB'>" +
                                "<button type='submit' name='submit'>Crear archivo</button>" +
                                "</form></div>";
                        $("#titulo").html("Archivo a un FileGroup");
                        $("#graphic_area").html(div);
                    }
                }
            });
        });
    }
}

/**
 * 
 * @returns {undefined} 
 */
function addFilegroupField() {
    $('#filegroupsContainer').append(
            "<br><div style=\"border: 1px solid\">"
            + "<div id=\"filegroup" + fileGroups + "\">"
            + "<br>"
            + "<input type\"text\" onkeypress='return notspace();' placeholder=\"Escriba el nombre del Filegroup\">"
            + "<br>"
            + "<input type=\"checkbox\">Generar archivos automaticamente"
            + "<br>"
            + "</div>"
            + "<br>"
            + "<div>"
            + "<input id=\"submitAddFile\" type=\"button\" align\"right\" value=\"Añadir Archivo\" onclick=\"javascript:addFileField(filegroup" + fileGroups + ")\">"
            + "</div>"
            + "<br>"
            + "</div>");
    fileGroups++;
}

/**
 * 
 * @param {type} filegroup
 * @returns {undefined}
 */
function addFileField(filegroup) {
    $(filegroup).append("<input type=\"text\" placeholder=\"Nombre del Archivo\" onkeypress='return notspace();'>"
            + "<input type=\"text\" onkeypress=\"return onlyNumbers()\" placeholder=\"Tamaño Inicial\" >"
            + "<input type=\"text\" onkeypress=\"return onlyNumbers()\" placeholder=\"Tamaño Máximo\">"
            + "<input type=\"text\" onkeypress=\"return onlyNumbers()\" placeholder=\"Tamaño de Crecimiento\"><br>");
}

/**
 * 
 * @returns {undefined}
 */
function showNewDatabaseInterface() {
    graphics = "<br><hr><br><div id='contentFilegroup'>"
            + "<center><h4>Complete los datos para crear una nueva base de datos</h4></center>"
            + "<center>"
            + "<form>"
            + "<div id=\"databaseCreation\">"
            + "<input id=\"databaseName\" type=\"text\" placeholder=\"Base de Datos\" onkeypress='return notspace();'>"
            + "<input id=\"administrator\" type=\"text\" placeholder=\"Usuario Administrador\" onkeypress='return notspace();'>"
            + "<input id=\"administratorPassword\" type=\"text\" placeholder=\"Contraseña\" onkeypress='return notspace();'>"
            + "</div>"
            + "<div>"
            + "<div id=\"filegroupsContainer\">"
            + "<br>"
            + "</div>"
            + "<br>"
            + "<br>"
            + "<div>"
            + "<input id=\"submitNuevoFilegroup\" type=\"button\" value=\"Nuevo Filegroup\" onclick=\"javascript:addFilegroupField()\">"
            + "</div>"
            + "</div>"
            + "<br>"
            + "<div>"
            + "<input id=\"submitCreateDatabae\" type=\"submit\" value=\"Crear Base de Datos\">"
            + "</div>"
            + "</form>"
            + "</center>"
            + "</div>";

    $("#titulo").html("Nueva Base de Datos");
    $("#graphic_area").html(graphics);
}

/**
 * Realiza la creación del archivo de acuerdo a los datos del form
 * @returns {undefined}
 */
function anadirArchivo() {
    nombreArchivo = document.getElementById("nombreArchivo").value;
    tamañoInicial = document.getElementById("tamañoInicial").value;
    tamañoMaximo = document.getElementById("tamañoMaximo").value;
    tamañoCrecimiento = document.getElementById("tamañoCrecimiento").value;

    if (nombreArchivo == "" || tamañoInicial == "" || tamañoMaximo == "" || tamañoCrecimiento == "") {
        alert("Todos los datos son necesarios");
    }
    else {
        if (tamañoInicial == 0 || tamañoMaximo == 0 || tamañoCrecimiento == 0) {
            alert("No pueden existir valores en cero")
        }
        else {
            FGselected = getRadioButtonSelectedValue(document.addfile.fg);
            if (FGselected == null) {
                alert("Debe seleccionar un FileGroup donde desea crear el archivo");
            }
            else {
                query = queryAddFile(nombreArchivo,tamañoInicial,tamañoMaximo,tamañoCrecimiento,FGselected);
                $(document).ready(function() {
                    $.ajax({
                        url: "php/AddFile.php",
                        type: "post",
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
                                alert("Error query");
                                alert(query);
                            }
                            else {
                                if (response == -3)
                                    alert("Archivo añadido éxito");
                                else
                                    alert("Error de conexión");
                            }
                            nombreArchivo = "";
                            tamañoInicial = "";
                            tamañoMaximo = "";
                            tamañoCrecimiento = "";
                            $("#nombreArchivo").val("");
                            $("#tamañoInicial").val("");
                            $("#tamañoMaximo").val("");
                            $("#tamañoCrecimiento").val("");
                        }
                    });
                }
                );
            }
        }
    }
}


/**
 * Devuelve el nombre del "radio" seleccionado
 * @param {type} ctrl Name del form y Name de los imput
 * @returns {unresolved} Retorna el nombre del seleccionado
 */
function getRadioButtonSelectedValue(ctrl) {
    for (i = 0; i < ctrl.length; i++)
        if (ctrl[i].checked)
            return ctrl[i].value;
}

/**
 * Construye el query a ejecutar para realizar la creación de un archivo
 * asociado a un filegroup
 * @param {type} nombre Nombre del archivo
 * @param {type} tamañoInicial Tamaño inicial, expresado en MB
 * @param {type} tamañoMaximo Tamaño máximo, expresado en MB
 * @param {type} tamañoCrecimiento Tamaño del crecimiento expresado en MB
 * @param {type} FileGroup Nombre del FileGroup que desea asociar al archivo
 * @returns {String} El query para ejecutar en el motor de base de datos
 */
function queryAddFile(nombre,tamañoInicial,tamañoMaximo,tamañoCrecimiento,FileGroup) {
    path = "C:\\Program Files\\Microsoft SQL Server\\MSSQL11.MSSQLSERVER\\MSSQL\\DATA\\";
    query = "USE master" +
            " ALTER DATABASE " +
            db +
            " ADD FILE(" +
            " NAME=" + nombre + "," +
            " FILENAME=" + "'" + path + nombre + ".ndf'," +
            " SIZE=" + tamañoInicial + "MB," +
            " MAXSIZE=" + tamañoMaximo + "MB," +
            " FILEGROWTH=" + tamañoCrecimiento + "MB" +
            ") " +
            "TO FILEGROUP " + FileGroup + ";";
    return query;
}











