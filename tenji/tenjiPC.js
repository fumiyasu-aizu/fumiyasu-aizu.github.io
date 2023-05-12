/*
    点字の練習
       f_saito June 2018
*/

var tenColor = new Array('#ffffff', '#0000ff');
var tenType = "凸";
var tenArry = new Array(0, 0, 0, 0, 0, 0);
var omote = {};
var ura = {};
var omoteSuuji = {};
var uraSuuji = {};
var omoteGaiji = {};
var uraGaiji = {};
var omoteZenchiten = new Array(4, 1, 16, 20, 17, 9, 13, 21);
var uraZenchiten = new Array(8, 2, 32, 40, 34, 6, 14, 42);
var word = "";
var err = "未登録"
var canvas = document.getElementById("tenjiCanvas");
var context = canvas.getContext("2d");
var dx = 10;
var yText = 26;
var areaClrFlg = 0;
var columnX = 0;
//var DEBUG = true;
var DEBUG = false;

var mode = 0;
var modeType = new Array("カナ", "数字", "英字");

document.onkeydown = key_Press;	// キー入力時のファンクション指定
self.focus();

initCodes();
clrTen2();
showMode();

function getKEYSTR(e){
	if(document.all)
		return event.keyCode;
	else if(document.getElementById)
		return (e.keyCode!=0)?e.keyCode:e.charCode;
	else if(document.layers)
		return e.which;
}

function key_Press(e){ 
	var k;
	var ks;
	ctrl = false;
	entr = false;
	k = getKEYSTR(e);
	ks = String.fromCharCode(k);
	switch (k) {
		case 8 :		// BS
		case 46 :		// DEL
		case 96 :		// '0' tenkey
//		case 109 :	// '-' tenkey
//		case 189 :	// '-'
			clrTen();
			break;
		case 97 :		// '1' tenkey
		case 86 :		// 'V' key
			tenButton(5);
			break;
		case 98 :		// '2' tenkey
		case 77 :		// 'M' key
			tenButton(6);
			break;
//		case 99 :		// '3' tenkey
		case 100 :	// '4' tenkey
		case 70 :		// 'F' tenkey
			tenButton(3);
			break;
		case 101 :	// '5' tenkey
		case 74 :		// 'J' key
			tenButton(4);
			break;
//		case 102 :	// '6' tenkey
		case 103 :	// '7' tenkey
		case 82 :		// 'R' key
			tenButton(1);
			break;
		case 104 :	// '8' tenkey
		case 85 :		// 'U' key
			tenButton(2);
			break;
//		case 105 :	// '9' tenkey
//			break;
		case 13 : 		// Enter key
			enter();
			break;
		case 107 : 	// '+' tenkey
		case 59   : 	// '+' key
			nextC();
			break;
		case 27 :		// ESC key
			resetMode();
			break;
		case 112 :	// F1 key
		case 106 :	// '*' tenkey
//		case 42 :		// '*'
			tenjiType();
			break;
/*
		case 72 :		// 'H'
		case 191 :	// '?'
		case 17 :	// control key
*/
	}
}


function startTenji() {
     location.href = './tenjiPC.html';
}

function clrTextArea() {
	if (DEBUG) {
		context.fillStyle = "yellow";
		context.fillRect(0, 0, 300, 30);
	} else {
		context.clearRect(0, 0, 300, 30);
	}
}

function clrArea() {
	if (DEBUG) {
		context.fillStyle = "lime";
		context.fillRect(0, 31, 300, 110);
	} else {
		context.clearRect(0, 31, 300, 110);
	}
	clrTextArea();
	areaClrFlg = 0;
}

function tenjiType() {
	if (tenType == "凸") {
		tenType = "凹";
		document.tenji.nextBtn.value = "←"
	} else {
		tenType = "凸";
		document.tenji.nextBtn.value = "→"
	}
	document.tenji.tenTypeBtn.value = tenType;
	clrTen2();
}

function clrTen0() {
	for (var i = 0;  i < 6; i++) {
		tenArry[i] = 0;
		document.tenji.btngroup[i].style.background = tenColor[0];
	}
}

function clrTen() {
	if (areaClrFlg == 1) {
		clrArea();
		columnX = 0;
		areaClrFlg = 0;
	}
	clrTen0();
	clrTextArea();
}

function clrTen2() {
	clrTen();
	clrArea();
}

function resetMode() {
	clrTen2();
	mode = 0;
	columnX = 0;
	showMode();
}

function dotToCode() {
	var code = 0;

	for (var i = 0; i < 6; i++) {
		code = (code << 1) + tenArry[i];
	}
	return code;
}

function nextC() {
	var c;
	var code = 0;

	if (columnX < 3) {
		code = dotToCode();
		if (code < 10) {
			code = "0" + code;
		}
		showTen1(code);
		word += "" + code;
		clrTen();
	} else {
		clrTen();
		context.font = "18px arial";
		context.fillStyle = "black";
		context.fillText("４マス以上の点字には未対応" , 20, yText);
		word = "";
	}
}

function enter() {
	var c;
	var code = 0;

	code = dotToCode();
	showTen1(code);
	if (code < 10) {
		code = "0" + code;
	}
	word += "" + code;
	if (tenType == "凸") {
		switch (mode) {
			case 0: { // カナモード
				if (omote[word]) {
					c = omote[word];
				} else {
					c = err;
				}
				break;
			}
			case 1: { // 数字モード
				if (omoteSuuji[code]) {
					c = omoteSuuji[code];
				} else {
					c = err;
				}
				break;
			}
			case 2: { // 英字モード
				if (omoteGaiji[word]) {
					c = omoteGaiji[word];
				} else {
					c = err;
				}
				break;
			}
		} 
	} else {
		switch (mode) {
			case 0: { // カナモード
				if (ura[word]) {
					c = ura[word];
				} else {
					c = err;
				}
				break;
			}
			case 1: { // 数字モード
				if (uraSuuji[code]) {
					c = uraSuuji[code];
				} else {
					c = err;
				}
				break;
			}
			case 2: { // 英字モード
				if (uraGaiji[word]) {
					c = uraGaiji[word];
				} else {
					c = err;
				}
				break;
			}
		} 
	}
	if (c == "数符") {
		mode = 1;
		showMode();
		clrTen2();
	} else {
		if (c == "外字符") {
			mode = 2;
			showMode();
			clrTen2();
		}
	}
	context.font = "28px arial";
	context.fillStyle = "black";
	switch (c.length) {
		case 1: {
			context.fillText(c, 126 + dx, yText);
			break;
		} 
		case 2: {
			context.fillText(c, 110 + dx, yText);
			break;
		} 
		case 3:
		case 4: {
			context.fillText(c, 92 + dx, yText);
			break;
		} 
		default: {
			context.fillText(c, 20 + dx, yText);
		}
	}
	clrTen0();
	word = "";
	columnX = 0;
	areaClrFlg = 1;
}

function tenButton(n) {
	var code;
	var flg;

	clrTextArea() ;
	if (areaClrFlg == 1) {
		clrArea();
		areaClrFlg = 0;
	}
	if (tenArry[n - 1] == 0) {
		tenArry[n - 1] = 1;
	} else {
		tenArry[n - 1] = 0;
	}
	document.tenji.btngroup[n - 1].style.background = tenColor[tenArry[n - 1]];
	if (columnX == 0 && mode == 0) {
		flg = 0;
		code = dotToCode();
		if (tenType == "凸") {
			for (var i = 0; i < 8; i++) {
				if (omoteZenchiten[i] == code) {
					flg = 1;
				}
			}
		} else {
			for (var i = 0; i < 8; i++) {
				if (uraZenchiten[i] == code) {
					flg = 1;
				}
			}
		}
		if (flg == 1) {
			context.font = "18px arial";
			context.fillStyle = "black";
			context.fillText("[前置点]", dx, yText);
		}
	}
}

function showMode() {
	document.tenji.resetBtn.value = "［" + modeType[mode] + "］";
}

function checkBit(code, bit) {
	var b;

	b = (1 << bit);
	return (code & b);
}

function showTen1(code) {
	var x, y;
	var flg = 0;
	var addX;
	var omoteLX = new Array(14, 74, 134, 194, 254);
	var uraRX = new Array(260, 200, 140, 80, 20);

	y = 36 + 10;
	if (tenType == "凸") {
		x = omoteLX[columnX];
	} else {
		x = uraRX[columnX];
	}
	for (var i = 5; i >= 0; i--) {
		if (flg == 0) {
			addX = 0;
			flg = 1;
		} else {
			addX = 25;
			flg = 0;
		}
		if (checkBit(code, i)) {
			context.fillStyle = "black";
			context.beginPath();
			context.arc(x + addX, y, 10, 0, Math.PI * 2, true);
			context.fill();
		} else {
			context.beginPath();
			context.arc(x + addX, y, 10, 0, Math.PI * 2, true);
			context.stroke();
		}
		if (flg == 0) {
			y += 25;
		}
	}
	columnX++;
}

function initCodes() {
	omote["32"] = ura["16"] = "ア";
	omote["40"] = ura["20"] = "イ";
	omote["48"] = ura["48"] = "ウ";
	omote["56"] = ura["52"] = "エ";
	omote["24"] = ura["36"] = "オ";
	
	omote["33"] = ura["18"] = "カ";
	omote["0433"] = ura["0818"] = "ガ";
	omote["41"] = ura["22"] = "キ";
	omote["0441"] = ura["0822"] = "ギ";
	omote["49"] = ura["50"] = "ク";
	omote["0449"] = ura["0850"] = "グ";
	omote["57"] = ura["54"] = "ケ";
	omote["0457"] = ura["0854"] = "ゲ";
	omote["25"] = ura["38"] = "コ";
	omote["0425"] = ura["0838"] = "ゴ";
	omote["37"] = ura["26"] = "サ";
	omote["0437"] = ura["0826"] = "ザ";
	omote["45"] = ura["30"] = "シ";
	omote["0445"] = ura["0830"] = "ジ";
	omote["53"] = ura["58"] = "ス";
	omote["0453"] = ura["0858"] = "ズ";
	omote["61"] = ura["62"] = "セ";
	omote["0461"] = ura["0862"] = "ゼ";
	omote["29"] = ura["46"] = "ソ";
	omote["0429"] = ura["0846"] = "ゾ";
	omote["38"] = ura["25"] = "タ";
	omote["0438"] = ura["0825"] = "ダ";
	omote["46"] = ura["29"] = "チ";
	omote["0446"] = ura["0829"] = "ヂ";
	omote["54"] = ura["57"] = "ツ";
	omote["0454"] = ura["0857"] = "ヅ";
	omote["62"] = ura["61"] = "テ";
	omote["0462"] = ura["0861"] = "デ";
	omote["30"] = ura["45"] = "ト";
	omote["0430"] = ura["0845"] = "ド";
	omote["34"] = ura["17"] = "ナ";
	omote["42"] = ura["21"] = "ニ";
	omote["50"] = ura["49"] = "ヌ";
	omote["58"] = ura["53"] = "ネ";
	omote["26"] = ura["37"] = "ノ";
	omote["35"] = ura["19"] = "ハ";
	omote["0435"] = ura["0819"] = "バ";
	omote["0135"] = ura["0219"] = "パ";
	omote["43"] = ura["23"] = "ヒ";
	omote["0443"] = ura["0823"] = "ビ";
	omote["0143"] = ura["0223"] = "ピ";
	omote["51"] = ura["51"] = "フ";
	omote["0451"] = ura["0851"] = "ブ";
	omote["0151"] = ura["0251"] = "プ";
	omote["59"] = ura["55"] = "ヘ";
	omote["0459"] = ura["0855"] = "ベ";
	omote["0159"] = ura["0255"] = "ペ";
	omote["27"] = ura["39"] = "ホ";
	omote["0427"] = ura["0839"] = "ボ";
	omote["0127"] = ura["0239"] = "ポ";
	omote["39"] = ura["27"] = "マ";
	omote["47"] = ura["31"] = "ミ";
	omote["55"] = ura["59"] = "ム";
	omote["63"] = ura["63"] = "メ";
	omote["31"] = ura["47"] = "モ";
	omote["18"] = ura["33"] = "ヤ";
	omote["19"] = ura["35"] = "ユ";
	omote["22"] = ura["41"] = "ヨ";
	omote["36"] = ura["24"] = "ラ";
	omote["44"] = ura["28"] = "リ";
	omote["52"] = ura["56"] = "ル";
	omote["60"] = ura["60"] = "レ";
	omote["28"] = ura["44"] = "ロ";
	omote["02"] = ura["01"] = "ワ";
	omote["10"] = ura["05"] = "ヰ";
	omote["14"] = ura["13"] = "ヱ";
	omote["06"] = ura["09"] = "ヲ";
	omote["07"] = ura["11"] = "ン";
	omote["12"] = ura["12"] = "長音符";
	omote["08"] = ura["04"] = "ッ";
	omote["00"] = ura["00"] = "　";
	omote["13"] = ura["14"] = "。"; 
	omote["130000"] = ura["140000"] = "句点"; 
	omote["0500"]   = ura["1000"] = "読点";
	omote["09"]   = ura["06"]   = "？"; 
	omote["0900"]   = ura["0600"]   = "？";
	omote["1400"] = ura["1300"] = "！";
	omote["0400"] = ura["0800"] = "中点"; 
	omote["080808"] = ura["040404"] = "点線"; 
	omote["1212"] = ura["1212"] = "棒線"; 
	omote["0303"] = ura["0303"] = "波線"; 
	omote["03"] = ura["03"] = "第一つなぎ符"; 
	omote["0102"] = ura["0201"] = "第二つなぎ符"; 
	omote["0103"] = ura["0203"] = "第一小見出し符"; 
	omote["0408"] = ura["0804"] = "第二小見出し符"; 
	omote["0102"] = ura["0201"] = "第二つなぎ符"; 
	omote["0439"] = ura["0827"] = "伏字○";
	omote["0447"] = ura["0831"] = "伏字△";
	omote["0455"] = ura["0859"] = "伏字□";
	omote["0463"] = ura["0863"] = "伏字×";
	omote["0431"] = ura["0847"]   = "その他の伏字";
	omote["121238"] = ura["121225"]   = "右向き矢印";
	omote["251212"] = ura["381212"]   = "左向き矢印";
	omote["25121238"] = ura["38121225"]   = "両向き矢印";
	omote["21515142"] = ura["42515121"]   = "空欄符号";
	omote[""] = ura[""]   = "";
	omote[""] = ura[""]   = "";

	omote["0558"] = ura["1053"] = "％";
	omote["0559"] = ura["1055"] = "＆";

	omote["23"] = ura["43"] = "数符";
	omote["05"] = ura["10"] = "外字符";

	omote["1633"] = ura["3218"] = "キャ";
	omote["1649"] = ura["3250"] = "キュ";
	omote["1625"] = ura["3238"] = "キョ";
	omote["1637"] = ura["3226"] = "シャ";
	omote["1653"] = ura["3258"] = "シュ";
	omote["1629"] = ura["3246"] = "ショ";
	omote["1638"] = ura["3225"] = "チャ";
	omote["1654"] = ura["3257"] = "チュ";
	omote["1630"] = ura["3245"] = "チョ";
	omote["1634"] = ura["3217"] = "ニャ";
	omote["1650"] = ura["3249"] = "ニュ";
	omote["1626"] = ura["3237"] = "ニョ";
	omote["1635"] = ura["3219"] = "ヒャ";
	omote["1651"] = ura["3251"] = "ヒュ";
	omote["1627"] = ura["3239"] = "ヒョ";
	omote["1639"] = ura["3227"] = "ミャ";
	omote["1655"] = ura["3259"] = "ミュ";
	omote["1631"] = ura["3247"] = "ミョ";
	omote["1636"] = ura["3224"] = "リャ";
	omote["1652"] = ura["3256"] = "リュ";
	omote["1628"] = ura["3244"] = "リョ";
	omote["1656"] = ura["3252"] = "イェ";
	omote["1657"] = ura["3254"] = "キェ";
	omote["1661"] = ura["3262"] = "シェ";
	omote["1662"] = ura["3261"] = "チェ";
	omote["1658"] = ura["3253"] = "ニェ";
	omote["1659"] = ura["3255"] = "ヒェ";
	omote["1645"] = ura["3230"] = "スィ";
	omote["1646"] = ura["3229"] = "ティ";
	omote["2033"] = ura["4018"] = "ギャ";
	omote["2049"] = ura["4050"] = "ギュ";
	omote["2025"] = ura["4038"] = "ギョ";
	omote["2037"] = ura["4026"] = "ジャ";
	omote["2053"] = ura["4058"] = "ジュ";
	omote["2029"] = ura["4046"] = "ジョ";
	omote["2038"] = ura["4025"] = "ヂャ";
	omote["2054"] = ura["4057"] = "ヂュ";
	omote["2030"] = ura["4045"] = "ヂョ";
	omote["2035"] = ura["4019"] = "ビャ";
	omote["2051"] = ura["4051"] = "ビュ";
	omote["2027"] = ura["4039"] = "ビョ";
	omote["2061"] = ura["4062"] = "ジェ";
	omote["2045"] = ura["4030"] = "ズィ";
	omote["2046"] = ura["4029"] = "ディ";

	omote["1735"] = ura["3419"] = "ピャ";
	omote["1751"] = ura["3451"] = "ピュ";
	omote["1727"] = ura["3439"] = "ピョ";
	omote["1754"] = ura["3457"] = "テュ";
	omote["1719"] = ura["3435"] = "フュ";
	omote["1722"] = ura["3441"] = "フョ";

	omote["0940"] = ura["0620"] = "ウィ";
	omote["0956"] = ura["0652"] = "ウェ";
	omote["0924"] = ura["0636"] = "ウォ";
	omote["0933"] = ura["0618"] = "クァ";
	omote["0941"] = ura["0622"] = "クィ";
	omote["0957"] = ura["0654"] = "クェ";
	omote["0925"] = ura["0638"] = "クォ";
	omote["0954"] = ura["0657"] = "トゥ";
	omote["0938"] = ura["0625"] = "ツァ";
	omote["0946"] = ura["0629"] = "ツィ";
	omote["0962"] = ura["0661"] = "ツェ";
	omote["0930"] = ura["0645"] = "ツォ";
	omote["0935"] = ura["0619"] = "ファ";
	omote["0943"] = ura["0623"] = "フィ";
	omote["0959"] = ura["0655"] = "フェ";
	omote["0927"] = ura["0639"] = "フォ";

	omote["1333"] = ura["1418"] = "グァ";
	omote["1341"] = ura["1422"] = "グィ";
	omote["1357"] = ura["1454"] = "グェ";
	omote["1325"] = ura["1438"] = "グォ";
	omote["1354"] = ura["1457"] = "ドゥ";
	omote["1335"] = ura["1419"] = "ヴァ";
	omote["1343"] = ura["1423"] = "ヴィ";
	omote["1359"] = ura["1455"] = "ヴェ";
	omote["1327"] = ura["1439"] = "ヴォ";

	omote["2154"] = ura["4257"] = "デュ";
	omote["2119"] = ura["4235"] = "ヴュ";
	omote["2122"] = ura["4241"] = "ヴョ";

	omote["0448"] = ura["0848"] = "ヴ";

	omoteSuuji["32"] = uraSuuji["16"] = "１";
	omoteSuuji["40"] = uraSuuji["20"] = "２";
	omoteSuuji["48"] = uraSuuji["48"] = "３";
	omoteSuuji["52"] = uraSuuji["56"] = "４";
	omoteSuuji["36"] = uraSuuji["24"] = "５";
	omoteSuuji["56"] = uraSuuji["52"] = "６";
	omoteSuuji["60"] = uraSuuji["60"] = "７";
	omoteSuuji["44"] = uraSuuji["28"] = "８";
	omoteSuuji["24"] = uraSuuji["36"] = "９";
	omoteSuuji["28"] = uraSuuji["44"] = "０";
	omoteSuuji["08"] = uraSuuji["04"] = "小数点";
	omoteSuuji["02"] = uraSuuji["01"] = "位取り点";

	omoteGaiji["32"] = uraGaiji["16"] = "a";
	omoteGaiji["40"] = uraGaiji["20"] = "b";
	omoteGaiji["48"] = uraGaiji["48"] = "c";
	omoteGaiji["52"] = uraGaiji["56"] = "d";
	omoteGaiji["36"] = uraGaiji["24"] = "e";
	omoteGaiji["56"] = uraGaiji["52"] = "f";
	omoteGaiji["60"] = uraGaiji["60"] = "g";
	omoteGaiji["44"] = uraGaiji["28"] = "h";
	omoteGaiji["24"] = uraGaiji["36"] = "i";
	omoteGaiji["28"] = uraGaiji["44"] = "j";
	omoteGaiji["34"] = uraGaiji["17"] = "k";
	omoteGaiji["42"] = uraGaiji["21"] = "l";
	omoteGaiji["50"] = uraGaiji["49"] = "m";
	omoteGaiji["54"] = uraGaiji["57"] = "n";
	omoteGaiji["38"] = uraGaiji["25"] = "o";
	omoteGaiji["58"] = uraGaiji["53"] = "p";
	omoteGaiji["62"] = uraGaiji["61"] = "q";
	omoteGaiji["46"] = uraGaiji["29"] = "r";
	omoteGaiji["26"] = uraGaiji["37"] = "s";
	omoteGaiji["30"] = uraGaiji["45"] = "t";
	omoteGaiji["35"] = uraGaiji["19"] = "u";
	omoteGaiji["43"] = uraGaiji["23"] = "v";
	omoteGaiji["29"] = uraGaiji["46"] = "w";
	omoteGaiji["51"] = uraGaiji["51"] = "x";
	omoteGaiji["55"] = uraGaiji["59"] = "y";
	omoteGaiji["39"] = uraGaiji["27"] = "z";
	omoteGaiji["13"] = uraGaiji["14"] = "ピリオド";
	omoteGaiji["12"] = uraGaiji["12"] = "コロン";
	omoteGaiji["10"] = uraGaiji["05"] = "セミコロン";
	omoteGaiji["08"] = uraGaiji["04"] = "コンマ";
	omoteGaiji["03"] = uraGaiji["03"] = "ハイフン";
	omoteGaiji["11"] = uraGaiji["07"] = "?";
	omoteGaiji["14"] = uraGaiji["13"] = "!";
	omoteGaiji["02"] = uraGaiji["01"] = "アポストロフィ";
	omoteGaiji["00"] = uraGaiji["00"] = " ";
	omoteGaiji["01"] = uraGaiji["02"] = "大文字符";
	omoteGaiji["0101"] = uraGaiji["0202"] = "二重大文字符";

}
