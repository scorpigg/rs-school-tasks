/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { StarIncorrect } from '../components/game/cards/current-rating/stars/star-incorrect';
import { StarCorrect } from '../components/game/cards/current-rating/stars/star-correct';
import { MainCard } from '../components/game/cards/card/main-card';
import { Card } from '../components/game/cards/card/card';
import { state } from '../components/game/state';
import { StartGameBtn } from '../components/game/cards/start-btn/start-btn';
import { CurrentRating } from '../components/game/cards/current-rating/current-rating';
import { GameWin } from '../components/game/cards/game-result/game-win';
import { GameLose } from '../components/game/cards/game-result/game-lose';
import { getCategories, loginUser } from '../api';
import { getCards } from '../../server/src/cards/controller';

const FIRST_CARD = 0;
const END_GAME_DELAY = 3000;

const cardsHandle = async (cardPage: number): Promise<void> => {
  const cardsList = document.querySelectorAll('.card-container');
  const cards = await getCards();

  cardsList.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (state.isPlayActive !== true) {
        if ((<HTMLElement>e.target).classList.contains('card__rotate-img')) {
          card.classList.add('flipped');
        } else {
          const audio = document.querySelector('.audio') as HTMLAudioElement;
          audio.setAttribute('src', cards[cardPage][index].audioSrc);
          audio.play();
        }
      }
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('flipped');
    });
  });
};

const changeGameMode = () => {
  const navigationList = document.querySelector('.navigation__list');
  const mainCards = document.querySelectorAll('.main-card');
  const cardsList = document.querySelectorAll('.card');
  const startGameBtn = document.querySelector('.start-game-btn');

  if (state.isPlayActive === true) {
    navigationList?.classList.add('navigation__list_play');
    startGameBtn?.classList.remove('hidden');
  } else {
    navigationList?.classList.remove('navigation__list_play');
    startGameBtn?.classList.add('hidden');
  }

  mainCards.forEach((card) => {
    if (state.isPlayActive === true) {
      card.classList.add('main-card_play');
    } else {
      card.classList.remove('main-card_play');
    }
  });
  cardsList.forEach((card) => {
    if (state.isPlayActive === true) {
      card.querySelector('.card__text')?.classList.add('hidden');
      card.querySelector('.card__rotate-img')?.classList.add('hidden');
    } else {
      card.querySelector('.card__text')?.classList.remove('hidden');
      card.querySelector('.card__rotate-img')?.classList.remove('hidden');
    }
  });
};

const getAudios = async (page: number): Promise<string[]> => {
  const randomSuffleAudios: string[] = [];
  const cards = await getCards();

  cards[page].forEach((card) => {
    randomSuffleAudios.push(card.audioSrc);
  });
  randomSuffleAudios.sort(() => 0.5 - Math.random());
  return randomSuffleAudios;
};

const chooseCard = async (audioSrc: string, audio: HTMLMediaElement): Promise<string> => new Promise((resolve) => {
  if (audioSrc) {
    const cardsList = document.querySelectorAll('.card-container') as NodeListOf<HTMLElement>;
    const audioContent = audioSrc.slice(6, -4);
    const ratingElement = document.querySelector('.current-rating') as HTMLElement;

    cardsList.forEach((card) => {
      const overlay = card.querySelector('.overlay') as HTMLElement;
      const cardContent = card.querySelector('.card__text')?.textContent;
      card.onclick = () => {
        if (!overlay.classList.contains('correct')) {
          if (cardContent === audioContent) {
            overlay.classList.add('correct');
            new StarCorrect(ratingElement);
            audio.src = 'audio/correct.mp3';
            audio.play();
            audio.addEventListener('ended', () => resolve('success'));
          } else {
            new StarIncorrect(ratingElement);
            audio.src = 'audio/error.mp3';
            audio.play();
            audio.addEventListener('ended', () => resolve('error'));
          }
        }
      };
    });
  }
});

export const startGame = async (page: number): Promise<void> => {
  const startGameBtn = document.querySelector('.start-game-btn');
  const audio = document.querySelector('.audio') as HTMLMediaElement;
  const audiosArr: string[] = await getAudios(page);
  const cardsField = document.querySelector('.cards') as HTMLElement;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let audioSrcIndex = 0;
  let isCorrect = true;

  startGameBtn?.addEventListener('click', () => {
    startGameBtn.classList.add('repeat-btn');
    startGameBtn.textContent = 'Repeat';
    state.isGameStarted = true;

    audio.src = audiosArr[audioSrcIndex];
    audio.play();

    audio.addEventListener('ended', async () => {
      await chooseCard(audiosArr[audioSrcIndex], audio).then((result) => {
        if (result === 'success') {
          correctAnswers++;
          audioSrcIndex++;
          isCorrect = true;
        } else {
          isCorrect = false;
          incorrectAnswers++;
        }

        if (correctAnswers === audiosArr.length) {
          if (incorrectAnswers) {
            audio.src = 'audio/failure.mp3';
            new GameLose(cardsField, `Your result is ${incorrectAnswers} errors`);
          } else {
            audio.src = 'audio/success.mp3';
            new GameWin(cardsField, 'You Win!');
          }
          audio.play();
          setTimeout(() => {
            renderMainCards();
          }, END_GAME_DELAY);
        }
      });

      if (audioSrcIndex < audiosArr.length && isCorrect) {
        audio.src = audiosArr[audioSrcIndex];
        audio.play();
      }
    });
  });
};

const renderCards = async (): Promise<void> => {
  const cardsField = document.querySelector('.cards') as HTMLElement;
  const cards = await getCards();

  cardsField.innerHTML = '';
  new CurrentRating(cardsField);
  cards[state.cardsPage].forEach((card) => {
    new Card(cardsField, card.image, card.word, card.translation);
  });
  new StartGameBtn(cardsField);
  const audio = document.createElement('audio') as HTMLAudioElement;
  audio.classList.add('audio');
  cardsField.append(audio);
  cardsHandle(state.cardsPage);

  changeGameMode();
  startGame(state.cardsPage);
};

const chooseMainCard = (): void => {
  const mainCards = document.querySelectorAll('.main-card');
  const navigationLinks = document.querySelectorAll('.navigation__item') as NodeListOf<HTMLElement>;

  mainCards.forEach((card, cardIndex) => {
    card.addEventListener('click', () => {
      state.cardsPage = cardIndex;
      navigationLinks?.forEach((link) => {
        link.classList.remove('navigation__item_active');
        if (cardIndex === Number(link.dataset.page)) {
          link.classList.add('navigation__item_active');
        }
      });
      renderCards();
    });
  });
};

export const login = (): void => {
  const authForm = document.querySelector('.auth-form') as HTMLInputElement;
  const userLogin = document.querySelector('.auth__login') as HTMLInputElement;
  const userPassword = document.querySelector('.auth__password') as HTMLInputElement;
  const overlay = document.querySelector('.modal-overlay') as HTMLElement;
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await loginUser(userLogin.value, userPassword.value)
      .then((res) => {
        localStorage.setItem('jwt', res.accessToken);
        authForm.classList.add('hidden');
        overlay.classList.add('hidden');
      })
      .catch(() => {
        alert('Incorrect username or password');
      });
  });
};

export const renderMainCards = async (): Promise<void> => {
  const cardsField = document.querySelector('.cards') as HTMLElement;

  cardsField.innerHTML = '';
  const categories = await getCategories();
  const cards = await getCards();
  categories.forEach((category: { id: number, name: string }, index) => {
    const cardImg = cards[index][FIRST_CARD].image;
    new MainCard(cardsField, category.name, cardImg);
  });
  chooseMainCard();
  changeGameMode();
};

export const chooseCategory = (): void => {
  const navigationList = document.querySelector('.navigation__list');
  const navigationLinks = navigationList?.querySelectorAll('.navigation__item');

  navigationList?.addEventListener('click', (e) => {
    const target = (<HTMLElement>e.target);
    state.cardsPage = Number(target.dataset.page);
    if (target.classList.contains('navigation__item')) {
      navigationLinks?.forEach((link) => link.classList.remove('navigation__item_active'));
      target.classList.add('navigation__item_active');
      if (target.dataset.page === 'main') {
        renderMainCards();
      } else {
        renderCards();
      }
    }
  });
};

export const viewNavigation = (): void => {
  const navigationList = document.querySelector('.navigation__list');
  const hamburger = document.querySelector('.hamburger');

  window.addEventListener('click', (e) => {
    if (!(<HTMLElement>e.target).classList.contains('navigation__list')
    && !(<HTMLElement>e.target).classList.contains('hamburger__checkbox')) {
      navigationList?.classList.remove('show-navigation');
      hamburger?.classList.remove('hamburger_rotate');
    }
    if ((<HTMLElement>e.target).classList.contains('hamburger__checkbox')) {
      navigationList?.classList.toggle('show-navigation');
      hamburger?.classList.toggle('hamburger_rotate');
    }
  });
};

export const switchGameMode = (): void => {
  const switchBtn = document.querySelector('.switch__input') as HTMLInputElement;

  switchBtn?.addEventListener('click', () => {
    if (switchBtn.checked) {
      state.isPlayActive = true;
      changeGameMode();
    } else {
      state.isPlayActive = false;
      changeGameMode();
      if (state.isGameStarted) {
        renderCards();
        state.isGameStarted = false;
      }
    }
  });
};
