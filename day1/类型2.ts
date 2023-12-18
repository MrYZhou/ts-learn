
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

// 类型别名,主要是省略代码量,用别名替代
type flag = string | number;
function hello(value: flag) {}

//交叉类型 合并两个对象的类型声明
type Flag1 = { x: number };
type Flag2 = Flag1 & { y: string };
let flag3: Flag2 = {
  x: 1,
  y: "hello"
};

//类型保护,我也不懂咋用
// typeof ,in,instanceof 
function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}
function fn(x: string | object) {
}
fn({a:1})