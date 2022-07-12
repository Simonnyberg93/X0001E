import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-underconstruction',
  templateUrl: './underconstruction.component.html',
  styleUrls: ['./underconstruction.component.css'],
})
export class UnderconstructionComponent implements OnInit {
  public componentText: string = '';

  constructor() {}

  ngOnInit(): void {}
}
