// 构造能量
function CreateEnergy() {
    this.img = img.energy[0];
    this.x = parseInt(Math.random()*710);
    // 初始化随机纵坐标
    this.y = -50;
    this.music = document.createElement('audio');
    this.music.setAttribute('src','./media/audio/star.mp3');
    //初始化删除状态
    this.isDel =false;
    // 定义绘图方法
    this.print=function(){
        ctx.drawImage(this.img,this.x,this.y,50,50);
    }
    //定义移动方法
    this.step=function(){
        this.y +=5
        if(this.y>1024){
            this.isDel =true;
        }
    }
}
//产生能量
var energys = [];


//画
function printEnergy(){
    for(var i in energys) {
        energys[i].print();
    }
}
//移动
function moveEnergy(){
    for(var i in energys) {
        energys[i].step();
        delSelf(energys);
        eatEnergy();
    }
}