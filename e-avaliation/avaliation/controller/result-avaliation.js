$('#print').empty()
var dados = 'idTeacher='
dados += sessionStorage.getItem('idTeacher')
dados += '&idProject='
dados += sessionStorage.getItem('idProject')
$.ajax({
    type: 'post',
    dataType: 'json',
    url: '../model/result-avaliation.php',
    data: dados,
    success: function(dados) {
        var ctr = 0
        var result
        for (var i = 0; dados.length > i; i++) {
            if (ctr == 0) {
                criteria = dados[i].descriptionItem_avaliation
                mentionCriteria = dados[i].mentionAvaliation
                result = `
                        <div class="print">
                            <div class="row">
                                <div class="col-2 text-right">
                                    <img src="../../img/icon72.png">
                                </div>
                                <div class="col-10 text-center mt-1">
                                    <h1>FICHA DE AVALIAÇÃO</h1>
                                </div>
                            </div>
                            <div class="row mt-3 border-top">
                                <div class="col-3 text-right border-right text-rel">
                                    <strong>NOME DO PROJETO:</strong>
                                </div>
                                <div class="col-9">
                                    ` + dados[i].nameProject + `
                                </div>
                            </div>
                            <div class="row border-top">
                                <div class="col-3 text-right border-right text-rel">
                                    <strong>ALUNOS DO PROJETO:</strong>
                                </div>
                                <div id="students" class="col-9">
                                
                                </div>
                            </div>
                            <div class="row border-top">
                                <div class="col-3 text-right border-right text-rel">
                                    <strong>NOME DO PROFESSOR:</strong>
                                </div>
                                <div class="col-9">
                                    ` + dados[i].nameTeacher + `
                                </div>
                            </div>
                            <div class="row border-top border-bottom">
                                <div class="col-3 text-right border-right text-rel">
                                    <strong>DATA DA AVALIAÇÃO:</strong>
                                </div>
                                <div class="col-9">
                                    ` + dados[i].dateFormat + `
                                </div>
                            </div>
                            <div class="row mt-5 border-top">
                                <div class="col-10 border-right">
                                    <strong>
                                    ` + dados[i].categoryItem_avaliation + ` | ` + dados[i].subgroupItem_avaliation + ` </strong><br>
                                    ` + dados[i].descriptionItem_avaliation + `
                                </div>
                                <div class="col-2 text-center">
                                    <br><h5>` + dados[i].mentionAvaliation + `</h5>
                                </div>
                            </div>
                            <div id="aluno-` + dados[i].idAvaliation + `"></div>
                            <div class="row border-top border-bottom mb-5">
                                <div class="col-12 text-justify observation">
                                    <h5>Observações: ` + dados[i].descriptionComment + `</h5>
                                </div>
                            </div>
                        </div>
                `
                $('#print').append(result)
            } else {
                $('#aluno-' + dados[i].idAvaliation + '').append(`
                    <div class="row border-top">
                        <div class="col-10 border-right">
                        <strong>` + dados[i].categoryItem_avaliation + ` | ` + dados[i].subgroupItem_avaliation + `</strong> <br>
                            ` + dados[i].descriptionItem_avaliation + `
                        </div>
                        <div class="col-2 text-center">
                            <br><h5>` + dados[i].mentionAvaliation + `</h5>
                        </div>
                    </div>
                `)
            }
            ctr++;
        }
    }
})

$(document).ready(function() {
    var project = 'idProject='
    project += sessionStorage.getItem('idProject')

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        data: project,
        url: '../model/select-student.php',
        success: function(dados) {
            for (var i = 0; dados.length > i; i++) {
                $('#students').append(dados[i].nameStudent + '<br>')
            }
        }
    })
})