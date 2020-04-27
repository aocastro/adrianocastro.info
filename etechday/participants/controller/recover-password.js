$(document).ready(function() {

    $('.btn-recover').click(function(e) {
        e.preventDefault()

        var url = 'participants/model/recover-password.php'
        var dados = $('#recover-password').serialize()

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            assync: true,
            dataType: 'json',
            success: function(dados) {
                Swal.fire({
                    title: 'TechDay Informa:',
                    text: dados.mensagem,
                    type: 'warning',
                    confirmButtonText: 'Feito!'
                })
                $('#content').load('participants/view/restrict-participant.html')
            }
        });
    })
})