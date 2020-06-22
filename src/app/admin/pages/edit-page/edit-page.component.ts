import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Post } from 'src/app/shared/interfaces';

import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: Post;
  submitting = false;

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

  isFormFieldInvalid(fieldName: string): boolean {
    const isFieldTouched: boolean = this.form.get(fieldName).touched;
    const isFieldInvalid: boolean = this.form.get(fieldName).invalid;
    return isFieldTouched && isFieldInvalid;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;

    this.updatePostSubscription = this.postsService
      .updatePost({
        ...this.post,
        title: this.form.value.title,
        content: this.form.value.content,
      })
      .subscribe({
        next: () => {
          this.submitting = false;

          this.alert.success('Post was updated!');
        },
      });
  }
}
