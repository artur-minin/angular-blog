import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Post } from 'src/app/shared/interfaces';

import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });
  }

  isFormFieldInvalid(fieldName: string): boolean {
    const isFieldTouched: boolean = this.form.get(fieldName).touched;
    const isFieldInvalid: boolean = this.form.get(fieldName).invalid;
    return isFieldTouched && isFieldInvalid;
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      content: this.form.value.content,
      date: new Date(),
    };

    this.postsService.create(post).subscribe({
      next: () => {
        this.form.reset();
        this.submitted = false;
      },
      error: () => {
        this.submitted = false;
      },
    });
  }
}
