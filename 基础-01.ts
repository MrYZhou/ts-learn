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
}