$(document).ready(function() {
    $('.btn-update').click(function(e) {
        e.preventDefault()
        $('#modal-payments').modal('hide')
        $('#modal-loading').modal('show')

        function hideLoading() {
            setTimeout(function() { $('#modal-loading').modal('hide') }, 1000);
        }

        var dados = $('#update-payment').serialize()
        var url = 'payment/model/update-payment.php'

        console.log(dados)

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: true,
            success: function(dados) {
                if (dados.mensagem == true) {
                    Swal.fire({
                            title: 'e-Academia Informa:',
                            text: 'Serviço alterado com sucesso!',
                            type: 'success',
                            confirmButtonText: 'Feito!'
                        })
                        // Recarregando a lista de serviços cadastrados
                    let url = 'payment/model/list-payment.php'
                    $('#list-payments').empty()
                    $.ajax({
                        dataType: 'json',
                        type: 'post',
                        assync: true,
                        url: url,
                        success: function(dados) {
                            for (var i = 0; i < dados.length; i++) {
                                let payment = `
                                    <div class="row border-top border-primary mt-n-10">
                                        <div class="col-md-1 col-12 mt-1">
                                            <p class="text-center text-agua">${dados[i].idPayment}</p>
                                        </div>
                                        <div class="col-md-8 col-12 mt-1">
                                            <p class="text-agua text-md-left text-center">${dados[i].namePayment}</p>
                                        </div>
                                        <div class="col-md-3 col-12 mt-1">
                                            <p class="text-center">
                                                <button id="${dados[i].idPayment}" title="Visualizar" class="btn btn-info btn-sm btn-view"><i class="mdi mdi-eye-outline"></i></button>
                                                <button id="${dados[i].idPayment}" title="Editar" class="btn btn-agua btn-sm btn-edit"><i class="mdi mdi-pencil-circle"></i></button>
                                                <button id="${dados[i].idPayment}" title="Excluir" class="btn btn-danger btn-sm btn-delete"><i class="mdi mdi-delete-circle"></i></button>
                                            </p>
                                        </div>
                                    </div>
                                    `
                                $('#list-payments').append(payment)
                            }
                            hideLoading()
                        }
                    })
                } else {
                    hideLoading()
                    Swal.fire({
                        title: 'e-Academia Informa:',
                        text: dados.mensagem,
                        type: 'error',
                        confirmButtonText: 'Tente novamente...!'
                    })
                }
                $('body').append('<script src="payment/controller/view-payment.js"></script>')
                $('body').append('<script src="payment/controller/edit-payment.js"></script>')
                $('body').append('<script src="payment/controller/delete-payment.js"></script>')
            }
        })
    })
})