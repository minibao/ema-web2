var app=new Vue({el:"#app",data:{loginFlag:!0,channelTag:"",devicetype:"",uid:"",SQ_token:"",token:"",captchaInfo:"获取验证码",wecode:"",appId:20015,wait:""},methods:{init:function(){app.wait=60,app.devicetype=app.getDevice(),app.wecode=util.getUrlParams("code"),""!=app.wecode&&null!=app.wecode&&(util.setCookie("wxcode",app.wecode),app.weChatLogin()),app.wechatClick()},changeCaptchaLogin:function(){app.loginFlag=!app.loginFlag},login:function(){$("#loadingToast").show();var a;if(app.loginFlag)a=/^\d+$/g.test(app.account)?{mobile:app.account,password:app.password,type:"PT",accountType:1,channelTag:app.channelTag,allianceId:app.devicetype}:{email:app.account,password:app.password,type:"PT",accountType:2,channelTag:app.channelTag,allianceId:app.devicetype};else{if(!/^1\d{10}$/.test(app.mobile))return $("#loadingToast").hide(),layer.msg("请输入正确的手机号码或邮箱"),!1;a={mobile:app.mobile,captcha:app.captcha,type:"PT",accountType:1,channelTag:app.channelTag,allianceId:app.devicetype}}$.ajax({type:"POST",url:"/api/getLogin",data:a,success:function(a){$("#loadingToast").hide(),console.log(a.resultMsg),console.log(a);try{app.uid=a.data.uid,200==a.resultCode&&app.uid&&(util.setCookie("accout",app.account),util.setCookie("squid",app.uid),util.setCookie("suid",app.uid),util.setCookie("token",a.data.token),util.setCookie("sQtoken",a.data.SQ_token),location.href="/yinling/active2",console.log(a))}catch(e){return layer.msg("数据异常，稍后重试！"),!1}}})},getDevice:function(){var a=navigator.userAgent,e=a.indexOf("Android")>-1||a.indexOf("Adr")>-1,t=!!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return e?(app.channelTag=1001,"26"):t?(app.channelTag=0,"70"):(app.channelTag=1001,"26")},getCaptcha:function(){var a=/^1\d{10}$/;if(a.test(app.mobile)){if($("#captchaBtn").addClass("ban"),app.captchaInfo=app.wait+"S",60==app.wait){var e=setInterval(function(){app.wait--,app.captchaInfo=app.wait+"S",0==app.wait&&(clearInterval(e),app.captchaInfo="获取验证码",$("#captchaBtn").removeClass("ban"),app.wait=60)},1e3);app.mobile&&$.ajax({type:"GET",url:"/api/getCaptcha",data:{mobile:app.mobile},success:function(a){200==a.resultCode?layer.msg("验证码发送成功"):layer.msg("验证码发送失败")}})}}else layer.msg("请输入正确的手机号")},wechatClick:function(){$("#wechatLoginBtn").click(function(){window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90ea8be0c05b9630&redirect_uri=https%3A%2F%2Fsocial.lemonade-game.com/users&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"})},weChatLogin:function(){var a;$("#loadingToast").show(),a={weixinCode:app.wecode,type:"WX",channelTag:app.channelTag,allianceId:app.devicetype},$.ajax({type:"POST",url:"/api/getLogin",data:a,success:function(a){$("#loadingToast").hide();try{if("1"==a.data.tokens.status)return!1;a=a.data.tokens.data;for(var e=new Array,t=new Array,p=0;p<a.length;p++)for(var n=0;n<a[p].loginAppIds.length;n++)20019!=a[p].loginAppIds[n]&&(e.push(a[p].loginAppIds[n]),t.push(a[p].token));for(var p=0;p<e.length;p++)for(var o=p+1;o<e.length;o++)e[p]===e[o]&&(e.splice(p,1),t.splice(p,1),p--);for(var p=0;p<e.length;p++)if(e[p]=""+e[p],"20012"==e[p]){var i=t[p].uid,c=t[p].token;util.setCookie("squid",i),util.setCookie("suid",i),util.setCookie("token",c)}}catch(l){return alert("请确认是否通过微信登录过该游戏！"),!1}}})}}});app.init();