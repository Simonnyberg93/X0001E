import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
})
export class FrontPageComponent implements OnInit {
  constructor(private routerService: RouteService) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    console.log(`TODO: value entered: ${f.value.searchInput}`);
    f.reset();
  }

  navigateTo(navigateTo: string): void {
    console.log(`Frontpage: ${navigateTo}`);
    if (navigateTo === 'login') {
      this.routerService.openLogin();
      return;
    }
    // else navigate to register
    this.routerService.openRegister();
  }
}
