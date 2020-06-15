$(document).ready(function() {

    $(".logout").click(function(e) {

        e.preventDefault()

        var url = "src/users/model/logout.php"

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url,
            async: true,
            success: function(dados) {
                let timerInterval
                Swal.fire({
                    title: 'e-Academia!',
                    html: 'O sistema será encerrado em <strong></strong> milisegundos.',
                    timer: 3000,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                            Swal.getContent().querySelector('strong')
                                .textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    onClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        let url = "index.html"
                        $(location).attr('href', url)
                    }
                })
            }
        })

    })

})