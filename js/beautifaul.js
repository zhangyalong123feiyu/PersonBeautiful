
window.onload = () => {
  
    console.log("app is already loaded")
 
    imagePath=JSON.parse(localStorage.getItem('imgePath'))
    if(imagePath==null) return
    
    console.log("img path size"+imagePath.length+"first is=="+imagePath[0])
    for (let index = 0; index < imagePath.length; index++) {
        var img=document.createElement("img");
        console.log("create img "+imagePath[index])
        img.Width=80;
        img.height=80;
        var path=imagePath[index].split("&")
        img.src=path[0]
        document.getElementById("imgArea").appendChild(img);

        img.addEventListener('click',function(){
            console.log("Cache图片路径是"+ path[1])
          })

      }
    }


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
var switchBg=document.getElementById('switchBg');
var bgstate=document.getElementById('bgstate');

var addImage = document.getElementById('addImage');
var filePrew = document.getElementById('filePrew');

var imagePath=new Array()                    // set image path array for record image path


smoothSkin.addEventListener('input',function() {
    chrome.system.beautify.setSmoothSkin(parseInt(smoothSkin.value));
})

whiteSkin.addEventListener('input',function(){
    chrome.system.beautify.setWhiteSkin(parseInt(whiteSkin.value));
})
bigEye.addEventListener('input',function(){
    chrome.system.beautify.setBigEye(parseInt(bigEye.value));
})

bigMouth.addEventListener('input',function() {
    chrome.system.beautify.setBigMouse(parseInt(bigMooth.value));
})

thnFace.addEventListener('input',function(){
    chrome.system.beautify.setThinFace(parseInt(thnFace.value));
})

shaveFace.addEventListener('input',function(){
    chrome.system.beautify.setShaveFace(parseInt(shaveFace.value));
})

thinEye.addEventListener('input',function(){
    chrome.system.beautify.setThinEye(parseInt(thinEye.value));
})

thinNose.addEventListener('input',function(){
    chrome.system.beautify.setThinNose(parseInt(thinNose.value));
})

changeChin.addEventListener('input',function(){
    chrome.system.beautify.setShortChin(parseInt(changeChin.value));
})
changeHead.addEventListener('input',function(){
    chrome.system.beautify.setShortForehead(parseInt(changeHead.value));
})
switchBg.addEventListener('click',function(){
    if(switchBg.value=="checked"){
        
        bgstate.style.visibility="hidden";  
    }else{
        bgstate.style.visibility="visible";   
    }
})

filePrew.addEventListener('change',function() {
    handleFiles(this.files)
})

function initCpu() {

    chrome.system.cpu.getInfo(function(cpuInfo) {

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
  
      if ( !imageType.test(file.type) ) {
        continue;
      }

        var img = document.createElement("img");
       var localPath=document.getElementById("filePrew").value
      
      img.addEventListener('click',function(){
        var path=img.alt.split("&")
        console.log("图片路径是"+ path[1])
      })

      img.width=80;
      img.height=80;
      img.classList.add("obj");
      img.file = file;
      // 假设 "preview" 是将要展示图片的 div
      imgArea.appendChild(img);
      try {
      let reader = new FileReader();
      reader.onload = (function(aImg) {
        return function(e) {
          aImg.src = e.target.result;
          img.alt=e.target.result+"&"+localPath;
          setImage(img.alt)
          console.log("进入onload"+e.target.result)
        };
      })(img);
      
      reader.readAsDataURL(file);
      
    } catch (error) {
    
    }

    function setImage(path){
        
        if(imagePath!=null){
            imagePath.push(path)
        }else{
            imagePath=new Array()
            imagePath.push(path)
        }

        console.log("image path size  == "+imagePath.length)
        localStorage.setItem("imgePath",JSON.stringify(imagePath))
        for (let index = 0; index < imagePath.length; index++) {
            
            console.log("get image pathfrom localstorage"+imagePath[index])
          
          }
        
    }
      
}}






