$(document).ready(function() {

    var url = 'proof/model/detail-proof.php'

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: false,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let proof = `
                    <div class="row">
                        <div class="col-12">
                            <h2 class="text-danger text-center">${dados[i].nome}</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            ${dados[i].descricao}
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-12 border-danger border-top">
                            <form id="upload-proof" method="POST" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label>Arquivo (Tamanho máximo de 30MB, nas extensões avi ou mp4)</label>
                                    <input type="file" name="archive" class="form-control-file"/>
                                </div>
                                <input type="hidden" name="id" value="${dados[i].id}"/>
                                <button type="submit" class="btn btn-outline-dark btn-block btn-upload><i class="mdi mdi-upload"></i> Upload </button>
                            </form>
                        </div>
                    </div>
                `
                $('#detail-proof').append(proof)
            }
            $('body').append('<script src="proof/controller/upload-proof.js"></script>')
                // $('body').append('<script src="system/controller/promoted.js"></script>')
        }
    })

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: false,
        url: 'proof/model/find-file.php',
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                var file
                if (dados[i].resultado == 1) {
                    file = `
                    <div class="alert alert-primary text-center mt-3" role="alert">
                        //O arquivo já foi enviado para avaliação
                        No momento todos os desafios foram realizados, aguarde os próximos...
                    </div>
                    `
                } else {
                    file = `
                    <div class="alert alert-danger text-center mt-3" role="alert">
                        Fique atendo, pois o arquivo ainda não foi enviado para avaliação
                    </div>
                    `
                }
                $('#detail-proof').append(file)
            }
        }
    })
})