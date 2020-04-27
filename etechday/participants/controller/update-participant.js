$(document).ready(function() {

    $('.btn-update').click(function(e) {
        e.preventDefault()
        var url = 'participants/model/update-participant.php'
        var dados = $('#update-participant').serialize()

        console.log(dados)

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: true,
            success: function(dados) {
                if (dados.mensagem == true) {
                    Swal.fire({
                        title: 'TechDay Informa:',
                        text: 'Atualização cadastral realizada com sucesso!',
                        type: 'success',
                        confirmButtonText: 'Feito!'
                    })
                } else {
                    Swal.fire({
                        title: 'TechDay Informa:',
                        text: dados.mensagem,
                        type: 'error',
                        confirmButtonText: 'Tente novamente...!'
                    })
                }
            }
        })
    })
})