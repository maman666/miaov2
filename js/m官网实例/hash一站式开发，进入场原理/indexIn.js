/* 
* @Author: Marte
* @Date:   2020-10-16 10:17:54
* @Last Modified by:   Marte
* @Last Modified time: 2020-10-16 11:34:00
*/

define(function(require,exports){
    function init(obj){
            startMove(obj,{width:400,height:400},function(){
                window.bBtn = true;
            })
    }
    exports.init = init;
})