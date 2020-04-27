var pagina = 1
var itensPorPagina = 3

function obterTotalRegistros() {
    var totalRegistros = 0;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'question/model/total-question.php',
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

    $('#list-question').empty()

    let dado = { pagination: `{"pagina":${pagina},"porpagina":${itensPorPagina}}` }

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: 'question/model/list-question.php',
        data: dado,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let question = `
                <div class="col-md-3 col-12 mt-2">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title text-center">
                                <strong>${dados[i].categoryItem_avaliation} | ${dados[i].subgroupItem_avaliation}</strong><br>
                                ${dados[i].descriptionItem_avaliation}
                            </p>
                            <button id="${dados[i].idItem_avaliation}" class="btn btn-info btn-block btn-sm btn-view"><i class="mdi mdi-eye-circle"></i> Visualizar</button>
                            <button id="${dados[i].idItem_avaliation}" class="btn btn-primary btn-block btn-sm btn-edit"><i class="mdi mdi-pencil-circle"></i> Editar</button>
                        </div>
                    </div>
                </div>
                `
                $('#list-question').append(question)
            }
            $('body').append('<script src="question/controller/view-question.js"></script>')
            $('body').append('<script src="question/controller/edit-question.js"></script>')
        }
    })


    adicionarItensPaginacao()
}

(function() {

    obterDados(pagina, itensPorPagina)

})()


$('.btn-add').click(function() {
    let add = `
    <div class="offset-md-3 col-md-6 col-12 mt-2 mb-2">
        <form id="add-question">
            <div class="form-group">
                <label><strong>Categoria</strong></label>
                <select name="categoryItem_avaliation" id="categoryItem_avaliation" class="form-control">
                    <option value="">Selecione a categoria da questão</option>
                    <option value="new"><span class="text-danger">Adicionar nova categoria</span></option>
                </select>
                <input type="text" name="nameCategory" id="nameCategory" class="form-control hide">
            </div>
            <div class="form-group">
                <label><strong>Sub-Categoria</strong></label>
                <select name="subgroupItem_avaliation" id="subgroupItem_avaliation" class="form-control">
                        <option value="">Selecione a sub-categoria da questão</option>
                        <option value="new"><strong>Adicionar nova categoria</strong></option>
                    </select>
                <input type="text" name="nameSubgroup" id="nameSubgroup" class="form-control hide">
            </div>
            <div class="form-group">
                <label><strong>Questão</strong></label>
                <textarea name="descriptionItem_avaliation" cols="30" rows="3" class="form-control"></textarea>
            </div>
            <button class="btn btn-avaliation btn-block btn-lg btn-save"><i class="mdi mdi-content-save-settings"></i> Salvar</button>
        </form>
    </div>
    `
    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: false,
        url: 'question/model/list-category.php',
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                $('#categoryItem_avaliation').append('<option value="' + dados[i].categoryItem_avaliation + '">' + dados[i].categoryItem_avaliation + '</option>')
            }
        }
    })

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: false,
        url: 'question/model/list-subgroup.php',
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                $('#subgroupItem_avaliation').append('<option value="' + dados[i].subgroupItem_avaliation + '">' + dados[i].subgroupItem_avaliation + '</option>')
            }
        }
    })

    $('#new').empty()
    $('#new').append(add)
    $('#new').fadeIn(1500)
    $('body').append('<script src="question/controller/add-question.js"></script>')

    $("#categoryItem_avaliation").change(function() {
        if ($("#categoryItem_avaliation").val() == 'new') {
            $("#categoryItem_avaliation").addClass('hide')
            $('#nameCategory').removeClass('hide')
        }
    })

    $("#subgroupItem_avaliation").change(function() {
        if ($("#subgroupItem_avaliation").val() == 'new') {
            $("#subgroupItem_avaliation").addClass('hide')
            $('#nameSubgroup').removeClass('hide')
        }
    })

})