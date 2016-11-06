var rocky = require('rocky');
// contants
var lineColor = 'white';
var textColor = 'white';
var textHeight = 42;
var lineWidth = 3;
var months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
];
var days = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
];

// event handlers
rocky.on('draw', renderFunction);
rocky.on('minutechange', function() {
  rocky.requestDraw();
});


// main render function
function renderFunction(event) {
    var ctx = event.context;
    // clear view
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    // prepare data
    var w = ctx.canvas.unobstructedWidth;
    var h = ctx.canvas.unobstructedHeight;
    var date = new Date();  
    
    drawSeparatorLine(ctx, w,h); 
    // set text props.
    ctx.fillStyle = textColor;
    ctx.font = "42px bold numbers Leco-numbers";
    ctx.textAlign = 'center';
    drawTime(ctx, w, h, date);
    drawDate(ctx, w, h, date);
}


function drawSeparatorLine(ctx, w, h){
    ctx.strokeStyle =  lineColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(0, h/2);
    ctx.lineTo(w, h/2);
    ctx.stroke();
    ctx.closePath();
}

function addZero(num){
    return num < 10 ? '0' + num : num;
}

function drawTime(ctx, w, h, dateObj){
    var hours = addZero(dateObj.getHours() % 12);
    var minutes = addZero(dateObj.getMinutes());
    ctx.fillText(hours+':'+minutes, w/2, (h/2 - textHeight)/2, w);
}


function drawDate(ctx, w, h, dateObj){
    ctx.font = '28px bold Gothic';
    var date = addZero(dateObj.getDate());
    var month = months[dateObj.getMonth()];
    var day = days[dateObj.getDay()];
    ctx.fillText(day+' '+ date+' '+month, w/2, h/2 + ((h/2 - textHeight)/2), w);
}
