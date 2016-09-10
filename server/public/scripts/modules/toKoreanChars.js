/**
 * Created by Seokhwan on 2016. 6. 15..
 */
"use strict";
String.prototype.toKoreanChar = function() {
  var cCho  = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
    cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ],
    cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
    cho, jung, jong;

  var str = this,
    cnt = str.length,
    chars = '',
    cCode;

  for (var i = 0; i < cnt; i++) {
    cCode = str.charCodeAt(i);

    if (cCode == 32) { continue; }

    // 한글이 아닌 경우
    if (cCode < 0xAC00 || cCode > 0xD7A3) {
      chars += (str.charAt(i));
      continue;
    }

    cCode  = str.charCodeAt(i) - 0xAC00;

    jong = cCode % 28; // 종성
    jung = ((cCode - jong) / 28 ) % 21 // 중성
    cho  = (((cCode - jong) / 28 ) - jung ) / 21 // 초성

    //배열에 중성(모음을 PUSH함)
    chars+=(cJung[jung]);
  }

  return chars;
}
