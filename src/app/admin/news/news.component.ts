import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {NewsVO} from '../../domain/news.vo';
import {ResultVO} from '../../domain/result.vo';
import {PageVO} from '../../domain/page.vo';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList = new Array<NewsVO>();
  page = new PageVO(0, 5);

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.findNews();
  }

  findNews() {
    const params = {
      start_index: this.page.pageSize * this.page.pageIndex,
      page_size: this.page.pageSize
    };

    this.adminService.findNews(params)
      .subscribe((res: ResultVO) => {
        this.newsList = res.data;
        console.log(this.newsList);
        this.page.totalCount = res.total;
      });
  }

  pageChanged(event: any) {
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    this.findNews();
  }
}
