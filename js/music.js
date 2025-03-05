$(function () {
  var playerTrack = $("#player-track"),
    albumName = $("#album-name"),
    trackName = $("#track-name"),
    albumArt = $("#album-art"),
    sArea = $("#s-area"),
    seekBar = $("#seek-bar"),
    trackTime = $("#track-time"),
    insTime = $("#ins-time"),
    sHover = $("#s-hover"),
    playPauseButton = $("#play-pause-button"),
    i = playPauseButton.find("i"),
    tProgress = $("#current-time"),
    tTime = $("#track-length"),
    seekT,
    seekLoc,
    seekBarPos,
    cM,
    ctMinutes,
    ctSeconds,
    curMinutes,
    curSeconds,
    durMinutes,
    durSeconds,
    playProgress,
    bTime,
    nTime = 0,
    buffInterval = null,
    tFlag = false,

    albums = [],
    trackNames = [],
    albumArtworks = [],
    trackUrl = [],

    playPreviousTrackButton = $("#play-previous"),
    playNextTrackButton = $("#play-next"),
    currIndex = 0;
    playerTrackDom = document.getElementById('player-track');
    currentTimeDom = document.getElementById('current-time');
    trackLengthDom = document.getElementById('track-length');
    areaDom = document.getElementById('s-area');
    barDom = document.getElementById('seek-bar');

    musicIcon1 = document.querySelector('#icon1')
    musicIcon2 = document.querySelector('#icon2')

  function playPause() {
    setTimeout(function () {
      if (audio.paused) {
        playerTrack.addClass("active");
        albumArt.addClass("active");
        checkBuffering();
        i.attr("class", "fas fa-pause");
        audio.play();
      } else {
        albumArt.removeClass("active");
        clearInterval(buffInterval);
        albumArt.removeClass("buffering");
        i.attr("class", "fas fa-play");
        audio.pause();
      }
    }, 300);
  }

  function showHover(event) {
    seekBarPos = sArea.offset();
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());

    sHover.width(seekT);

    cM = seekLoc / 60;

    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
    if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
    else insTime.text(ctMinutes + ":" + ctSeconds);

    insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
  }

  function hideHover() {
    sHover.width(0);
    insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
  }

  function playFromClickedPos() {
    audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
  }

  function updateCurrTime() {
    nTime = new Date();
    nTime = nTime.getTime();

    if (!tFlag) {
      tFlag = true;
      trackTime.addClass("active");
    }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);

    playProgress = (audio.currentTime / audio.duration) * 100;

    if (curMinutes < 10) curMinutes = "0" + curMinutes;
    if (curSeconds < 10) curSeconds = "0" + curSeconds;

    if (durMinutes < 10) durMinutes = "0" + durMinutes;
    if (durSeconds < 10) durSeconds = "0" + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
    else tProgress.text(curMinutes + ":" + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
    else tTime.text(durMinutes + ":" + durSeconds);

    if (
      isNaN(curMinutes) ||
      isNaN(curSeconds) ||
      isNaN(durMinutes) ||
      isNaN(durSeconds)
    )
      trackTime.removeClass("active");
    else trackTime.addClass("active");

    seekBar.width(playProgress + "%");

    if (playProgress == 100) {
      i.attr("class", "fa fa-play");
      seekBar.width(0);
      tProgress.text("00:00");
      albumArt.removeClass("buffering").removeClass("active");
      clearInterval(buffInterval);
    }
  }

  function checkBuffering() {
    clearInterval(buffInterval);
    buffInterval = setInterval(function () {
      if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
      else albumArt.removeClass("buffering");

      bTime = new Date();
      bTime = bTime.getTime();
    }, 100);
  }

  async function selectTrack(flag) {
    if (flag == 1) {
      if (currIndex > musicIdList.length - 1) {
        currIndex = 0
      } else {
        ++currIndex;
      }
      getMusicInfo();
    } else if (flag == -1) {
      if (currIndex > 0) {
        albums.splice(currIndex, 1)
        trackNames.splice(currIndex, 1)
        albumArtworks.splice(currIndex, 1)
        trackUrl.splice(currIndex, 1)
        --currIndex;
        getMusicInfo('lrc')
      } else if (currIndex < 0) {
        currIndex = musicIdList.length - 1
      }
    } else {
      getMusicInfo();
    }

    if (currIndex > -1) {
      if (flag == 0) i.attr("class", "fa fa-play");
      else {
        albumArt.removeClass("buffering");
        i.attr("class", "fa fa-pause");
      }
      seekBar.width(0);
      trackTime.removeClass("active");
      tProgress.text("00:00");
      tTime.text("00:00");

      currAlbum = albums[currIndex];
      currTrackName = trackNames[currIndex];
      currArtwork = albumArtworks[currIndex];

      audio.src = trackUrl[currIndex];

      nTime = 0;
      bTime = new Date();
      bTime = bTime.getTime();

      if (flag != 0) {
        audio.play();
        playerTrack.addClass("active");
        albumArt.addClass("active");

        clearInterval(buffInterval);
        checkBuffering();
      }
      albumName.text(currAlbum);
      trackName.text(currTrackName);
      albumArt.find("img.active").removeClass("active");
      $("#musicPic").addClass("active");
      $("#musicPic").attr("src", currArtwork);
    } else {
      if (flag == 0 || flag == 1) --currIndex;
      else ++currIndex;
    }
  }

  function initPlayer() {
    audio = new Audio();

    selectTrack(0);

    audio.loop = false;

    playPauseButton.on("click", playPause);

    sArea.mousemove(function (event) {
      showHover(event);
    });

    sArea.mouseout(hideHover);

    sArea.on("click", playFromClickedPos);

    $(audio).on("timeupdate", updateCurrTime);

    $(audio).on("ended", function () {
      // 音频播放完成后的操作
      selectTrack(1);
    });

    playPreviousTrackButton.on("click", async function () {
      selectTrack(-1);
    });
    playNextTrackButton.on("click", async function () {
      selectTrack(1);
    });
  }

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  initPlayer();

  /**
   * 调用音乐接口进行查询
   */
  function getMusicInfo(flag) {
    const origin = 'https://www.hhlqilongzhu.cn/api'
    const indexMusic = musicIdList[currIndex]
    //第一步：建立所需的对象
    const url = flag === 'lrc' ? `${origin}/dg_geci.php?msg=${indexMusic}&n=1&type=2` : `${origin}/dg_mgmusic_24bit.php?msg=${indexMusic}&n=1&type=json`
    let httpRequest = new XMLHttpRequest();
    //第二步：打开连接  将请求参数写在url中
    httpRequest.open(
      "GET",
      url,
      false
    );
    httpRequest.onreadystatechange = async function () {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var json = httpRequest.responseText; //获取到json字符串，还需解析
          if (!flag) {
            var parseJson = JSON.parse(json);
            const { title, singer, cover, music_url, quality } = parseJson;
            // 歌名
            let str = title;
            if (title.indexOf(" (") !== -1) {
              str = title.split(" (")[0];
            } else if (title.indexOf("(") !== -1) {
              str = title.split("(")[0];
            }
            musicIcon1.style.display = 'none'
            musicIcon2.style.display = 'none'
            // HQ高品质、SQ无损、24bit至臻
            if (quality.indexOf('24bit') !== -1) {
              musicIcon1.style.display = 'inline-block'
            } else {
              musicIcon2.style.display = 'inline-block'
            }
            document.querySelector('#vipTextId').innerHTML = quality + '音质'
            albums.push(str);
            // 歌名 - 作者
            trackNames.push(title + " - " + singer);
            // 封面
            albumArtworks.push(cover);
            // 地址
            trackUrl.push(music_url);
            getMusicInfo('lrc')
          } else {
            initLrcContent(json)
          }
        }
      }
    };
    //第三步：发送请求
    httpRequest.send(null);
  }

  function initLrcContent (lrc) {
    // 最开始获取到的歌词列表是字符串类型（不好操作）
    let lrcArr = lrc.split('\n');
    // 接收修正后的歌词数组
    let result = [];
    // 获取所要用到的dom列表
    let doms = {
        ul: document.querySelector("ul"),
        container: document.querySelector(".containerLrc")
    }
    // 将歌词数组转成由对象组成的数组，对象有time和word两个属性（为了方便操作）
    for (let i = 0; i < lrcArr.length; i++) {
        var lrcData = lrcArr[i].split(']');
        var lrcTime = lrcData[0].substring(1);
        var obj = {
            time: parseTime(lrcTime),
            word: lrcData[1]
        }
        result.push(obj);
    }
    // console.log('result', result)
    // 将tiem转换为秒的形式
    function parseTime(lrcTime) {
        lrcTimeArr = lrcTime.split(":")
        return + lrcTimeArr[0] * 60 + +lrcTimeArr[1];
    }
    // 获取当前播放到的歌词的下标
    function getIndex() {
        let Time = audio.currentTime;
        for (let i = 0; i < result.length; i++) {
            if (result[i].time > Time) {
                return i - 1;
            }
        }
    }
    // 创建歌词列表
    function createElements() {
        let frag = document.createDocumentFragment(); // 文档片段
        for (let i = 0; i < result.length; i++) {
            let li = document.createElement("li");
            li.innerText = result[i].word;
            frag.appendChild(li);
        }
        doms.ul.appendChild(frag);
    }

    function loopDeleteDom () {
      const ulDom = document.querySelector('.wordList');
      while (ulDom.firstChild) {
        ulDom.firstChild.remove();
      }
    }
    // 先清除之前的所有的li元素
    loopDeleteDom();
    // 再创建歌词文档元素，展示歌词
    createElements();
    // 获取显示窗口的可视高度
    let containerHeight = doms.container.clientHeight;
    // 获取歌词列表的可视高度
    let liHeight = doms.ul.children[0].clientHeight;
    // 设置最大最小偏移量，防止显示效果不佳
    let minOffset = 0;
    let maxOffset = doms.ul.clientHeight - containerHeight;
    // 控制歌词滚动移动的函数
    function setOffset() {
        let index = getIndex();
        // 计算滚动距离
        let offset = liHeight * index - containerHeight / 2 + liHeight / 2;
        if (offset < minOffset) {
            offset = minOffset;
        };
        if (offset > maxOffset) {
            offset = maxOffset;
        };
        // 滚动
        doms.ul.style.transform = `translateY(-${offset}px)`;
        // 清除之前的active
        let li = doms.ul.querySelector(".active")
        if (li) {
            li.classList.remove("active");
        }
        // 为当前所唱到的歌词添加active
        li = doms.ul.children[index];
        if (li) {
            li.classList.add("active");
        }
    };
    // 当audio的播放时间更新时，触发该事件
    $(audio).on("timeupdate", setOffset);
  }

  // 左右键监听
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      selectTrack(-1);
    } else if (event.key === 'ArrowRight') {
      selectTrack(1);
    } else if (event.keyCode === 32) {
      event.preventDefault()
      playPause();
    }
  });
});
