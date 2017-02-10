/**
 * Created by shangqianzhushang on 2016/11/30.
 */

                var canvas = document.getElementById("mycanvas");
                var audio=document.getElementById("myaudio");
                var times=document.getElementById("times");
                var volume=document.getElementById("volume");
                var musicname=document.getElementById("music_name");
                var sheet=document.getElementById("sheet");
                var lyric=document.getElementById("lyric");
                var one_music=false;//单曲循环
                var random_music=false;//随机播放

                var music_num=0;//指定当前播放的音乐的下标

                var audios=new Array();//音乐存入的地方
                 audios[0]='牵绊';
                 audios[1]='爱与恨';
                 audios[2]='热血无赖';
                 audios[3]='少年情';
                 audios[4]='Pendulum Beat!';

                 var reader=null;
                 if(FileReader){
                     reader=new FileReader();
                 }else{
                     alert("不支持歌词");
                 }
                 var music_lyric=function(){
                           reader.readAsText("Lyric/0.txt","gbk");
                              lyric.innerHTML=reader.result;
                 }

                function Changebackground() {//5秒改变一次背景图片

                   var body=document.getElementById("bodys");
                    var lu=body.background;
                    var c=lu.charAt(lu.length-5);
                     if(c=="1"){
                         body.background="css/background.jpg";
                     }
                     else{
                         body.background="css/bg1.jpg";
                     }
           }
 
             function music_stop() {//暂停

                 var audio=document.getElementById("myaudio");
                 var stop=document.getElementById("stops");
                      if(audio.paused){//当前是暂停状态
                          stop.src="css/pause.png";
                          audio.play();
                      }else{//当前是播放状态
                          stop.src="css/play.png";
                          audio.pause();
                      }
             }

                  function music_first() {//第一首
                      if(one_music)
                          return;
                      music_num=0;
                      var musics_num="musics/"+music_num+".mp3";
                      audio.src=musics_num;
                      audio.play();
                      change_musicname();
                      resetProgress();
                  }

                function music_prev() {//上一首
                    if(one_music)
                        return;
                    music_num--;
                    if(music_num<0){
                        music_num=4;
                    }
                    var musics_num="musics/"+music_num+".mp3";
                    audio.src=musics_num;
                    audio.play();
                    change_musicname();
                    resetProgress();
                }

                  function music_next() {//下一首
                      if(one_music)
                          return;
                      music_num++;
                      if(music_num>=5){
                            music_num=0;
                      }
                      var musics_num="musics/"+music_num+".mp3";
                      audio.src=musics_num;
                      audio.play();
                      change_musicname();
                      resetProgress();
                  }

                   function music_last() {//最后一首
                       if(one_music)
                           return;
                       music_num=4;
                       var musics_num="musics/"+music_num+".mp3";
                       audio.src=musics_num;
                       audio.play();
                       change_musicname();
                       resetProgress();
                   }
             
                   function change_musicname() {//更新歌曲名称
                               if(!audio.src){
                                   var music_url="musics/"+music_num+".mp3";
                                   audio.src=music_url;
                                   audio.volume=volume.value;
                               }
                       musicname.innerHTML=audios[music_num];
                   }

                   function finishChange() {//更新音量
                            audio.volume=volume.value;
                   }

                    audio.addEventListener('timeupdate', function() {//增加时间监听事件
                          update_Progress();
                        var	aTime =parseInt(audio.currentTime);
                        var aLength =parseInt(audio.duration) ;
                         if(aTime%60<=9){
                             times.innerHTML = '00:0' + parseInt(aTime / 60) + ":0" + aTime % 60 +
                                 '/00:0' + parseInt(aLength / 60) + ':' + (aLength - parseInt(aLength / 60) * 60);
                         }else {
                             times.innerHTML = '00:0' + parseInt(aTime / 60) + ":" + aTime % 60 +
                                 '/00:0' + parseInt(aLength / 60) + ':' + (aLength - parseInt(aLength / 60) * 60);
                         }
                    }, false);

                          audio.onended=function () {//判断当前音频是否放完 完就自动切换到下一首
                              if(random_music) {
                                  music_Random();
                                  return;
                              }
                             music_num++;
                              if(one_music)
                                  music_num--;
                            if(music_num>=5){
                                music_num=0;
                            }
                            var musics_num="musics/"+music_num+".mp3";
                            audio.src=musics_num;
                            audio.play();
                            change_musicname();
                        }

                        function  update_Progress() { //画进度条
                            var ctx=canvas.getContext("2d");
                            ctx.beginPath();
                            ctx.strokeStyle="green";
                            ctx.lineWidth=5;
                            var b=parseInt(audio.currentTime)/parseInt(audio.duration);
                            ctx.arc(215,250,160,0,Math.PI*b,false);
                            ctx.stroke();
                            if(audio.ended){
                                resetProgress(); //当一首歌放完的时候把进度条归0
                            }
                        }

                     function resetProgress() { //当一首歌放完的时候把进度条归0

                           var ctx=canvas.getContext("2d");
                           ctx.clearRect(0,0,canvas.width,canvas.height);

                             ctx.beginPath();
                             ctx.strokeStyle ="white";
                             ctx.lineCap = 'round';
                             ctx.lineWidth = 6;
                             ctx.arc(215,250,160,0, Math.PI,false);
                             ctx.stroke();
                     }

                          function change_play(str) { //查看当前的播放
                              if(str==1){
                                 one_music=true;
                                  random_music=false;
                              }
                              else if(str==2){
                                  one_music=false;
                                  random_music=false;
                              }
                              else if(str==3){
                                  one_music=false;
                                  random_music=true;
                                  music_Random();
                              }
                          }

                                function music_Random() {//随机播放
                                      var num=parseInt(Math.random()*5);
                                      music_num=num;
                                        var musics_num="musics/"+music_num+".mp3";
                                        audio.src=musics_num;
                                        audio.play();
                                         resetProgress();
                                        change_musicname();
                                }

                                 function music_sheet() {
                                      sheet.style.display="block";
                                 }

                                  function music_none() {
                                      sheet.style.display="none";
                                  }

                                function music_changecolor(str) {
                                       var m=document.getElementById(str);
                                       m.style.borderColor="darkorange";
                                }

                                   function music_color(str) {
                                       var m=document.getElementById(str);
                                       m.style.borderColor="white";
                                   }

                                   function choice_music(str) {
                                       music_num=str.charAt(str.length-1);
                                       var musics_num="musics/"+music_num+".mp3";
                                       audio.src=musics_num;
                                       audio.play();
                                       change_musicname();
                                       resetProgress();
                                   }