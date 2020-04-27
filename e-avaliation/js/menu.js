history.forward()

$(function() {
    $('.menu-btn').on('click', function() {
        $('main').toggleClass('toggled')
    })
})

$('.adm-teacher').click(function() {
    $('#adm-view').empty()
    $('#adm-view').load('teacher/view/adm-teacher.html')
    $('main').toggleClass('toggled')
})

$('.adm-course').click(function() {
    $('#adm-view').empty()
    $('#adm-view').load('course/view/adm-course.html')
    $('main').toggleClass('toggled')
})

$('.adm-student').click(function() {
    $('#adm-view').empty()
    $('#adm-view').load('student/view/adm-student.html')
    $('main').toggleClass('toggled')
})

$('.adm-project').click(function() {
    $('#adm-view').empty()
    $('#adm-view').load('project/view/adm-project.html')
    $('main').toggleClass('toggled')
})

$('.adm-question').click(function() {
    $('#adm-view').empty()
    $('#adm-view').load('question/view/adm-question.html')
    $('main').toggleClass('toggled')
})

$('.avaliation').click(function() {
    $('#adm-view').empty()
    $('#adm-view').load('avaliation/view/adm-avaliation.html')
    $('main').toggleClass('toggled')
})

$('.report').click(function() {
    $('#adm-view').empty()
    $('#adm-view').load('avaliation/view/report-avaliation.html')
    $('main').toggleClass('toggled')
})

$('.logout').click(function() {
    $('#adm-view').empty()
    window.location.href = "teacher/model/logout.php"
})