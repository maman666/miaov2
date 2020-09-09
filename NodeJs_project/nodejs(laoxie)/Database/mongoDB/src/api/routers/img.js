 const Router = require('koa-router');

 const db = require('../db');

 var router = new Router(); //route是一个对象 koa中间件必须是一个函数

//  router.post('/',async (ctx,next)=>{
//     // let res = await db.find('user',{username});
//     let res = await db.find('user',{name:'xieyanhao'})
//      if(res.length>0){
//          ctx.body=res
//      }else{
//          ctx.body='no'
//      }
// })

 router.get('/',async (ctx,next)=>{
    // let res = await db.find('user',{username});
    let res = await db.find('testimg',{})
    console.log(res);
     if(res.length>0){
         ctx.body=res
     }else{
         ctx.body='no'
     }
})
module.exports=router