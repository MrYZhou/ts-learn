module base {
 
// 1.类型
//布尔
const flag: boolean = true;
//数字
const num: number = 1;
// 字符串
const str: string = "larry";
// 数组
const arr: number[] = [1, 2, 3];
// 可以接对象,大Object和小object都是类型。大Object可以包含所有，小object比大object少接5种类型
// 布尔,数字,字符串,null,undefined
const obj: object = {}
// 元组
const tuple: [string, number] = ["hello", 1];

//联合类型(Union Types), 就是一个变量可以接收多种类型
let myStatus1: number | string
myStatus1 = "1"
myStatus1 = 1

// 偷懒做法，不考虑啥类型，就直接用这个
const everything: any = 1

// ===========================
// 2.函数
function hello(name: string): void {
  console.log("hello", name);
}
hello("larry");

//可选参数,注意和不定参数一样要在最后一个
function print(name: string, age?: number): void {
  console.log(name, age);
}
print("1", 2);

// 默认参数
function ajax(url: string, method: string = "GET") {
  console.log(url, method);
}
ajax("/users");


//==========
// 类:
// 属性，静态属性，
// 1个构造方法，get/set , 静态方法，实例方法
// 修饰符有3个,默认public修饰符 public（全部都能访问）, protected (自己和子类) ,private (自己)
//==========
console.log('\n\n\n类================');

class User {
  private readonly myname: string; // 只可以在构造函数时候赋值
  protected static myName: string = "静态名称属性";
  public priname!: string //！代表的是无需初始化,其他都是要初始化
  constructor(myname: string) {
    this.myname = myname;
  }
  static getmyName() {
    console.log(this); //注意静态方法里面的this指向的是类本身 而不是类的实例对象 所以静态方法里面只能访问类的静态属性和方法
    return this.myName;
  }

  get name() {
    return this.myname;
  }
  set name(value:string) {
    // this.myname = value;
  }
  get getPriname() {
    return this.priname;
  }
  set setPriname(value:string) {
    console.log(value);
    this.priname = value;
  }
}
// user是User类型
let user = new User("123");
user.name = "world";
user.setPriname="11"
console.log(user, User.getmyName());

// =================
// 接口
  interface Speakable {
    id: number;
    name: string;
    speak(): void;
  }
  interface Eatable {
    eat(): void;
  }
  //一个类可以实现多个接口
  class Person2 implements Speakable, Eatable {
    id!: number;
    name!: string;
    eat(): void {
      throw new Error("Method not implemented.");
    }
    speak() {
      console.log("Person说话");
    }
  }

  // =================
  // 泛型,正常应该算进阶知识，但是ts的代码几乎处处都是泛型，所以必学
  // 普通
  function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
  createArray<string>(3, "x"); // ['x', 'x', 'x']

  // 元组,多参数
  function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
  }
  swap([7, "seven"]); // ['seven', 7]

  // 泛型约束
  /**
   * function loggingIdentity<T>(arg: T): T {
      console.log(arg.length);
      return arg;
    }
    此处会报错，因为不知道类型有没有length.所以我们可以对类型进行约束，让编译器
    判断可不可以调方法
   */
  interface Lengthwise {
    length: number;
  }
  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
  }

  // 泛型接口,定义接口的时候也可以指定泛型
  interface Cart<T> {
    list: T[];
  }
  let cart: Cart<{ name: string; price: number }> = {
    list: [{ name: "hello", price: 10 }],
  };
  console.log(cart.list[0].name, cart.list[0].price);

  // 泛型类,获取长度例子
  class MyArray<T> {
    private list: T[] = [];
    add(value: T) {
      this.list.push(value);
    }
    getMax(): T {
      let result = this.list[0];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i] > result) {
          result = this.list[i];
        }
      }
      return result;
    }
  }
  let arr1 = new MyArray();
  arr1.add(1);
  arr1.add(2);
  arr1.add(3);
  let ret = arr1.getMax();
  console.log(ret);


  // 技巧
  // typeof 获取一个变量的类型
  //先定义变量，再定义类型
  let p2 = {
    name: "hello",
    age: 10,
    gender: "male",
  };
  type People = typeof p2;
  function getName(p: People): string {
    return p.name;
  }
  console.log('名字是', getName(p2));



  // keyof 获取一个对象接口的所有 key 值。然后可以约束传进来的key是啥
  interface Person {
    name: string;
    age: number;
    gender: "male" | "female";
  }
  //type PersonKey = 'name'|'age'|'gender';
  type PersonKey = keyof Person;
  function getValueByKey(p: Person, key: PersonKey) {
    return p[key];
  }
  let val = getValueByKey({
    name: "hello",
    age: 10,
    gender: "male"
  }, "name");
  console.log(val);


  // 映射类型in 在定义的时候用 in 操作符去批量定义类型中的属性
  interface Person {
    name: string;
    age: number;
    gender: "male" | "female";
  }
  //批量把一个接口中的属性都变成可选的
  type PartPerson = {
    [Key in keyof Person]?: Person[Key];
  };
  let p1: PartPerson = {};

  //infer关键字 在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。
  type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;


  // 内置工具类型,常用的工具

  /**
   *  1.Exclude<T,U> 。t中不能带u的类型
        type Exclude<T, U> = T extends U ? never : T;
        type E = Exclude<string | number, string>;
        let e: E = 10;
   */



  /**
   * 2.Extract<T,U> t和u的共有类型
      type Extract<T, U> = T extends U ? T : never;
      type E = Extract<string | number, string|boolean>;
      let e: E = "1";
   */

}