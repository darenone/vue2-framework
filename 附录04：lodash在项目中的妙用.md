# lodash在项目中的妙用

lodash方法调用示例：

```js
import { difference, differenceWith, uniq, isEqual } from 'lodash'
// 或
import difference from 'lodash/difference'
```

## 一、数组类

# lodash在项目中的妙用

### 1、_.compact(array)

[作用]：剔除掉数组中的假值（假值包括`false`,`null`,`0`,`""`,`undefined`,和`NaN`这5个）元素，并返回一个新数组

[示例]：

```js
const _ = require('lodash')
console.log(_.compact([0, 1, false, 2, '', 3, undefined, 4, null, 5]));
// 输出 [ 1, 2, 3, 4, 5 ]
```

[项目中的应用]：剔除数组中的一些脏数据

### 2、_.difference(array, [values])

[作用]：过滤掉数组中的指定元素，并返回一个新数组

[示例]：

```js
const _ = require('lodash')
console.log(_.difference([1, 2, 3], [2, 4]))
// 输出 [ 1, 3 ]
const arr = [1, 2], obj = { a: 1 }
console.log(_.difference([1, arr, [3, 4], obj, { a: 2 }], [1, arr, obj]))
// 输出 [ 1, 3 ]
```

[类似方法]：

- _.pull(array, [values])，与_.difference不同之处在于_.pull会改变原数组
- _.without(array, [values]): 剔除所有给定值，并返回一个新数组，这个方法的作用和_.difference相同

[项目中的应用]：这个可以在某些场景代替掉`Array.prototype.filter`

### 3、_.last(array)

[作用]：返回数组的最后一个元素

[示例]：

```js
console.log(_.last([1, 2, 3, 4, 5]))
// 输出 5
```

[类似方法]：

- _.head(aray)方法，返回数组的第一项
- _.tail(array)方法，返回除了数组第一项以外的全部元素

[项目中的应用]：有了这个方法，就不需要通过`arr[arr.length - 1]`这样去取数组的最后一项了，比如一个省市区级联选择器Cascader，但传给后端的时候只需要最后一级的id，所以直接用_.last取最后一项给后端

### 4、_.chunk(array, [size=1])

[作用]：将数组按给定的size进行区块拆分，多余的元素会被拆分到最后一个区块当中，返回值是一个二维数组

[示例]：

```js
console.log(_.chunk([1, 2, 3, 4, 5], 2))
// 输出： [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
```

[项目中的应用]：比如你需要渲染出一个xx行xx列的布局，你就可以用这个方法将数据变变成一个二维数组arr，arr.length代表行数,arr[0].length代表列数

## 二、对象类

### 1、_.get(object, path, [defaultValue])

[作用]：从对象中获取路径path的值，如果获取值为undefined，则用defaultValue代替

[示例]：

```js
const _ = require('lodash')
const object = { a: { b: [{ c: 1 }, null] }, d: 3 };
 
console.log(_.get(object, 'a.b[0].c'));
// 输出 1
console.log(_.get(object, ['a', 'b', 1], 4));
// 输出 null
console.log(_.get(object, 'e', 5));
// 输出 5
```

[项目中的应用]：这个是获取数据的神器，再也不用写出if(a && a.b && a.b.c)的这种代码了，直接用_.get(a, 'b.c')搞定，_.get里面会帮你做判断，绝对省事


