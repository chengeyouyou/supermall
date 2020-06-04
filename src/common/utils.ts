export function debounce(func: any, delay: number) {
    let timer: number | undefined = undefined;
    return function (this:void, ...args: Array<any>) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            console.log('refresh');
            func.apply(this, args);
        }, delay);
    };
}


