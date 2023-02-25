import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tm-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {}
