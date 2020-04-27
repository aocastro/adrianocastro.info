$(document).ready(function() {
    $('.btn-add').click(function(e) {
        e.preventDefault()
        $('#loading').modal('show')
        var dados = $('#add-users').serialize()
        var url = 'users/model/add-users.php'
        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: true,
            success: function(dados) {
                if (dados.mensagem == true) {
                    $('#loading').modal('hide')
                    Swal.fire({
                        title: 'e-Academia Informa:',
                        text: 'Usuário cadastrado com sucesso!',
                        type: 'success',
                        confirmButtonText: 'Feito!'
                    })
                    $('#create-team input').val("");
                } else {
                    Swal.fire({
                        title: 'e-Academia Informa:',
                        text: dados.mensagem,
                        type: 'error',
                        confirmButtonText: 'Tente novamente...!'
                    })
                }
            }
        })
    })
})