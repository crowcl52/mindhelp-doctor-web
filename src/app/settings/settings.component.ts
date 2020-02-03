import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  title = "Editar Perfil";

  constructor() { }

  ngOnInit() {
  }

  changeTitle(title){
    this.title = title;
  }

}
