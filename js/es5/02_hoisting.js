//함수 호이스팅: 선언은 호이스팅이 되지만 대입은 되지 않는다.
hoisting1 = "hoisting1";
console.log(hoisting1);
var hoisting1;

console.log(hoisting2);
var hoisting2="hoisting2";

//함수 선언문은 호이스팅 된다.
myName("Yan", "Fan");

function myName(first, last) {
    console.log(first + last);
}

// 함수 표현식을 작성하고 테스트 하시오. 호이스팅 되는가?
// var myName = function(first, last) { // - 표현식은 호이스팅이 되지 않는다.
//   console.log(first + last);
// }
