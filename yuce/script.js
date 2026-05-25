/* ========= LOGIN ========= */

let timer = null;

const USERS = [

{
user:"maxcine",
pass:"40231"
},

{
user:"admin",
pass:"MAX2026"
},

{
user:"team",
pass:"123456"
}

];

function login(){

const u=
document
.getElementById(
"user"
)
.value
.trim();

const p=
document
.getElementById(
"pass"
)
.value;

const ok=

USERS.some(

a=>

a.user===u

&&

a.pass===p

);

if(ok){

document
.getElementById(
"login"
)
.style.display=
"none";

document
.getElementById(
"app"
)
.style.display=
"block";

}
else{

document
.getElementById(
"err"
)
.innerText=

"Access Denied";

}

}

/* ========= UTIL ========= */

function toSec(v){

v=v.trim();

if(v.includes(":")){

const [m,s]=
v.split(":");

return (

Number(m)*60+

Number(s)

);

}

return Number(v)*60;

}

function format(sec){

if(sec<0){

sec=0;

}

const m=
Math.floor(
sec/60
);

const s=
sec%60;

return (

String(m)
.padStart(
2,
"0"
)

+

":"

+

String(s)
.padStart(
2,
"0"
)

);

}

function getLast(url){

const m=

url.match(

/(?:\||%7C)(\d+)$/

);

if(!m){

return null;

}

return Number(
m[1]
);

}

function replaceLast(
url,
v
){

return url.replace(

/(\||%7C)\d+$/,

x=>

x.includes(
"%7C"
)

?

"%7C"+v

:

"|"+v

);

}

/* ========= QR ========= */

function qr(url){

const box=

document
.getElementById(
"qrcode"
);

box.innerHTML="";

new QRCode(

box,

{

text:url,

width:260,

height:260

}

);

}

/* ========= CONTROL ========= */

function stop(){

clearInterval(
timer
);

timer=null;

}

/* ========= MAIN ========= */

function predict(){

stop();

const url=

document
.getElementById(
"url"
)
.value
.trim();

const current=

toSec(

document
.getElementById(
"current"
)
.value

);

const target=

toSec(

document
.getElementById(
"target"
)
.value

);

let value=

getLast(
url
);

if(value===null){

alert(
"URL Error"
);

return;

}

const diff=

Math.round(

(
current-
target
)
/5

);

value+=
diff*5;

let show=
target;

let currentUrl=

replaceLast(
url,
value
);

function render(){

document
.getElementById(
"result"
)
.innerHTML=

`

<div class="label">

PREDICTED

</div>

<div class="time">

${format(
show
)}

</div>

<div class="link">

${currentUrl}

</div>

`;

qr(
currentUrl
);

}

render();

timer=

setInterval(

()=>{

show--;

if(
show<0
){

stop();

return;

}

// 每5秒刷新二维码
if(
show%5===0
){

value+=5;

currentUrl=

replaceLast(
url,
value
);

}

document
.querySelector(
".time"
).innerText=

format(
show
);

if(
show%5===0
){

document
.querySelector(
".link"
).innerText=

currentUrl;

qr(
currentUrl
);

}

},

1000

);

}