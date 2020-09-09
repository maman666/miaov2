const request = require('request');

const http = require('http');

http.createServer((req,res)=>{
    request('https://m.weibo.cn/api/config/list',(error,response,body)=>{
        res.writeHead(200,{
            'Access-Control-Allow-Origin':'http://localhost:3004'
        })
        console.log(res.end(body))
    })
}).listen(3006,()=>{
    console.log('server is running on http://localhost:3006')
})