import { trigger, animate, state, style, transition } from "@angular/core";

export const ModalAnimations =  trigger('visibility', [
        state('shown', style({
          opacity: 1,
          display:'block'
        })),
        state('hidden', style({
          opacity: 0,
          display:'none'
        })),
        transition('* => *', animate('200ms'))
]);