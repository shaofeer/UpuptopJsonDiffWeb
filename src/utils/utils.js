var jsUtil = {
  "isJSON": function (str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }

      } catch (e) {
        console.log('error：' + str + '!!!no json' + e);
        return false;
      }
    }
    console.log('It is not a string!')
  },
  "JSONSort": function (obj) {
    var result = {}
    console.log("args obj : ", obj);

    //排序
    obj = this.objKeySort(obj)

    for (let k in obj) {
      let v = obj[k]

      //判断是否是数组格式 数组格式单独处理
      if (v instanceof Array) {
        //循环数组中的数据 对数据进行排序
        v.sort()

        for (let i = 0; i < v.length; i++) {
          let arrItem = v[i]

          if (arrItem instanceof Object) {
            v[i] = this.JSONSort(arrItem)
          }

        }

        result[k] = v
      } else if (v instanceof Object) {
        result[k] = this.objKeySort(v)
      } else {
        result[k] = v;
      }
    }

    console.log("args result : ", result);

    return result;
  },
  "objKeySort": function (obj) {//排序的函数
    var newkey = Object.keys(obj).sort();
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
      newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
  }
}

export default jsUtil
