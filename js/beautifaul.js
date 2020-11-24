
var smoothSkin = document.getElementById('smoothSkin');
var whiteSkin = document.getElementById('whiteSkin');
var bigEye = document.getElementById('bigEye');
var thnFace = document.getElementById('thnFace');
var shaveFace = document.getElementById('shaveFace');
var changeChin = document.getElementById('changeChin');
var bigMooth = document.getElementById('bigMooth');
var thinNose = document.getElementById('thinNose');
var changeHead = document.getElementById('changeHead');
var thinEye = document.getElementById('thinEye');



smoothSkin.addEventListener('click',function() {
    console.log("smoothSkin")
    initCpu()
})

whiteSkin.addEventListener('click',function(){
    alert(this.value)
})
bigEye.addEventListener('click',function(){
    alert(this.value)
})
thnFace.addEventListener('click',function(){
    alert(this.value)
})
shaveFace.addEventListener('click',function(){
    alert(this.value)
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