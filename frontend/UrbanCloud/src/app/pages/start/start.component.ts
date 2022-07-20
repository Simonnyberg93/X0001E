import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/UserDTO';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  roleRelatedInfo: any[] = [];
  showSearchBtn: boolean = false;
  showNewpojectBtn: boolean = false;
  showMaptoolBtn: boolean = false;

  constructor(
    private routeService: RouteService,
    private dataService: DataService,
    private authService: AuthenticateService
  ) {}

  ngOnInit(): void {
    // populate array by quering db with user's settings
    this.authService
      .getUserFromDatabase(this.authService.getUserInfo().email)
      .subscribe({
        next: (value) => {
          let user = <UserDTO>value;
          this.dataService.fetchDataFromWorkRoles(user.roles).subscribe({
            next: (value) => {
              this.roleRelatedInfo = value;
            },
            error: (error) => {
              console.error(error);
            },
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  routeToSearch() {
    this.routeService.openSearch();
  }

  routeToMapTool() {
    this.routeService.openMapTool();
  }

  routeToNewProject() {
    this.routeService.openAddProject();
  }
}
