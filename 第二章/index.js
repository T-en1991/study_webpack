var one =require('./1')
// var count=require('./1.js').count;
// var add=require('./1').add;


console.log(one.count)

one.add(2,3)

console.log(one.count)

one.count+=1;
console.log(one.count)
one.add(2,2)
console.log(one.count)
