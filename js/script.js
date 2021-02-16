
let wrapper = document.querySelector('.wrapper');

const slider = new Swiper('.page__slider', {
   speed: 1000,
   effect: 'coverflow',
   grabCursor: true,
   centeredSlides: true,
   slidesPerView: 'auto',
   coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadow: true
   },
   keyboard: {
      enabled: true,
   },
});

const sliderPage = new Swiper('.page__sl', {
   direction: 'vertical',
   speed: 1000,
   mousewheel: true,
   simulateTouch: false,
   //cssMode: true,
   slidesPerView: 'auto',
   observer: true,
   observeParents: true,
   observeSlideChildren: true,
   pagination: {
      el: '.sl-page__pagination',
      clickable: true,
   },
   keyboard: {
      enabled: true,
   },
   init: false,
   on: {
      init: function () {
         navSlider();
         setScrollType();
         wrapper.classList.add('loaded');
      },
      slideChange: function () {
         navSliderRemove();
         navLinks[sliderPage.realIndex].classList.add('active');
      },
      resize: function () {
         setScrollType();
      }
   }
});

const sliderTwoPage = new Swiper('.sl-content__body', {
   speed: 1000,
   keyboard: {
      enabled: true,
   },
   pagination: {
      el: '.sl-content__pagination',
      type: 'fraction',
   },
   navigation: {
      nextEl: '.sl-content__next',
      prevEl: '.sl-content__prev',
   },
});


/* input and result */


const input = document.querySelector('.info-page__number');
const btn = document.querySelector('.info-page__btn');
const infoResult = document.querySelector('.info-page__result');



const pageHeader = document.querySelector('.page__header');
const pageSlider = document.querySelector('.slider');
const infoBody = document.querySelector('.info-page');
const reesultInfo = document.querySelector('.result-info');
const infoPageChoise = document.querySelector('.info-page__choise');
const resultBtn = document.querySelector('.result-info__btn');
const slideTitle = document.querySelectorAll('.slide__title');
const slideImg = document.querySelectorAll('.slide__images');

const infoTextDerapture = document.querySelector('.result-info__text_derapture');
const resultTotal = document.querySelector('.result-info__text_total');
const resultTextDestination = document.querySelector('.result-info__text_destination');
const resultDestination = document.querySelector('.result-info__distance_total');

let resultImage = document.querySelector('.result-info__images');
let resultTitle = document.querySelector('.result-info__title');

const slide = document.querySelectorAll('.slide');

/* page navigation */

let navLinks = document.querySelectorAll('.nav-page__link');

/* two page */

const slideBtn = document.querySelectorAll('.item-sl-content__btn');
const contentSlider = document.querySelector('.sl-content__body');
const contentResult = document.querySelector('.result-content');
const resultClose = document.querySelector('.result-content__close');

const itemImg = document.querySelectorAll('.item-sl-content__img>img');
const itemText = document.querySelectorAll('.item-sl-content__text>p');
const itemTitle = document.querySelectorAll('.item-sl-content__title');
const itemDist = document.querySelectorAll('.item-sl-content__dist');

let resultContentTitle = document.querySelector('.result-content__title');
let resultContentImg = document.querySelector('.result-content__img>img');
let resultContentDescription = document.querySelector('.result-content__description');
let resultContentDistance = document.querySelector('.result-content__distance');

const pageContainer = document.querySelector('.sl-content-container');
const slContent = document.querySelector('.sl-content');

/* navigation */

function navSlider() {
   if (navLinks.length > 0) {
      navLinks[sliderPage.realIndex].classList.add('active');
      for (let i = 0; i < navLinks.length; i++) {
         const navLink = navLinks[i];
         navLink.addEventListener('click', function (e) {
            navSliderRemove();
            sliderPage.slideTo(i, 1000);
            navLink.classList.add('active');
            e.preventDefault();
         });
      }
   }
}
function navSliderRemove() {
   let navLinkActive = document.querySelector('.nav-page__link.active');
   if (navLinkActive) {
      navLinkActive.classList.remove('active');
   }
}

function setScrollType() {
   if (wrapper.classList.contains('free')) {
      wrapper.classList.remove('free');
      sliderPage.params.freeMode = false;
   }
   for (let i = 0; i < sliderPage.slides.length; i++) {
      const pageSlide = sliderPage.slides[i];

      const pageSlideContent = pageSlide.querySelector('.sl-page__content');


      if (pageSlideContent) {
         const pageSlideContentHeight = pageSlideContent.offsetHeight;
         if (pageSlideContentHeight > window.innerHeight) {
            wrapper.classList.add('free');
            sliderPage.params.freeMode = true;
            break;
         }
      }
   }
}


sliderPage.init();

/* show/hide result input */

function showResult() {
   pageHeader.classList.add('hide');
   pageSlider.classList.add('hide-slider');
   infoBody.classList.add('show');
   reesultInfo.classList.add('show-result');
   infoPageChoise.classList.add('hide-choise');
}

function hideResult() {
   pageHeader.classList.remove('hide');
   pageSlider.classList.remove('hide-slider');
   infoBody.classList.remove('show');
   reesultInfo.classList.remove('show-result');
   infoPageChoise.classList.remove('hide-choise');
}

/* two page item open/close */

function closeDescription() {
   contentSlider.classList.remove('hide');
   contentResult.classList.remove('show');
}

window.addEventListener('click', function (e) {
   if (e.target == pageContainer) {
      closeDescription();
   } else if (e.target == slContent) {
      closeDescription();
   }
});

for (let i = 0; i < slideBtn.length; i++) {
   slideBtn[i].addEventListener('click', function () {
      contentSlider.classList.add('hide');
      contentResult.classList.add('show');

      let itemTitleContent = itemTitle[i].innerHTML;
      let itemImgSrc = itemImg[i].getAttribute('src');
      let itemTextContent = itemText[i].innerHTML;
      let itemDistcontent = itemDist[i].innerHTML;

      resultContentTitle.innerHTML = itemTitleContent;
      resultContentImg.setAttribute('src', itemImgSrc);
      resultContentDescription.innerHTML = itemTextContent;
      resultContentDistance.innerHTML = itemDistcontent;
   });
}

resultContentDescription.addEventListener('mouseover', function () {
   sliderPage.mousewheel.disable();
});
resultContentDescription.addEventListener('mouseleave', function () {
   sliderPage.mousewheel.enable();
});


resultClose.addEventListener('click', closeDescription);

/* coma (100,000) */

function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* random min max number */

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

/* add 0 before number */

function formatNumber(number) {
   if (number < 10) {
      number = `0${number}`;
   } else {
      number = number;
   }
   return number
}

/* input button */

btn.addEventListener('click', function () {
   let value = '';
   let hour = 1079252848;
   let day = hour * 24;
   let year = day * 365;
   resultDestination.innerHTML = input.value;
   value = input.value * year;
   for (let i = 0; i < slide.length; i++) {
      if (slide[i].classList.contains('swiper-slide-active')) {
         if (value != '') {
            input.classList.remove('empty');
            showResult();
            value = Math.floor(value / (slide[i].getAttribute('speed') * 24 * 365));
            let resImg = slideImg[i].getAttribute('src');
            resultImage.setAttribute('src', resImg);
            resultTitle.innerHTML = slideTitle[i].innerHTML;
         } else {
            input.classList.add('empty')
         }
      }
   }

   let today = new Date();
   let dd = String(today.getDate());
   let mm = String(today.getMonth() + 1);
   let yy = today.getFullYear();

   today = `${formatNumber(dd)}.${formatNumber(mm)}.${yy}`;

   let randomDd = getRandomInt(1, 30);
   let randomMm = getRandomInt(1, 12);
   infoTextDerapture.innerHTML = today;
   resultTextDestination.innerHTML = `${formatNumber(randomDd)}.${formatNumber(randomMm)}.${yy + value}`;

   let lastNumber = value.toString().slice(-1);
   let lastTwoNumber = value.toString().slice(-2);

   if (lastTwoNumber < 20 && lastTwoNumber > 10) {
      resultTotal.innerHTML = `${numberWithCommas(value)} лет`;
   } else if (lastNumber < 5 && lastNumber > 1) {
      resultTotal.innerHTML = `${numberWithCommas(value)} года`;
   } else if (lastNumber == 1) {
      resultTotal.innerHTML = `${numberWithCommas(value)} год`;
   } else {
      resultTotal.innerHTML = `${numberWithCommas(value)} лет`;
   }
});

resultBtn.addEventListener('click', hideResult);

/* page navigation */

// for (let i = 0; i < swiperBullets.length; i++) {
//    pageSl.addEventListener('wheel', function () {
//       if (swiperBullets[i].classList.contains('swiper-pagination-bullet-active')) {
//          slPageNav[i].classList.add('active');
//       } else {
//          slPageNav[i].classList.remove('active');
//       }
//    });
// }

// for (let i = 0; i < swiperBullets.length; i++) {
//    swiperBullets[i].addEventListener('click', function () {
//       slPageNav.forEach(element => {
//          element.classList.remove('active');
//       });
//       slPageNav[i].classList.add('active');
//    });
// }




























