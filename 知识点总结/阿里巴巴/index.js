
// 使用js实现一个持续的动画效果(方法一)
let dom = document.getElementById("dom"), flag = true, left = 0;
setInterval(() => {
    left == 0 ? flag = true : left == 100 ? flag = false : ""; 
    flag ? dom.style.left = ` ${left++}px` : dom.style.left = ` ${left--}px`
}, 1000 / 60);

//兼容性处理 window.requestAnimationFrame (方法二)
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { 
        window.setTimeout(
            callback, 1000 / 60); 
        }; 
    })(); 
    var dom1 = document.getElementById("dom1"); 
    var flag = true; 
    var left = 0; 
    function render() { 
        left == 0 ? flag = true : left == 100 ? flag = false : ''; 
        flag ? dom1.style.left = ` ${left++}px` : dom1.style.left = ` ${left--}px`; 
    } (function animloop() { 
        render(); 
        requestAnimFrame(animloop); 
    })();
    // ------------------------------------------------------------------------------ //