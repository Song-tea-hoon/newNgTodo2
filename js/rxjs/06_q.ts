import {Observable} from 'rxjs';

// 1 ~ 100000 사이 3또는 5의 배수의 갯수를 모두 구하시오.
// Observable.range(1, 100000) 사용
Observable.range(1, 100000).filter(num => num % 3 === 0 || num % 5 === 0).count().subscribe(data => console.log(data));
