


// 拓展

//  Enum 类型，any，null 和 undefined
// Unknown 类型，void 类型，never 类型

//类型推论,在赋值的时候，ts能z自动推断类型
let count = 123; //为number类型

//类型断言,手动告诉编译器我要啥类型,这样编译器会给提示
let param = "12121"
let num1: number = (param as string).length;
console.log(num1);

// 类型别名,主要是省略代码量,用别名替代
type flag = string | number;
function hello1(value: flag) { }

//交叉类型 合并两个对象的类型声明
type Flag1 = { x: number };
type Flag2 = Flag1 & { y: string };
let flag3: Flag2 = {
  x: 1,
  y: "hello"
};


//类型保护,我也不懂咋用???
// typeof ,in,instanceof 
function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}
function fn(x: string | object) {
}
fn({ a: 1 })


// 函数类型
type SumFunc = (x: number, y: number) => number;
let countNumber: SumFunc = function (a, b) {
  return a + b;
};
// 函数重载,ts一下子创建多个函数在同一个方法体中（不要使用）
let obj1: any = {};
function attr(val: string): void;
function attr(val: number): void;
function attr(val: any): void {
  if (typeof val === "string") {
    obj1.name = val;
  } else {
    obj1.age = val;
  }
}
attr("hahaha");
attr(9);

// 继承类
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    //构造函数
    this.name = name;
    this.age = age;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
}
class Student extends Person {
  no: number;
  constructor(name: string, age: number, no: number) {
    super(name, age);
    this.no = no;
  }
  getNo(): number {
    return this.no;
  }
}
let s1 = new Student("hello", 10, 1);
console.log(s1);

// 抽象类
abstract class Animal {
  name!: string;
  abstract speak(): void;
}
class Cat extends Animal {
  speak() {
    console.log("喵喵喵");
  }
}
// let animal = new Animal(); //直接报错 无法创建抽象类的实例
let cat = new Cat();
cat.speak();

// 继承和抽象常配合使用
abstract class Animal1 {
  // 声明抽象的方法，让子类去实现
  abstract sleep(): void;
}
class Dog1 extends Animal1 {
  sleep() {
    console.log("dog sleep");
  }
}
let dog1 = new Dog1();
class Cat1 extends Animal1 {
  sleep() {
    console.log("cat sleep");
  }
}
let cat1 = new Cat1();
let animals: Animal1[] = [dog1, cat1];
animals.forEach((i) => {
  i.sleep();
});



