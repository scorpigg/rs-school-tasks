window.addEventListener('load', () => {
    const piano = document.querySelector('.piano');
    const pianoКeys = piano.querySelectorAll('.piano-key');
    const btnContainer = document.querySelector('.btn-container');
    const btns = btnContainer.querySelectorAll('.btn');
    const fullscreenBtn = document.querySelector('.fullscreen');
    let isDown = false;

    piano.addEventListener('mousedown', (e) => {
        isDown = true;
        if(e.target.classList.contains('piano-key')) {
            playAudio(`assets/audio/${e.target.dataset.note}.mp3`);
            removeActivePianoKeys();
            e.target.classList.add('piano-key-active');
        }
    });

    piano.addEventListener('mouseover', (e) => {
        if (isDown) {
            playAudio(`assets/audio/${e.target.dataset.note}.mp3`);
            removeActivePianoKeys();
            e.target.classList.add('piano-key-active');
        }
    });

    piano.addEventListener('mouseout', (e) => {
        e.target.classList.remove('piano-key-active');
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        removeActivePianoKeys();
    });

    btnContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('btn')) {
            btns.forEach((el) => {
                if(el.classList.contains('btn-active')) {
                    el.classList.remove('btn-active');
                }
            });
            e.target.classList.add('btn-active');

            if(e.target.classList.contains('btn-letters')) {
                pianoКeys.forEach((key) => {
                    key.classList.add('letter');
                });
            }else {
                pianoКeys.forEach((key) => {
                    key.classList.remove('letter');
                });
            }
        }
    });
    
    fullscreenBtn.addEventListener('click', () => {
        let elem = document.documentElement;
        if (!document.fullscreenElement) {
            elem.requestFullscreen();
        }else if (document.exitFullscreen){
            document.exitFullscreen();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        let keyCode = e.code.substr(-1);
        pianoКeys.forEach(key => {
            if (keyCode === key.dataset.letter) {
                key.classList.add('piano-key-active');
                playAudio(`assets/audio/${key.dataset.note}.mp3`);
            }
        });
    });

    window.addEventListener('keyup', () => {
        removeActivePianoKeys();
    });

    function playAudio(src) {
        const audio = new Audio();
        audio.src = src;
        audio.currentTime = 0;
        audio.play();
    }

    function removeActivePianoKeys() {
        pianoКeys.forEach((el) => {
            if(el.classList.contains('piano-key-active')) {
              el.classList.remove('piano-key-active');
            }
        });
    }
})