// 常用类型
//布尔
const flag: boolean = true;
//数字
const num: number = 1;
// 字符串
const str: string = "larry";
// 数组
const arr: number[] = [1, 2, 3];
// 可以接对象,Object和小object都是类型。大Object可以包含所有，小object比大object少接5种类型
// 布尔,数字,字符串,null,undefined
const obj: object = {}
// 偷懒做法，不考虑啥类型，就直接用这个
const everything: any = 1
// 元组
const tuple: [string, number] = ["hello", 1];

//  拓展：
//  Enum 类型，any，null 和 undefined
// Unknown 类型，void 类型，never 类型