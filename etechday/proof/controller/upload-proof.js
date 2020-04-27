$(document).ready(function() {

    $('form#upload-proof').submit(function(e) {
        e.preventDefault()
        var url = 'proof/model/upload-proof.php'
        var formData = new FormData(this)

        $('#loading').modal('show')

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
                        text: 'Arquivo enviado com sucesso!',
                        type: 'success',
                        confirmButtonText: 'Feito!'
                    })
                    $('#loading').modal('hide')
                } else {
                    Swal.fire({
                        title: 'TechDay Informa:',
                        text: dados.mensagem,
                        type: 'error',
                        confirmButtonText: 'Tente novamente...!'
                    })
                    $('#loading').modal('hide')
                }
            }
        })
    })
})