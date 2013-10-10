$(function () {            
            $('#conexion').click(function(){
                $('#background').animate({
                'opacity':'.80'
                });
                $('#background').css('display', 'block');                
                $('#background').click(function(){
                    $(".ui-dialog-content").dialog("close");
                    $('#background').hide();
                });
                $( "#dialog" ).dialog({
                   
                    height: 350,
                    width: 400 
                });
                $('#dialog').bind('dialogclose', function(event) {
                    $('#background').hide();
                });           
            });
        });