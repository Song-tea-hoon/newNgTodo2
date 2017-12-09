// 생성자 함수에서의 this의 의미
function person() {
    this.someValue = 2;
    var someValue2 = 3;
}

console.log(person()); //실행결과는? 그 이유는?

console.log(new person()); // 생성자 함수로 생성시 실행결과는?

console.log(someValue); // 실행결과와, 이유를 말하시오
//!! 일반적으로 this는 자기자신이 속한 function의 부모를 가르킨다.
