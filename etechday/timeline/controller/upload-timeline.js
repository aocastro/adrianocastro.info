$(document).ready(function() {
    $('#upload').submit(function(e) {
        e.preventDefault()

        $('#loading').modal('show')

        url = "timeline/model/upload-timeline.php"

        var formData = new FormData(this)

        console.log(formData)

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
                    $('#loading').modal('hide')
                    $('#content').empty();
                    $('#content').load('timeline.html')
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