const db = require('./index');

// (async ()=>{
//     let res  =await db.find('user',{gender:'男'});
//     console.log(res);
// })()

// (async ()=>{
//     let res  = await db.insert('user',{name:'xxx',gender:'男',age:18});
//     console.log(res);
// })()

// (async ()=>{
//     let res  = await db.delete('user',{name:'xxx'});
//     console.log(res);
// })()

// (async ()=>{
//     let res  = await db.update('user',{name:'xiaoxie'},{$set:{age:18}});
//     console.log(res);
// })()

// (async ()=>{
//     let res  = await db.insert('user',[{name:'xxx1'},{name:'xx2'}]);
//     console.log(res);
// })()

// (async ()=>{
//     let res  = await db.delete('user',{});
//     console.log(res);
// })()

(async()=>{
    let res = await db.find('testimg',{});
    console.log(res);
})()