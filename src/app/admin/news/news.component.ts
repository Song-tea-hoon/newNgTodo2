import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {NewsVO} from "../../domain/news.vo";
import {ResultVO} from "../../domain/result.vo";
import {PageVO} from "../../domain/page.vo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: Array<NewsVO>;
  page = new PageVO(0, 5);

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.findNews();
  }

  findNews() {
    const params = {
      start_index: this.page.pageIndex * this.page.pageSize,
      page_size: this.page.pageSize
    };
    // 뉴스 목록 가져와서 콘솔에 찍기
    this.adminService.findNews(params)
      .subscribe((res: ResultVO) => {
        this.newsList = res.data;
        console.log(this.newsList);
        this.page.totalCount = res.total;
      });
  }

  pageChanged(event: any) {
    this.page.pageIndex = event.pageIndex; // option select box
    this.page.pageSize = event.pageSize;   // next, prev
    this.findNews();
  }

  gotoView(news: NewsVO) {
    this.router.navigateByUrl(`/admin/news/view/${news.news_id}`);
  }

  gotoWrite() {
    this.router.navigateByUrl(`/admin/news/write`);
  }
}
