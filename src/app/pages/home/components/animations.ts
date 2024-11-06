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

export const logoBannerAnimation: AnimationTriggerMetadata = trigger('logoBannerAnimation', [
  transition(':enter' , [
    style({ opacity: 0 }),
    animate('1s ease-in', style({ opacity: 1 })),
  ]),
]);

export const bannerSectionAnimation: AnimationTriggerMetadata = trigger('bannerSectionAnimation', [
  transition(':enter' , [
    style({ transform: 'translate(0,100%)' }),
    animate('1s ease-in', style({ transform: 'translate(0,0)' })),
  ]),
]);

export const loadingPageAnimation: AnimationTriggerMetadata = trigger('loadingPageAnimation', [
  transition(':leave' , [
    style({ transform: 'translate(0,0)' }),
    animate('1s ease-out', style({ transform: 'translate(0,-100%)' })),
  ]),
]);