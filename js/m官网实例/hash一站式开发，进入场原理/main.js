/* 
* @Author: Marte
* @Date:   2020-10-16 10:02:27
* @Last Modified by:   Marte
* @Last Modified time: 2020-10-16 11:20:55
*/

define(function(require,exports){
    var aA = document.querySelectorAll('a');
    var aDiv = document.querySelectorAll('div');
    //定义全局按钮 
    window.bBtn = true;
    window.onhashchange = function(){
            //点击前进，后退地时候刷新按钮 回车
            if(window.bBtn){
                window.location.reload();
            }
            
        }
    
    //来完成所有进场动画
    require('./show.js').show(aA,aDiv);
    //来完成所有出场动画
    require('./hide.js').hide(aA,aDiv);
})