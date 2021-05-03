window.addEventListener('load', () => {

    // zoos side-bar

    const sideBar = document.querySelector('.side-bar');
    const sideBarExpand = sideBar.querySelector('.side-bar__open a');
    const sideBarWrapper = sideBar.querySelector('.side-bar_wrapper');
    const sideBarAnimals = sideBar.querySelector('.side-bar__animals');
    const sideBarMore = sideBar.querySelector('.side-bar__more');
    const animalHeight = sideBar.querySelector('.side-bar__animal').offsetHeight;
    const sideBarHeight = sideBarWrapper.offsetHeight;
    let scrollIndex = 0;

    maxNumLength(document.querySelector('.quick-donation .donation-amount'), 4);
    
    sideBarExpand.addEventListener('click', () => {
        sideBar.classList.toggle('side-bar_expand');
    })

    sideBarMore.addEventListener('click', () => {
        scrollIndex++;
        sideBarWrapper.scrollTo(0, (animalHeight + 1) * scrollIndex);
        if (sideBarHeight + sideBarWrapper.scrollTop + 1 >= sideBarAnimals.offsetHeight) {
            sideBarWrapper.scrollTo(0, -sideBarAnimals.offsetHeight);
            scrollIndex = 0;
        }
    })

    // zoos slider

    const zoosSlider = document.querySelector('.slider__slides-container');
    const zoosSliderVideos = document.querySelector('.slider__slides');
    const nextZoosBtn = document.querySelector('.zoos__next');
    const prevZoosBtn = document.querySelector('.zoos__prev');
    const zoosVideoWidth = zoosSliderVideos.querySelector('.slider__slide').offsetWidth;
    const zoosSliderWidth = zoosSlider.offsetWidth;
    const zoosGap = +window.getComputedStyle(zoosSliderVideos).gridRowGap.replace('px', '')
    let slideIndex = 0;

    nextZoosBtn.addEventListener('click', () => {
        slideIndex++;
        zoosSlider.scrollTo((zoosVideoWidth + zoosGap) * slideIndex, 0);
        if (zoosSliderWidth + zoosSlider.scrollLeft + zoosGap >= zoosSliderVideos.scrollWidth) {
            zoosSlider.scrollBy(-zoosSliderVideos.scrollWidth, 0);
            slideIndex = 0;
        }
    })

    prevZoosBtn.addEventListener('click', () => {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = 0;
        }
        zoosSlider.scrollTo((zoosVideoWidth + zoosGap) * slideIndex, 0);
    })


    const zoosMainVideoContainer = document.querySelector('.main-video__container');
    const zoosVideosList = document.querySelectorAll('.live-cam__slider .slider__slide');

    zoosVideosList.forEach(el => {
        el.addEventListener('click', function() {
            const mainVideo = zoosMainVideoContainer.querySelector('.slider__video');
            const sliderVideo = this.querySelector('.slider__video').cloneNode();
            zoosVideosList.forEach(slide => {
                slide.classList.remove('slide-chosen');
            });
            this.classList.add('slide-chosen');
            mainVideo.remove();
            zoosMainVideoContainer.appendChild(sliderVideo);
        })
    });

    function maxNumLength(inputField, length) {
        inputField.addEventListener('input', () => {
            if (inputField.value.length > length) {
                inputField.value = inputField.value.slice(0, -1);
            }
        })
    } 

})