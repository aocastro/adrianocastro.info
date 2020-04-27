$(document).ready(function() {

    $('form#add-participant').submit(function(e) {
        e.preventDefault()
        var url = 'participants/model/add-participant.php'
        var formData = new FormData(this)

        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            mimeType: "multipart/form-data",
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function(dados) {
                if (dados.mensagem == true) {
                    Swal.fire({
                        title: 'TechDay Informa:',
                        text: 'Cadastro efetuado com sucesso, agora aguarde os próximos passos e boa sorte ;)',
                        type: 'success',
                        confirmButtonText: 'Feito!'
                    })
                    $('#content').empty();
                    $('#content').load('participants/view/restrict-participant.html')
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