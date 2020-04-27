$(document).ready(function() {
    $('.btn-confirmed').click(function(e) {
        e.preventDefault()
        var dados = 'id='
        dados += $(this).attr('id')
        var url = 'participants/model/confirmed-participant.php'

        console.log(dados)

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
                        text: 'Sua participação foi confirmada!',
                        type: 'success',
                        confirmButtonText: 'Feito!'
                    })
                    $('#content').empty()
                    $('#content').load('participants/view/area-participant.html')
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