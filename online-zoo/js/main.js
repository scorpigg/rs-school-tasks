window.addEventListener('load', () => {
    const donationAmount = document.querySelectorAll('.donation-amount');
    
    donationAmount.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.length > 4) {
                input.value = input.value.slice(0, -1);
                input.value = 9999;
            }
        })
    });
    
    

})