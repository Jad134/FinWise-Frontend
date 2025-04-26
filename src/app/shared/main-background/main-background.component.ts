import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-main-background',
  standalone: true,
  imports: [],
  templateUrl: './main-background.component.html',
  styleUrl: './main-background.component.scss'
})
export class MainBackgroundComponent {
  @Input() headline: string = 'Headline';
}
