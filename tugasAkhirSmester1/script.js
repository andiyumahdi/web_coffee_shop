document.addEventListener('DOMContentLoaded', function() {
    const fullText = 'ANDI COFFEE';
    const typewriterElement = document.getElementById('typewriter-text');
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if (isDeleting) {
            if (charIndex > 0) {
                charIndex--;
                updateDisplay();
                setTimeout(typeWriter, 100);
            } else {
                isDeleting = false;
                setTimeout(typeWriter, 500);
            }
        } else {
            if (charIndex < fullText.length) {
                charIndex++;
                updateDisplay();
                setTimeout(typeWriter, 200);
            } else {
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, 2000);
            }
        }
    }





    function updateDisplay() {
        let displayText = '';
        for (let i = 0; i < charIndex; i++) {
           
            if (i < 4) { 
                displayText += `<span class="anditeks">${fullText[i]}</span>`;
            } else {
                displayText += fullText[i];
            }
        }
        typewriterElement.innerHTML = displayText;
    }


    typewriterElement.innerHTML = '';
    typeWriter();
});

window.onload = function() {
    setTimeout(function() {
        const alertBox = document.getElementById("custom-alert");
        alertBox.style.display = "flex";
    }, 100); 
};
 
function closeAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}


let menuIcon = $('#menu-icon');
let navbar = $('.navbar');
let sections = $('section');
let navLinks = $('header nav a');

$(window).on('scroll', () => {
    sections.each(function() {
        let top = $(window).scrollTop();
        let offset = $(this).offset().top - 150;
        let height = $(this).outerHeight();
        let id = $(this).attr('id');

        if (top >= offset && top < offset + height) {
            navLinks.removeClass('active');
            $('header nav a[href*=' + id + ']').addClass('active');
        }
    });
});

window.onload = function() {
    setTimeout(function() {
        const alertBox = document.getElementById("custom-alert");
        const overlay = document.getElementById("overlay");
        document.body.classList.add('no-scroll');
        alertBox.style.display = "flex";
        overlay.style.display = "block";
    }, 100); 
};

function closeAlert() {
    const alertBox = document.getElementById("custom-alert");
    const overlay = document.getElementById("overlay");
    document.body.classList.remove('no-scroll');
    alertBox.style.display = "none";
    overlay.style.display = "none";
}

// Mencegah scroll saat alert aktif
document.addEventListener('wheel', function(e) {
    if (document.getElementById('custom-alert').style.display === 'flex') {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function(e) {
    if (document.getElementById('custom-alert').style.display === 'flex') {
        e.preventDefault();
    }
}, { passive: false });

// Mencegah klik pada elemen di belakang alert
document.addEventListener('click', function(e) {
    if (document.getElementById('custom-alert').style.display === 'flex') {
        if (!document.getElementById('custom-alert').contains(e.target)) {
            e.preventDefault();
        }
    }
});


menuIcon.on('click', () => {
    menuIcon.toggleClass('by-x');
    navbar.toggleClass('active');
});


(function($) {
    var slide = function(ele, options) {
        var $ele = $(ele);
        var setting = {
            speed: 20000,
            interval: 2000,
        };

        $.extend(true, setting, options);

        var states = [
            { $zIndex: 1, width: 120, height: 150, top: 69, left: 134, $opacity: 0 },
            { $zIndex: 2, width: 130, height: 170, top: 59, left: 20, $opacity: 0.3 },
            { $zIndex: 3, width: 170, height: 218, top: 35, left: 90, $opacity: 0.7 },
            { $zIndex: 4, width: 224, height: 288, top: 0, left: 245, $opacity: 1 },
            { $zIndex: 3, width: 170, height: 218, top: 35, left: 470, $opacity: 0.7 },
            { $zIndex: 2, width: 130, height: 170, top: 59, left: 640, $opacity: 0.3 },
            { $zIndex: 1, width: 120, height: 150, top: 69, left: 500, $opacity: 0 }
        ];

        var $lis = $ele.find('li');
        var timer = null;

        $ele.find('.to-next').on('click', function() {
            next();
        });

        $ele.find('.to-prev').on('click', function() {
            states.push(states.shift());
            move();
        });

        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate({
                    width: state.width,
                    height: state.height,
                    top: state.top,
                    left: state.left,
                    opacity: state.$opacity
                }, setting.speed);
            });
        }

        function next() {
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }

        move();
        autoPlay();
    };

    $.fn.toSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele, options);
        });
        return this;
    };

})(jQuery);

$('.slide').toSlide({
    speed: 2000,
    interval: 3000
});


