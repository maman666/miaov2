/* 
* @Author: Marte
* @Date:   2020-10-16 10:51:02
* @Last Modified by:   Marte
* @Last Modified time: 2020-10-16 11:02:49
*/

define(function(require,exports){
    function init(aA,aDiv,hash){
        for(var i=0;i<aDiv.length;i++ ){
            if(aDiv[i].dataset.hash=='message'){
                startMove(aDiv[i],{width:0,height:0},function(){
                    window.location.hash = hash;
                    require('./show.js').show(aA,aDiv);
                })
            }
        }
    }
    exports.init = init;
})