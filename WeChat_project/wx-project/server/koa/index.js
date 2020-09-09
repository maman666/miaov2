const Koa = require('koa');

const Router = require('koa-router');

const koaBody = require('koa-body');

const app = new Koa();

const appRouter = new Router();

appRouter.post('/hello',(ctx,next)=>{
    let bd = ctx.request.body;
    console.log('bd',bd)
    ctx.body={
        code:0,
        msg:`你好 ${bd.name},请求成功`
    }
})
 
app.use(koaBody());
app.use(appRouter.routes());

app.listen(3000,()=>{
    console.log('server is listening on port 3000')
});
    
    
