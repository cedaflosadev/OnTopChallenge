import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() showToolbar!: boolean

  @Output() togleSideNavOut = new EventEmitter();

  togleSideNav() {
    this.togleSideNavOut.emit('')
  }

  constructor() { }

  ngOnInit(): void {
  }

}
