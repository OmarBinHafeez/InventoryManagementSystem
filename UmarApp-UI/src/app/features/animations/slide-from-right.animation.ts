import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideFromRightAnimation = trigger('slideFromRight', [
  state('void', style({ transform: 'translateX(100%)' })), // Initial state: off-screen to the right
  state('visible', style({ transform: 'translateX(0)' })),   // Visible state
  transition('void <=> visible', [
    animate('300ms ease-out') // Specify animation duration and easing function
  ])
]);
