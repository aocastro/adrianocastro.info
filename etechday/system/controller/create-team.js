$(document).ready(function() {
    $('.add-team').click(function(e) {
        e.preventDefault()
        var dados = $('#create-team').serialize()
        url = 'system/model/create-team.php'
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
                        text: 'Formação de time conlcuído com sucesso!',
                        type: 'success',
                        confirmButtonText: 'Feito!'
                    })
                    $('#create-team input').val("");
                } else {
                    Swal.fire({
                        title: 'TechDay Informa:',
                        text: dados.mensagem,
                        type: 'error',
                        confirmButtonText: 'Tente novamente...!'
                    })
                }
            }
        });
    })
})