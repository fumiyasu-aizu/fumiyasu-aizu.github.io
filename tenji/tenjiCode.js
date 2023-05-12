/*
    点字の練習
       f_saito June 2018
*/

var tenColor = new Array('#ffffff', '#0000ff');
var tenType = "表";
var tenArry = new Array(0, 0, 0, 0, 0, 0);
var omote = new Array(64);
var ura = new Array(64);

var mode = "　";	// "数", "英"
/*
var omoteDakuon = new Array(20);
var uraDakuon = new Array(20);
var omoteHandakuon = new Array(5);
var uraHandakuon = new Array(5);
*/
var omoteTokushu1 = {};
var uraTokushu1 = {};
var omoteTokushu2 = {};
var uraTokushu2 = {};
var omoteTokushu3 = {};
var uraTokushu3 = {};
var omoteTokushu4 = {};
var uraTokushu4 = {};
var omoteTokushu5 = {};
var uraTokushu5 = {};
var omoteTokushu6 = {};
var uraTokushu6 = {};
var omoteTokushu7 = {};
var uraTokushu7 = {};
var omoteTokushu8 = {};
var uraTokushu8 = {};

var omoteSuuji = {};
var uraSuuji = {};
var omoteGaiji = {};
var uraGaiji = {};

var omoteDakuonH = 0;
var omoteDakuonL = 0;
var uraDakuonH = 0;
var uraDakuonL = 0;
var omoteHanDakuonH = 0;
var omoteHanDakuonL = 0;
var uraHanDakuonH = 0;
var uraHanDakuonL = 0;
/*
var omoteTokushu1H = 0;
var omoteTokushu1L = 0;
var uraTokushu1H = 0;
var uraTokushu1L = 0;
var omoteTokushu2H = 0;
var omoteTokushu2L = 0;
var uraTokushu2H = 0;
var uraTokushu2L = 0;
var omoteTokushu3H = 0;
var omoteTokushu3L = 0;
var uraTokushu3H = 0;
var uraTokushu3L = 0;
var omoteTokushu4H = 0;
var omoteTokushu4L = 0;
var uraTokushu4H = 0;
var uraTokushu4L = 0;
var omoteTokushu5H = 0;
var omoteTokushu5L = 0;
var uraTokushu5H = 0;
var uraTokushu5L = 0;
*/

var canvas = document.getElementById("tenjiCanvas");
var context = canvas.getContext("2d");
var dx = 10;
var dy = 22; // dy = 22
//var DEBUG = true;
var DEBUG = false;

initCodes();
clrTen();

function clrArea() {
    if (DEBUG) {
		context.fillStyle = "lime";
		context.fillRect(0, 0 + dy, 300, 60);
    } else {
		context.clearRect(0, 0 + dy, 300, 60);
    }
}

function tenjiType(lol) {
	if (tenType == "表") {
		tenType = "裏";
	} else {
		tenType = "表";
	}
	lol.value = tenType;
	clrTen();
}

function clrTen() {
	clrArea();
	for (var i = 0;  i < 6; i++) {
		tenArry[i] = 0;
		document.tenji.btngroup[i].style.background = tenColor[0];
	}
}

function enter() {
	var c;
	var code = 0;

	var codeOmote = 0;
	var codeUra = 0;

	clrArea();
/*
	for (var i = 0; i < 6; i++) {
		code = code * 2 + tenArry[i];
	}
*/
	for (var i = 0; i < 6; i++) {
//		codeOmote = codeOmote * 2 + tenArry[i];
		codeOmote = (codeOmote << 1) + tenArry[i];
	}
//	codeUra = tenArry[1] * 2**5 + tenArry[0] * 2 **4 + tenArry[3] * 2 **3 + tenArry[2] * 2 **2 + tenArry[5] * 2 + tenArry[4];	context.font = "28px arial";
	codeUra = (tenArry[1] << 5) + (tenArry[0] << 4) + (tenArry[3] << 3) + (tenArry[2] << 2) + (tenArry[5] << 1) + tenArry[4];
	context.font = "28px arial";
	context.fillStyle = "black";
	context.fillText("表 : " + codeOmote , 46 + dx, 26 + dy);
	context.fillText("裏 : " + codeUra , 150 + dx, 26 + dy);
/*
console.log("表 code : " + codeOmote);
console.log("裏 code : " + codeUra);
console.log("表 codeS : " + codeOmoteS);
console.log("裏 codeS : " + codeUraS);
console.log("arr[1] : " + tenArry[1]);
console.log("arr[0] : " + tenArry[0]);
console.log("arr[1] << 5 : " + (tenArry[1] <<5));
console.log("arr[0] << 4 : " + (tenArry[0] <<4));
console.log("shift test : 0x15 << 2  =  " + (0x15 << 2));
*/
/*
	if (tenType == "表") {
		c = omote[code];
	} else {
		c = ura[code];
	}
	context.font = "28px arial";
	context.fillStyle = "black";
	context.fillText(c , 126 + dx, 30 + dy);
*/
}

function tenButton(n) {
	if (tenArry[n - 1] == 0) {
		tenArry[n - 1] = 1;
	} else {
		tenArry[n - 1] = 0;
	}
	document.tenji.btngroup[n - 1].style.background = tenColor[tenArry[n - 1]];
}
		
function initCodes() {
	for (var i = 0; i < 64; i++) {
		omote[i] = ura[i] = "？";
	}
	omote[32] = ura[16] = "ア";
	omote[40] = ura[20] = "イ";
	omote[48] = ura[48] = "ウ";
	omote[56] = ura[52] = "エ";
	omote[24] = ura[36] = "オ";
	
	omote[33] = ura[18] = "カ";
	omoteDakuonH |= setCheckWord(33);
	uraDakuonL |= setCheckWord(18);
	omote[41] = ura[22] = "キ";
	omoteDakuonH |= setCheckWord(41);
	uraDakuonL |= setCheckWord(22);
	omote[49] = ura[50] = "ク";
	omoteDakuonH |= setCheckWord(49);
	uraDakuonH |= setCheckWord(50);
	omote[57] = ura[54] = "ケ";
	omoteDakuonH |= setCheckWord(57);
	uraDakuonH |= setCheckWord(54);
	omote[25] = ura[38] = "コ";
	omoteDakuonL |= setCheckWord(25);
	uraDakuonH |= setCheckWord(38);
	omote[37] = ura[26] = "サ";
	omoteDakuonH |= setCheckWord(37);
	uraDakuonL |= setCheckWord(26);
	omote[45] = ura[30] = "シ";
	omoteDakuonH |= setCheckWord(45);
	uraDakuonL |= setCheckWord(30);
	omote[53] = ura[58] = "ス";
	omoteDakuonH |= setCheckWord(53);
	uraDakuonH |= setCheckWord(58);
	omote[61] = ura[62] = "セ";
	omoteDakuonH |= setCheckWord(61);
	uraDakuonH |= setCheckWord(62);
	omote[29] = ura[46] = "ソ";
	omoteDakuonL |= setCheckWord(29);
	uraDakuonH |= setCheckWord(46);
	omote[38] = ura[25] = "タ";
	omoteDakuonH |= setCheckWord(38);
	uraDakuonL |= setCheckWord(25);
	omote[46] = ura[29] = "チ";
	omoteDakuonH |= setCheckWord(46);
	uraDakuonL |= setCheckWord(29);
	omote[54] = ura[57] = "ツ";
	omoteDakuonH |= setCheckWord(54);
	uraDakuonH |= setCheckWord(57);
	omote[62] = ura[61] = "テ";
	omoteDakuonH |= setCheckWord(62);
	uraDakuonH |= setCheckWord(62);
	omote[30] = ura[45] = "ト";
	omoteDakuonL |= setCheckWord(30);
	uraDakuonH |= setCheckWord(45);
	omote[34] = ura[17] = "ナ";
	omote[42] = ura[21] = "ニ";
	omote[50] = ura[49] = "ヌ";
	omote[58] = ura[53] = "ネ";
	omote[26] = ura[37] = "ノ";
	omote[35] = ura[19] = "ハ";
	omoteHanDakuonH |= setCheckWord(35);
	uraHanDakuonL |= setCheckWord(19);
	omote[43] = ura[23] = "ヒ";
	omoteHanDakuonH |= setCheckWord(43);
	uraHanDakuonL |= setCheckWord(23);
	omote[51] = ura[51] = "フ";
	omoteHanDakuonH |= setCheckWord(51);
	uraHanDakuonH |= setCheckWord(51);
	omote[59] = ura[55] = "ヘ";
	omoteHanDakuonH |= setCheckWord(59);
	uraHanDakuonH |= setCheckWord(55);
	omote[27] = ura[39] = "ホ";
	omoteHanDakuonL |= setCheckWord(27);
	uraHanDakuonH |= setCheckWord(39);
	omote[39] = ura[27] = "マ";
	omote[47] = ura[31] = "ミ";
	omote[55] = ura[59] = "ム";
	omote[63] = ura[63] = "メ";
	omote[31] = ura[47] = "モ";
	omote[18] = ura[33] = "ヤ";
	omote[19] = ura[35] = "ユ";
	omote[22] = ura[41] = "ヨ";
	omote[36] = ura[24] = "ラ";
	omote[44] = ura[28] = "リ";
	omote[52] = ura[56] = "ル";
	omote[60] = ura[60] = "レ";
	omote[28] = ura[44] = "ロ";
	omote[2]   = ura[1]   = "ワ";
	omote[10] = ura[5]   = "ヰ";
	omote[14] = ura[13] = "ヱ";
	omote[6]   = ura[9]   = "ヲ";
	omote[7]   = ura[11] = "ン";
	omote[12] = ura[12] = "ー";
	omote[8]   = ura[4]   = "ッ";
	omote[0]   = ura[0]   = "　";
//	omote[13] = ura[14] = "。";  特殊5コードと同じ
	omote[5]   = ura[10] = "、";
	omote[9]   = ura[6]   = "？";
//	omote[14] = ura[13] = "！";	// "ヱ"と同じ？
//	omote[3]   = ura[3]   = "「";
//	omote[3]   = ura[3]   = "」";
//	omote[15] = ura[15] = "（";
//	omote[15] = ura[15] = "）";

	omote[4]   = ura[8]   = "濁音";
	omote[2]   = ura[1]   = "半濁音";
	omote[16] = ura[32] = "特殊1";
	omote[20] = ura[40] = "特殊2";
	omote[17] = ura[34] = "特殊3";
	omote[9]   = ura[6]   = "特殊4";
	omote[13] = ura[14] = "特殊5";
	omote[21] = ura[42] = "特殊6";
	omote[4]   = ura[8]   = "特殊7";
	omote[23] = ura[43] = "数符";
	omote[5]   = ura[10] = "外字符";

	omoteTokushu1[33] = uraTokushu1[18] = "キャ"
//	omoteTokushu1H = setCheckWord(33);
//	omoteTokushu1L = setCheckWord(18);
	omoteTokushu1[49] = uraTokushu1[50] = "キュ"
//	omoteTokushu1H = setCheckWord(49);
//	omoteTokushu1H = setCheckWord(50);
	omoteTokushu1[25] = uraTokushu1[38] = "キョ"
//	omoteTokushu1L = setCheckWord(25);
//	omoteTokushu1H = setCheckWord(38);
	omoteTokushu1[37] = uraTokushu1[26] = "シャ"
//	omoteTokushu1H = setCheckWord(37);
//	omoteTokushu1L = setCheckWord(26);
	omoteTokushu1[53] = uraTokushu1[58] = "シュ"
//	omoteTokushu1H = setCheckWord(53);
//	omoteTokushu1H = setCheckWord(58);
	omoteTokushu1[29] = uraTokushu1[46] = "ショ"
//	omoteTokushu1L = setCheckWord(29);
//	omoteTokushu1H = setCheckWord(46);
	omoteTokushu1[38] = uraTokushu1[25] = "チャ"
//	omoteTokushu1H = setCheckWord(38);
//	omoteTokushu1L = setCheckWord(25);
	omoteTokushu1[54] = uraTokushu1[57] = "チュ"
//	omoteTokushu1H = setCheckWord(54);
//	omoteTokushu1H = setCheckWord(57);
	omoteTokushu1[30] = uraTokushu1[45] = "チョ"
//	omoteTokushu1L = setCheckWord(30);
//	omoteTokushu1H = setCheckWord(45);
	omoteTokushu1[34] = uraTokushu1[17] = "ニャ"
//	omoteTokushu1H = setCheckWord(34);
//	omoteTokushu1L = setCheckWord(17);
	omoteTokushu1[50] = uraTokushu1[49] = "ニュ"
//	omoteTokushu1H = setCheckWord(50);
//	omoteTokushu1H = setCheckWord(49);
	omoteTokushu1[26] = uraTokushu1[37] = "ニョ"
//	omoteTokushu1L = setCheckWord(26);
//	omoteTokushu1H = setCheckWord(37);
	omoteTokushu1[35] = uraTokushu1[19] = "ヒャ"
//	omoteTokushu1H = setCheckWord(35);
//	omoteTokushu1L = setCheckWord(19);
	omoteTokushu1[51] = uraTokushu1[51] = "ヒュ"
//	omoteTokushu1H = setCheckWord(51);
//	omoteTokushu1H = setCheckWord(51);
	omoteTokushu1[27] = uraTokushu1[39] = "ヒョ"
//	omoteTokushu1L = setCheckWord(27);
//	omoteTokushu1H = setCheckWord(39);
	omoteTokushu1[39] = uraTokushu1[27] = "ミャ"
//	omoteTokushu1H = setCheckWord(39);
//	omoteTokushu1L = setCheckWord(27);
	omoteTokushu1[55] = uraTokushu1[59] = "ミュ"
//	omoteTokushu1H = setCheckWord(55);
//	omoteTokushu1H = setCheckWord(59);
	omoteTokushu1[31] = uraTokushu1[47] = "ミョ"
//	omoteTokushu1L = setCheckWord(31);
//	omoteTokushu1H = setCheckWord(47);
	omoteTokushu1[36] = uraTokushu1[24] = "リャ"
//	omoteTokushu1H = setCheckWord(36);
//	omoteTokushu1L = setCheckWord(24);
	omoteTokushu1[52] = uraTokushu1[56] = "リュ"
//	omoteTokushu1H = setCheckWord(52);
//	omoteTokushu1H = setCheckWord(56);
	omoteTokushu1[28] = uraTokushu1[44] = "リョ"
//	omoteTokushu1L = setCheckWord(28);
//	omoteTokushu1H = setCheckWord(44);
	omoteTokushu1[56] = uraTokushu1[52] = "イェ"
//	omoteTokushu1H = setCheckWord(56);
//	omoteTokushu1H = setCheckWord(52);
	omoteTokushu1[57] = uraTokushu1[54] = "キェ"
//	omoteTokushu1H = setCheckWord(57);
//	omoteTokushu1H = setCheckWord(54);
	omoteTokushu1[61] = uraTokushu1[62] = "シェ"
//	omoteTokushu1H = setCheckWord(61);
//	omoteTokushu1H = setCheckWord(62);
	omoteTokushu1[62] = uraTokushu1[61] = "チェ"
//	omoteTokushu1H = setCheckWord(62);
//	omoteTokushu1H = setCheckWord(61);
	omoteTokushu1[58] = uraTokushu1[53] = "ニェ"
//	omoteTokushu1H = setCheckWord(58);
//	omoteTokushu1H = setCheckWord(53);
	omoteTokushu1[59] = uraTokushu1[55] = "ヒェ"
//	omoteTokushu1H = setCheckWord(59);
//	omoteTokushu1H = setCheckWord(55);
	omoteTokushu1[45] = uraTokushu1[30] = "スィ"
//	omoteTokushu1H = setCheckWord(45);
//	omoteTokushu1L = setCheckWord(30);
	omoteTokushu1[46] = uraTokushu1[29] = "ティ"
//	omoteTokushu1H = setCheckWord(46);
//	omoteTokushu1L = setCheckWord(29);
	omoteTokushu2[33] = uraTokushu2[18] = "ギャ"
//	omoteTokushu2H = setCheckWord(33);
//	omoteTokushu2L = setCheckWord(18);
	omoteTokushu2[49] = uraTokushu2[50] = "ギュ"
//	omoteTokushu2H = setCheckWord(49);
//	omoteTokushu2H = setCheckWord(50);
	omoteTokushu2[25] = uraTokushu2[38] = "ギョ"
//	omoteTokushu2L = setCheckWord(25);
//	omoteTokushu2H = setCheckWord(38);
	omoteTokushu2[37] = uraTokushu2[26] = "ジャ"
//	omoteTokushu2H = setCheckWord(37);
//	omoteTokushu2L = setCheckWord(26);
	omoteTokushu2[53] = uraTokushu2[58] = "ジュ"
//	omoteTokushu2H = setCheckWord(53);
//	omoteTokushu2H = setCheckWord(58);
	omoteTokushu2[29] = uraTokushu2[46] = "ジョ"
//	omoteTokushu2L = setCheckWord(29);
//	omoteTokushu2H = setCheckWord(46);
	omoteTokushu2[38] = uraTokushu2[25] = "ヂャ"
//	omoteTokushu2H = setCheckWord(38);
//	omoteTokushu2L = setCheckWord(25);
	omoteTokushu2[54] = uraTokushu2[57] = "ヂュ"
//	omoteTokushu2H = setCheckWord(54);
//	omoteTokushu2H = setCheckWord(57);
	omoteTokushu2[30] = uraTokushu2[45] = "ヂョ"
//	omoteTokushu2L = setCheckWord(30);
//	omoteTokushu2H = setCheckWord(45);
	omoteTokushu2[35] = uraTokushu2[19] = "ビャ"
//	omoteTokushu2H = setCheckWord(35);
//	omoteTokushu2H = setCheckWord(19);
	omoteTokushu2[51] = uraTokushu2[51] = "ビュ"
//	omoteTokushu2H = setCheckWord(51);
//	omoteTokushu2H = setCheckWord(51);
	omoteTokushu2[27] = uraTokushu2[39] = "ビョ"
//	omoteTokushu2L = setCheckWord(27);
//	omoteTokushu2H = setCheckWord(39);
	omoteTokushu2[61] = uraTokushu2[62] = "ジェ"
//	omoteTokushu2H = setCheckWord(61);
//	omoteTokushu2H = setCheckWord(62);
	omoteTokushu2[45] = uraTokushu2[30] = "ズィ"
//	omoteTokushu2H = setCheckWord(45);
//	omoteTokushu2L = setCheckWord(30);
	omoteTokushu2[46] = uraTokushu2[29] = "ディ"
//	omoteTokushu2H = setCheckWord(46);
//	omoteTokushu2L = setCheckWord(29);

	omoteTokushu3[35] = uraTokushu3[19] = "ピャ"
//	omoteTokushu3H = setCheckWord(35);
//	omoteTokushu3L = setCheckWord(19);
	omoteTokushu3[51] = uraTokushu3[51] = "ピュ"
//	omoteTokushu3H = setCheckWord(51);
//	omoteTokushu3H = setCheckWord(51);
	omoteTokushu3[27] = uraTokushu3[39] = "ピョ"
//	omoteTokushu3L = setCheckWord(27);
//	omoteTokushu3H = setCheckWord(39);
	omoteTokushu3[54] = uraTokushu3[57] = "テュ"
	omoteTokushu3[19] = uraTokushu3[35] = "フュ"
	omoteTokushu3[22] = uraTokushu3[41] = "フョ"

	omoteTokushu4[40] = uraTokushu4[20] = "ウィ"
//	omoteTokushu4H = setCheckWord(40);
//	omoteTokushu4L = setCheckWord(20);
	omoteTokushu4[56] = uraTokushu4[52] = "ウェ"
//	omoteTokushu4H = setCheckWord(56);
//	omoteTokushu4H = setCheckWord(52);
	omoteTokushu4[24] = uraTokushu4[36] = "ウォ"
//	omoteTokushu4L = setCheckWord(24);
//	omoteTokushu4H = setCheckWord(36);
	omoteTokushu4[33] = uraTokushu4[18] = "クァ"
//	omoteTokushu4H = setCheckWord(33);
//	omoteTokushu4L = setCheckWord(18);
	omoteTokushu4[41] = uraTokushu4[22] = "クィ"
//	omoteTokushu4H = setCheckWord(41);
//	omoteTokushu4L = setCheckWord(22);
	omoteTokushu4[57] = uraTokushu4[54] = "クェ"
//	omoteTokushu4H = setCheckWord(57);
//	omoteTokushu4H = setCheckWord(54);
	omoteTokushu4[25] = uraTokushu4[38] = "クォ"
//	omoteTokushu4L = setCheckWord(25);
//	omoteTokushu4H = setCheckWord(38);
	omoteTokushu4[54] = uraTokushu4[57] = "トゥ"
	omoteTokushu4[38] = uraTokushu4[25] = "ツァ"
	omoteTokushu4[46] = uraTokushu4[29] = "ツィ"
	omoteTokushu4[62] = uraTokushu4[61] = "ツェ"
	omoteTokushu4[30] = uraTokushu4[45] = "ツォ"
	omoteTokushu4[35] = uraTokushu4[19] = "ファ"
	omoteTokushu4[43] = uraTokushu4[23] = "フィ"
	omoteTokushu4[59] = uraTokushu4[55] = "フェ"
	omoteTokushu4[27] = uraTokushu4[39] = "フォ"

	omoteTokushu5[33] = uraTokushu5[18] = "グァ"
//	omoteTokushu5H = setCheckWord(33);
//	omoteTokushu5L = setCheckWord(18);
	omoteTokushu5[41] = uraTokushu5[22] = "グィ"
//	omoteTokushu5H = setCheckWord(41);
//	omoteTokushu5L = setCheckWord(22);
	omoteTokushu5[57] = uraTokushu5[54] = "グェ"
//	omoteTokushu5H = setCheckWord(57);
//	omoteTokushu5H = setCheckWord(54);
	omoteTokushu5[25] = uraTokushu5[38] = "グォ"
//	omoteTokushu5L = setCheckWord(25);
//	omoteTokushu5H = setCheckWord(38);
	omoteTokushu5[54] = uraTokushu5[57] = "ドゥ"
	omoteTokushu5[35] = uraTokushu5[19] = "ヴァ"
	omoteTokushu5[43] = uraTokushu5[23] = "ヴィ"
	omoteTokushu5[59] = uraTokushu5[55] = "ヴェ"
	omoteTokushu5[27] = uraTokushu5[39] = "ヴォ"

	omoteTokushu6[54] = uraTokushu6[57] = "デュ"
	omoteTokushu6[19] = uraTokushu6[35] = "ヴュ"
	omoteTokushu6[22] = uraTokushu6[41] = "ヴョ"

	omoteTokushu7[48] = uraTokushu7[48] = "ヴ"
	omoteTokushu7[39] = uraTokushu7[27] = "伏字○"
	omoteTokushu7[47] = uraTokushu7[31] = "伏字△"
	omoteTokushu7[55] = uraTokushu7[59] = "伏字□"
	omoteTokushu7[63] = uraTokushu7[63] = "伏字×"
	omoteTokushu7[31] = uraTokushu7[47] = "その他の伏字"

	omoteTokushu8[58] = uraTokushu8[53] = "％"
	omoteTokushu8[59] = uraTokushu8[55] = "＆"

	omoteSuuji[32] = uraSuuji[16] = "１"
	omoteSuuji[40] = uraSuuji[20] = "２"
	omoteSuuji[48] = uraSuuji[48] = "３"
	omoteSuuji[52] = uraSuuji[56] = "４"
	omoteSuuji[36] = uraSuuji[24] = "５"
	omoteSuuji[56] = uraSuuji[52] = "６"
	omoteSuuji[60] = uraSuuji[60] = "７"
	omoteSuuji[44] = uraSuuji[28] = "８"
	omoteSuuji[24] = uraSuuji[36] = "９"
	omoteSuuji[28] = uraSuuji[44] = "０"
	omoteSuuji[8]   = uraSuuji[4]   = "．"
	omoteSuuji[2]   = uraSuuji[1]   = "，"

	omoteGaiji[32] = uraGaiji[16] = "a"
	omoteGaiji[40] = uraGaiji[20] = "b"
	omoteGaiji[48] = uraGaiji[48] = "c"
	omoteGaiji[52] = uraGaiji[56] = "d"
	omoteGaiji[36] = uraGaiji[24] = "e"
	omoteGaiji[56] = uraGaiji[52] = "f"
	omoteGaiji[60] = uraGaiji[60] = "g"
	omoteGaiji[44] = uraGaiji[28] = "h"
	omoteGaiji[24] = uraGaiji[36] = "i"
	omoteGaiji[28] = uraGaiji[44] = "j"
	omoteGaiji[34] = uraGaiji[17] = "k"
	omoteGaiji[42] = uraGaiji[21] = "l"
	omoteGaiji[50] = uraGaiji[49] = "m"
	omoteGaiji[54] = uraGaiji[57] = "n"
	omoteGaiji[38] = uraGaiji[25] = "o"
	omoteGaiji[58] = uraGaiji[53] = "p"
	omoteGaiji[62] = uraGaiji[61] = "q"
	omoteGaiji[46] = uraGaiji[29] = "r"
	omoteGaiji[26] = uraGaiji[37] = "s"
	omoteGaiji[30] = uraGaiji[45] = "t"
	omoteGaiji[35] = uraGaiji[19] = "u"
	omoteGaiji[43] = uraGaiji[23] = "v"
	omoteGaiji[29] = uraGaiji[46] = "w"
	omoteGaiji[51] = uraGaiji[51] = "x"
	omoteGaiji[55] = uraGaiji[59] = "y"
	omoteGaiji[39] = uraGaiji[27] = "z"
	omoteGaiji[13] = uraGaiji[14] = "."
	omoteGaiji[12] = uraGaiji[12] = ":"
	omoteGaiji[10] = uraGaiji[5]   = ";"
	omoteGaiji[8]   = uraGaiji[4]   = ","
	omoteGaiji[3]   = uraGaiji[3]   = "-"
	omoteGaiji[11] = uraGaiji[7]   = "?"
	omoteGaiji[27] = uraGaiji[39] = "!"
	omoteGaiji[2]   = uraGaiji[1]   = "'"
	omoteGaiji[1]   = uraGaiji[2]   = "大文字符"
//	omoteGaiji[27] = uraGaiji[39] = ""
//	omoteGaiji[27] = uraGaiji[39] = ""
//	omoteGaiji[27] = uraGaiji[39] = ""

}

function setCheckWord(n) {
	var checkWord;
	if (n < 32) {
		checkWord = (1 << n);
	} else {
		checkWord = (1 << (n - 32));
	}
}