

var greet = "heyy";
// function f(){
//     var greet1="hi"
//     let greeet= "hello";
//     console.log(greet);
//     console.log(greeet);
// }
// console.log(greet1);
// console.log(greeet);

let a=5;
let b="5";
if(a==b){
    console.log("value match")
}
if(a===b){
    console.log("match")
}

const obj ={
    age:23
}
// obj.age=30
console.log(obj);

function f1(obj){
    console.log(obj);
    obj.age=40;
}
f1(obj);
console.log(obj);

console.log(2+5+"3");


const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log('Index: ' + i + ', element: ' + arr[i]);
  }, 0);
}


