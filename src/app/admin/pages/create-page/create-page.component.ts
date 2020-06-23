import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Post } from 'src/app/shared/interfaces';

import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../../shared/services/alert.service';

import { isFormFieldInvalid } from 'src/app/shared/utils';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });
  }

  isFieldInvalid = isFormFieldInvalid;

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      content: this.form.value.content,
      date: new Date(),
    };

    this.postsService.create(post).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitting = false;

        this.alert.success('Post was created!');
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }
}
