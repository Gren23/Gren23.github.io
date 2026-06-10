(function() {
    var linkCom = function(e) {
        var t = document.querySelector(".el-textarea__inner");
        if (e === 'bf') {
            t.value = "```yml\n";
            t.value += "- name: \n  link: \n  avatar: \n  descr: \n  siteshot: ";
            t.value += "\n```";
            t.setSelectionRange(15, 15);
        } else {
            t.value = "站点名称：\n站点地址：\n头像链接：\n站点描述：\n站点截图：";
            t.setSelectionRange(5, 5);
        }
        t.focus();
    };

    var owoBig = function() {
        if (!document.getElementById("post-comment") || document.body.clientWidth < 768) return;
        var e = 1;
        var t = "";
        var o = document.createElement("div");
        var n = document.querySelector("body");
        o.id = "owo-big";
        n.appendChild(o);
        new MutationObserver(function(l) {
            for (var a = 0; a < l.length; a++) {
                var i = l[a].addedNodes;
                var s = "";
                if (i.length === 2 && i[1].className === "OwO-body") {
                    s = i[1];
                } else {
                    if (i.length !== 1 || i[0].className !== "tk-comment") continue;
                    s = i[0];
                }
                s.onmouseover = function(l) {
                    e && (s.className === "OwO-body" && l.target.tagName === "IMG" || l.target.className === "tk-owo-emotion") && (e = 0, t = setTimeout(function() {
                        var c = 3 * l.path[0].clientHeight;
                        var w = 3 * l.path[0].clientWidth;
                        var left = l.x - l.offsetX - (w - l.path[0].clientWidth) / 2;
                        var top = l.y - l.offsetY;
                        if (left + w > n.clientWidth) left = left - (left + w - n.clientWidth + 10);
                        if (left < 0) left = 10;
                        o.style.cssText = "display:flex; height:" + c + "px; width:" + w + "px; left:" + left + "px; top:" + top + "px;";
                        o.innerHTML = "<img src=" + l.target.src + ">";
                    }, 300));
                };
                s.onmouseout = function() {
                    o.style.display = "none";
                    e = 1;
                    clearTimeout(t);
                };
            }
        }).observe(document.getElementById("post-comment"), {
            subtree: true,
            childList: true
        });
    };

    // 暴露给全局（兼容旧调用方式）
    window.kslink = { linkCom: linkCom, owoBig: owoBig };
})();