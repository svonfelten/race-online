export function getSum(nb: number){
    let res = 0;
    for (let index = 1; index <= nb; index++) {
        res += index
    }
    return res;
}

export function sameSign(a: number, b: number){
    return (a >= 0 && b >= 0 ) || (a < 0 && b < 0);
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}