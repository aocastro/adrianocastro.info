$(document).ready(function() {
    $('.btn-view').click(function(e) {
        e.preventDefault()
        var dados = 'idStudents='
        dados += $(this).attr('id')
        url = 'students/model/list-students.php'
        $('#modal-title').empty()
        $('#modal-body').empty()

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: false,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let sexo
                    if (dados[i].sexStudents == 1) {
                        sexo = 'Masculino'
                    } else {
                        sexo = 'Feminino'
                    }
                    let form = `
                    <form id="add-students">
                        <div class="form-group row">
                            <div class="col-md-9 col-12">
                                <label>Nome completo</label>
                                <input type="text" name="nameStudents" class="form-control" value="${dados[i].nameStudents}" readonly>
                            </div>
                            <div class="col-md-3 col-12">
                                <label>Sexo</label>
                                <input type="text" name="sexStudents" class="form-control" value="${sexo}" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-8 col-12">
                                <label>Endereço completo</label>
                                <input type="text" name="addressStudents" class="form-control" value="${dados[i].addressStudents}" readonly>
                            </div>
                            <div class="col-md-4 col-12">
                                <label>Cidade</label>
                                <input type="text" name="cityStudents" class="form-control" readonly value="${dados[i].cityStudents}">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-4 col-12">
                                <label>Data de Nascimento</label>
                                <input type="date" name="birthStudents" class="form-control" value="${dados[i].birthStudents}" readonly>
                            </div>
                            <div class="col-md-4 col-12">
                                <label>Telefone</label>
                                <input type="tel" name="phoneStudents" id="phone" value="${dados[i].phoneStudents}" data-mask="(00) 0000-0000" class="form-control" readonly>
                            </div>
                            <div class="col-md-4 col-12">
                                <label>Celular</label>
                                <input type="tel" name="celularStudents" id="celular" value="${dados[i].celularStudents}" data-mask="(00) 00000-0000" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>E-mail</label>
                            <input type="email" name="emailStudents" value="${dados[i].emailStudents}" class="form-control" readonly>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-9 col-12">
                                <label>Tipo de serviços</label>
                                <input type="text" class="form-control" value="${dados[i].nameServices}" readonly/>
                            </div>
                            <div class="col-md-3 col-12">
                                <label>Dia de vencimento</label>
                                <input type="number" name="paydayStudents" value="${dados[i].paydayStudents}" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Observações importantes sobre o aluno</label>
                            <textarea name="observationStudents" class="form-control" readonly>${dados[i].observationStudents}</textarea>
                        </div>
                    </form>
                    `

                    $('#modal-title').append('FICHA DE CADASTRO DO ALUNO')
                    $('#modal-body').append(form)
                    $('#modal-students').modal('show')
                }
            }
        })
    })
})