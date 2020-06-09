$(function() {
    $('.menu-btn').on('click', function() {
        $('main').toggleClass('toggled')
    })
})

$('.techday').click(function() {
    $('#content').empty()
    $('#content').load('techday.html')
    $('main').toggleClass('toggled')
})

$('.subscript').click(function() {
    $('#content').empty()
    $('#content').load('participants/view/add-participant.html')
    $('main').toggleClass('toggled')
})

$('.restrict').click(function() {
    $('#content').empty()
    $('#content').load('participants/view/restrict-participant.html')
    $('main').toggleClass('toggled')
})

$('.shedule').click(function() {
    $('#content').empty()
    $('#content').load('schedule.html')
    $('main').toggleClass('toggled')
})

$('.selected').click(function() {
    $('#content').empty()
    $('#content').load('participants/view/selected-participant.html')
    $('main').toggleClass('toggled')
})

$('.video').click(function() {
    $('#content').empty()
    $('#content').load('videos.html')
    $('main').toggleClass('toggled')
})

$('.timeline').click(function() {
        $('#content').empty()
        $('#content').load('timeline.html')
        $('main').toggleClass('toggled')
    })
    // $(".navbar-toggler").click(function() {
    //     $('.navbar-collapse').fadeToggle('slow');
    // })

// $('.dropdown-item').click(function() {
//     $('.navbar-collapse').fadeToggle('slow')
// })

// $('.add-users').click(function() {
//     $('#content').empty()
//     $('#content').load('users/view/add-users.html')
// })

// $('.add-students').click(function() {
//     $('#content').empty()
//     $('#content').load('students/view/manage-students.html')
// })

// $('.add-payment').click(function() {
//     $('#content').empty()
//     $('#content').load('payment/view/manage-payment.html')
// })

// $('.add-services').click(function() {
//     $('#content').empty()
//     $('#content').load('services/view/manage-services.html')
// })

// $('.manage-tuition').click(function() {
//     $('#content').empty()
//     $('#content').load('tuition/view/manage-tuition.html')
// })

// $('.rel-tuition').click(function() {
//     $('#content').empty()
//     $('#content').load('tuition/view/rel-tuition.html')
// })