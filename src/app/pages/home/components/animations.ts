import { trigger, state, style, transition, animate, keyframes, AnimationTriggerMetadata, group } from '@angular/animations';

const typeSpeed = 3;
const typeWordCount = 20;
const blinkSpeed = 0.5;
const blinkDuration = typeWordCount + 3;

export const typeAnimations = {
  typeAnimationBefore: trigger('typeAnimationBefore', [
    state('start', style({ left: '0%' })),
    state('end', style({ left: '100%' })),
    transition('start => end', [
      animate(`${typeSpeed}s steps(${typeWordCount})`)
    ]),
  ]),
  typeAnimationAfter: trigger('typeAnimationAfter', [
    state('start', style({ left: '0%', background: 'transparent' })),
    state('end', style({ left: '100%', background: 'white' })),
    transition('start => end', [
      animate(`${typeSpeed}s steps(${typeWordCount})`, keyframes([
        style({ left: '0%' }),
        style({ left: '100%' })
      ])),
      animate(`${blinkSpeed}s steps(${typeWordCount})}`, keyframes([
        style({ background: 'transparent' }),
        style({ background: 'white' })
    ])),
  ]),
  ]),
  typeAnimationText: trigger('typeAnimationText', [
    state('start', style({ transform: 'scale(0)' })),
    state('end', style({ transform: 'scale(1)' })),
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