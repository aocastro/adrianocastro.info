$(document).ready(function() {
    $('#enviar').on('click', function(e) {

        e.preventDefault()

        var form = $('form')[0]

        var formData = new FormData(form)

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: formData,
            url: 'model/upload.php',
            processData: false,
            contentType: false,
            success: function(dados) {
                Swal.fire({
                    title: 'Upload [adrianoCastro]',
                    icon: dados.tipo,
                    text: dados.mensagem
                })
            }
        })

    })
})