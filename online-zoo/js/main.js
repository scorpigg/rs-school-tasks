window.addEventListener('load', () => {

    // donationForm

    let k = 0;
    const overlay = document.querySelector('.overlay');
    const modalTogether = document.querySelector('.together');  
    const modalDonation = document.querySelector('.make-donation');
    const radioInputs = modalDonation.querySelectorAll('.make-donation__radio');
    const donationStepsForm = modalDonation.querySelectorAll('.make-donation__wrapper');
    const donationBtn = document.querySelector('.quick-donation__btn .btn');
    const togetherBtn = document.querySelectorAll('[data-modal=together]');
    let nextStepBtn = donationStepsForm[k].querySelector('.make-donation__next-btn');
    const sendDonationBtn = modalDonation.querySelector('.make-donation__submit-btn');
    let donationAmount = document.querySelector('#make-donation__other-amount');
    let donationName = document.querySelector('#make-donation__name');
    let donationEmail = document.querySelector('#make-donation__email');
    let donationCardNumber = modalDonation.querySelector('#make-donation__card-number');
    let donationCvvNumber = modalDonation.querySelector('#make-donation__cvv-number');
    let donationMonth = modalDonation.querySelector('.make-donation__month');
    let donationYear = modalDonation.querySelector('.make-donation__year');

    maxNumLength(document.querySelector('.quick-donation .donation-amount'), 4);
    maxNumLength(donationAmount, 4);
    maxNumLength(donationCardNumber, 16);
    maxNumLength(donationCvvNumber, 3);

    togetherBtn.forEach(btn => {
        btn.addEventListener('click', function() {
            modalShow(modalTogether);
        })
    });

    radioInputs.forEach(input => {
        input.addEventListener('click', () => {
            nextStepBtn.classList.remove('invalid');
        })
    });

    donationAmount.addEventListener('input', () => {
        radioInputs.forEach(input => input.checked = false);
        validateFirstStep();
    })

    donationName.addEventListener('input', () => {
        validateSecondStep();
    })

    donationEmail.addEventListener('input', () => {
        validateSecondStep();
    })

    donationCardNumber.addEventListener('input', () => {
        validateThirdStep();
    })

    donationCvvNumber.addEventListener('input', () => {
        validateThirdStep();
    })

    donationMonth.addEventListener('change', () => {
        validateThirdStep();
    })

    donationYear.addEventListener('change', () => {
        validateThirdStep();
    })

    donationBtn.addEventListener('click', function() {
        const value = this.parentNode.querySelector('input[type=number]').value;
        const donationValues = document.querySelector('.make-donation__amount-list');
        const firstValue = donationValues.firstElementChild.querySelector('input');
        const donationForm = modalDonation.querySelector('form');
        k = 0;
        nextStepBtn = donationStepsForm[k].querySelector('.make-donation__next-btn');

        nextStepBtn.classList.remove('invalid');
        donationForm.reset();
        donationStepsForm.forEach((el, i) => i === k ? modalShow(el) : modalHide(el));
        modalShow(modalDonation);
        radioInputs.forEach(input => input.checked = false);

        if (value === '') {
            donationAmount.value = donationValues.firstElementChild.querySelector('input').value;
            firstValue.checked = true;
        }else {
            firstValue.checked = false;
            donationAmount.value = value;
        }
        if (donationForm.checkValidity()) {
            makeDonationBtn.classList.add('make-donation__submit-btn_active');
        }
    })

    modalDonation.addEventListener('click', function(e) {
        nextStepBtn = donationStepsForm[k].querySelector('.make-donation__next-btn');
        if (e.target.classList.contains('make-donation__radio')) {
            donationAmount.value = e.target.value;
        }
        else if (e.target.classList.contains('make-donation__next-btn')) {
            if (nextStepBtn.classList.contains('invalid')) return;
            nextStep(donationStepsForm);
        }else if (e.target.classList.contains('make-donation__back-btn')) {
            prevStep(donationStepsForm);
        }

    })

    modalTogether.addEventListener('click', (e) => {
        if (e.target.classList.contains('together__amount')) {
            const donationValue = e.target.innerText.replace('$', '');
            modalHide(modalTogether);
            modalShow(modalDonation);
            
            radioInputs.forEach(input => {
                if (input.value === donationValue) {
                    input.checked = true;
                    nextStepBtn.classList.remove('invalid');
                }else {
                    input.checked = false;
                    nextStepBtn.classList.add('invalid');
                }
            });
            donationAmount.value = donationValue;
            donationAmount.focus();
            
        }
    })   

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay') || e.target.classList.contains('pop-up__close')) {
            modalHide(modalTogether);
            modalHide(modalDonation);
        }
    })
    
    sendDonationBtn.addEventListener('click', () => {
        if (sendDonationBtn.classList.contains('invalid')) return;
        modalHide(modalDonation);
    })

    function modalShow(modal, isOverlay = true) {
        if (isOverlay) {
            document.body.classList.add('notScrollable');
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
            
        }else {
            modal.classList.remove('hidden');
        }
    }
    
    function modalHide(modal, isOverlay = true) {
        if (isOverlay) {
            document.body.classList.remove('notScrollable');
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
        }else {
            modal.classList.add('hidden');
        }
    }

    function maxNumLength(inputField, length) {
        inputField.addEventListener('input', () => {
            if (inputField.value.length > length) {
                inputField.value = inputField.value.slice(0, -1);
            }
        })
    }

    function nextStep(stepsList) {
        modalHide(stepsList[k], false);
        k++;
        modalShow(stepsList[k], false); 
    }

    function prevStep(stepsList) {
        modalHide(stepsList[k], false);
        k--;
        modalShow(stepsList[k], false);  
    }

    function validateFirstStep() {
        if (donationAmount.validity.valid) {
            nextStepBtn.classList.remove('invalid');
        } else {
            nextStepBtn.classList.add('invalid');
        }
    }

    function validateThirdStep() {
        nextStepBtn = donationStepsForm[k].querySelector('.make-donation__next-btn');
        if (
            donationCardNumber.validity.valid &&
            donationCvvNumber.validity.valid &&
            donationMonth.validity.valid &&
            donationYear.validity.valid
        ) {
            sendDonationBtn.classList.remove('invalid');
            
        } else {
            sendDonationBtn.classList.add('invalid');
        }
    }

    function validateSecondStep() {
        nextStepBtn = donationStepsForm[k].querySelector('.make-donation__next-btn');
        if (
            donationName.validity.valid &&
            donationEmail.validity.valid
        ) {
            nextStepBtn.classList.remove('invalid');
            
        } else {
            nextStepBtn.classList.add('invalid');
        }
    }

    //petSlider
    
    
    
    const petSlider = document.querySelector('.our-pets__container');
    const petSliderCards = document.querySelector('.our-pets__cards');
    const nextPetBtn = document.querySelector('.our-pets__next');
    const prevPetBtn = document.querySelector('.our-pets__prev');
    const petCardWidth = petSliderCards.querySelector('.our-pets__card').offsetWidth;
    const petSliderWidth = petSlider.offsetWidth;
    let petGap = +window.getComputedStyle(petSliderCards).gridRowGap.replace('px', '');
    
    let slideIndex = 0;

    nextPetBtn.addEventListener('click', () => {
        slideIndex++;
        petSlider.scrollTo((petCardWidth + petGap) * slideIndex, 0);
        if (petSliderWidth + petSlider.scrollLeft + petCardWidth/2 + petGap >= petSliderCards.scrollWidth) {
            petSlider.scrollBy(-petSliderCards.scrollWidth, 0);
            slideIndex = 0;
        }
    })

    prevPetBtn.addEventListener('click', () => {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = 0;
        }
        petSlider.scrollTo((petCardWidth + petGap) * slideIndex, 0);
    })

    //feedbackSlider

    const feedbackSlider = document.querySelector('.feedbacks__slider-wrapper');
    const feedbackSliderList = document.querySelector('.feedbacks__list');
    const feedbackCardWidth = feedbackSliderList.querySelector('.feedback__card').offsetWidth;
    const nextFeedbackBtn = document.querySelector('.feedbacks__next');
    const prevFeedbackBtn = document.querySelector('.feedbacks__prev');
    const feedbackSliderWidth = feedbackSlider.offsetWidth;
    const feedbackGap = 30;

    nextFeedbackBtn.addEventListener('click', () => {
        delayAutoSlide();
        slideIndex++;
        feedbackSlider.scrollTo((feedbackCardWidth + feedbackGap) * slideIndex, 0);
        if (feedbackSliderWidth + feedbackSlider.scrollLeft >= feedbackSliderList.scrollWidth) {
            feedbackSlider.scrollBy(-feedbackSliderList.scrollWidth, 0);
            slideIndex = 0;
        }
    })

    prevFeedbackBtn.addEventListener('click', () => {
        delayAutoSlide();
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = 0;
        }
        feedbackSlider.scrollTo((feedbackCardWidth + feedbackGap) * slideIndex, 0);
    })


    const moveSlides = () => {
        slideIndex++;
        feedbackSlider.scrollTo((feedbackCardWidth + feedbackGap) * slideIndex, 0);
        if (feedbackSliderWidth + feedbackSlider.scrollLeft >= feedbackSliderList.scrollWidth) {
            feedbackSlider.scrollBy(-feedbackSliderList.scrollWidth, 0);
            slideIndex = 0;
        }
    }

    let autoSlideInterval = setInterval(moveSlides, 15000);
    let autoSlideTimeout = null;

    const delayAutoSlide = () => {
        clearTimeout(autoSlideTimeout);
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;

        autoSlideTimeout = setTimeout(() => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(moveSlides, 15000);
        }, 45000);
    }

    feedbackSlider.addEventListener('click', delayAutoSlide)

})