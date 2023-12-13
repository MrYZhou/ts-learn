
//联合类型(Union Types), 就是一个变量可以接收多种类型

let myStatus: number | string
myStatus = "1"
myStatus = 1


// 拓展
//类型推论,在赋值的时候，ts能z自动推断类型
let count = 123; //为number类型

//类型断言,手动告诉编译器我要啥类型,这样编译器会给提示
let param = "12121"
let num1: number = (param as string).length;
console.log(num1);
