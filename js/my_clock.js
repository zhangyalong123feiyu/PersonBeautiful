function my_clock(el){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m=m>=10?m:('0'+m);
    s=s>=10?s:('0'+s);
    el.innerHTML = h+":"+m+":"+s;
    setTimeout(function(){my_clock(el)}, 1000);
}

var clock_div = document.getElementById('clock_div');
my_clock(clock_div);



var upload = document.getElementById('upload');

upload.addEventListener('change',function(){
    showPic(this)
})


function showPic(obj) {
    var fullPath = getFullPath(obj);
    if (fullPath) {
     
        obj.backgroundImage = "url(" + fullPath + ")";
 
    }

    function getFullPath(obj) {
        if (obj) {
            //Internet Explorer 
            if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                obj.select();
                return document.selection.createRange().text;
            }
            //Firefox
            if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
                if (obj.files) {
                    return obj.files.item(0).getAsDataURL();
                }
                return obj.value;
            }
    
            //兼容chrome、火狐等，HTML5获取路径       
            if (typeof FileReader != "undefined") {
                var reader = new FileReader();
                reader.onload = function(e) {
                    // document.getElementById("bg").background = e.target.result + "";
                    document.getElementById('bg').style.backgroundImage = "url(" + e.target.result + ")";
                    // storage.url = e.target.result;
                    updateImg();
                }
                reader.readAsDataURL(obj.files[0]);
            } else if (browserVersion.indexOf("SAFARI") > -1) {
                alert("暂时不支持Safari浏览器!");
            }
        }
    }

}