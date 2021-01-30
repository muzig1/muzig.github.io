// 1. 接口定义
interface RectConfig {
    color?: string; // 3. 可选参数

    width: number;
    readonly height: number; // 4. 只读属性

    [propName: string]: any; // 5. 关闭额外类型检查
}

function createRect(
    c: RectConfig // 2. 形参约束
): {
    color: String;
    width: Number;
} {
    let rect = {
        color: "",
        width: 0
    };
    if (c.color) {
        rect.color = c.color;
    }
    if (c.width) {
        rect.width = c.width;
    }
    return rect;
}

let r = createRect({ width: 100, big: 0, height: 100 });

// ======

// 6. 函数类型
interface SearchFunc {
    (src: string, subString: string): boolean;
}

let f: SearchFunc;
// 形参名可以不一样
// 参数类型可以省略
f = function (src, sub) {
    return src.length > sub.length;
};

// ======

class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 7. 可索引类型
interface Zoo {
    [x: string]: Animal;
    [x: number]: Dog;
}

// 8. 字符串索引类型; 需要确保属性的返回类型与索引类型一致
interface NumberDic {
    [index: string]: number;
    len: number; // ok
    // name: string // not ok
}

// 9. 只读可索引类型
interface ReadonlyNumberDic {
    readonly [index: string]: number;
}

// ======

interface Human {
    name: string;
    tick(): Date;
}

// 10. 继承接口
class Student implements Human {
    name: string;
    tick(): Date {
        return new Date();
    }
}

// 11. 类静态部分约束
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(
    ctor: ClockConstructor,
    hour: number,
    minute: number
): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// ======

// 12. 接口继承
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// ======

// 13. 混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) {};
    counter.interval = 123;
    counter.reset = function () {};
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// ======

// 14. 接口继承类
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() {}
}

class TextBox extends Control {
    select() {}
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() {}
}

class Location {}
