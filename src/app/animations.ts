import { animate, state, style, transition, trigger } from "@angular/animations";

export const shakeTrigger = trigger('shakeAnimation', [
    state('true', style({ transform: 'translateX(0)' })),
    state('false', style({ transform: 'translateX(0)' })),
    transition('false => true', animate('500ms ease-in-out')),
])