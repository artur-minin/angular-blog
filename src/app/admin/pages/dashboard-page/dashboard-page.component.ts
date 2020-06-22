import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../../shared/services/alert.service';

import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  searchStr = '';

  postsSubscription: Subscription;
  deletePostSubscription: Subscription;

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.postsSubscription = this.postsService
      .getAllPosts()
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.deletePostSubscription) {
      this.deletePostSubscription.unsubscribe();
    }
  }

  deletePost(postId: string): void {
    this.deletePostSubscription = this.postsService
      .deletePost(postId)
      .subscribe(() => {
        this.posts = this.posts.filter((post) => post.id !== postId);

        this.alert.danger('Post was deleted!');
      });
  }
}
