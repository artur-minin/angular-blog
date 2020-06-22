import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PostsService } from 'src/app/shared/posts.service';

import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();
  }
}
