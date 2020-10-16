/* 
* @Author: Marte
* @Date:   2020-10-16 10:05:59
* @Last Modified by:   Marte
* @Last Modified time: 2020-10-16 11:15:55
*/

define(function(require,exports){
    function hide(aA,aDiv){
        for(var i =0; i<aA.length; i++){
            // aA[i].index = i;//自定义属性
            aA[i].onclick = function(){
                var hash = this.dataset.hash;
                //点击菜单地时候不让菜单刷新
                window.bBtn = false;

                //这里设置hash值(刷新页面还是这个页面)
                // window.location.hash = hash;
                // console.log(hash)
                switch(window.location.hash.substring(1) || 'index'){
                    case 'index':
                        require('indexOut.js').init(aA,aDiv,hash);
                    break;
                     case 'student':
                        require('studentOut.js').init(aA,aDiv,hash);
                    break;
                     case 'message':
                        require('messageOut.js').init(aA,aDiv,hash);
                    break;
                }
              
            }   
        }
    }
    exports.hide = hide;
})