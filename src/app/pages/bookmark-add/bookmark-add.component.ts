import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';
import { BookmarksService } from 'src/app/shared/services/bookmarks.service';

@Component({
  selector: 'bm-bookmark-add',
  templateUrl: './bookmark-add.component.html',
  styleUrls: ['./bookmark-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class BookmarkAddComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['JS', 'PHP', 'ANGULAR', 'CSS', 'HTML'];
  previewImage = '';
  isSaving = false;

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  bookmarkForm!: FormGroup;

  constructor(
    private router: Router,
    private _cd: ChangeDetectorRef,
    private _fb: FormBuilder,
    private _bookmarksService: BookmarksService
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  ngOnInit(): void {
    this.bookmarkForm = this._fb.group({
      title: [''],
      link: [''],
      tags: [''],
      description: ''
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  onAdd() {
    console.log(this.bookmarkForm.value);
    console.log(this.fruits);

    const form = this.bookmarkForm.value;

    const bookmark: Bookmark = {
      Title: form.title,
      Links: form.link,
      Screenshot: '',
      Tags: this.fruits.toString(),
      Description: form.description,
      Likes: false,
      BookmarkId: Math.floor(Math.random() * 100),
      BookmarkDate: new Date()
    }

    const bookmarks = this._bookmarksService.bookmarks$.getValue();
    bookmarks.push(bookmark);

    this._bookmarksService.setBookmarks(bookmarks);

    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.router.navigate(['/bookmarks']);
    }, 800);
  }

  onFileSelected(event: any) {
    const file: any = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        this._cd.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel() {
    this.router.navigate(['/bookmarks']);
  }
}
