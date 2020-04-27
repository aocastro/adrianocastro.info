$(document).ready(function() {
    $('.btn-edit').click(function(e) {
        e.preventDefault()
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
                        <form id="update-services">
                            <div class="form-group">
                                <labe>Nome do serviços a ser prestado</label>
                                    <input type="text" name="nameServices" class="form-control" value="${dados[i].nameServices}">
                            </div>
                            <div class="form-group">
                                <labe>Valor do serviço</label>
                                    <input type="number" name="valueServices" class="form-control col-2" value="${dados[i].valueServices}">
                            </div>
                            <div class="form-group row">
                            <input type="hidden" name="idServices" value="${dados[i].idServices}"/>
                            <div class="offset-md-8 col-md-4 col-12">
                                <button class="btn btn-agua btn-block btn-update"><i class="mdi mdi-content-save"></i> Salvar</button>
                            </div>
                        </form>
                    `
                    $('#modal-title').append('ATUALIZAÇÃO DE SERVIÇOS')
                    $('#modal-body').append(form)
                    $('#modal-services').modal('show')
                }
                $('body').append('<script src="services/controller/update-services.js"></script>')
            }
        })
    })
})