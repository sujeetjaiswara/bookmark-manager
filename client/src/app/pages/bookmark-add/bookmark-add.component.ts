import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';
import { BookmarksService } from 'src/app/shared/services/bookmarks.service';

@Component({
  selector: 'bm-bookmark-add',
  templateUrl: './bookmark-add.component.html',
  styleUrls: ['./bookmark-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class BookmarkAddComponent implements OnInit {
  public bookmarkForm!: FormGroup;
  public tags: any[] = [];
  public previewImage = '';
  public isSaving = false;

  constructor(
    private router: Router,
    private _cd: ChangeDetectorRef,
    private _fb: FormBuilder,
    private _bookmarksService: BookmarksService
  ) {}

  ngOnInit(): void {
    this.iniForm();
  }

  iniForm() {
    this.bookmarkForm = this._fb.group({
      title: [''],
      link: [''],
      tags: [''],
      description: '',
    });
  }

  onAddTag() {
    const value = this.bookmarkForm.get('tags')?.value;
    if (value) {
      this.tags.push(value);
      this.bookmarkForm.get('tags')?.patchValue('');
    }
  }

  removeTag(tag?: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onAdd() {
    const form = this.bookmarkForm.value;

    const bookmark: Bookmark = {
      title: form.title,
      link: form.link,
      screenshot: '',
      tags: this.tags.toString(),
      description: form.description,
    };

    const bookmarks = this._bookmarksService.bookmarks$();
    bookmarks.push(bookmark);

    this._bookmarksService.setBookmarks(bookmarks);

    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.router.navigate(['/bookmarks']);
    }, 300);
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
