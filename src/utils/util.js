//截流
//对一个函数做截流，就会返回新的函数，新函数是在延迟执行原函数
//如果很快的多次调用新函数，timer会被清空，不能多次调用原函数，实现截流
export function debounce(func, delay) {
    let timer
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}