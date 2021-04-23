window.addEventListener('load', () => {
    const inputs = document.querySelectorAll('.filters input');
    const btnReset = document.querySelector('.btn-reset');
    const btnNext = document.querySelector('.btn-next');
    const img = document.querySelector('.editor img');
    const btnLoad = document.querySelector('.btn-load--input'); 
    const btnSave = document.querySelector('.btn-save');
    const canvas = document.querySelector('canvas');
    const fullscreenBtn = document.querySelector('.fullscreen');
    let i = 0;

    const baseEffects = getEffects();

    function openFullScreen() {
        let elem = document.documentElement;
        if (!document.fullscreenElement) {
            elem.requestFullscreen();
        }else if (document.exitFullscreen){
            document.exitFullscreen();
        }
    }

    function saveImg() {
        const image = new Image();  
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = img.src;
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");
            let str = '';
            inputs.forEach(input => {
                if (input.name === 'blur') {
                    const blurValue = canvas.height / img.height * input.value;
                    str += `${input.name}(${blurValue}${input.dataset.sizing}) `; 
                } else {
                    str += `${input.name}(${input.value}${input.dataset.sizing}) `;
                }
            });
            ctx.filter = str;
            ctx.drawImage(image, 0, 0);
            
            let link = document.createElement('a');
            link.download = 'download.png';
            link.href = canvas.toDataURL("image/jpeg");
            link.click();
            link.delete;
        };
    }

    function fileLoad() {
        const file = btnLoad.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
        btnLoad.value = null;
    }
    
    function getEffects() {
        const effects = {};
        inputs.forEach(input => {
            effects[input.name] = `${input.value}`;
        });
        return effects;
    }

    function handleUpdate() {
        const suffix = this.dataset.sizing || '';
        const output = this.nextElementSibling;
        output.value = this.value;
        document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    function reset() {
        inputs.forEach(input => {
            for (const effect in baseEffects) {
                if (input.name === effect) {
                    input.value = baseEffects[effect];
                    input.nextElementSibling.value = baseEffects[effect];
                    document.documentElement.style.setProperty(`--${input.name}`, `${baseEffects[effect]}${input.dataset.sizing}`);
                }
            }
        });
    }

    function getHour() {
        let time = '';
        const currenHour = new Date().getHours();
        if (currenHour >= 6 && currenHour < 12) {
            time = 'morning';
        } else if (currenHour >= 12 && currenHour < 18) {
            time = 'day';
        } else if (currenHour >= 18 && currenHour < 24) {
            time = 'evening';
        } else if (currenHour >= 0 && currenHour < 6) {
            time = 'night';
        }
        return time;
    }

    function getImage() {
        const time = getHour();
        const base = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/`;
        const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
        const index = i % images.length;
        img.setAttribute('src', `${base}${images[index]}`);
        i++;
    }

    btnLoad.addEventListener('change', fileLoad);
    btnNext.addEventListener('click', getImage);
    btnReset.addEventListener('click', reset);
    btnSave.addEventListener('click', saveImg);
    fullscreenBtn.addEventListener('click', openFullScreen);

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
})