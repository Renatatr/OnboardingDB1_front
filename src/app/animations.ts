import { animate, keyframes, query, state, style, transition, trigger } from "@angular/animations";

export const shakeTrigger = trigger('shakeAnimation', [
    state('initial', style({
      transform: 'translateX(0)',
    })),
    state('shaking', style({
      transform: 'translateX(-10px)', // Ajuste a distância que deseja para a animação de agitação
    })),
    transition('initial => shaking', animate('100ms ease-in')),

    // transition('* => *', [
    //     query('input.ng-invalid:focus, select.ng-invalid:focus', [
    //         animate('0.5s', keyframes([
    //             style({border: '4px solid red'}),
    //             style({transform: 'translateX(0)'}),
    //             style({transform: 'translateX(-10px)'}),
    //             style({transform: 'translateX(10px)'}),
    //             style({transform: 'translateX(-10px)'}),
    //             style({transform: 'translateX(10px)'}),
    //             style({transform: 'translateX(-10px)'}),
    //             style({transform: 'translateX(10px)'}),
    //             style({transform: 'translateX(0px)'})
    //         ]))
    //     ], {optional: true})
    // ])
])