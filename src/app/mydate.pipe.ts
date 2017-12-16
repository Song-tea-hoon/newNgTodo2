import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {
  //첫번째 파라미터 pipe앞의 변수, 두번째파라메터는 콜론 다음 변수
  transform(value: any, args?: any): any {
    console.log(`${value} : ${args}`);
    return value.substring(0, args);
  }

}
