$(document).ready(function() {
    $('.btn-promoted').click(function(e) {
        e.preventDefault()
        var dados = 'id='
        dados += $(this).attr('id')
        var url = 'system/model/promoted.php'

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                if (dados.msg == true) {
                    Swal.fire({
                        title: 'eTechDay Informa:',
                        text: 'Participante promovido com sucesso!',
                        type: 'success',
                        confirmButtonText: 'Feito!'
                    })
                    $('#system').empty()
                    $('#system').load('system/view/subscript-list.html')
                } else {
                    Swal.fire({
                        title: 'eTechDay Informa:',
                        text: dados.msg,
                        type: 'error',
                        confirmButtonText: 'Tente novamente...!'
                    })
                }
            }
        })
    })
})