// 생성자 함수에서의 this의 의미
function person() {
    this.someValue = 2;
    var someValue2 = 3;
}

console.log(person()); //실행결과는? 그 이유는?

console.log(new person()); // 생성자 함수로 생성시 실행결과는?
// new 생성자함수로 생성시 내부적으로 자기자신을 가리키는 this가 생성
// return이 없다면 this가 자동적으로 리턴

// 일반적으로 this는 자기자신이 속한 function의 부모를 가르킨다.
console.log(someValue); // 실행결과와, 이유를 말하시오
