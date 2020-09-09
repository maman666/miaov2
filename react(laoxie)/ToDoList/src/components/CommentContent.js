import React from 'react';

import CommentItem from './CommentItem';

function CommentContent(props){
    return <div className="omment-content">
        <ul>
            {
                props.datalist.map(item=><CommentItem key={item.id} data={item}/>)
            }
        </ul>

    </div>
}

export default CommentContent;