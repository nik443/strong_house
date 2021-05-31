document.addEventListener('DOMContentLoaded', function() {
    /* header */
    if ($(window).width() <= 1200) $('.header__logo').find('img').attr('src', 'icons/logo-white.svg');

    /* project slider */
    $('.projects__slider').slick({
        slidesToShow: 2,
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    /*add images in project-slider arrows*/
    let arrowsProjectSlider = $('.projects__slider').find('.slick-arrow');
    arrowsProjectSlider.append('<img>');
    arrowsProjectSlider.find('img').attr('src', 'icons/arrow-project-slider.svg');

    /* rewievs slider */
    $('.reviews__slider').slick({
        slidesToShow: 2,
        slidesToScroll:2, 
        dots: true,
        appendDots: $('.reviews__slider-dots-block'),
        appendArrows: $('.reviews__slider-arrows-block'),
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    /*add images in rewievs-slider arrows*/
    let arrowsRewievsSlider = $('.reviews__slider-arrows-block').find('.slick-arrow');
    arrowsRewievsSlider.append('<img>');
    arrowsRewievsSlider.find('img').attr('src', 'icons/reviews-slider-arrow.png');

    /* masked input tel */
    $('input[name=phone]').mask("+9(999)999-99-99");

    /* validation */
    $('button[type="submit"]').click(function(e) {
        let form = $(e.target).closest('form');
        let name = $(form).find('input[name="name"]').val();
        let phone = $(form).find('input[name="phone"]').val();
        let checkbox = $(form).find('input[type="checkbox"]');
        let countError = 0;

        let regName = /[А-Яа-я]/;
        if (name == '') {
            countError+=1;
            $('.consultation__form-name').find('.consultation__form-help').text('Это поле обязательно к заполнению');
        }
        else {
            if (name.length < 2) {
                countError+=1;
                $('.consultation__form-name').find('.consultation__form-help').text('Имя слишком короткое');
            }
            if (name.length > 15) {
                countError+=1;
                $('.consultation__form-name').find('.consultation__form-help').text('Имя слишком длинное');
            } 
            if (!regName.test(name)) { 
                countError+=1;
                $('.consultation__form-name').find('.consultation__form-help').text('Введите имя кириллицой');
            }
            else {
                $('.consultation__form-name').find('.consultation__form-help').text('');
            }
        }
        
        if (phone == '') {
            countError+=1;
            $('.consultation__form-phone').find('.consultation__form-help').text('Это поле обязательно к заполнению');
        }
        else {
            $('.consultation__form-phone').find('.consultation__form-help').text('');
        }

        if (!$(checkbox).is(':checked')) {
            countError+=1;
            $(checkbox).closest('label').addClass('checkbox-unchecked');
        }
        else {
            $(checkbox).closest('label').removeClass('checkbox-unchecked');
        }

        if (countError != 0) e.preventDefault();
    });

    /* building__content-slider */
    if ($(window).width() <= 992) $('.building__content').slick({
        slidesToShow: 2,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    let arrowsBuildingSlider = $('.building__content').find('.slick-arrow');
    arrowsBuildingSlider.append('<img>');
    arrowsBuildingSlider.find('img').attr('src', 'icons/arrow-project-slider.svg');

    /* burger */
    let burger = $('.header__burger');
    burger.click(function(e) {
        burger.toggleClass('header__burger_active');
        $('.header__nav').toggleClass('header__nav_active');
    });

    /* submenu and scroll to sections*/
    if ($(window).width() <= 576) {
        $('.header__nav-building a').removeClass('open-modal');
        $('.header__nav-building').click(function(e) {
            $('.header__nav-building-submenu').toggleClass('header__nav-building-submenu_active');
        });
    }

    /* a modal window informing that the section is under construction */
    let modal = $('.modal');
    let modalClose = $('.modal a');
    let openModal = $('.open-modal');
    
    $(openModal).click(function(e) {
        $(modal).fadeIn('0.3s');
        $('#modal-warning').fadeIn('0.3s');
        return false;
    });
    $(modalClose).click(function(e) {
        $(modal).fadeOut('0.3s');
        $('#modal-warning').fadeOut('0.3s');
        $('#modal-thanks').fadeOut('0.3s');
        return false;
    })

    /* send a request */
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(modal).fadeIn('0.3s');
            $('#modal-thanks').fadeIn('0.3s');
            $(this).find('input').val('');
            $('form').trigger('reset');
        });
        return false;
    });
});
