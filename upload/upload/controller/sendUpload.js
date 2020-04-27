$(document).ready(function() {
    $('#upload').submit(function(e) {
        e.preventDefault()

        url = "upload/model/upload.php"

        var formData = new FormData(document.getElementById("upload"))

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
                alert(dados.mensagem);
            }
        });
    })
})