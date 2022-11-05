import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from './store/app.reducer';
import * as AppStateActions from './store/app-store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCelsius: boolean = false;
  isDarkMode:boolean=false
  constructor(private store: Store<FromApp.AppState>) {}

  unitsChange():void{
    this.isCelsius=!this.isCelsius;
    this.store.dispatch(new AppStateActions.ToggleUnits)
  }

  onThemeChange():void{
    this.isDarkMode=!this.isDarkMode
  }
}
