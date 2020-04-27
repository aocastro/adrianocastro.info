$(document).ready(function() {

    $('.btn-school').click(function() {
        $('#system').load('school/view/school.html')
    })

    $('.btn-teacher').click(function() {
        $('#system').load('teacher/view/teacher.html')
    })

})