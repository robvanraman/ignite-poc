import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { PositionsComponent } from './positions/positions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PositionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ignite-poc';
}
