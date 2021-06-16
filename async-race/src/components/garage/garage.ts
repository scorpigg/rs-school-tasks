import { Render } from '../Render';
import { CarForm } from './car-form/car-form';
import { CarsField } from './cars-field/cars-field';
import { CarsPagination } from './cars-field/cars-pagination/cars-pagination';

export class Garage extends Render {
  private carForm: CarForm;

  private carsField: CarsField;

  private carsPagination: CarsPagination;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['garage'], '');
    this.carForm = new CarForm(this.element);
    this.carsField = new CarsField(this.element);
    this.carsPagination = new CarsPagination(this.element);
  }
}
