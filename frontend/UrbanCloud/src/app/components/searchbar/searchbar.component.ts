import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';
import ConstantValues from 'src/app/utils/constants';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  @Output() searchResultEvent = new EventEmitter<any>();

  control = new FormControl('value');
  words: string[] = ConstantValues.searchWords; // retrieve from backend
  filteredSearchwords: Observable<string[]>;

  constructor() {
    this.filteredSearchwords = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  ngOnInit(): void {}

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.words.filter((words) =>
      this._normalizeValue(words).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onSubmit(f: NgForm) {
    console.log(`TODO: value entered: ${this.control.value}`);
    // for now just send back dummy data to parent to see if it workes
    this.searchResultEvent.emit([
      {
        title: 'Vatten och avlopp',
        source: '',
        text: 'Vatten och avlopp förkortat VA, är vattenförsörjning av dricksvatten och hanteringen av avloppsvatten. Både vattenförsörjning och avloppshantering använder sig av rörsystem och kräver reningsanläggningar. \n Dicksvatten för almänt bruk kommer från vattendrag eller brunnar för rening till ett ...',
        contains: [
          'Spillvattensystemet',
          'Dagvatten',
          'Drift, underhåll, förnyelse',
        ],
      },
      {
        title: 'Vatten',
        source: 'Boverket',
        text: 'Vatten avser såväl öppet hav som kustvatten, sjöar som vattendrag. Användningen Vatten anges för vattenområden som är lämpliga för olika användningar men där det inte är nödvändigt eller',
        contains: [],
      },
      {
        title: 'Mark- och vattenanvändning',
        source: 'Boverket',
        text: 'Mark- och vattenanvänding är en av de tre aspekterna i ÖP-modellen. I mark- och vattenanvändningskartan ska grundlagen av den avsedda användningen av mark- och',
        contains: [],
      },
    ]);
    this.control.reset();
    f.reset();
  }
}
