$(document).ready(function() {
    $('.btn-filter').click(function(e) {
        e.preventDefault()
        $('#modal-loading').modal('show')

        function hideLoading() {
            setTimeout(function() { $('#modal-loading').modal('hide') }, 1000);
        }

        var dados = $('#filter-tuition').serialize()
        var url = 'tuition/model/detail-tuition.php'

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let types = `
                        <div class="offset-md-2 col-md-4 col-12 border-bottom">
                            ${dados[i].nameStudents}
                        </div>
                        <div class="col-md-2 col-12 text-center  border-bottom">
                            ${dados[i].namePayment}
                        </div>
                        <div class="col-md-2 col-12 text-center border-bottom">
                            R$ ${dados[i].amountPaid}
                        </div>
                    `
                    $('#rel-tuition').append(types)
                }
                hideLoading()
            }
        })
    })
})