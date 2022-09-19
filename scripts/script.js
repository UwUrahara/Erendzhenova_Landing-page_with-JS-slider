// Создание "библиотеки" изображений ============================================
let images = [{
    url: "images/Rostov-on-Don_Admiral.png",
    name: "Rostov-on-Don, Admiral"
  }, {
    url: "images/Sochi_Thieves.png",
    name: "Sochi Thieves"
  }, {
    url: "images/Rostov-on-Don_Patriotic.png",
    name: "Rostov-on-Don Patriotic"
}];

//  *ФУНКЦИЯ инициализации слайдера =============================================
function initSlider(options) {
  if (!images || !images.length) return; // Проверка на наличие изображений
  
  options = options || {
    dots: true,
    autoplay: false
  }; // Присвоение значений опциям в случае их отсутствия
  
  // ОБЪЯВЛЕНИЕ УЗЛОВ
  let sliderImages = document.querySelector(".city-image");
  let sliderArrows = document.querySelector(".dot-controls");
  let sliderDots = document.querySelector(".compl-proj_dots");
  let sliderNames = document.querySelector(".cities_names");
  let sliderInfo = document.querySelector(".compl-proj_town_info");

  let sliderImagesMobile = document.querySelectorAll(".city-images_mobile_item");
  let sliderArrowsMobile = document.querySelectorAll(".controls-pics");
  
  // Инициализация блока с изображениями и стрелками
  initImages();
  initArrows();
  initNames();
  initDots();

  initArrowsMobile()
  
  // Инициализация опциональных фич
  if (options.autoplay) initAutoplay();
  
  
  // Изображения ----------------------------------------------------------------
  // ** ФУНКЦИЯ инициализации ИЗОБРАЖЕНИЙ
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
      let imageDivMobile = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImagesMobile[0].innerHTML += imageDivMobile;
    });
  }
    
  // *** ФУНКЦИЯ СМЕНЫ изображений
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");

    sliderImagesMobile[0].querySelector(".active").classList.remove("active");
    sliderImagesMobile[0].querySelector(".n" + num).classList.add("active");

    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + num).classList.add("active");

    sliderNames.querySelector(".active").classList.remove("active");
    sliderNames.querySelector(".n" + num).classList.add("active");

    sliderInfo.querySelector(".active").classList.remove("active");
    sliderInfo.querySelector(".n" + num).classList.add("active");
  }
  
  
  // Стрелки, точки -------------------------------------------------------------
  // ** ФУНКЦИЯ инициализации СТРЕЛОК
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }

  // ** ФУНКЦИЯ инициализации СТРЕЛОК мобильных
  function initArrowsMobile() {
    sliderArrowsMobile[0].querySelectorAll(".control-pics").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImagesMobile[0].querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  // ** ФУНКЦИЯ инициализации ТОЧЕК
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="dot n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".dot").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }

  // Названия -------------------------------------------------------------------
  // ** ФУНКЦИЯ инициализации НАЗВАНИЙ городов
  function initNames() {
    images.forEach((image, index) => {
      let name = `<li class="slider_name n${index} ${index === 0? "active" : ""} subtitle subtitle_14" data-index="${index}">${images[index].name}</li>`;
      sliderNames.innerHTML += name;
    });
    sliderNames.querySelectorAll(".slider_name").forEach(name => {
      name.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }

  
  // Автопроигрывание -----------------------------------------------------------
  // ** ФУНКЦИЯ инициализации АВТОПРОИГРЫВАНИЯ
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

// Задание необходимых "опций" ==================================================
let sliderOptions = {
  dots: true,
  autoplay: true,
  autoplayInterval: 10000
};

// Подключение действия на документ =============================================
document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});