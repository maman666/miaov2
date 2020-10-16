/* 
* @Author: Marte
* @Date:   2020-10-16 10:50:45
* @Last Modified by:   Marte
* @Last Modified time: 2020-10-16 11:02:38
*/

define(function(require,exports){
    function init(aA,aDiv,hash){
        for(var i=0;i<aDiv.length;i++ ){
            if(aDiv[i].dataset.hash=='student'){
                startMove(aDiv[i],{width:0,height:0},function(){
                    window.location.hash = hash;
                    require('./show.js').show(aA,aDiv);
                })
            }
        }
    }
    exports.init = init;
})