import { trigger, transition, query, style, group, animate } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
    transition('* => router-animation', [
        query(':enter, :leave', style({ position: 'fixed', left: '0', right: '0', height: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateY(100%)', }),
                animate('1s ease-out', style({ transform: 'translateY(0%)', 'z-index': '15' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('1s ease-in-out', style({ transform: 'translateY(-100%)' }))
            ], { optional: true })
        ])
    ]),

    transition('router-animation => *', [
        query(':enter, :leave', style({ position: 'fixed', left: '0', right: '0', height: '100%', }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateY(-100%)', }),
                animate('1s ease-out', style({ transform: 'translateY(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateY(0%)', 'z-index': '15' }),
                animate('1s ease-in-out', style({ transform: 'translateY(100%)' }))
            ], { optional: true }),
        ])
    ]),

]);
