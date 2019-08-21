// 构造陨石
function CreateAestroid() {
    this.img = img.aestroid[parseInt(Math.random() * 3 + 1)];
    this.x = 1024 + this.img.width / 2;
    //生命值
    this.life = 3;
    this.music = document.createElement('audio');
    this.music.setAttribute('src','./media/audio/destroyed.mp3');
    // 初始化随机纵坐标
    this.y = parseInt(Math.random() * 600);
    //初始化删除状态
    this.isDel =false;
    // 定义绘图方法
    this.print=function(){
        ctx.drawImage(this.img,this.x,this.y,90,90);
    }
    //定义移动方法
    this.step=function(){
        this.x -=5;
        }
        if(this.x<(-this.img.width)){
            this.isDel =true;
        }
}
//产生陨石
var aestroids = [];
//画陨石
function printAesitroid(){
    for(var i in aestroids) {
        aestroids[i].print();
    }
}
//移动行星
function moveAestroid(){
    for(var i in aestroids) {
        aestroids[i].step();
        delSelf(aestroids);
    }
}