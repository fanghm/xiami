/**
 * Created by tsq on 14-7-17.
 * 工具对象
 */
var tool = {
    // 将汉字转换成utf编码
    toUTF8: function(szInput){
        var wch, x, uch = "", szRet = "";

        for (x = 0; x < szInput.length; x++) {
            wch = szInput.charCodeAt(x);
            if (!(wch & 0xFF80)) {
                szRet += szInput.charAt(x);
            } else if (!(wch & 0xF000)) {
                uch = "%" + (wch >> 6 | 0xC0).toString(16) +
                    "%" + (wch & 0x3F | 0x80).toString(16);
                szRet += uch;
            } else {
                uch = "%" + (wch >> 12 | 0xE0).toString(16) +
                    "%" + (((wch >> 6) & 0x3F) | 0x80).toString(16) +
                    "%" + (wch & 0x3F | 0x80).toString(16);
                szRet += uch;
            }
        }
        return(szRet);
    },
    // 从字符串中拆分出id
    getID: function(str, start, end){
        var i1 = str.lastIndexOf(start);
        var i2 = str.lastIndexOf(end);
        var id = id.substring(i1 + 1, i2); // 某个歌手的唯一uid
        return id;
    }
};

module.exports = tool;