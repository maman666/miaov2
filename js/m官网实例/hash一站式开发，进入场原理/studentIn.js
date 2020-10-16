/* 
* @Author: Marte
* @Date:   2020-10-16 10:29:50
* @Last Modified by:   Marte
* @Last Modified time: 2020-10-16 11:34:02
*/

define(function(require,exports){
    function init(obj){
            startMove(obj,{width:200,height:400},function(){
                window.bBtn = true;
            })
    }
    exports.init = init;
})