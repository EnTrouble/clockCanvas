var WINDOW_WIDTH = 1000;
var WINDOW_HEIGHT = 500;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

// const endTime = new Date(2018, 8, 20, 18, 47, 52);//时间手动赋值(月份是从0开始的)
var endTime = new Date();
endTime.setTime(endTime.getTime() + 3600*1000);
var currentgetTimeSeconds = 0;

var balls = [];
const colors = ["#33b5e5", "#0099cc", "#aa66cc", "#9933cc", "#99cc00", "#669900", "#ffbb33", "#ff8800", "#ff4444", "#cc0000"];
window.onload = function () {

    WINDOE_WIDTH = document.body.clientWidth;
    WINDOE_HEIGHT = document.body.clientHeight;

    MARGIN_LEFT = Math.round(WINDOE_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    currentgetTimeSeconds = getCurrentTimeSeconds();
    setInterval(
        function () {   
            render(context);
            update();
        }, 50
    )
};
function getCurrentTimeSeconds() {
    var cur = new Date();
    var ret = endTime.getTime() - cur.getTime();
    ret = Math.round(ret / 1000);
    return ret >= 0 ? ret : 0;
}
function update() {
    var nextgetTimeSeconds = getCurrentTimeSeconds();
    var nextHours = parseInt(nextgetTimeSeconds / 3600);
    var nextMinutes = parseInt((nextgetTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextgetTimeSeconds % 60;

    var curHours = parseInt(currentgetTimeSeconds / 3600);
    var curMinutes = parseInt((currentgetTimeSeconds - curHours * 3600) / 60);
    var curSeconds = currentgetTimeSeconds % 60;

    if (nextSeconds != curSeconds) {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBails(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        };
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBails(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
        };
        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBails(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        };
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBails(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        };
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBails(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        };
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBails(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        };
        currentgetTimeSeconds = nextgetTimeSeconds;
    };
    updateBails();
    // console.log(balls.length)
}
function updateBails() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75
        }
    };
    var count = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {//WINDOW_WIDTH
            balls[count++] = balls[i];
        }
    };
    while(balls.length > count){
        balls.pop();
    }
}
function addBails(x, y, num) {
    var aball = {};
    // balls=[];
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                aball = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                };
                balls.push(aball);
            }
        }
    };
}

function render(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(currentgetTimeSeconds / 3600);
    var minutes = parseInt((currentgetTimeSeconds - hours * 3600) / 60);
    var seconds = currentgetTimeSeconds % 60;
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        ctx.closePath();

        ctx.fill();
    }
};
function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}