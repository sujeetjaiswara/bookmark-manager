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
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'bm-bookmark-add',
  templateUrl: './bookmark-add.component.html',
  styleUrls: ['./bookmark-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class BookmarkAddComponent implements OnInit {
  #dataService = inject(DataService);
  #destroyRef = inject(DestroyRef);
  #cd = inject(ChangeDetectorRef);
  #fb = inject(FormBuilder);
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);

  protected bookmarkForm!: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected tags: any[] = [];
  protected previewImage = '';
  protected isSaving = false;
  protected id!: string;

  constructor() {
    this.#activatedRoute.params.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (p: any) => {
        console.log(p.id);
        this.id = p.id;
      },
    });
  }

  ngOnInit(): void {
    this.iniForm();

    if (this.id) {
      this.autoFillData(this.id);
    }
  }

  iniForm() {
    this.bookmarkForm = this.#fb.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
      tags: [''],
      description: '',
    });
  }

  autoFillData(id: string) {
    this.#dataService
      .getBookmark(id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (data: Bookmark) => {
          if (data) {
            this.bookmarkForm.patchValue({
              title: data.title,
              link: data.link,
              tags: data.tags,
              description: data.description,
            });
          }
        },
        error: err => {
          console.error(err);
        },
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

    if (this.id) {
      bookmark._id = this.id;
    }

    const requestURL = this.id
      ? this.#dataService.updateBookmark(bookmark)
      : this.#dataService.createBookmark(bookmark);

    this.isSaving = true;
    requestURL
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input?.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          this.previewImage = e.target.result as string;
          this.#cd.markForCheck();
        }
      };

      reader.readAsDataURL(file);
    }
  }

  onCancel() {
    this.#router.navigate(['/bookmarks']);
  }
}
