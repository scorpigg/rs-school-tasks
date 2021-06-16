export interface ICarsAdditional {
  className: string,
  disabled: string,
  text: string,
}

export interface ICar {
  id: number,
  color: string,
  name: string,
  wins: number,
  bestTime: number,
}

export interface IWinner {
  car: { name: string, color: string, id: number },
  id: number,
  time: number,
  wins: number,
}

export interface IAnimate {
  duration: number,
  draw: (progress: number) => void,
  timing: (timeFraction:number) => number,
}
