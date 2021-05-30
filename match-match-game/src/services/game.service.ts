export function cardCorrect(parentElement:HTMLElement, correct = true): void {
  const card: HTMLElement | null = parentElement.querySelector('.card__overlay');
  if (correct) {
    card?.classList.remove('card__incorrect');
    card?.classList.add('card__correct');
  } else {
    card?.classList.add('card__incorrect');
    card?.classList.remove('card__correct');
  }
}
