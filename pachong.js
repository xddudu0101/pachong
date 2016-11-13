/**
 * Created by duzhen on 2016/11/6.
 */
var request =require('request');
var cheerio =require('cheerio');
var iconv =require('iconv-lite');
var fs =require('fs');
//没有跨域，就是Request创建了一个浏览器客户端

    var site='http://www.yikedou.com';
    var firstUrl='http://www.yikedou.com/wenzi/201611/73304.html';
    var i=0
    function getHtml(url){
        request(url,function(error,response,body){
            if(!error && response.statusCode==200){
                var $=cheerio.load(body,{
                    decodeEntities:false,
                });
                $('div.arcBody>p').each(function(){
                    var content=$(this).text();
                    console.log(content);
                    document.getElementById('content').innerHTML += content;
                    fs.appendFileSync('yikedou.txt',content);
                })
                var prev=$('div.prevNextArc>#prevArcLink>a').attr('href');
                var realPrev=site+prev;
                if(i<10){
                    getHtml(realPrev);
                    i++;
                }

            }else{
                console.log(error,response.statusCode)
            }
        });

    }

    getHtml(firstUrl);




