$.ajax({
    dataType: 'json',
    type: 'post',
    assync: true,
    url: 'avaliation/model/list-project.php',
    success: function(dados) {
        var idProject = 0
        for (var i = 0; i < dados.length; i++) {
            if (idProject != dados[i].idProject) {
                let project = `
                <div class="col-md-3 col-12 mt-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title text-center"><strong>${dados[i].nameProject}</strong></h5>
                        </div>
                        <div id="div-${dados[i].idProject}" class="card-footer">
                            <button id="${dados[i].idProject}" data-teacher="${dados[i].idTeacher}" class="btn btn-info btn-block btn-sm btn-print"><i class="mdi mdi-printer"></i> ${dados[i].nameTeacher}</button>
                        </div>
                    </div>
                </div>
                `
                idProject = dados[i].idProject
                $('#report').append(project)
            } else {
                $('#div-' + dados[i].idProject + '').append(`<button id="${dados[i].idProject}" data-teacher="${dados[i].idTeacher}" class="btn btn-info btn-block btn-sm btn-print"><i class="mdi mdi-printer"></i> ${dados[i].nameTeacher}</button>`)
            }
        }
        $('body').append('<script src="avaliation/controller/print.js"></script>')
    }
})