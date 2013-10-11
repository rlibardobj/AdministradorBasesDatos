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

var server;
var db;
var user;
var pass;

function conexion(servidor,basedatos,usuario,contraseña,query){
    server = servidor;
    db = basedatos;
    user = usuario;
    pass = contraseña;
    $(document).ready(function() {
        $.ajax({
            url: "sql_server.php",
            type: "post",
            data:{server:server,
                  db:db,
                  user:user,
                  pass:pass,
                  query:query
            }
        }).done(function(response) {
            alert(response);
        });
    });
}