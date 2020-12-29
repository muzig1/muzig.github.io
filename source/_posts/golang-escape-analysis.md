---
title: Golang Escape Analysis
date: 2020-12-29 14:42:27
tags:
    - golang
    - escape-analysis
---

了解 Golang 语言的逃逸机制, 有助于在编写代码的时候绕开逃逸分析的缺陷, 从而编写更加高效的代码.

<!-- more -->

Go 语言较之 C 语言一个很大的优势就是自带 GC 功能，可 GC 并不是没有代价的。写 C 语言的时候，在一个函数内声明的变量，在函数退出后会自动释放掉，因为这些变量分配在栈上。如果你想要变量的数据能在函数退出后还能访问，就需要调用 malloc 方法在堆上申请内存，如果程序不再需要这块内存了，再调用 free 方法释放掉。Go 语言不需要你主动调用 malloc 来分配堆空间，编译器会自动分析，找出需要 malloc 的变量，使用堆内存。编译器的这个分析过程就叫做逃逸分析。

## 关于堆栈

区别如下:

1. 申请方式的不同。栈由系统自动分配，而堆是人为申请开辟;
2. 申请大小的不同。栈获得的空间较小，而堆获得的空间较大;
3. 申请效率的不同。栈由系统自动分配，速度较快，而堆一般速度比较慢;
4. 存储内容的不同。栈在函数调用时，函数调用语句的下一条可执行语句的地址第一个进栈，然后函数的各个参数进栈，其中静态变量是不入栈的。而堆一般是在头部用一个字节存放堆的大小，堆中的具体内容是人为安排;
5. 底层不同。栈是连续的空间，而堆是不连续的空间。

详细细节链接:

- [Language Mechanics On Stacks And Pointers](https://www.ardanlabs.com/blog/2017/05/language-mechanics-on-stacks-and-pointers.html)
- [Language Mechanics On Escape Analysis](https://www.ardanlabs.com/blog/2017/05/language-mechanics-on-escape-analysis.html)

```go
func stack() int { 
    // 变量 i 会在栈上分配
     i := 10
     return i
}
func heap() *int {
    // 变量 j 会在堆上分配
    j := 10
    return &j
}
```

```bash
# 分析汇编指令如下:
go build --gcflags '-l' test.go
go tool objdump ./test
```

> !!! 不要以为使用了堆内存就一定会导致性能低下，使用栈内存会带来性能优势。因为实际项目中，系统的性能瓶颈一般都不会出现在内存分配上。千万不要盲目优化，找到系统瓶颈，用数据驱动优化。

## 逃逸分析

需要使用堆空间则逃逸，这没什么可争议的。但编译器有时会将不需要使用堆空间的变量，也逃逸掉。这里是容易出现性能问题的大坑。网上有很多相关文章，列举了一些导致逃逸情况，其实总结起来就一句话：

**多级间接赋值容易导致逃逸。**

Go 语言中的引用类数据类型有 func, interface, slice, map, chan, *Type(指针)。

记住公式 Data.Field = Value，如果 Data, Field 都是引用类的数据类型，则会导致 Value 逃逸。这里的等号 = 不单单只赋值，也表示参数传递。

### 函数变量

> 若函数是变量, 且参数也是引用类型, 则会发生逃逸

### 间接赋值

> 良好的写法是, 在返回的时候再引用地址

```go
type Data struct {
    data  map[int]int
    slice []int
    ch    chan int
    inf   interface{}
    p     *int
}

func main() {
    d1 := Data{}
    d1.data = make(map[int]int) // GOOD: does not escape
    d1.slice = make([]int, 4)   // GOOD: does not escape
    d1.ch = make(chan int, 4)   // GOOD: does not escape
    d1.inf = 3                  // GOOD: does not escape
    d1.p = new(int)             //  GOOD: does not escape

    d2 := new(Data)             // d2 是指针变量， 下面为该指针变量中的指针成员赋值
    d2.data = make(map[int]int) // BAD: escape to heap
    d2.slice = make([]int, 4)   // BAD:  escape to heap
    d2.ch = make(chan int, 4)   // BAD:  escape to heap
    d2.inf = 3                  // BAD:  escape to heap
    d2.p = new(int)             // BAD:  escape to heap
}
```

### interface

只要使用了 Interface 类型(不是 interafce{})，那么赋值给它的变量一定会逃逸。因为 interfaceVariable.Method() 先是间接的定位到它的实际值，再调用实际值的同名方法，执行时实际值作为参数传递给方法。相当于interfaceVariable.Method.this = realValue

```go
type Iface interface {
    Dummy()
}
type Integer int
func (i Integer) Dummy() {}

func main() {
    var (
        iface Iface
        i     Integer
    )
    iface = i
    iface.Dummy() //  make i escape to heap
    // 形成 iface.Dummy.i = i
}
```

### channel

> 发送到 channel 的数据类型都将逃逸

```go
func test() {
    var (
        chInteger   = make(chan *int)
        chMap       = make(chan map[int]int)
        chSlice     = make(chan []int)
        chInterface = make(chan interface{})
        a, b, c, d  = 0, map[int]int{}, []int{}, 32
    )
    chInteger <- &a  // 逃逸
    chMap <- b       // 逃逸
    chSlice <- c     // 逃逸
    chInterface <- d // 逃逸
}
```

### 可变参数

可变参数如 func(arg ...string) 实际与 func(arg []string) 是一样的，会增加一层访问路径。这也是 fmt.Sprintf 总是会使参数逃逸的原因。

例子非常多，这里不能一一列举，我们只需要记住分析方法就好

即，2 级或更多级的访问赋值会容易导致数据逃逸。这里加上容易二字是因为随着语言的发展，相信这些问题会被慢慢解决，但现阶段，这个可以作为我们分析逃逸现象的依据。

```go
type User struct {
    roles []string
}

func (u *User) SetRoles(roles []string) {
    u.roles = roles
}

func SetRoles(u User, roles []string) User {
    u.roles = roles
    return u
}
```

```go
type User struct {
    A []string
}

func (u *User) Set(a []string) {
    u.A = a
}

func SetUser(user User, a []string) User {
	user.A = a
	return user
}

func BenchmarkUser(b *testing.B) {
    // BenchmarkUser-4   	39182143	        29.0 ns/op
	//u := new(User)
	//for i := 0; i < b.N; i++ {
	//	u.Set([]string{"a"})
	//}

    // BenchmarkUser-4   	1000000000	         0.585 ns/op
	for i := 0; i < b.N; i++ {
		_ = SetUser(User{}, []string{"a"})
	}
}
```

## 总结

1. 大多数情况下，性能优化都会为程序带来一定的复杂度。**建议实际项目中还是怎么方便怎么写，功能完成后通过性能分析找到瓶颈所在，再对局部进行优化。**
2. 多级间接赋值会导致 Go 编译器出现不必要的逃逸，在一些情况下可能我们只需要修改一下数据结构就会使性能有大幅提升。这也是很多人不推荐在 Go 中使用指针的原因，因为它会增加一级访问路径，而 map, slice, interface{}等类型是不可避免要用到的，为了减少不必要的逃逸，只能拿指针开刀了。

## 参考链接

- [达菲格-Go 语言内存管理（三）：逃逸分析](https://www.jianshu.com/p/518466b4ee96)