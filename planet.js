// 构造行星
function CreatePlanet() {
    this.img = img.planet[parseInt(Math.random() * 8 + 1)];
    this.x = 1024 + this.img.width / 2;

    // 初始化随机纵坐标
    this.y = parseInt(Math.random() * 768);
    this.type = this.img.src.match(/[1-9]+/)[0];
    //初始化删除状态
    this.isDel =false;
    // 定义绘图方法
    this.print=function(){
        ctx.drawImage(this.img,this.x,this.y);
    }
    //定义移动方法
    this.step=function(){
        switch (this.type) {
            case '1':
            case '2':
            case '3':
            case '4':
                this.x -= 10;
                break;
            case '5':
            case '6':
                this.x -= 6;
                break;
            case '7':
            case '8':
            case '9':
                this.x -=2;
                break;
        }
        if(this.x<(-this.img.width)){
            this.isDel =true;
        }
    }
}
//产生行星
var planets = [];


//画行星
function printPlanet(){
    for(var i in planets) {
        planets[i].print();
    }
}
//移动行星
function movePlanet(){
    for(var i in planets) {
        planets[i].step();
        delSelf(planets);
    }
}