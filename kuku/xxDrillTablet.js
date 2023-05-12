/*
    九九のドリル
       f_saito March. 2017
*/
var UP = 0;
var DOWN = 1;
var RANDOM = 2;
var RANDOM2 = 3;
var qType = UP;
var qNum = 2;
var n1;
var qCount;
var qFlg = 0;
var qArry = new Array();
var qData = "";
var qStr = "";
var qMark = "";
var inputStr = "";
var inDrill = false;
var answer;
var tryCnt = 0;
var sameQ = false;
var waitLoop = false;
var intervalTime = 1;
var timeO = 700;
var timeX = 900;
var colorFlg = true;
var ctrl = false;

var buttonColor = new Array('#FF3366', '#FFFF66', '#FFFFFF', '#99FF33', '#00CCFF');
var qState = new Array(4);

var canvas = document.getElementById("kukuCanvas");
var context = canvas.getContext("2d");
var dx = 0;
var dy = 12; // dy = 22
//var DEBUG = true;
var DEBUG = false;

for (var i = 0; i < 4; i++) {
	qState[i] = new Array(10);
	for (var j = 0; j <= 9; j++) {
		qState[i][j] = 2;
	}
}

nannoDan();

function numButton(n) {
	if (!inDrill && (2 <= n && n <= 9)) {
		startQ(n)
	} else {
		if (inDrill && !waitLoop) {
			if (inputStr.length < 3) {
				inputStr += n + "";
				inputAns();
			}
		}
	}
	document.drill.btngroup[qNum - 2].focus();
}

function enterButton() {
	if (inDrill) {
		if (!waitLoop) {
		    if (inputStr != "") {
				if (DEBUG) {
					context.fillStyle = "yellow";
					context.fillRect(200 + dx, 16 + dy, 82, 40);
				} else {
					context.clearRect(200 + dx, 16 + dy, 82, 40);
				}
				context.fillStyle = "black";
				context.font = "32px arial";
				context.fillText(inputStr, 204 + dx, 46 + dy);
				checkAnswer(inputStr);
		    }
		} else {
			waitLoop = false;
			nextQ();
		}
	}
	document.drill.btngroup[qNum - 2].focus();
}

function inputAns() {
    if (inDrill && !waitLoop) {
		if (DEBUG) {
			context.fillStyle = "yellow";
			context.fillRect(200 + dx, 16 + dy, 82, 40);
		} else {
			context.clearRect(200 + dx, 16 + dy, 82, 40);
		}
		context.fillStyle = "black";
		context.font = "32px arial";
		context.fillText(inputStr + "_", 204 + dx, 46 + dy);
    }
}

function initQ(n) {
	var i;
	var r;
	var tmp;
	var qLen = 0;
	qArry.length = 0;
	qFlg = 0;
	colorFlg = document.drill.colorFlg.checked;
	setSpeed();
	setType();
	if (n <= 9) {
		if (qType == UP) {
			for (i = 2; i <= 9; i++) {
				qArry.push(n + ":" + i + ":");
				qLen++;
			}
		} else {
			for (i = 9; i >= 2; i--) {
				qArry.push(n + ":" + i + ":");
				qLen++;
			}
		}
		if (qType == RANDOM2) {
			for (i = 9; i >= 2; i--) {
				if (i != n) {
					qArry.push(i + ":" + n + ":");
					qLen++;
				}
			}
		}
	} else {
		if (qType == UP) {
			for (i = 2; i <= 9; i++) {
				for (j = 2; j <= 9; j++) {
					qArry.push(i + ":" + j + ":");
					qLen++;
				}
			}
		} else {
			for (i = 9; i >= 2; i--) {
				for (j = 9; j >= 2; j--) {
					qArry.push(i + ":" + j + ":");
					qLen++;
				}
			}
		}
	}
	if (qType == RANDOM || qType == RANDOM2) {
		for (i = qLen; i > 0; i--) {
			r = Math.floor(Math.random() * i);
			tmp = qArry[r];
			for (j = r; j < qLen - 1; j++) {
				qArry[j] = qArry[j + 1];
			}
			qArry[qLen - 1] = tmp;
		}
	}
}

function showEq(strEq) {
    if (DEBUG) {
		context.fillStyle = "blue";
		context.fillRect(150 + dx, 16 + dy, 54, 40);
    } else {
		context.clearRect(150 + dx, 16 + dy, 54, 40);
    }
    context.fillStyle = "black";
    context.font = "32px arial";
    if (strEq == "!=")
	context.fillText(strEq, 154 + dx, 46 + dy);
    else
	context.fillText(strEq, 152 + dx, 46 + dy);
}
  
function startQ(n) {
	if (inDrill)
		return;
	qNum = n;
	initQ(qNum);
	inDrill = true;
	qStr = getqStr();
	showQuestion();
}

function showQuestion() {
	clrqArea();
	context.fillStyle = "red";
	context.font = "32px arial";
	context.fillText(qMark, 8 + dx, 46 + dy);
	context.fillStyle = "black";
	context.font = "20px arial";
	context.fillText("(" + qCount + ")", 26 + dx, 42 + dy);
	context.font = "32px arial";
	context.fillText(qStr, 74 + dx, 46 + dy);
	showEq("=?");
	inputAns();
}

function getqStr() {
	answer = 0;
	tryCnt = 0;
	qCount = qArry.length;
	if (qCount == 0) {
		return "";
	}
	qData = qArry.shift();
	var a = new Array();
	a = qData.split(":");
	qStr = a[0] + " x " + a[1] + " ";
	answer = (a[0] - 0) * (a[1] - 0);
	n1 = a[0] - 0;
	qMark = a[2];
	return qStr;
}

function setType() {
	if (inDrill) return;
	var typeStr = document.drill.Qtype[document.drill.Qtype.selectedIndex].value;
	if (typeStr == "UP") qType = UP;
	else if (typeStr == "DOWN") qType = DOWN;
	else if (typeStr == "RANDOM") qType = RANDOM;
	else if (typeStr == "RANDOM2") qType = RANDOM2;
	updateButton();
}

function checkAnswer(a) {
	sameQ = false;
	inputStr = "";
	tryCnt++;
	if (a == answer) {
		showEq("==");
		context.beginPath();
		context.strokeStyle = "red";
		context.arc(38 + dx, 72 + dy, 15, 0, Math.PI*2, true);
		context.arc(38 + dx, 72 + dy, 14, 0, Math.PI*2, true);
		context.stroke();
		context.closePath();
		context.fillStyle = "black";
		context.font = "28px arial";
		context.fillText("よくできました", 68 + dx, 84 + dy);
		setTimeout("nextQ()", timeO * intervalTime);
	} else {
		if (tryCnt < 2) {
			sameQ = true;
			qMark = "*"; // "＊"
			showEq("!=");
			context.beginPath();
			context.fillStyle = "red";
			context.font = "32px arial";
			context.fillText("Χ", 28 + dx, 84 + dy);
			context.fillStyle = "black";
			context.font = "28px arial";
			context.fillText("よくかんがえよう", 68 + dx, 84 + dy);
			setTimeout("nextQ()", timeX * intervalTime);
		} else {
			showEq("!=");
			subShowAnswer();	
			waitLoop = true;
		}
		if (qNum < 10)
			qFlg |= 1<<qNum;
		else
			qFlg |= 1<<n1;
	}
}

function nextQ() {
//	if (inputStr == "") return;
	inputStr = "";
	clrMessage();
	if (!sameQ) {
		if (tryCnt > 1) {
			setqMark("!");
			qArry.push(qData);
		}
		qStr = getqStr();
	}
	if (qStr == "") {
		inDrill = false;
		setMissTable();
		updateButton();
		nannoDan();
	} else {
		showQuestion();
	}   
}

function nannoDan() {
	clrqArea();
	context.fillStyle = "black";
	context.font = "24px arial";
	context.fillText("なんのだんにしますか？", 10 + dx, 62 + dy);
}

function setqMark(mk) {
	var a = new Array();
	a = qData.split(":");
	a[2] = mk;
	qData = a.join(":");
}

function clrqArea() {
    if (DEBUG) {
		context.fillStyle = "lime";
		context.fillRect(0, 0 + dy, 300, 140);
    } else {
		context.clearRect(0, 0 + dy, 300, 140);
    }
}

function clrMessage() {
    if (DEBUG) {
		context.fillStyle = "red";
		context.fillRect(0, 56 + dy, 300, 110);
    } else {
		context.clearRect(0, 56 + dy, 300, 110);
    }
}

function setSpeed() {
    intervalTime = parseInt((document.drill.timer[document.drill.timer.selectedIndex].value).substr(0,1));
}

function stUp(n) {
	if (n == 1) return 3;
	else if (n == 4) return 4;
	else return n + 1;
}

function setMissTable() {
	if (qFlg != 0) {
		for (var i = 2; i <= 9; i++) {
			if ((qFlg & 1<<i) != 0 ) {
				qState[qType][i] = 0;
			} else {
				if (qNum > 9) {
					qState[qType][i] = stUp(qState[qType][i]);
				}
			}
		}
	} else {
		if (qNum < 10) {
			qState[qType][qNum] = stUp(qState[qType][qNum]);
		} else {
			for (var i = 2; i <= 9; i++) {
				qState[qType][i] = stUp(qState[qType][i]);
			}
		}
	}
}

function clrState() {
	if (!inDrill) {
		if (ctrl) {
			for (var i = 0; i < 4; i++) {
				for (var j = 2; j <= 9; j++) {
					qState[i][j] = 2;
				}
			}
		} else {
			for (var i = 2; i <= 9; i++) {
				qState[qType][i] = 2;
			}
		}
		updateButton();
	}
}

function updateButton() {
	for (var i = 2; i <= 9; i++) {
		if (colorFlg) {
			document.drill.btngroup[i - 2].style.background = buttonColor[qState[qType][i]];
		} else {
			document.drill.btngroup[i - 2].style.background = buttonColor[2];
		}
	}
}

function setcolorFlg() {
	colorFlg = document.drill.colorFlg.checked;
	updateButton();
}

function showAnswer() {
    if (inDrill) {
	if (DEBUG) {
	    context.fillStyle = "red";
	    context.fillRect(0, 56 + dy, 300, 110);
	} else {
	    clrMessage();
	}
	subShowAnswer();	
	waitLoop = true;
	tryCnt = 10;
	if (qNum < 10)
	    qFlg |= 1<<qNum;
	else
	    qFlg |= 1<<n1;
    } else {
           location.href = "./index2.html";
    }
}

function subShowAnswer() {
    context.font = "28px arial";
    context.fillStyle = "black";
    context.fillText("こたえは " + answer + " です", 42 + dx, 82 + dy);
    context.font = "18px arial";
    context.fillStyle = "black";
    context.fillText("(けっていボタンをおしてね)", 66 + dx, 108 + dy);
}

function doEsc() {
	if (inDrill) {
		inDrill = false;
		waitLoop = false;
		nannoDan();
	}
	document.drill.btngroup[qNum - 2].focus();
}

function doBS() {
	if (inDrill && !waitLoop) {
		if (inputStr.length > 1) {
			inputStr = inputStr.substring(0, inputStr.length - 1);
		} else {
			inputStr = "";
		}
		inputAns();
	}
	document.drill.btngroup[qNum - 2].focus();
}






