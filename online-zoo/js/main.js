window.addEventListener('load', () => {
    const donationAmount = document.querySelectorAll('.donation-amount');
    const layout = document.querySelector('.layout');
    const popUpClose = document.querySelector('.pop-up__close');
    const popUp = document.querySelectorAll('.pop-up');
    
    donationAmount.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.length > 4) {
                input.value = input.value.slice(0, -1);
                input.value = 9999;
            }
        })
    });
    
    function modalClose() {
        layout.style.display = 'none';
        popUp.forEach(el => el.style.display = 'none');
    }

    layout.addEventListener('click', modalClose);
    popUpClose.addEventListener('click', modalClose);
})