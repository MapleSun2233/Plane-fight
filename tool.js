var trueCanvas = document.getElementById('canvas');
var trueCtx = trueCanvas.getContext('2d');
//获取到画布元素
var canvas = document.createElement('canvas');
// 获取信息栏
var infoP = document.getElementById('infoP');
var infoPSpans = infoP.getElementsByTagName('span');
var energyinfo = infoPSpans[0];
var timeinfo = infoPSpans[1];
var scoreinfo = infoPSpans[2];

// 定义画布大小
trueCanvas.width = canvas.width=1024;
trueCanvas.height = canvas.height=768;
//获取画笔
var ctx = canvas.getContext('2d');
// 获取区域视图
var view = document.getElementById('view');
var getBox = view.getElementsByTagName('div')[0];
var logo = document.getElementsByClassName('logo')[0];

//获取按钮
var btn = document.getElementById('btns');
var btns = $(btn).children();
//定义图形存储
var img = {
    planet: [],
    aestroid: [],
    ship: [],
    friend: [],
    me: [new Image()],
    bullet:[new Image()],
    energy:[new Image()],
    burst:[new Image()],
    bg:[new Image()]
};

//准备图形素材
function readyImg(){
    //加载行星
    for(var i = 1 ; i <=9 ; i++){
        img.planet[i-1]=new Image();
        img.planet[i-1].src = './image/00'+i+'-planet.png';
    }
    // 加载陨石
    for(var i = 1;i<=4;i++){
        img.aestroid[i-1]=new Image();
        img.aestroid[i-1].src='./image/aestroid'+i+'.png';
    }
    // 加载敌机
    for(var i = 1;i<=4;i++){
        img.ship[i-1]=new Image();
        img.ship[i-1].src='./image/ship_'+i+'.png';
    }
    // 加载友机
    img.friend[0] = new Image();
    img.friend[0].src = './image/hero.png';
    // 加载自己
    img.me[0].src = './image/plan.png';
    //  加载子弹
    img.bullet[0].src = './image/bullet.png';
    // 加载能量
    img.energy[0].src = './image/energy.png';
    // 加载爆炸
    img.burst[0].src = './image/explosion/exp10.png';
    // 加载背景
    img.bg[0].src = './image/background-4.jpg';
}


//更新信息栏
function updateInfo(){
    energyinfo.innerText = '能量：'+selfs[0].energy;
    scoreinfo.innerText = '分数：'+selfs[0].score;
}
//清除画布

function clearScreen(){
    ctx.clearRect(0,0,1024,768);
}

//加载背景
function createBg(){
    ctx.drawImage(img.bg[0],0,0,1024,768);
}
function readyBg(){
    var bg = new Image();
    bg.src = './image/background-4.jpg';
    bg.onload = function(){
        ctx.drawImage(bg,0,0,1024,768);
    }
    readyLogo();
    readyRule();
    readyImg();
    readyBtns();
}
function readyLogo(){
    logo.style.display = 'block';
}
//判断继续和暂停
var isPause = true;
function readyBtns(){
    btns.eq(0).click(function(){
        ocSong();
    });
    btns.eq(1).click(function(){
        font_size(true);
    });
    btns.eq(2).click(function(){
        font_size(false);
    });
    btns[4].onclick = restart;

}
//销毁机制
function delSelf(obj) {
    for (var i in obj) {
        if (obj[i].isDel) obj.splice(i, 1);
    }
}
//定义爆炸
function burst(x,y){
    var n = 0;
    var timer = setInterval(function(){
        ctx.drawImage(img.burst[0],x,y,90,90);
        n++;
        if(n>15) clearInterval(timer);
    },15);
}
//定义大小字体
var nowIndex = 1;
function font_size(status){
    var size = [12,16,20];
    if(status && nowIndex+1 < size.length){
        nowIndex ++;
    }else if(!status && nowIndex-1 >=0){
        nowIndex --;
    }
    infoP.setAttribute('class','size'+size[nowIndex]);
    view.setAttribute('class','size'+size[nowIndex]);
    getBox.style.fontSize = 14+nowIndex*2+'px';
    // getBox.setAttribute('style','font-size:'+(14+nowIndex*2)+'px;');
    btn.setAttribute("class",'size'+size[nowIndex]);
}


// 控制音效
var allowSong = true;
function ocSong(){
    allowSong =  !allowSong;
    if(allowSong && timelate){
        bgMusic.play();
    }else if(!allowSong || timelate == 0){
        bgMusic.pause();
    }
}
//制作时间
function makeTime(time){
    var str= '';
    if(time>=60){
        str+= parseInt(time/60) >=10 ? parseInt(time/60) : '0'+ parseInt(time/60);
        str+=':';
        str+= time%60 >= 10 ? time%60 : '0'+time%60;
    }else{
        str +='00:';
        str+= time%60 >= 10 ? time%60 : '0'+time%60;
    }
    return str;
}
//加载游戏规则
function readyRule(){
    $(getBox).load('./load/rule.html');
    $(getBox).slideDown(1000);
}
function readyForm(){
    $(getBox).load('./load/form.html',function(){
        var inputs = $("#view input");
        inputs.eq(1).val(timelate);
        inputs.eq(2).val(makeTime(timelate));
        inputs.eq(3).val(selfs[0].score);
        $('#submitBtn').click(function(){
            if(inputs.eq(0).val().match(/\s+/g) != null){
                alert('请输入不包含空白符的昵称');
                return;
            }else if(inputs.eq(0).val().length == 0){
                alert('请输入昵称');
                return;
            }
            var addObj = {
                name:inputs.eq(0).val(),
                time:makeTime(timelate),
                score:selfs[0].score
            };
            addLocalData(addObj);
        });
    });
}
//增加本地存储
function addLocalData(obj){
    var oddJson =  window.localStorage.getItem('player');
    //如果没有这个键值就存储 否则数据会出错
    if(oddJson == null || oddJson == undefined  ){
        window.localStorage.setItem('player','[]');
        oddJson =  window.localStorage.getItem('player');
    }
    var oddData = JSON.parse(oddJson);
    oddData.push(obj);
    showScores(oddData);
    var newJson = JSON.stringify(oddData);
    window.localStorage.setItem('player',newJson);
}
//显示排行榜
function showScores(data){
    $(getBox).load('./load/table.html',function(){
        var  table  = $('table');
        // 排序
        data.sort(function(a,b){
            return b.score-a.score;
        });
        for(var i in data){
            var name =  data[i].name;
            var time =  data[i].time;
            var score = data[i].score;
            var tr = $("<tr>");
            $("<td>").text(Number(i)+1).appendTo(tr);
            $("<td>").text(name).appendTo(tr);
            $("<td>").text(time).appendTo(tr);
            $("<td>").text(score).appendTo(tr);
            tr.appendTo(table);
        }
    });

}
//双向图形缓冲
function graphicBuffer(){
    trueCtx.drawImage(canvas,0,0,1024,768);
}