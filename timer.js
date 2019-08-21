//大时钟
var timer = null;
//陨石定时器
var aestroidTimer = null;
//能量定时器
var energysTimer =null;
//子弹定时器
var bulletTimer = null;
//敌友军定时器
var shipTimer = null;
//行星定时器
var planetTimer = null;
//时间定时器
var timelate = 0
//解决按键冲突
//上定时器
var upTimer = null;
var upStatus = false;
//下定时器
var downTimer = null;
var downStatus = false;
//左定时器
var leftTimer = null;
var leftStatus = false;
//右定时器
var rightTimer = null;
var rightStatus = false;
var timetimer =null
var bgMusic = document.createElement('audio');
bgMusic.setAttribute('src','./media/audio/background.mp3');
bgMusic.loop = true;
var overMusic = document.createElement('audio');
overMusic.setAttribute('src','./media/audio/finish.mp3');

//定义初始化
function init(){
    setInterval(function(){
        graphicBuffer();
    },10);
    readyBg();
}
function start(){

    view.setAttribute('style','display:none;');
    allowSong && bgMusic.play();

    //本机事件
    bindMeEvent();

    //绑定继续和暂停
    btns.eq(3).click(function(){
        isPause ? stop() : start();
        isPause = !isPause;
    });
    btns[4].removeEventListener('click',restart);
    timer = setInterval(function(){
        clearScreen();
        createBg();
        movePlanet();
        moveAestroid();
        moveShip();
        moveBullet();
        moveEnergy();
        printPlanet();
        printAesitroid();
        printShip();
        printSelf();
        printBullet();
        printEnergy();
        meCrash();
        updateInfo();
        isStop();
    },30);
    //生成陨石
    aestroidTimer = setInterval(function(){
        aestroids[aestroids.length] = new CreateAestroid();
    },2000);
    //能量
    energysTimer = setInterval(function(){
        energys[energys.length] = new CreateEnergy();
        selfs[0].energy --;
    },2000);
    //敌方子弹
    bulletTimer = setInterval(function makeBulletShip(){
        for(var i in ships){
            if(Math.round(Math.random()))
                continue;
            shipBullets[shipBullets.length] = new BulletShip(ships[i]);
        }
    },1000);
    //敌机
    shipTimer = setInterval(function(){
        if(ships.length<5)
            ships[ships.length] = new CreateShip(img.ship);
        if(friends.length<3)
            friends[friends.length] = new CreateShip(img.friend);
    },3000);
    //行星
    planetTimer = setInterval(function(){
        planets[planets.length] = new CreatePlanet();
    },2000);
    //时间
    timetimer = setInterval(function(){
        timelate ++;
        timeinfo.innerText = makeTime(timelate);
    },1000);
    // 按键冲突检测
    upTimer=setInterval(function(){
        if(upStatus)
            selfs[0].step('up');
    },50);
    downTimer=setInterval(function(){
        if(downStatus)
            selfs[0].step('down');
    },50);
    leftTimer=setInterval(function(){
        if(leftStatus)
            selfs[0].step('left');
    },50);
    rightTimer=setInterval(function(){
        if(rightStatus)
            selfs[0].step('right');
    },50);
}
function restart(){
    planets.splice(0,planets.length);
    ships.splice(0,ships.length);
    planets.splice(0,planets.length);
    energys.splice(0,energys.length);
    meBullets.splice(0,meBullets.length);
    shipBullets.splice(0,shipBullets.length);
    aestroids.splice(0,aestroids.length);
    friends.splice(0,friends.length);
    selfs = new Array();
    selfs[0] = new CreateSelf();
    timelate = 0;
    upStatus = false;
    downStatus = false;
    leftStatus = false;
    rightStatus = false;
    start();
}
function stop(){
    //清除所有的定时器
    for(var i of [timer,aestroidTimer,bulletTimer,energysTimer,planetTimer,shipTimer,timetimer,upTimer,downTimer,leftTimer,rightTimer]){
        clearInterval(i);
    }
    bgMusic.pause();
    unbindMeEvent();
    $(document).keydown(function(e){
        if(e.which == 80)  btns.eq(3).trigger('click');
    });
}
function isStop(){
    if(selfs[0].energy<=0){
        stop();
        bgMusic.pause();
        allowSong && overMusic.play();
        setTimeout(function(){
            clearScreen();
            readyBg();
            $(view).show();
            readyForm();
        },500);

        btns[0].onclick = restart;
        btns.eq(3).unbind();
    }

}