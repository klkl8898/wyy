setTimeout(() => {
  console.clear();
  var e = "%c";
  var n =
    "color:#ffb501;text-shadow:5px 5px 2px #fff, 5px 5px 2px #373E40, 5px 5px 5px #A2B4BA, 5px 5px 10px #82ABBA;font-weight:bolder;font-size:50px";
  console.info(e + "想象依然无限大，感觉依然说不完，音乐依然范特西。\r\n", n);
  const musicLogCss = 'color: #78c08c;font-size: 20px;font-weight:bolder;'
  console.info(e + "总有一些你没聆听过的音乐秘密在等待着你。\r\n\r\n", musicLogCss);
}, 2000);

window.oncontextmenu = function (event) {
  event.preventDefault();
  return false;
};
