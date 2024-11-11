import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'bm-bookmark-add',
  templateUrl: './bookmark-add.component.html',
  styleUrls: ['./bookmark-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class BookmarkAddComponent implements OnInit {
  #dataService = inject(DataService);
  #destroyRef = inject(DestroyRef);
  #cd = inject(ChangeDetectorRef);
  #fb = inject(FormBuilder);
  #router = inject(Router);

  public bookmarkForm!: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public tags: any[] = [];
  public previewImage = '';
  public isSaving = false;

  ngOnInit(): void {
    this.iniForm();
  }

  iniForm() {
    this.bookmarkForm = this.#fb.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
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
      tags: this.tags.toString(),
      description: form.description,
      screenshot: '',
    };

    this.isSaving = true;
    this.#dataService
      .createBookmark(bookmark)
      .pipe(
        finalize(() => (this.isSaving = false)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe({
        next: () => {
          this.#router.navigate(['/bookmarks']);
        },
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelected(event: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const file: any = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        this.#cd.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel() {
    this.#router.navigate(['/bookmarks']);
  }
}
