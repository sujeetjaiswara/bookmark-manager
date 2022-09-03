import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/shared/interfaces/bookmark';

@Component({
  selector: 'bm-bookmark-lists',
  templateUrl: './bookmark-lists.component.html',
  styleUrls: ['./bookmark-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkListsComponent implements OnInit {

  bookmarks: Bookmark[] = [
    {
      "BookmarkId": 59,
      "Title": "Twilio Node",
      "Links": "https://twilio.github.io/twilio-node/",
      "Tags": "NODEJS-API",
      "Description": "The Twilio platform makes adding voice, SMS, and VoIP capabilities to your applications ridiculously simple. This helper library for node aims to make it even easier.",
      "Screenshot": "09-24c2aee86157.jpg",
      "BookmarkDate": "09-24-2016",
      "Likes": 1
    },
    {
      "BookmarkId": 57,
      "Title": "ngInfiniteScroll",
      "Links": "https://sroze.github.io/ngInfiniteScroll/",
      "Tags": "ANGULAR-PLUGIN",
      "Description": "Infinite scrolling, also known as \"endless scrolling,\" \"unpagination,\" and others, is a technique where additional content for a web page is appended dynamically to the bottom of the page as the user approaches the end of the content. You may have seen this technique on the Facebook timeline or on Pinterest's homepage.",
      "Screenshot": "09-17eddea82ad2.jpg",
      "BookmarkDate": "09-17-2016",
      "Likes": 1
    },
    {
      "BookmarkId": 56,
      "Title": "jQuery.mb.YTPlayer",
      "Links": "http://pupunzi.com/mb.components/mb.YTPlayer/demo/demo.html",
      "Tags": "JQUERY-PLUGIN",
      "Description": "An HTML5 Background player for YouTube videos",
      "Screenshot": "09-1728267ab848.jpg",
      "BookmarkDate": "09-17-2016",
      "Likes": 1
    },
    {
      "BookmarkId": 55,
      "Title": "imagesLoaded",
      "Links": "http://imagesloaded.desandro.com",
      "Tags": "JQUERY-PLUGIN",
      "Description": "JavaScript is all like \"You images done yet or what?\"",
      "Screenshot": "09-171728efbda8.jpg",
      "BookmarkDate": "09-17-2016",
      "Likes": 1
    },
    {
      "BookmarkId": 54,
      "Title": "Just another another (another) url slug creation plugin for jQuery.",
      "Links": "http://madflow.github.io/jquery-slugify/",
      "Tags": "SLUG,JQUERY-PLUGIN",
      "Description": "url slug creation plugin for jQuery",
      "Screenshot": "09-05248e844336.jpg",
      "BookmarkDate": "09-05-2016",
      "Likes": 1
    },
    {
      "BookmarkId": 53,
      "Title": "Laravel Migrations Part1",
      "Links": "http://clivern.com/laravel-migrations-part1/",
      "Tags": "LARAVEL",
      "Description": "Creating Migrations\r\nRunning Migrations\r\nUpdate Migrations",
      "Screenshot": "09-033a066bda8c.jpg",
      "BookmarkDate": "09-03-2016",
      "Likes": 1
    },
  ]

  constructor() { }

  ngOnInit(): void {
    console.log(this.bookmarks)
  }
}
