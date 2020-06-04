$(document).ready(function() {
    $('.btn-view').click(function(e) {
        e.preventDefault()
        $('#modal-loading').modal('show')
        var dados = 'idServices='
        dados += $(this).attr('id')
        url = 'services/model/list-services.php'
        $('#modal-title').empty()
        $('#modal-body').empty()

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: true,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let form = `
                        <!-- Formulário de cadastro de serviços -->
                        <form id="add-services">
                            <div class="form-group">
                                <labe>Nome do serviços a ser prestado</label>
                                    <input type="text" name="nameServices" class="form-control" value="${dados[i].nameServices}" readonly>
                            </div>
                            <div class="form-group">
                                <labe>Valor do serviço</label>
                                    <input type="number" name="valueServices" class="form-control col-2" value="${dados[i].valueServices}" readonly>
                            </div>
                        </form>
                    `

                    $('#modal-title').append('RESUMO DE SERVIÇOS')
                    $('#modal-body').append(form)
                    $('#modal-services').modal('show')
                }
            }
        })
    })
})