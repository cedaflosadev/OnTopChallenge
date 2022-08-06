import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  @Input() showDiv?: boolean

  @Output() applyFilt?= new EventEmitter()

  constructor() { }

  applyFilter(value: string) {
    this.applyFilt?.emit(value)
  }

  ngOnInit(): void {
  }

}
