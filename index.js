console.log("Hello HITS - V0.1");


// Определение функций для каждой страницы
const pageFunctions = {
    home(container) {
      initGeneral(container);
      initHome(container);
    },
    blog(container) {
      initGeneral(container);
      initBlog(container);
    },
    blogArticle(container) {
        initGeneral(container);
        initBlog(container);
    },
    feedback(container) {
        initGeneral(container);
        initFeedback();
    },
    feedbacklist(container) {
      initGeneral(container);
      // initFeedback();
  },
    service(container) {
      initGeneral(container);
      initReviewSection();
      shareButtons();
  },
  };

  
  // Функция инициализации
  function initializePage() {
    // Ищем элемент с классом main-w и нужными атрибутами
    const mainElement = document.querySelector('.page_wrap[data-page][data-container]');
    if (!mainElement) {
      console.warn("Элемент с классом 'page_wrap' и атрибутами [data-page][data-container] не найден.");
      return;
    }
  
    const namespace = mainElement.getAttribute('data-page');
    const container = mainElement; // Используем сам элемент как контейнер
  
    // Автоматический вызов функции, если она существует
    pageFunctions[namespace]?.(container);
  }

  function initFeedback() {
    shareButtons();
    initReviewSection();
    console.log('Feedback Page');
  }

  function initGeneral(container) {
    // console.log('Инициализация общих функций', container);
    openMobileMenu();
    openContactForm();
    updateCurrentYear();
  }

  function initHome(container) {
    // blogItemHover();
    initReviewSection();
    console.log('Инициализация домашней страницы');
  }

  function initBlog(container) {
    // blogItemHover();
    shareButtons();
    console.log('Blog Page');
  }


  // Запуск после загрузки страницы
document.addEventListener('DOMContentLoaded', initializePage);

// Change Navigation Color Themes
document.addEventListener("colorThemesReady", () => {
    // gsap.to(".nav", { ...colorThemes.getTheme("dark", "3") });
    $("[data-animate-theme-to]").each(function () {
        let theme = $(this).attr("data-animate-theme-to");
    
        ScrollTrigger.create({
          trigger: $(this),
          start: "top 5%",
          end: "bottom 5%",
          onToggle: ({ self, isActive }) => {
            if (isActive) gsap.to(".nav", { 
              ...colorThemes.getTheme(theme),
              duration: 0.1,
              ease: "power2.out"
            });
          }
        });
      });
  });



// Review Section
function initReviewSection(next) {
    next = next || document;
    let sliderTrigger = next.querySelector(".swiper.reviews");
  
    var swiper = new Swiper(sliderTrigger, {
      grabCursor: true,
      speed: 800,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slideToClickedSlide: true,
      centeredSlides: true,
      slidesPerView: 1.2,
      spaceBetween: 16,
      mousewheel: {
        enabled: true,
        forceToAxis: true,
      },
      breakpoints: {
        480: {
          spaceBetween: 16,
          slidesPerView: 2.5,
        },
        767: {
          spaceBetween: 16,
          slidesPerView: "auto",
        },
      },
    });
  
    // ScrollTrigger.create({
    //   trigger: sliderTrigger,
    //   start: "center 75%",
    //   once: true,
    //   onEnter: () => {
    //     swiper.slideTo(2, 800, true);
    //   },
    // });
  }


// Open Contact Form
function openContactForm() {
console.log("OpenContactForm");

    let menuBtn = $('#modal');
    console.log(menuBtn);
    const contactForm = $('#contact-form');
    $('[data-attribute="data-modal-open"]').click(function() {
        menuBtn.css('display', 'flex');
        menuBtn.show();
        // Set focus on the name field in the contact modal
        $('#contact-modal-name').focus();
         
    });

    $('[data-modal-close]').click(function() {
        console.log("CloseContactForm");
        contactForm.css('display', 'flex');
        // Clear all text fields in the contact form
        contactForm.find('input[type="text"], input[type="email"], textarea').val('');
        hideSuccessMessage();
        menuBtn.hide();
    });
    
}
// Open Mobile Menu
function openMobileMenu() {
    let isOpen = false;
    const menuBtn = $('.menu-btn');
    const lines = menuBtn.find('.menu-btn__line');
    let mobileMenu = $('.menu-w');
    
    menuBtn.click(function() {
        if (!isOpen) {

            console.log("OpenMenu");
            mobileMenu.show();

            // Open animation
            gsap.to(lines.eq(0), {
                rotation: 45,
                y: 6,
                duration: 0.3,
                ease: "power2.out",
                transformOrigin: "center"
            });
            gsap.to(lines.eq(1), {
                rotation: -45,
                y: -4,
                duration: 0.3,
                ease: "power2.out",
                transformOrigin: "center"
            });
        } else {
            
            console.log("CloseMenu");
            mobileMenu.hide();

            // Close animation
            gsap.to(lines, {
                rotation: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                transformOrigin: "center"
            });
        }
        isOpen = !isOpen;
    });
}

// Update the current year
function updateCurrentYear() {
    var currentYear = new Date().getFullYear();
    $('.current-year').text(currentYear);
}

// Share buttons
function shareButtons() {
$('[data-attribute="social-btn"]').each(function() {
    var currentUrl = window.location.href;
    $(this).find('a').each(function() {
        var originalHref = $(this).attr('href');
        $(this).attr('href', originalHref + currentUrl);
    });
});
}

// Blog item hover effect
// function blogItemHover() {
//     const blogItems = document.querySelectorAll('[data-blog-item]');
    
//     blogItems.forEach(item => {
//         item.addEventListener('mouseenter', () => {
//             gsap.to(blogItems, {
//                 opacity: 0.5,
//                 duration: 0.3,
//                 ease: "power2.out"
//             });
//             gsap.to(item, {
//                 opacity: 1,
//                 duration: 0.3,
//                 ease: "power2.out"
//             });
//         });

//         item.addEventListener('mouseleave', () => {
//             gsap.to(blogItems, {
//                 opacity: 1,
//                 duration: 0.3,
//                 ease: "power2.out"
//             });
//         });
//     });
// }

// Form - Hide success message if displayed
function hideSuccessMessage() {
    const successMessage = $('.form_main_success_wrap');
    
    if (successMessage.css('display') === 'block') {
        successMessage.css('display', 'none');
    }
}


