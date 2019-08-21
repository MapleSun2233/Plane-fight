function meBulletCrash(){

    for(var i in meBullets){

        var nowbullet = meBullets[i];
        for(var j in ships){
            var nowship = ships[j];
            if(nowbullet.x>nowship.x-6 && nowbullet.y>nowship.y-11 && nowbullet.x<nowship.x+90 && nowbullet.y<nowship.y+90){
                selfs[0].score +=10;
                nowship.isDel = nowbullet.isDel = true;
                burst(nowship.x,nowship.y);
                allowSong && nowship.music.play();
                continue;
            }
        }
        for(var k in friends){
            var nowfriend = friends[k];
            if(nowbullet.x>nowfriend.x-6 && nowbullet.y>nowfriend.y-11 && nowbullet.x<nowfriend.x+90 && nowbullet.y<nowfriend.y+90){
                selfs[0].score -=10;
                nowfriend.isDel = nowbullet.isDel = true;
                burst(nowfriend.x,nowfriend.y)
                allowSong && nowfriend.music.play();
                continue;
            }
        }
        for(var l in aestroids){
            var nowaestroid = aestroids[l];
            if(nowbullet.x>nowaestroid.x-6 && nowbullet.y>nowaestroid.y-11 && nowbullet.x<nowaestroid.x+90 && nowbullet.y<nowaestroid.y+90){
                nowbullet.isDel =  true;
                nowaestroid.life -=1;
                if(nowaestroid.life <= 0){
                    nowaestroid.isDel = true;
                    selfs[0].score+=10;
                    burst(nowaestroid.x,nowaestroid.y);
                    allowSong && nowaestroid.music.play();
                }
                continue;
            }
        }
    }
}
function shipBulletCrash(){
    var nowme = selfs[0];
    for(var i in shipBullets){
        var nowshipbullet = shipBullets[i];
        if(nowshipbullet.x>nowme.x-6 && nowshipbullet.y>nowme.y-11 && nowshipbullet.x<nowme.x+90 && nowshipbullet.y<nowme.y+100){
            nowme.energy -=5;
            nowshipbullet.isDel = true;
            continue;
        }

    }
}
function meCrash(){
    var nowme = selfs[0];
    for(var i in ships){
        var nowship = ships[i];
        if(nowme.x+90>nowship.x && nowme.x<nowship.x+90 && nowme.y < nowship.y+90 && nowme.y > nowship.y-100){
            nowme.energy -=10;
            nowship.isDel = true;
            burst(nowship.x,nowship.y);
            allowSong && nowship.music.play();
            continue;
        }
    }
    for(var j in friends){
        var nowfriend = friends[j];
        if(nowme.x+90>nowfriend.x && nowme.x<nowfriend.x+90 && nowme.y < nowfriend.y+90 && nowme.y > nowfriend.y-100){
            nowme.energy -=10;
            nowfriend.isDel = true;
            burst(nowfriend.x,nowfriend.y);
            allowSong && nowfriend.music.play();
            continue;
        }
    }
    for(var k in aestroids){
        var nowaestroid = aestroids[k];
        if(nowme.x+90>nowaestroid.x && nowme.x<nowaestroid.x+90 && nowme.y < nowaestroid.y+90 && nowme.y > nowaestroid.y-100){
            nowme.energy -=10;
            nowaestroid.isDel = true;
            burst(nowaestroid.x,nowaestroid.y);
            allowSong && nowaestroid.music.play();
            continue;
        }
    }

}
function eatEnergy(){
    var nowme = selfs[0];
    for(var i in energys){
        var nowenergy = energys[i];
        if(nowme.x+90>nowenergy.x && nowme.x<nowenergy.x+50 && nowme.y < nowenergy.y+50 && nowme.y > nowenergy.y-90){
            nowenergy.isDel = true;
            nowme.energy = nowme.energy+10 > 30 ? 30 : nowme.energy+10;
            allowSong && nowenergy.music.play();
            continue;
        }
    }

}