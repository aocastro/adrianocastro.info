$(document).ready(function() {
    $('.btn-filter').click(function(e) {
        e.preventDefault()
        $('#modal-loading').modal('show')

        function hideLoading() {
            setTimeout(function() { $('#modal-loading').modal('hide') }, 1000);
        }

        var dados = $('#filter-tuition').serialize()
        var url = 'src/tuition/model/types-tuition.php'

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let types = `
                        <div class="offset-md-2 col-md-8 col-12 alert alert-warning" role="alert">
                            <h1 class="text-agua">${dados[i].namePayment}: R$ ${dados[i].total}</h1>
                        </div>
                    `
                    $('#rel-tuition').append(types)
                }
                hideLoading()
            }
        })
    })
})