import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { injectAppConfig } from '@task-manager/shared/config';

@Component({
  selector: 'wt-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  readonly config = injectAppConfig();

  ngOnInit() {
    // TODO move to facade
    console.log(this.config);
  }
}
