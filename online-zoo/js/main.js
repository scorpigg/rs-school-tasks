window.addEventListener('load', () => {
    // const ourPetsCards = document.querySelectorAll('.pet');

    // ourPetsCards.forEach(el => { 
    //     el.addEventListener('click', (e) => {
    //         const pet = el.dataset.pet;
    //         if (pet) {
    //             document.location.href = `/zoos/${pet}.html`;
    //         }
    //     })
    // });

    const donationAmount = document.querySelector('.quick-donation__value');
    donationAmount.addEventListener('input', () => {
        if (donationAmount.value.length > 4) {
            donationAmount.value = donationAmount.value.slice(0, -1);
            donationAmount.value = 9999;
        }
    })
    

})