// 构造自己
function CreateSelf() {
    this.img = img.me[0];
    this.x = 470;
    this.y = 668;
    this.music = document.createElement('audio');
    this.music.setAttribute('src','./media/audio/hit.mp3');
    //能量
    this.energy = 10;
    // 成绩
    this.score = 0;
    //初始化
    // 删除状态
    this.isDel = false;
    // 定义绘图方法
    this.print = function () {
        ctx.drawImage(this.img, this.x, this.y, 90, 100);
    }
    this.step = function(str){
        switch (str) {
            case 'left':
                if(this.x-10<=0)
                    break;
                this.x -=10;
                break;
            case 'right':
                if(this.x+10+90>=1024)
                    break;
                this.x +=10;
                break;
            case 'up':
                if(this.y - 10 <= 0)
                    break;
                this.y -=10;
                break;
            case 'down':
                if(this.y +10 + 100 >=768)
                    break;
                this.y +=10;
                break;
        }
    }
}

// 制造自己
    var selfs = [];
    selfs[0] = new CreateSelf();

//画自己
    function printSelf() {
        selfs[0].print();
    }
    function bindMeEvent(){
        //移动自己 攻击
        $(document).keydown(function (e){
            switch(e.which){
                case 38:
                    upStatus = true;
                    break;
                case 40:
                    downStatus = true;
                    break;
                case 37:
                    leftStatus = true;
                    break;
                case 39:
                    rightStatus = true;
                    break;
                case 80:
                    btns.eq(3).trigger('click');
                    break;

            }
        });
        $(document).keyup(function (e){
            switch(e.which){
                case 38:
                    upStatus = false;
                    break;
                case 40:
                    downStatus = false;
                    break;
                case 37:
                    leftStatus = false;
                    break;
                case 39:
                    rightStatus = false;
                    break;
                case 32:
                    makeBullet();
                    break;
                }
        });
    }
    function unbindMeEvent(){
        $(document).unbind();
}



