module pro {
// 拓展

//  Enum 类型，any，null 和 undefined
// Unknown 类型，void 类型，never 类型

//类型推论,在赋值的时候，ts能z自动推断类型
let count = 123; //为number类型

//类型断言,手动告诉编译器我要啥类型,这样编译器会给提示
  let param1 = "12121"
  let num1: number = (param1 as string).length;
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

// 不定参数
function sum(...numbers: number[]) {
  return numbers.reduce((val, item) => (val += item), 0);
}
console.log(sum(1, 2, 3));

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


// =================
// 接口

  // 定义任意属性,在定义接口的时候无法预先知道有哪些属性的时候,
  //可以使用 [propName:string]:any,propName 名字是任意的
  interface Person {
    id: number;
    name: string;
    [propName: string]: any;
  }

  let p1 = {
    id: 1,
    name: "hello",
    age: 10,
  };

  //接口的继承
  interface Speakable {
    speak(): void;
  }
  interface SpeakChinese extends Speakable {
    speakChinese(): void;
  }
  class Person3 implements SpeakChinese {
    speak() {
      console.log("Person");
    }
    speakChinese() {
      console.log("speakChinese");
    }
  }


  /**
   * interface和type定义类型区别？
   * 大部分情况一样，但是interface可以定义多次 会被自动合并为单个接口 类型别名不可以重复定义
   * 区别1
   * interface Point {
      x: number;
    }
    interface Point {
      y: number;
    }
    const point: Point = { x: 1, y: 2 };
    
    区别2:
    interface 可通过继承增加类型定义
    // 接口扩展接口
    interface PointX {
      x: number;
    }
  
    interface Point extends PointX {
      y: number;
    }
    // 类型通过&增加类型定义
    type PointX = {
      x: number;
    };
  
    type Point = PointX & {
      y: number;
    };
  */

// 泛型
  // 泛型类型别名
  type Cart<T> = { list: T[] } | T[];
  let c1: Cart<string> = { list: ["1"] };
  let c2: Cart<number> = [1];

  /**
   * 泛型参数的默认类型
   * 我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，
   * 从实际值参数中也无法推测出时，这个默认类型就会起作用,很多情况都可以自动推导
   */
  function createArray2<T = number>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
  console.log(createArray2(3, 1));


// =================
  /**
   * 装饰器
   * 装饰器是一种声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
    标注类上为类装饰器、
    标注属性上为属性装饰器、
    标注方法上为方法装饰器、
    标注参数上为参数装饰器
    装饰器的写法分为普通装饰器和装饰器工厂
    使用@装饰器的写法需要把 tsconfig.json 的 experimentalDecorators 字段设置为 true

   */

  namespace mtype {
    //还可以替换类,替换的类需和原类结构保持一致
    function enhancer(constructor: Function) {
      return class {
        name: string = "jiagou";
        age: number = 18
        eat() {
          console.log("吃饭饭\n");
        }
      };
    }
    @enhancer
    class Person {
      name!: string;
      age!: number
      eat!: Function;
      constructor() { }
    }
    let p: Person = new Person();
    console.log(p.name, p.age);
    p.eat();
  }



  /**
   * 装饰器带参数
   * @param name 
   */
  module decrator {
    function get(name: string) {
      return function (constructor: Function) {
        constructor.prototype.name = name;
        constructor.prototype.constructor = constructor
        console.log("类1装饰器");
      };
    }
    function mapping(constructor: Function) {
      constructor.prototype.name = "hello";
      constructor.prototype.eat = function () {
        console.log("eat");
      };
      console.log("类2装饰器");
    }
    function rollback() {
      return function (
        target: any,
        methodName: string,
        descriptor: PropertyDescriptor
      ) {
        console.log("方法装饰器");
      };
    }
    function param2() {
      return function (target: any, methodName: string, paramIndex: number) {
        console.log("参数1装饰器");
      };
    }

    function param(name:string) {
      return function (target: any, methodName: string, paramIndex: number) {
        console.log("参数1装饰器");
      };

    }
    function Log(target: Function, key: string, parameterIndex: number) {
      let functionLogged = key || target.prototype.constructor.name;
      console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
      been decorated`);
    }
    
    

    function valid(target: any, key: string, parameterIndex: number) {
      console.log("参数2装饰器",target,key,parameterIndex);
      // return function (target: any, methodName: string, paramIndex: number) {
      //   
      // };
    }
    function field(name: string) {
      return function (target: any, propertyName: string) {
        console.log(name + "属性装饰器");
      };
    }

    @mapping
    @get("/api/user")
    class Person {
      @field("name")
      name: string = "hello";
      @field("age")
      age: number = 10;
  
      @rollback()
      greet(@valid @param("name") name: string, @valid p2: string) { }
    }

    /**
    name属性装饰器
    age属性装饰器
    参数2装饰器
    参数1装饰器
    方法装饰器
    类2装饰器
    类1装饰器
     */


  }



}