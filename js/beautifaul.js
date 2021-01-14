
window.onload = () => {

    console.log("app is already loaded")

    resetState()
    resetprogress()

    imagePath = JSON.parse(localStorage.getItem('imgePath'))
    if (imagePath == null){
        setLocalImage()
    }

    console.log("img path size" + imagePath.length + "first is==" + imagePath[0])
    var imgArea = document.getElementById("imgArea");
    for (let index = 0; index < imagePath.length; index++) {
        var imgDiv = document.createElement('div')
        var img = document.createElement("img");
        var deleteImage = document.createElement("img");
    
        imgDiv.style.display = "inline-block"

        img.height = 80;
        var path = imagePath[index].split("&")
        if(index>0){
            img.style.marginLeft=8
        }

        if(index<=2){
            
            img.src = path[1]
            img.alt = path[1]
            console.log("pre add image path is =="+path[1])
        }else{
            img.src = path[0]
            img.alt = path[1]
        }
        
        imgDiv.alt = imagePath[index]

        deleteImage.width = 20
        deleteImage.height = 20
        deleteImage.top=0
        deleteImage.right=0
        deleteImage.src = "./images/icon16.png"
        
        imgDiv.appendChild(img)
        
        //default image not set delete image
        if(index>2){
            imgDiv.appendChild(deleteImage)
        }
        imgArea.appendChild(imgDiv)


        deleteImage.onclick = (function (dImage) {
            return function (e) {
                var parent = dImage.parentElement
                imgArea.removeChild(parent)
                imagePath.remove(parent.alt)
                localStorage.setItem("imgePath", JSON.stringify(imagePath))
            };
        })(img);

        img.onclick = (function (Image) {
            return function (e) {
                console.log("Cache图片路径是" + Image.alt)
            };
        })(img);


        // mouse listioner 
        imgDiv.onmouseenter = (function (ImgeDiv) {
            return function (e) {
                console.log("mouse enter" + ImgeDiv.alt)
            };
        })(img);

        imgDiv.onmouseout = (function (ImgeDiv) {
            return function (e) {
                console.log("mouse out" + ImgeDiv.alt)
            };
        })(img);

    }

}


// add default images 
function setLocalImage() {
    path1="base64&"+"./images/bg1.jpg"
    path2="base64&"+"./images/bg2.jpg"
    path3="base64&"+"./images/bg3.jpg"

    imagePath=new Array()
    
    imagePath.unshift(path1,path2,path3)    
}


var port = chrome.runtime.connect() //for background.js


// for array delete element
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
// for array delete element

var smoothSkin = document.getElementById('smoothSkin');
var whiteSkin = document.getElementById('whiteSkin');
var bigEye = document.getElementById('bigEye');
var bigMouth = document.getElementById('bigMouth');
var thnFace = document.getElementById('thnFace');
var shaveFace = document.getElementById('shaveFace');
var changeChin = document.getElementById('changeChin');
var thinEye = document.getElementById('thinEye');
var thinNose = document.getElementById('thinNose');
var changeHead = document.getElementById('changeHead');

var bgMax = document.getElementById('bgMax');
var bgMin = document.getElementById('bgMin');

var switchBgSeg = document.getElementById('switchBgSeg');
var bgSegState = document.getElementById('bgSegState');

var switchBlur = document.getElementById('switchBlur');
var blurState = document.getElementById('blurState');

var switchFace = document.getElementById('switchFace');
var facebgstate = document.getElementById('facebgstate');

var addImage = document.getElementById('addImage');
var filePrew = document.getElementById('filePrew');

var imagePath = new Array()                    // create image path array for record image path


bgMax.addEventListener('input', function () {
    chrome.system.beautify.setBGMax(parseInt(bgMax.value));
    localStorage.setItem("bgMax", JSON.stringify((bgMax.value)))
})

bgMin.addEventListener('input', function () {
    chrome.system.beautify.setBGMin(parseInt(bgMin.value));
    localStorage.setItem("bgMin", JSON.stringify((bgMin.value)))
})

smoothSkin.addEventListener('input', function () {
    chrome.system.beautify.setSmoothSkin(parseInt(smoothSkin.value));
    localStorage.setItem("smoothSkinValue", JSON.stringify((smoothSkin.value)))
})

whiteSkin.addEventListener('input', function () {
    chrome.system.beautify.setWhiteSkin(parseInt(whiteSkin.value));
    localStorage.setItem("whiteSkin", JSON.stringify((whiteSkin.value)))
})
bigEye.addEventListener('input', function () {
    chrome.system.beautify.setBigEye(parseInt(bigEye.value));
    localStorage.setItem("bigEye", JSON.stringify((bigEye.value)))
})

bigMouth.addEventListener('input', function () {
    chrome.system.beautify.setBigMouse(parseInt(bigMooth.value));
    localStorage.setItem("bigMooth", JSON.stringify((bigMooth.value)))
})

thnFace.addEventListener('input', function () {
    chrome.system.beautify.setThinFace(parseInt(thnFace.value));
    localStorage.setItem("thnFace", JSON.stringify((thnFace.value)))
})

shaveFace.addEventListener('input', function () {
    chrome.system.beautify.setShaveFace(parseInt(shaveFace.value));
    localStorage.setItem("shaveFace", JSON.stringify((shaveFace.value)))
})

thinEye.addEventListener('input', function () {
    chrome.system.beautify.setThinEye(parseInt(thinEye.value));
    localStorage.setItem("thinEye", JSON.stringify((thinEye.value)))
})

thinNose.addEventListener('input', function () {
    chrome.system.beautify.setThinNose(parseInt(thinNose.value));
    localStorage.setItem("thinNose", JSON.stringify((thinNose.value)))
})

changeChin.addEventListener('input', function () {
    chrome.system.beautify.setShortChin(parseInt(changeChin.value));
    localStorage.setItem("changeChin", JSON.stringify((changeChin.value)))
})
changeHead.addEventListener('input', function () {
    chrome.system.beautify.setShortForehead(parseInt(changeHead.value));
    localStorage.setItem("changeHead", JSON.stringify((changeHead.value)))
})


function resetprogress() {

    console.log("get the smooth skin value is"+smoothSkinValue)


    var bgMax=JSON.parse(localStorage.getItem('bgMax'))
    if(bgMax==null){
	    chrome.system.beautify.setSmoothSkin(parseInt(0))
    }else{
        chrome.system.beautify.setSmoothSkin(bgMax)
    }

    var bgMin=JSON.parse(localStorage.getItem('bgMin'))
    if(bgMin==null){
	    chrome.system.beautify.setWhiteSkin(parseInt(0))
    }else{
        chrome.system.beautify.setWhiteSkin(bgMin)
    }

    var smoothSkinValue=JSON.parse(localStorage.getItem('smoothSkinValue'))
    if(smoothSkinValue==null){
	    chrome.system.beautify.setSmoothSkin(parseInt(0))
    }else{
        chrome.system.beautify.setSmoothSkin(smoothSkinValue)
    }

    var whiteSkin=JSON.parse(localStorage.getItem('whiteSkin'))
    if(whiteSkin==null){
	    chrome.system.beautify.setWhiteSkin(parseInt(0))
    }else{
        chrome.system.beautify.setWhiteSkin(whiteSkin)
    }


    var bigEye=JSON.parse(localStorage.getItem('bigEye'))
    if(bigEye==null){
	    chrome.system.beautify.setWhiteSkin(parseInt(0))
    }else{
        chrome.system.beautify.setWhiteSkin(bigEye)
    }

    var bigMooth=JSON.parse(localStorage.getItem('bigMooth'))
    if(bigMooth==null){
	    chrome.system.beautify.setWhiteSkin(parseInt(0))
    }else{
        chrome.system.beautify.setWhiteSkin(bigMooth)
    }


    var thnFace=JSON.parse(localStorage.getItem('thnFace'))
    if(thnFace==null){
	    chrome.system.beautify.setWhiteSkin(parseInt(0))
    }else{
        chrome.system.beautify.setWhiteSkin(thnFace)
    }


    var shaveFace=JSON.parse(localStorage.getItem('shaveFace'))
    if(shaveFace==null){
	    chrome.system.beautify.setWhiteSkin(parseInt(0))
    }else{
        chrome.system.beautify.setWhiteSkin(shaveFace)
    }


    var thinEye=JSON.parse(localStorage.getItem('thinEye'))
    if(thinEye==null){
	    chrome.system.beautify.setWhiteSkin(parseInt(0))
    }else{
        chrome.system.beautify.setWhiteSkin(thinEye)
    }

    var thinNose=JSON.parse(localStorage.getItem('thinNose'))
    if(thinNose==null){
	    chrome.system.beautify.setWhiteSkin(parseInt(0))
    }else{
        chrome.system.beautify.setWhiteSkin(thinNose)
    }


    var changeChin=JSON.parse(localStorage.getItem('changeChin'))
    if(thinEye==null){
	    chrome.system.beautify.setWhiteSkin(parseInt(0))
    }else{
        chrome.system.beautify.setWhiteSkin(changeChin)
    }

    var changeHead=JSON.parse(localStorage.getItem('changeHead'))
    if(thinEye==null){
	    chrome.system.beautify.setWhiteSkin(parseInt(0))
    }else{
        chrome.system.beautify.setWhiteSkin(changeHead)
    }
   
}

switchBlur.addEventListener('click', function () {

    if (!switchBlur.checked) {
       
        chrome.system.beautify.enableBlur(false)
        blurState.style.display = "none";
        localStorage.setItem("switchBlur", JSON.stringify("none"))
    } else {
        chrome.system.beautify.enableBlur(true)
        blurState.style.display = "block";
        localStorage.setItem("switchBlur", JSON.stringify("block"))
    }
})

switchBgSeg.addEventListener('click', function () {

    if (!switchBgSeg.checked) {
        bgSegState.style.display = "none";
        chrome.system.beautify.enableBG(false)
        localStorage.setItem("switchBgSeg", JSON.stringify("none"))
    } else {
        chrome.system.beautify.enableBG(true)
        bgSegState.style.display = "block";
        localStorage.setItem("switchBgSeg", JSON.stringify("block"))
    }
})

switchFace.addEventListener('click', function () {
    if (!switchFace.checked) {
        
        chrome.system.beautify.enableBeautify(false)
        facebgstate.style.display = "none";
        console.log("checked value is== hidden")
        localStorage.setItem("switchFace", JSON.stringify("none"))
      
    } else {
        chrome.system.beautify.enableBeautify(true)
        facebgstate.style.display = "block";
        localStorage.setItem("switchFace", JSON.stringify("block"))
    }
})



// reset the application switch button state
function resetState() {

    var switchBlure=JSON.parse(localStorage.getItem('switchBlur'))
    var switchBg=JSON.parse(localStorage.getItem('switchBgSeg'))
    var switchF=JSON.parse(localStorage.getItem('switchFace'))
 
    if(switchBlure=="none"){
         console.log("swtch blure none")
         switchBlur.checked=false
         blurState.style.display="none"
    }else{
        console.log("swtch blure visible")
        switchBlur.checked=true
        blurState.style.display="block"
    }
 
    if(switchBg=="none"){
        console.log("swtch BgSeg none")
        switchBgSeg.checked=false
        bgSegState.style.display="none"
    }else{
        console.log("swtch BgSeg visible")
        switchBgSeg.checked=true
        bgSegState.style.display="block"
    }
 
 if(switchF=="none"){
        console.log("swtch blure none")
        switchFace.checked=false
        facebgstate.style.display="none"
    }else{
        console.log("swtch Face visible")
        switchFace.checked=true
        facebgstate.style.display="block"
    }

 }


filePrew.addEventListener('change', function (e) {
    handleFiles(this.files)
    console.log(e.target.files[0]+"11111111111111")
})

function initCpu() {

    chrome.system.cpu.getInfo(function (cpuInfo) {

        var cpuName = cpuInfo.modelName.replace(/\(R\)/g, '®').replace(/\(TM\)/, '™');
        console.log("cpuName-" + cpuName);

        var cpuArch = cpuInfo.archName.replace(/_/g, '-');
        console.log("cpuArch-" + cpuArch);

        var cpuFeatures = cpuInfo.features.join(', ').toUpperCase().replace(/_/g, '.') || '-';
        console.log("cpuFeatures-" + cpuFeatures);
    });

}

function handleFiles(files) {

    var imgArea = document.getElementById('imgArea');
    for (var i = 0; i < files.length; i++) {

        let file = files[i];
        var imageType = /^image\//;

        if (!imageType.test(file.type)) {
            continue;
        }
        
        console.log("local image path is" + getObjectURL(file))
        var img = document.createElement("img");
        var deleteImage = document.createElement("img");           //delete button
        var imgDiv = document.createElement('div')
        var localPath = document.getElementById("filePrew").value

        img.addEventListener('click', function () {
            var path = img.alt.split("&")
            console.log("图片路径是" + path[1])
        })

        deleteImage.onclick = (function (dImage) {
            return function (e) {
                var parent = dImage.parentElement
                imgArea.removeChild(parent)
                imagePath.remove(parent.alt)
                localStorage.setItem("imgePath", JSON.stringify(imagePath))
            };
        })(img);        

        imgDiv.style.display = "inline-block"

        img.width = 80;
        img.height = 80;
        img.style.position = "relative";
        img.style.display = "inline-block"
        img.classList.add("obj");
        img.file = file;

        deleteImage.width = 20;
        deleteImage.height = 20;
        deleteImage.top = 0
        deleteImage.right = 0

        deleteImage.style.position = "relative";

        // 假设 "preview" 是将要展示图片的 div
        imgDiv.appendChild(img);
        imgDiv.appendChild(deleteImage)
        imgArea.appendChild(imgDiv)
        try {
            let reader = new FileReader();
            reader.onload = (function (aImg) {
                return function (e) {
                    aImg.src = e.target.result;
                    img.alt = e.target.result + "&" + localPath;
                    aImg.style.marginLeft=8
                    deleteImage.src = "./images/icon16.png"
                    setImage(img.alt)
                    imgDiv.alt=img.alt
                    console.log("进入onload" + e.target.result)

                };
            })(img);

            reader.readAsDataURL(file);

        } catch (error) {

        }

        function setImage(path) {

            if (imagePath != null) {
                imagePath.push(path)
            } else {
                imagePath = new Array()
                imagePath.push(path)
            }

            console.log("image path size  == " + imagePath.length)
            localStorage.setItem("imgePath", JSON.stringify(imagePath))
            for (let index = 0; index < imagePath.length; index++) {
                console.log("get image path from localstorage" + imagePath[index])
            }

        }

    }
    
}

function getObjectURL(file) {
    var url = null;
    if (window.createObjcectURL != undefined) {
        url = window.createOjcectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
