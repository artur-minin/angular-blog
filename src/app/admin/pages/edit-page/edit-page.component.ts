import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Post } from 'src/app/shared/interfaces';

import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../../shared/services/alert.service';

import { isFormFieldInvalid } from 'src/app/shared/utils';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: Post;
  isSubmitting = false;

  updatePostSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params['id']);
        })
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          content: new FormControl(post.content, Validators.required),
        });
      });
  }

  ngOnDestroy(): void {
    if (this.updatePostSubscription) {
      this.updatePostSubscription.unsubscribe();
    }
  }

  isFieldInvalid = isFormFieldInvalid;

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.updatePostSubscription = this.postsService
      .updatePost({
        ...this.post,
        title: this.form.value.title,
        content: this.form.value.content,
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;

          this.alert.success('Post was updated!');
        },
      });
  }
}
