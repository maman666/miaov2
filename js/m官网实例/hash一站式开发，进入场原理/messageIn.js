/* 
* @Author: Marte
* @Date:   2020-10-16 10:30:04
* @Last Modified by:   Marte
* @Last Modified time: 2020-10-16 11:34:01
*/

define(function(require,exports){
    function init(obj){
            startMove(obj,{width:400,height:200},function(){
                window.bBtn = true;
            })
    }
    exports.init = init;
})