document.addEventListener('DOMContentLoaded', e => {

  const linkActive = document.querySelectorAll('.active-link');
  const burger = document.querySelector('.burger');
  const tabNav = document.querySelectorAll('.tab-nav');
  const tabContent = document.querySelectorAll('.tab-content');
  const scrollContainer = document.querySelectorAll('.scroll-container');
  const scrollLinks = document.querySelectorAll('.menu-services__item');

  const garanteeQuestionsSubtitleAnimate = document.querySelectorAll('.garantee__questions-subtitle');
  const garanteeQuestionsBodyAnimate = document.querySelectorAll('.garantee__questions-body');
  const indexParagraphyAnimate = document.querySelectorAll('.services-column__paragraphy-animate');
  const indexServicesBlockAnimate = document.querySelectorAll('.services-column__block');
  const awardsAnimateIMG = document.querySelectorAll('.awards__img');


//Анимация при клике на якорь

for(let i = 0; i < scrollLinks.length; i++){
  scrollLinks[i].addEventListener('click', (e) => {
    e.preventDefault();

    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  })
}

//Анимация при вертикальном скроле

  ScrollReveal().reveal(garanteeQuestionsSubtitleAnimate, {
    distance: '0px',
    opacity: 0.1,
    duration: 1000,
    mobile: false,
  })

  ScrollReveal().reveal(garanteeQuestionsBodyAnimate, {
    distance: '100px',
    duration: 1000,
    mobile: false,
  })

  ScrollReveal().reveal(indexParagraphyAnimate, {
    distance: '100px',
    duration: 1000,
    viewFactor: 0.5,
    mobile: false,
  })

  ScrollReveal().reveal(indexServicesBlockAnimate, {
    distance: '100px',
    duration: 1000,
    viewFactor: 0.2,
    mobile: false,
  })

  ScrollReveal().reveal(awardsAnimateIMG, {
    scale: 0.5,
    duration: 1000,
    viewFactor: 0.3,
    mobile: false,
  })

  burger.addEventListener('click', onActiveMobileMenu);

  activeLink();

  scrollHorizontally();

  function activeLink(){
    let locationPath = location.pathname;
    linkActive.forEach(link => {
      let href = link.getAttribute('href');
      if(locationPath === href){
        link.classList.add('active')
      }
    });
  }

//Burger

  function onActiveMobileMenu (){
    document.querySelector('.burger').classList.toggle("active");
    document.querySelector('.header__menu').classList.toggle("active");
    document.querySelector('body').classList.toggle("lock");
  }


  function scrollHorizontally(e) {
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    if(scrollContainer.length > 0){
      scrollContainer.forEach(item => {
        item.scrollLeft -= (delta*40); // Multiplied by 40

        if(item.addEventListener){
          item.addEventListener("mousewheel", scrollHorizontally, false);
          item.addEventListener("DOMMouseScroll", scrollHorizontally, false);
        }else{
          item.attachEvent("onmousewheel", scrollHorizontally);
        }
      })
    }
    e.preventDefault();
  }

// Слайдер

$('.jobs-rev__questions-container').slick({
    infinite: true,
    adaptiveHeight: true,
    nextArrow: `<div class="jobs-rev__questions-next">
                  <a href="">Другой отзыв</a>
                </div>`,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 575,
        settings: 'unslick',
      }
    ]
  })

  $(window).resize(function(){
    let $windowWidth = $(window).width();
    if ($windowWidth > 575) {
      $('.jobs-rev__questions-container').not('.slick-initialized').slick({
        infinite: true,
        adaptiveHeight: true,
        nextArrow: `<div class="jobs-rev__questions-next">
                      <a href="">Другой отзыв</a>
                    </div>`,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 576,
            settings: 'unslick',
          }
        ]
      })
    }
  });

  // $('.reset-slider').click(function(){
  //   $('.jobs-rev__questions-container').slick('goTo', 0);
  // })

  //Табы

  if(tabNav.length > 0){
    for(let i = 0; i < tabNav.length; i++){
      tabNav[i].addEventListener('click', e => {
        e.preventDefault();

        let tabNavAttr = e.currentTarget.dataset.tab;

        for(let j = 0; j < tabNav.length; j++){
          let contentTabAttr = tabContent[j].dataset.tabContent;

          if(tabNavAttr === contentTabAttr){
            tabNav[j].classList.add('active');
            tabContent[j].classList.add('active');
          }else{
            tabNav[j].classList.remove('active');
            tabContent[j].classList.remove('active');
          }
        }
      })
    }
  }

  // Yandex maps

    ymaps.ready(init);

  function init(){

    let navElements = document.querySelectorAll('.tab-nav');
    let coordsElements = document.querySelectorAll('[data-coords]');
    let coords = [];

    coordsElements.forEach(el => {
      let coordsElementsAttr = el.dataset.coords.split(',').map(Number);
      coords.push(coordsElementsAttr);
    })

    var myMap = new ymaps.Map("map", {
      center: [56.83, 60.60],
      controls: ['zoomControl'],
      zoom: 11,
    });

    //Создание меток

    for(let i = 0; i < coords.length; i++){
      myMap.geoObjects.add(new ymaps.Placemark(coords[i]));
    }

    // Перемещение по меткам

    function clickGoTo(coords){
      myMap.panTo(coords, {
        flying: true,
      })

      return false;
    }

    for (let i = 0; i < navElements.length; i++){
      navElements[i].addEventListener('click', (e) => {
        e.preventDefault();
        let coords = e.currentTarget.dataset.coords;
        clickGoTo(coords.split(',').map(Number));
      })
    }

  }

  // Горизонтальный скролл

  var sly = new Sly($('.reviews__body'),{
    horizontal: 1,
    itemNav: 'basic',
    mouseDragging: 1,
    touchDragging: 1,
    startAt: 0,
    speed: 300,
})

sly.init();

})
