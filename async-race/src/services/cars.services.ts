/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  createCar, deleteCar, startEngine, getCar, getCars, remakeCar, drive, stopEngine,
} from '../api';
import { FieldCar } from '../components/garage/cars-field/field-car/field-car';
import { Render } from '../components/Render';
import { IAnimate } from '../entities/cars-additional';
import store from './store.services';

function getPositionAtCenter(element: HTMLElement) {
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

const getCarProps = async (id: number) => {
  const carName = document.querySelector('.car-update__name') as HTMLInputElement;
  const carColor = document.querySelector('.car-update__color') as HTMLInputElement;
  const updateBtn = document.querySelector('.car-update__btn') as HTMLInputElement;

  carName.classList.remove('disabled');
  carColor.classList.remove('disabled');
  updateBtn.classList.remove('disabled');

  updateBtn.dataset.id = id.toString();
  const car = await getCar(id);
  carName.value = car.name;
  carColor.value = car.color;
};

const animate = ({ duration, draw, timing }: IAnimate) => {
  const start = performance.now();

  requestAnimationFrame(function anim(time: number) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      store.animationRequest = requestAnimationFrame(anim);
    }
  });
};

const carAnimation = (car: HTMLElement, duration: number, distance: number) => {
  animate({
    duration,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      car.style.transform = `translateX(${Math.min(progress * distance)}px)`;
    },
  });
};

const startCarRace = (field: HTMLElement, e: MouseEvent) => {
  const car = field.querySelector('.car-img') as HTMLElement;
  const finish = field.querySelector('.finish-img') as HTMLElement;
  const distance = Math.ceil(getDistanceBetweenElements(car, finish)) + 50;
  startEngine(Number(field.dataset.id)).then(async (result) => {
    if (result) {
      (<HTMLElement>e.target).classList.add('disabled');
      field.querySelector('.stop-btn')?.classList.remove('disabled');
      const duration: number = Math.round(result.distance / result.velocity);
      carAnimation(car, duration, distance);
      const driveStatus = await drive(Number(field.dataset.id));
      if ((driveStatus) === 500) {
        cancelAnimationFrame(store.animationRequest);
      }
    }
  });
};

const stopCarRace = (field: HTMLElement, e: MouseEvent): void => {
  const car = field.querySelector('.car-img') as HTMLElement;
  stopEngine(Number(field.dataset.id)).then((result) => {
    if (result) {
      (<HTMLElement>e.target).classList.add('disabled');
      field.querySelector('.start-btn')?.classList.remove('disabled');
      cancelAnimationFrame(store.animationRequest);
      car.style.transform = `translateX(${result.velocity}px)`;
    }
  });
};

export const race = async (e: MouseEvent, startRaceBtn: boolean) => {
  const fieldCar = document.querySelectorAll('.field__car') as NodeListOf<HTMLElement>;
  fieldCar.forEach((field) => {
    if (startRaceBtn) {
      startCarRace(field, e);
      field.querySelector('.start-btn')?.classList.add('disabled');
    } else {
      stopCarRace(field, e);
      field.querySelector('.stop-btn')?.classList.add('disabled');
    }
  });
};

export const renderCars = async () => {
  const carsField = document.querySelector('.cars-field') as HTMLElement;
  const { cars, count } = await getCars(store.carsPage);
  carsField.innerHTML = '';
  new Render(carsField, 'h2', ['field__title'], `Garage(${count})`);
  new Render(carsField, 'p', ['field__page'], `Page #${store.carsPage}`);
  cars.forEach((car: { name: string; color: string; id: number; }) => {
    const fieldCar = new FieldCar(carsField, `${car.name}`, `${car.color}`);
    fieldCar.element.setAttribute('data-id', `${car.id}`);
  });
  const fieldCar = document.querySelectorAll('.field__car') as NodeListOf<HTMLElement>;
  fieldCar.forEach((field) => {
    field.addEventListener('click', (e) => {
      if ((<HTMLElement>e.target).classList.contains('remove-btn')) {
        deleteCar(Number(field.dataset.id)).then(renderCars);
      }
      if ((<HTMLElement>e.target).classList.contains('select-btn')) {
        getCarProps(Number(field.dataset.id));
      }
      if ((<HTMLElement>e.target).classList.contains('start-btn')) {
        startCarRace(field, e);
      }
      if ((<HTMLElement>e.target).classList.contains('stop-btn')) {
        stopCarRace(field, e);
      }
    });
  });
};

export const nextCarsPage = async () => {
  const { count } = await getCars(store.carsPage);
  const pages = Math.ceil(Number(count) / 7);
  if (store.carsPage < pages) {
    store.carsPage++;
    await renderCars();
  }
};

export const prevCarsPage = async () => {
  if (store.carsPage > 1) {
    store.carsPage--;
    await renderCars();
  }
};

export const updateCar = async (id: number) => {
  const carName = document.querySelector('.car-update__name') as HTMLInputElement;
  const carColor = document.querySelector('.car-update__color') as HTMLInputElement;
  await remakeCar(id, {
    name: carName.value,
    color: carColor.value,
  });
  carName.value = '';
  carColor.value = '#000000';
  await renderCars();
};

export const addCar = async () => {
  const carName = document.querySelector('.car-create__name') as HTMLInputElement;
  const carColor = document.querySelector('.car-create__color') as HTMLInputElement;

  await createCar({
    name: carName.value,
    color: carColor.value,
  });
  carName.value = '';
  carColor.value = '#000000';
  await renderCars();
};

const models = ['Tesla', 'Mersedes', 'BMW', 'Toyota', 'Kia', 'Moskvich', 'Audi', 'Volkswagen', 'Nissan', 'Lada'];
const names = ['Model S', 'x6', '7', 'Rav4', 'Rio', 'Vesta', '412', 'Q7', 'Tiguan', 'Qashqai'];

const getRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomCar = (count = 100) => new Array(count).fill(1).map(() => ({ name: getRandomName(), color: getRandomColor() }));

export const generateCars = async () => {
  const cars = getRandomCar();
  cars.forEach((car) => {
    createCar({
      name: car.name,
      color: car.color,
    });
  });
  await renderCars();
};

export const saveCarNameFieldState = () => {
  const carName = document.querySelector('.car-create__name') as HTMLInputElement;
  carName?.addEventListener('input', () => {
    store.carName = carName.value;
  });
  carName.value = store.carName;
};

export const saveCarColorFieldState = () => {
  const carColor = document.querySelector('.car-create__color') as HTMLInputElement;
  carColor?.addEventListener('change', () => {
    store.carColor = carColor.value;
  });
  carColor.value = store.carColor;
};
