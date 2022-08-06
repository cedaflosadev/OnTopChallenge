import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../shared/models/client.interface';
import { ClientService } from '../shared/services/client.service';
import * as moment from "moment";
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';


export interface UserData {
  name: string;
  type: string;
  date?: Date;
  amount?: string;
  status: string;
  imgUrl?: string;
}



export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  title = 'invoicer';
  showToolbar: boolean = false
  showDiv: boolean = false
  cardTable: boolean = false
  client: Client;
  innerWidth: any;
  @ViewChild('sidenav') sideNav!: MatSidenav;
  foods: string[] = []
  formFilterData!: FormGroup;

  displayedColumns = ['name', 'type', 'date', 'amount', 'status', 'actions'];
  dataSource: MatTableDataSource<UserData>;
  usersData: UserData[] = [{ "name": "Darlene Robertson", "type": "Traditional", "date": new Date(2022, 7, 4, 10, 33, 30, 0), "amount": "$200", "status": "Active", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Mike Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Active", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Cesar Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Cesar Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Cesar Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Cesar Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Cesar Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Cesar Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Cesar Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Cesar Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Cesar Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Batman Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Robin Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },
  { "name": "Cesar Robertson", "type": "Others", "date": new Date(), "amount": "$200", "status": "Pending", "imgUrl": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" },]


  arrayContractType: string[] = ["Traditional", "Others"]
  arraystatus: string[] = ["Active", "Pending"]


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  options = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };



  constructor(private clientService: ClientService, private formBuilder: FormBuilder) {

    this.client = this.clientService.getDataClient()

    this.dataSource = new MatTableDataSource(this.usersData);


  }
  public filteredValues = {
    search: "",
    start: null,
    end: null,
    type: "",
    name: "",
    status: ""
  };

  // filterWithButton() {
  //   this.filteredValues.search = searchFilterValue;
  //   this.dataSource.filter = JSON.stringify(this.filteredValues);
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public setDates() {
    this.filteredValues.start = null;
    this.filteredValues.end = null;
    this.formFilterData.controls['start'].setValue(null);
    this.formFilterData.controls['end'].setValue(null);
  }
  public getFormat(activeTeam: any) {
    return moment.utc(activeTeam, "DD/MM/YYYY");
  }

  ngOnInit() {
    // this._adapter.setLocale("es-EC");

    this.toogleToolBar()

    this.formFilterData = this.formBuilder.group({
      search: [{ value: "", disabled: false }],
      start: [{ value: null, disabled: false }],
      end: [{ value: null, disabled: false }],
      type: [{ value: "", disabled: false }],
      name: [{ value: "", disabled: false }],
      status: [{ value: "", disabled: false }],

    });
    this.setDates();

    this.formFilterData.controls['search'].valueChanges.subscribe(
      (searchFilterValue) => {
        if (searchFilterValue === "") {
          this.filteredValues.search = searchFilterValue;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
        }
      }
    );

    this.formFilterData.controls['start'].valueChanges.subscribe(
      (startFilterValue) => {
        this.filteredValues.start = startFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      }
    );

    this.formFilterData.controls['end'].valueChanges.subscribe(
      (endFilterValue) => {
        this.filteredValues.end = endFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      }
    );
    this.formFilterData.controls['type'].valueChanges.subscribe(
      (typeFilterValue) => {
        this.filteredValues.type = typeFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      }
    );
    this.formFilterData.controls['name'].valueChanges.subscribe(
      (nameFilterValue) => {
        this.filteredValues.name = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      }
    );
    this.formFilterData.controls['status'].valueChanges.subscribe(
      (statusFilterValue) => {
        this.filteredValues.status = statusFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      }
    );
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }
  public keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }



  public customFilterPredicate() {
    const myFilterPredicate = (
      data: UserData,
      filter: string
    ): boolean => {
      let searchString: any = JSON.parse(filter);
      let filterState: any;
      console.log("SEARCHSTRING", searchString)
      console.log("DATA", data)
      if (searchString.start !== null) searchString.start = new Date(searchString.start)
      if (searchString.end !== null) searchString.end = new Date(searchString.end)

      if (
        searchString.start !== null &&
        searchString.end !== null
      ) {
        filterState =

          data.name
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.search.trim().toLowerCase()) !== -1 &&
          data.type
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.type.trim().toLowerCase()) !== -1 &&
          data.name
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.name.trim().toLowerCase()) !== -1 &&
          data.status
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.status.trim().toLowerCase()) !== -1 &&
          moment.utc(data.date, "DD/MM/YYYY") >=
          moment.utc(searchString.start, "DD/MM/YYYY") &&
          moment.utc(data.date, "DD/MM/YYYY") <=
          moment.utc(searchString.end, "DD/MM/YYYY");
      } else {
        if (searchString.start !== null) {
          console.log("Aca denberi")
          filterState =
            data.name
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(searchString.search.trim().toLowerCase()) !== -1 &&
            data.type
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(searchString.type.trim().toLowerCase()) !== -1 &&
            data.name
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(searchString.name.trim().toLowerCase()) !==
            -1 &&
            data.status
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(searchString.status.trim().toLowerCase()) !== -1 &&
            moment.utc(data.date, "DD/MM/YYYY") ===
            moment.utc(searchString.start, "DD/MM/YYYY");
        } else {
          filterState =

            data.name
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(searchString.search.trim().toLowerCase()) !== -1 &&
            data.type
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(searchString.type.trim().toLowerCase()) !== -1 &&
            data.name
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(searchString.name.trim().toLowerCase()) !==
            -1 &&
            data.status
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(searchString.status.trim().toLowerCase()) !== -1;
        }
      }
      return filterState;
    };

    return myFilterPredicate;
  }



  applyFilter(filterValue: string) {
    this.filteredValues.search = filterValue.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }



  clearFilters() {
    console.log("limpip fi");
    this.filteredValues = {
      search: "",
      start: null,
      end: null,
      type: "",
      name: "",
      status: ""
    }
    this.formFilterData.setValue(this.filteredValues)
    // this.setDates()
  }


  @HostListener('window:resize', ['$event'])

  onResize() {

    this.toogleToolBar()
  }
  togleSideNav() {
    this.sideNav.toggle();

  }

  toogleToolBar() {
    this.innerWidth = window.innerWidth;
    this.innerWidth > 990 ? this.showToolbar = true : this.showToolbar = false;
    this.innerWidth > 990 ? this.sideNav?.close() : null;
    this.innerWidth > 767 ? this.showDiv = false : this.showDiv = true
    this.innerWidth > 960 ? this.cardTable = false : this.cardTable = true
  }



}
