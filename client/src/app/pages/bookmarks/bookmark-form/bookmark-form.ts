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
import { Data } from '@core/services';
import { BookmarkCreateUpdateRequest, BookmarkResponse } from '@shared/types';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { finalize } from 'rxjs';

@Component({
  selector: 'bm-bookmark-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    TextareaModule,
  ],
  templateUrl: './bookmark-form.html',
  styleUrl: './bookmark-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkForm implements OnInit {
  #dataService = inject(Data);
  #destroyRef = inject(DestroyRef);
  #cd = inject(ChangeDetectorRef);
  #fb = inject(FormBuilder);
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  protected bookmarkForm!: FormGroup;
  protected tags: unknown[] = [];
  protected previewImage = '';
  protected isSaving = false;
  protected id!: string;

  constructor() {
    this.#activatedRoute.params.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: (p: any) => {
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
        next: (rs: BookmarkResponse) => {
          if (rs.data) {
            this.bookmarkForm.patchValue({
              title: rs.data.title,
              link: rs.data.link,
              description: rs.data.description,
            });

            this.tags = rs.data.tags;
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

    const bookmark: BookmarkCreateUpdateRequest = {
      title: form.title?.trim(),
      link: form.link?.trim(),
      tags: this.tags.toString(),
      description: form.description,
      screenshot: '',
    };

    const requestURL = this.id
      ? this.#dataService.updateBookmark(bookmark, this.id)
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
