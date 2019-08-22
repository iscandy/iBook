import storage from 'good-storage'
const MAXLENGTH = 25;
const HSTKET = '_hstSearch_'

function insertArray(arr, val, compare, maxlength) {
    let index = arr.findIndex(compare) //获取到之前搜索的index（要是之前搜索过了index为-1）
    if (index == 0) { //当当前的是第一项，之前的也是在第一项，那么就不做任何添加操作
        return
    }
    arr.unshift(val) //将我们需要插入的项插第一位

    //之前有搜索过的记录
    if (index > 0) {
        arr.splice(index + 1, 1) //将之前的删除
    }

    if (maxlength && arr.length > maxlength) {
        arr.pop();
    }
}


//将搜索的关键字插入到列表中
export function setHstStorage(val) {
    let arr = storage.get(HSTKET, [])
        //对arr进行处理
    insertArray(arr, val, (item) => {
        return item == val
    }, MAXLENGTH)

    //保存原来的数据
    storage.set(HSTKET, arr)
}

//将搜索的关键字拿出来
export function getHstStorage() {
    console.log(storage.get(HSTKET, []));
    return storage.get(HSTKET, []);
}