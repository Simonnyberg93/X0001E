import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  @Output() searchResultEvent = new EventEmitter<string>();

  control = new UntypedFormControl('');
  words: string[] = []; // retrieve from backend
  filteredSearchwords: Observable<string[]>;

  constructor(private searchService: SearchService) {
    this.searchService.fetchMostSearchedWords().subscribe({
      next: (value: string[]) => {
        this.words = value;
      },
      error: (error) => {
        console.error(error);
      },
    });
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
    if (this.control.value) {
      this.searchResultEvent.emit(this.control.value);
      this.control.reset();
      f.reset();
    } else {
      alert('You must enter atleast one character before searching...');
    }
  }
}
