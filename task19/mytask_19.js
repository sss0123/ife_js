/**
 * Created by Administrator on 2016/4/16.
 */
function $(id){
    return document.getElementById(id);
}
function addEvent(element,type,handler){
    if (element.addEventListener){
        element.addEventListener(type,handler)
    } else if (element.attachEvent){
        element.attachEvent("on"+type,handler)
    } else{
        element["on"+type]=handler;
    }
}

var text=$("text");
var leftIn = $("left-in");
var leftOut = $("left-out");
var rightIn = $("right-in");
var rightOut = $("right-out");
var display = $("display");
var random=$("random");
var reset=$("reset");
var sort=$("sort");
var numArray=new Array();
var color=new Array;
var arrli=document.getElementsByTagName("li");
addEvent(leftIn,"click",function(){
    var content=text.value.trim();
    if(!content.match(/^\d+$/)||content<10||content>100){
        alert("请输入10-100以内的数字！");
        return;
    }
    if (numArray.length<60){
        numArray.unshift(content);
        var li=document.createElement("li");
        li.innerHTML=content;
        li.style.height=content+"%";
        display.insertBefore(li,display.firstElementChild );
        //renderArray();
    } else {
        alert("输入数据太多啦！不能超过60个！");
    }
    text.value="";
});
addEvent(rightIn,"click",function(){
    var content=text.value.trim();
    if(!content.match(/^\d+$/)||content<10||content>100){
        alert("请输入10-100以内的数字！");
        return;
    }
    if (numArray.length<60){
        numArray.unshift(content);
        var li=document.createElement("li");
        li.innerHTML=content;
        li.style.height=content+"%";
        display.appendChild(li);
    } else {
        alert("输入数据太多啦！不能超过60个！");
    }
    text.value="";
});
addEvent(leftOut,"click",function(){
    alert(display.firstElementChild.innerText);
    display.removeChild(display.firstElementChild);
});
addEvent(rightOut,"click",function(){
    alert(display.lastElementChild.innerText);
    display.removeChild(display.lastElementChild);
});
addEvent(display,"click",function(e){
    display.removeChild(e.target);
});
addEvent(random,"click",function(){
    randomQueue(60);
    renderArray();
})
addEvent(reset,"click",function(){
    numArray=[];
    renderArray();
})
addEvent(sort,"click",function(){
    BubbleSort(numArray)
})
//渲染数组
function renderArray() {
    var html = "";
    for ( x in numArray){
        html += "<li style='height: " + numArray[x] + "%; background: " + randomColor(x) + ";'><p>" + numArray[x] + "</p></li>";
    }
    display.innerHTML=html;
}
function randomColor(x){   //为什么x会出现undefined情况？？？影响结果颜色会出错
    var rand=Math.floor(Math.random()*0xFFFFFF).toString(16);

    if (rand.length==6){
        color[x]="#"+rand;
        return color[x];
    } else{
        return randomColor();  //这句是为啥
    }
}
//随机产生60个10~100的数
function randomQueue(number) {//生成随机数据
    numArray= [];
    for(var i = 0; i < number; i++) {
        numArray.push(Math.floor(Math.random() * 90 + 10));
    }
}
//冒泡排序
function BubbleSort(numArray){
    var len=numArray.length;
    var i= 0,j=0;
    var timer=setInterval(run,30);
    function run(){
        if (i<len){
            if (j<len-1-i){
                if (numArray[j]>numArray[j+1]) {
                    var temp = numArray[j];
                    numArray[j] = numArray[j + 1];
                    numArray[j + 1] = temp;
                    temp=color[j];
                    color[j]=color[j+1];
                    color[j+1]=temp;
                    arrli[j].style.height = numArray[j] + "%";
                    arrli[j].innerHTML = "<p>" + numArray[j] + "</p>";
                    arrli[j + 1].style.height = numArray[j + 1] + "%";
                    arrli[j + 1].innerHTML = "<p>" + numArray[j + 1] + "</p>";
                    arrli[j].style.background=color[j];
                    arrli[j + 1].style.background=color[j + 1];
                    //renderArray();
                }
                j++;
            } else {
                i++;
                j=0;
            }
        } else{
            clearInterval(timer);
            return;
        }
    }

}