const arr = [1, 2, 3];

Array.prototype.myMap = function (callback) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
        res.push(callback(this[i], i, this));
    }
    return res;
};

const res = arr.myMap((val, index, arr) => {
    return { value: val, index: index, array: arr };
});
console.log(res);
/*
[ { value: 1, index: 0, array: [ 1, 2, 3 ] }, 
  { value: 2, index: 1, array: [ 1, 2, 3 ] }, 
  { value: 3, index: 2, array: [ 1, 2, 3 ] } ] 
*/

