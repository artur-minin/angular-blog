import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

import { bounceAnimation } from './alert.animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [bounceAnimation],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;

  public isVisible = false;
  public type: string;
  public text: string;

  alertSubscription: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService.alert$.subscribe(
      ({ type = 'success', text = '' }) => {
        this.isVisible = true;
        this.type = type;
        this.text = text;

        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.isVisible = false;
          this.text = '';
        }, this.delay);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }
}
