import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  @Output() searchResultEvent = new EventEmitter<any>();

  control = new UntypedFormControl('');
  words: string[] = []; // retrieve from backend
  filteredSearchwords: Observable<string[]>;

  constructor(private dataService: DataService) {
    this.dataService.fetchMostSearchedWords().subscribe({
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
    this.dataService.fetchDataFromSearchString(this.control.value).subscribe({
      next: (value: any[]) => {
        this.searchResultEvent.emit(value);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.control.reset();
    f.reset();
  }
}
