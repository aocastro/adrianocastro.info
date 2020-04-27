$(document).ready(function() {

    $('.btn-delete').click(function(e) {
        e.preventDefault()

        var dados = 'id='
        dados += $(this).attr('id')
        dados += '&foto='
        dados += $(this).attr('data-foto')
        console.log(dados)
        var url = 'system/model/subscript-delete.php'

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                if (dados.msg == true) {
                    Swal.fire({
                        title: 'TechDay Informa:',
                        text: 'Exclusão realizada com sucesso!',
                        type: 'success',
                        confirmButtonText: 'Feito!'
                    })
                    $('#system').empty()
                    $('#system').load('system/view/subscript_validate.html')
                } else {
                    Swal.fire({
                        title: 'TechDay Informa:',
                        text: dados.msg,
                        type: 'error',
                        confirmButtonText: 'Tente novamente...!'
                    })
                }
            }
        })
    })
})