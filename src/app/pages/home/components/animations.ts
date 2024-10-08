import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

export const animations = {
  myAnimation: trigger('myAnimation', [
    state('void', style({ opacity: 0 })),
    state('visible', style({ opacity: 1 })),
    transition('void => visible', animate('300ms ease-in')),
    transition('visible => void', animate('300ms ease-out'))
  ]),
  myOtherAnimation: trigger('myOtherAnimation', [
    state('void', style({ transform: 'scale(0)' })),
    state('visible', style({ transform: 'scale(1)' })),
    transition('void => visible', animate('300ms ease-in')),
    transition('visible => void', animate('300ms ease-out'))
  ])
};

export const introImageAnimation: AnimationTriggerMetadata = trigger('introImageAnimation', [
  transition(':enter' , [
    style({ opacity: 0, transform: 'translateY(-200px)' }),
    animate('0.7s ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

// export const introImageAnimation: AnimationTriggerMetadata = trigger('introImageAnimation', [
//   state('void', style({ opacity: 0, transform: 'translateY(-200px)' })),
//   state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
//   transition('void => visible', animate('0.7s ease-in')),
//   transition('visible => void', animate('0.7s ease-out')),
// ]);