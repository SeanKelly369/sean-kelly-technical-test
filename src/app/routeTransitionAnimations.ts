import { trigger, transition, style, query, animateChild, animate, group } from '@angular/animations'

export const routeTransitionAnimations = trigger('triggerName', [
    transition('property <=> brochure, brochure <=> gallery, property <=> gallery', [

            style({ position: 'relative' }),
            query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%'
            })   
        ]),
        query(':enter', [style({ opacity: 0 })]),
        query(':leave', animateChild()),
        group([
        query(':leave', [animate('1s ease-out', style({ opacity: 0 }))]),
        query(':enter', [animate('1s ease-out', style({ opacity: 1 }))])
        ]),
        query(':enter', animateChild())

    ]),
   
]);