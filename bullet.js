function BulletMe() {
    this.img = img.bullet[0];
    this.x = selfs[0].x + 45-3;
    this.y = selfs[0].y;
    this.isDel = false;
    this.music = document.createElement('audio');
    this.music.setAttribute('src','./media/audio/shoot.mp3');
    // 定义绘图方法
    this.print = function () {
        ctx.drawImage(this.img, this.x, this.y, 6, 11);
    }
    this.step = function(){
        this.y -=8;
        if(this.y<0)
            this.isDel = true;
    }
}
function BulletShip(obj) {
    this.img = img.bullet[0];
    this.x = obj.x + 45-3;
    this.y = obj.y + 90;
    this.isDel = false;
    // 定义绘图方法
    this.print = function () {
        ctx.drawImage(this.img, this.x, this.y, 6, 11);
    }
    this.step = function(){
        this.y+=5;
        if(this.y>768)
            this.isDel = true;
    }
}
var meBullets = [];
var shipBullets =[];

function makeBullet(){
    meBullets[meBullets.length] = new BulletMe();
    allowSong && meBullets[meBullets.length-1].music.play();
}
function printBullet(){
    for(var i in meBullets){
        meBullets[i].print();
    }
    for(var i in shipBullets){
        shipBullets[i].print();
    }
}
function moveBullet(){
    for(var i in meBullets){
        meBullets[i].step();
    }
    for(var i in shipBullets){
        shipBullets[i].step();
    }
    delSelf(meBullets);
    delSelf(shipBullets);
    meBulletCrash();
    shipBulletCrash();
}