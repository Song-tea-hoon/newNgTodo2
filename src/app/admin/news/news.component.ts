import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {NewsVO} from '../../domain/news.vo';
import {ResultVO} from '../../domain/result.vo';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList = new Array<NewsVO>();

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.findNews();
  }

  findNews() {
    const params = {
      start_index: 0,
      page_size: 5
    };

    this.adminService.findNews(params)
      .subscribe((res: ResultVO) => {
        this.newsList = res.data;
        console.log(this.newsList);
      });
  }
}
