$(document).ready(function() {

    var url = 'src/users/model/validate-users.php'

    $.ajax({
        url: url,
        type: "POST",
        assync: true,
        dataType: 'json',
        success: function(dados) {
            if (dados.mensagem == false) {
                window.location.href = 'index.html';
            } else {
                Swal.fire({
                    title: 'Seja bem vindo ao e-Academia!',
                    text: dados.user,
                    type: 'success',
                    confirmButtonText: 'OK'
                })
            }
            $('#access-users input').val("")
        }
    })
})