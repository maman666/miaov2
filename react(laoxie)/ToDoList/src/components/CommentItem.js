import React from 'react';

function CommentItem({data:{text,time}}){
    // 格式化时间 传一个时间进来
    let formatDate = date=>{
        return new Date(date).toLocaleDateString()
    }
    return <li>
        {text}
        <time>{formatDate(time)}</time>
    </li>
}

export default CommentItem;