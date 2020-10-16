/* 
* @Author: Marte
* @Date:   2020-10-16 10:06:11
* @Last Modified by:   Marte
* @Last Modified time: 2020-10-16 11:22:56
*/

define(function(require,exports){
    function show(aA,aDiv){
        var firstHash = window.location.hash.substring(1) || 'index';
        // console.log(firstHash)
        for(var i =0; i<aDiv.length; i++){
            aDiv[i].style.display='none';
            if(firstHash==aDiv[i].dataset.hash){
                aDiv[i].style.display='block';
                switch(firstHash){
                    case 'index':
                        require('./indexIn.js').init(aDiv[i]);
                    break;
                    case 'student':
                        require('./studentIn.js').init(aDiv[i]);
                    break;
                    case 'message':
                        require('./messageIn.js').init(aDiv[i]);
                    break;
                }
            }
        }
    }
    exports.show = show;
})