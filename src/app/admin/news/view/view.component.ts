import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NewsVO} from "../../../domain/news.vo";
import {AdminService} from "../../admin.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ViewDialogComponent} from "./view-dialog.component";
import {ResultVO} from "../../../domain/result.vo";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  news: NewsVO;

  constructor(private route: ActivatedRoute, private adminService: AdminService,
              private dialog: MatDialog, private snackBar: MatSnackBar,
              private router: Router) {
    console.log('view constructor');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const news_id = +params['news_id'];
      console.log(news_id);
      this.adminService.findOneNews(news_id)
        .subscribe((res: NewsVO) => {
          this.news = res;
        });
    });

  }

  confirmDelete(news: NewsVO) {
    let dialogRef = this.dialog.open(ViewDialogComponent, {
      data: {content: '삭제하시겠습니까?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) { // 삭제하기
        this.adminService.removeNews(news.news_id)
          .subscribe((res: ResultVO) => {
            if (res.result === 0) {
              this.snackBar.open('삭제되었습니다.', null, {
                duration: 3000
              });
              this.router.navigateByUrl('/admin/news');
            }
          });
      }
    });
  }
}
