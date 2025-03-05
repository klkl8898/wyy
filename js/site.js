document.getElementById("scrollDownIcon").onclick = () => {
  document.body.scrollTop = document.getElementById("skill").offsetTop;
};
document.getElementById("aboutText").onclick = () => {
  document.body.scrollTop =
    document.getElementsByClassName("musicBody")[0].offsetTop - 90;
};
document.getElementById("footmarkText").onclick = () => {
  document.body.scrollTop =
    document.getElementsByClassName("mapMark")[0].offsetTop - 90;
};
document.getElementById("msgText").onclick = () => {
  document.body.scrollTop =
    document.getElementsByClassName("walineDiv")[0].offsetTop - 90;
};
document.getElementById("logText").onclick = () => {
  document.body.scrollTop =
    document.getElementById("chronicles").offsetTop - 200;
};
document.getElementById("contributionBox").onmouseenter = () => {
  const domList = document.querySelectorAll("#contributionBox img");
  domList.forEach((dom) => {
    dom.removeAttribute("contributionImg");
    dom.setAttribute("class", "intervalCss");
  });
  setTimeout(() => {
    domList.forEach((dom) => {
      dom.style["margin-right"] = "0px";
    });
  }, 150);
};
document.getElementById("contributionBox").onmouseleave = () => {
  const domList = document.querySelectorAll("#contributionBox img");
  domList.forEach((dom) => {
    dom.removeAttribute("intervalCss");
    dom.setAttribute("class", "contributionImg");
    dom.style["margin-right"] = "-15px";
  });
};
document.getElementById("jay").onclick = () => {
  window.open("https://baike.baidu.com/item/周杰伦/129156", "_blank");
};
document.getElementById("cr7").onclick = () => {
  window.open(
    "https://baike.baidu.com/item/克里斯蒂亚诺·罗纳尔多/4510104",
    "_blank"
  );
};
document.getElementById("marvel").onclick = () => {
  window.open("https://baike.baidu.com/item/漫威", "_blank");
};
document.getElementById("DC").onclick = () => {
  window.open("https://baike.baidu.com/item/DC漫画", "_blank");
};
document.getElementById("mailId").onclick = () => {
  window.open("mailto:********@**.com");
};
setTimeout(() => {
  let cardDomList = document.getElementsByClassName("firstCard");
  let dom = "";
  for (let x = 0; x < cardDomList.length; x++) {
    dom = cardDomList[x];
    dom.onmouseenter = (e) => {
      const cardDom = document.getElementById("cardText");
      cardDom.innerText = cardDescList[x];
    };
  }
}, 0);
window.addEventListener("scroll", function scrollLoadMore() {
  let scrollTop = document.body.scrollTop; //滚动上去隐藏部分的高度
  const scrollHeight = document.getElementById("skill").scrollHeight;
  if (scrollTop > scrollHeight) {
    document.getElementById("navTopMenu").style.backdropFilter = "blur(200px)";
  } else {
    document.getElementById("navTopMenu").style.backdropFilter = "";
  }
});

setTimeout(() => {
  const loaderStyle = document.getElementsByClassName("loader")[0].style;
  loaderStyle.opacity = 0;
  loaderStyle.height = "0px";
  document.getElementById("contentPage").style.opacity = 1;
}, 3000);

// 生成随机数
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
function date() {
  var shower = document.getElementById("sitTip"); //不断获取新的被输出的数据
  var subtime = (Date.now() - new Date("2023-06-09 12:00:00")) / 1000; //计算时间差,并将毫秒转化为秒
  var days = parseInt(subtime / 86400); //天  24*60*60*1000
  var hours = fillZero(parseInt(subtime / 3600) - 24 * days); //小时  60*60  总小时数-过去小时数=现在小时数
  var mins = fillZero(parseInt((subtime % 3600) / 60)); //分钟 - (day*24)  以60秒为一整份  取余 剩下秒数 秒数/60就是分钟数
  var secs = fillZero(parseInt(subtime % 60)); //以60秒为一整份  取余  剩下秒数
  let timer =
    "已悄悄运行：" + days + "天" + hours + "小时" + mins + "分" + secs + "秒";
  shower.innerHTML = timer; //输入自己规定的形式的数据
}
function fillZero(num) {
  let numStr = num + "";
  return numStr.length === 1 ? "0" + numStr : numStr;
}
function chaju(date1, date2) {
  //建立一个方法来进行计算
  var time1 = Date.parse(date1); //将日期转换成毫秒值
  var time2 = Date.parse(date2);
  var time3 = time2 - time1; //毫秒值进行计算
  return time3;
}
setInterval(function () {
  date();
}, 1000);
