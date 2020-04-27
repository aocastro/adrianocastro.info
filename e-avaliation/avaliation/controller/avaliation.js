var pagina = 1
var itensPorPagina = 3

function obterTotalRegistros() {
    var totalRegistros = 0;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'project/model/total-project.php',
        async: false,
        success: function(dado) {
            totalRegistros = dado[0].TOTAL
        }
    })
    return totalRegistros
}

function adicionarItensPaginacao() {
    let totalRegistros = obterTotalRegistros()
    let numeroDePaginas = Math.ceil(totalRegistros / itensPorPagina)
    let paginaAtual = $('.pagination').attr('paginaatual')

    let navegacao = '';

    let classePrimeiro = paginaAtual == 1 ? 'disabled' : ''

    navegacao += `<li class="page-item ${classePrimeiro}">
                    <a class="page-link" onclick="paginaAnterior()" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>`

    let inicio = paginaAtual > itensPorPagina ? paginaAtual - itensPorPagina + 1 : 1
    let final = paginaAtual > itensPorPagina ? paginaAtual : itensPorPagina < numeroDePaginas ? itensPorPagina : numeroDePaginas

    for (let i = inicio; i <= final; i++) {
        let classeAtivo = i == paginaAtual ? "active" : ""
        navegacao += `<li class="page-item ${classeAtivo}"><a class="page-link" onclick="irParaPagina(${i})">${i}</a></li>`
    }

    let classeUltimo = paginaAtual == numeroDePaginas ? 'disabled' : ''
    navegacao += `<li class="page-item ${classeUltimo}">
                    <a class="page-link" onclick="proximaPagina()" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>`
    $('.pagination').html(navegacao)
}

function irParaPagina(numeroPagina) {
    $('li.active').removeClass('active')
    $('.pagination').attr('paginaatual', `${numeroPagina}`)
    obterDados(numeroPagina, itensPorPagina)
}

function paginaAnterior() {
    let paginaAnterior = Number($('.pagination').attr('paginaatual')) - 1
    irParaPagina(paginaAnterior)
}

function proximaPagina() {
    let proximaPagina = Number($('.pagination').attr('paginaatual')) + 1
    irParaPagina(proximaPagina)
}

function obterDados(pagina, itensPorPagina) {

    $('#avaliation').empty()

    let dado = { pagination: `{"pagina":${pagina},"porpagina":${itensPorPagina}}` }

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: 'project/model/list-project.php',
        data: dado,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                var idProject = dados[i].idProject
                let project = `
                <div class="col-md-3 col-12 mt-2 project-${idProject}">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title text-center"><strong>${dados[i].nameProject}</strong></h5>
                            <button id="${dados[i].idProject}" class="btn btn-info btn-block btn-sm btn-avaliation"><i class="mdi mdi-check-circle"></i> Avaliar</button>
                        </div>
                    </div>
                </div>
                `
                $('#avaliation').append(project)
            }
            generateAvaliation()
        }
    })


    adicionarItensPaginacao()
}

(function() {

    obterDados(pagina, itensPorPagina)

})()


function generateAvaliation() {
    $('.btn-avaliation').click(function() {
        $('#avaliation').empty()
        $('.card-footer').hide()
        var project = $(this).attr('id')
        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: false,
            url: 'avaliation/model/list-question.php',
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let question = `
                    <div id="div-${dados[i].idItem_avaliation}" class="col-md-3 col-12 mt-2">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-title text-center">
                                    <strong>${dados[i].categoryItem_avaliation} | ${dados[i].subgroupItem_avaliation}</strong><br> ${dados[i].descriptionItem_avaliation}
                                </p>
                                <form id="save-response-${dados[i].idItem_avaliation}">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="avaliation" value="A">
                                        <label class="form-check-label text-success" for="inlineCheckbox1">Atingiu</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="avaliation" value="P">
                                        <label class="form-check-label text-primary" for="inlineCheckbox2">Parcialmente Atingiu</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="avaliation" value="N">
                                        <label class="form-check-label text-danger" for="inlineCheckbox3">Não Atingiu</label>
                                    </div>
                                    <input type="hidden" name="work_project_idProject" value="${project}">
                                    <input type="hidden" name="work_item_avaliation_idItem_avaliation" value="${dados[i].idItem_avaliation}">
                                    <button id="${dados[i].idItem_avaliation}" class="btn btn-avaliation btn-block btn-sm btn-save-response mt-2"><i class="mdi mdi-content-save-settings"></i> Salvar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    `
                    $('#avaliation').append(question)
                }
                let comment = `
                <div class="col-md-3 col-12 mt-2">
                    <div class="card">
                        <div class="card-body">
                            <form id="save-comment">
                                <div class="form-group">
                                    <label><strong>Comentários</strong></label>
                                    <textarea class="form-control" name="descriptionComment" cols="30" rows="5">
                                    </textarea>
                                </div>
                                <input type="hidden" name="work_project_idProject" value="${project}">
                                <button class="btn btn-avaliation btn-block btn-sm btn-save-comment mt-2"><i class="mdi mdi-content-save-settings"></i> Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>
                `
                $('#avaliation').append(comment)
                $('body').append('<script src="avaliation/controller/save-response.js"></script>')
                $('body').append('<script src="avaliation/controller/save-comment.js"></script>')
            }
        })
    })
}

$.ajax({
    dataType: 'json',
    type: 'post',
    assync: false,
    url: 'avaliation/model/clear-saved.php',
    success: function(dados) {
        for (var i = 0; i < dados.length; i++) {
            let projeto = dados[i].work_project_idProject
            $('.project-' + dados[i].work_project_idProject + '').hide()
        }
    }
})