$(document).ready(function() {

    $('.btn-save').click(function(e) {
        // Irei coletar todas as informações digitadas no formulário
        let dados = $('#add-usuario').serialize()

        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: 'https://adrianocastro.info/mypwa/src/usuario/modelo/save-usuario.php',
            success: function(dados) {

            }
        })
    })
})