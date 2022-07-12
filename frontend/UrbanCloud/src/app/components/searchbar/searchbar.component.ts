import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import ConstantValues from 'src/app/utils/constants';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  control = new FormControl('');
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
    console.log(`TODO: value entered: ${f.value.searchInput}`);
    f.reset();
  }
}
