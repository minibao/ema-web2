var app=new Vue({el:"#app",data:{code:"",btnclicksign:"on"},methods:{getPackageCodeNoLogin:function(){return"on"==app.btnclicksign&&void $.ajax({type:"POST",url:"/api/getPackageCodeNoLogin",data:{gameCode:"20012"},success:function(a){try{$("#in").val(a.data.code),$("#in").attr("readonly","readonly"),$("#in").attr("unselectable","on"),$(".btns .btn").addClass("disable"),app.btnclicksign="off"}catch(n){}}})}}});$(document).ready(function(){$(".btn").click(function(){app.getPackageCodeNoLogin()})});