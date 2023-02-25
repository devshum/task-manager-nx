import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tm-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {}
