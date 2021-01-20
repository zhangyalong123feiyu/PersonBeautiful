
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


var smoothSkin = document.getElementById('smoothSkin');
var whiteSkin = document.getElementById('whiteSkin');
var blurLevel = document.getElementById('blurLevel');

var bigEye = document.getElementById('bigEye');
var bigMouth = document.getElementById('bigMouth');
var thinFace = document.getElementById('thinFace');
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

blurLevel.addEventListener('input', function () {
    chrome.system.beautify.setBlurLevel(parseInt(blurLevel.value));
    localStorage.setItem("blurLevel", JSON.stringify((blurLevel.value)))
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
    chrome.system.beautify.setBigMouse(parseInt(bigMouth.value));
    localStorage.setItem("bigMouth", JSON.stringify((bigMouth.value)))
})

thinFace.addEventListener('input', function () {
    chrome.system.beautify.setThinFace(parseInt(thinFace.value));
    localStorage.setItem("thinFace", JSON.stringify((thinFace.value)))
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

    var bgMaxs=JSON.parse(localStorage.getItem('bgMax'))
    if(bgMaxs==null){
        chrome.system.beautify.setBGMax(parseInt(80))
        bgMax.value=80
    }else{
        bgMax.value=bgMaxs
        chrome.system.beautify.setBGMax(parseInt(bgMaxs))
    }

    var bgMins=JSON.parse(localStorage.getItem('bgMin'))
    if(bgMins==null){
        bgMin.value=20
	    chrome.system.beautify.setBGMin(parseInt(20))
    }else{
        bgMin.value=bgMins
        chrome.system.beautify.setBGMin(parseInt(bgMins))
    }

    var blurLevels=JSON.parse(localStorage.getItem('blurLevel'))
    if(blurLevels==null){
        blurLevel.value=20
	    chrome.system.beautify.setBlurLevel(parseInt(20))
    }else{
        blurLevel.value=blurLevels
        chrome.system.beautify.setBlurLevel(parseInt(blurLevels))
    }

    var smoothSkinValues=JSON.parse(localStorage.getItem('smoothSkinValue'))
    if(smoothSkinValues==null){
        smoothSkin.value=0
	    chrome.system.beautify.setSmoothSkin(parseInt(0))
    }else{
        smoothSkin.value=smoothSkinValues
        chrome.system.beautify.setSmoothSkin(parseInt(smoothSkinValues))
    }

    var whiteSkins=JSON.parse(localStorage.getItem('whiteSkin'))
    if(whiteSkins==null){
        whiteSkin.value=50
	    chrome.system.beautify.setWhiteSkin(parseInt(50))
    }else{
        whiteSkin.value=whiteSkins
        chrome.system.beautify.setWhiteSkin(parseInt(whiteSkins))
    }


    var bigEyes=JSON.parse(localStorage.getItem('bigEye'))
    if(bigEyes==null){
        bigEye.value=50
	    chrome.system.beautify.setBigEye(parseInt(50))
    }else{
        bigEye.value=bigEyes
        chrome.system.beautify.setBigEye(parseInt(bigEyes))
    }

    var bigMouths=JSON.parse(localStorage.getItem('bigMouth'))
    if(bigMouths==null){
        bigMouth.value=50
	    chrome.system.beautify.setBigMouth(parseInt(50))
    }else{
        bigMouth.value=bigMouths
        chrome.system.beautify.setBigMouth(parseInt(bigMouths))
    }


    var thinFaces=JSON.parse(localStorage.getItem('thinFace'))
    if(thinFaces==null){
        thinFace.value=50
	    chrome.system.beautify.setThinFace(parseInt(50))
    }else{
        thinFace.value=thinFaces
        chrome.system.beautify.setThinFace(parseInt(thinFaces))
    }


    var shaveFaces=JSON.parse(localStorage.getItem('shaveFace'))
    if(shaveFaces==null){
        shaveFace.value=0
	    chrome.system.beautify.setShaveFace(parseInt(0))
    }else{
        shaveFace.value=shaveFaces
        chrome.system.beautify.setShaveFace(parseInt(shaveFaces))
    }


    var thinEyes=JSON.parse(localStorage.getItem('thinEye'))
    if(thinEyes==null){
        thinEye.value=50
	    chrome.system.beautify.setThinEye(parseInt(50))
    }else{
        thinEye.value=thinEyes
        chrome.system.beautify.setThinEye(parseInt(thinEyes))
    }

    var thinNoses=JSON.parse(localStorage.getItem('thinNose'))
    if(thinNoses==null){
        thinNose.value=50
	    chrome.system.beautify.setThinNose(parseInt(50))
    }else{
        thinNose.value=thinNoses
        chrome.system.beautify.setThinNose(parseInt(thinNoses))
    }


    var changeChins=JSON.parse(localStorage.getItem('changeChin'))
    if(changeChins==null){
        changeChin.value=50
	    chrome.system.beautify.setShortChin(parseInt(50))
    }else{
        changeChin.value=changeChins
        chrome.system.beautify.setShortChin(parseInt(changeChins))
    }

    var changeHeads=JSON.parse(localStorage.getItem('changeHead'))
    if(changeHeads==null){
        changeHead.value=50
	    chrome.system.beautify.setShortForehead(parseInt(50))
    }else{
        changeHead.value=changeHeads
        chrome.system.beautify.setShortForehead(parseInt(changeHeads))
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
         chrome.system.beautify.enableBlur(false)
         blurState.style.display="none"
    }else{
        console.log("swtch blure visible")
        switchBlur.checked=true
        chrome.system.beautify.enableBlur(true)
        blurState.style.display="block"
    }
 
    if(switchBg=="none"){
        console.log("swtch BgSeg none")
        switchBgSeg.checked=false
        chrome.system.beautify.enableBG(false)
        bgSegState.style.display="none"
    }else{
        console.log("swtch BgSeg visible")
        switchBgSeg.checked=true
        chrome.system.beautify.enableBG(true)
        bgSegState.style.display="block"
    }
 
 if(switchF=="none"){
        console.log("swtch blure none")
        switchFace.checked=false
        chrome.system.beautify.enableBeautify(false)
        facebgstate.style.display="none"
    }else{
        console.log("swtch Face visible")
        switchFace.checked=true
        chrome.system.beautify.enableBeautify(true)
        facebgstate.style.display="block"
    }

 }


filePrew.addEventListener('change', function (e) {
    handleFiles(this.files)
    console.log(e.target.files[0]+"11111111111111")
})


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
