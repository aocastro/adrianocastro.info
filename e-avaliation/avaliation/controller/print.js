$('.btn-print').click(function() {
    // var dados = 'idProject='
    // dados += $(this).attr('id')
    // dados += '&idTeacher='
    // dados += $(this).attr('data-teacher')
    sessionStorage.setItem('idProject', $(this).attr('id'))
    sessionStorage.setItem('idTeacher', $(this).attr('data-teacher'))
    window.open('https://adrianocastro.info/e-avaliation/avaliation/view/result-avaliation.html')
})