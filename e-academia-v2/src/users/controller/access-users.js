$(document).ready(function() {

    $('.btn-login').click(function(e) {
        e.preventDefault()

        var url = 'src/users/model/access-users.php'
        var dados = $('#access-users').serialize()

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            assync: true,
            dataType: 'json',
            success: function(dados) {
                if (dados.mensagem == true) {
                    window.location.href = 'main.html';
                } else {
                    Swal.fire({
                        title: 'e-Academia Informa:',
                        text: dados.mensagem,
                        type: 'error',
                        confirmButtonText: 'Tente novamente...!'
                    })
                }
                $('#access-users input').val("")
            }
        });
    })
})