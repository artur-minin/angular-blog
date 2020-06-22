import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceInDown, bounceOutUp } from 'ng-animate';

export const bounceAnimation = trigger('bounce', [
  transition(':enter', useAnimation(bounceInDown)),
  transition(':leave', useAnimation(bounceOutUp)),
]);
