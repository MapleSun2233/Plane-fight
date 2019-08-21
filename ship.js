// 构造敌军
function CreateShip(arr) {
    if(arr.length == 1 )
        this.img = arr[0];
    else{
        this.img = arr[parseInt(Math.random() * 3 + 1)];
    }
    this.x = 1024;
    this.music = document.createElement('audio');
    this.music.setAttribute('src','./media/audio/destroyed.mp3');
    // 初始化随机纵坐标
    this.y =  arr.length == 1  ?  parseInt(Math.random() * 300+300) : parseInt(Math.random() * 500);
    //初始化删除状态
    this.isDel =false;
    // 定义绘图方法
    this.print=function(){
            ctx.drawImage(this.img,this.x,this.y,90,90);
    }
    //定义移动方法
    this.isLeft = Math.round(Math.random()) ? true : false;
    this.isTop = true;
    this.step=function(){

            if(this.isLeft)
                this.x -=3;
            else
                this.x +=3;
            if(this.isTop)
                this.y -=1;
            else
                this.y +=1;
            if(this.x<0)
                this.isLeft = false;
            else if(this.x>1024-this.img.width)
                this.isLeft = true;
            if(this.y<this.img.height)
                this.isTop = false;
            else if(this.y>400)
                this.isTop = true;
        }
}
//产生敌军
var ships = [];
var friends =[];


//画飞碟
function printShip(){
    for(var i in ships) {
        ships[i].print();
    }
    for(var i in friends) {
        friends[i].print();
    }
}
//移动
function moveShip(){
    for(var i in ships) {
        ships[i].step();
        delSelf(ships);
    }
    for(var i in friends) {
        friends[i].step();
        delSelf(friends);
    }
}