$(document).ready(function() {

    $('.btn-password').click(function() {
        $('#content').empty()
        $('#content').load('participants/view/recover-password.html')
    })

    $('.btn-login').click(function(e) {
        e.preventDefault()

        var url = 'participants/model/restrict-participant.php'
        var dados = $('#login-participant').serialize()

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            assync: true,
            dataType: 'json',
            success: function(dados) {
                if (dados.mensagem == true) {
                    $('#content').empty();
                    $('#content').load('participants/view/area-participant.html')
                } else if (dados.mensagem == 't3cn0log1@') {
                    window.location.href = '../../sistema'
                } else {
                    Swal.fire({
                        title: 'TechDay Informa:',
                        text: dados.mensagem,
                        type: 'error',
                        confirmButtonText: 'Tente novamente...!'
                    })
                }
                $('#add-participant input').val("")
            }
        });
    })
})