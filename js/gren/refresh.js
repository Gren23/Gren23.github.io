var flinks = [];
if (document.getElementById('post-cover-img')) {
  gren.switchThemeColor(gren.getMainColor())
}
gren.catalogActive()
gren.postAddToc()
gren.footerRandomFlink(flinks, 3)
gren.listenToPageInputPress()

// 顶部菜单栏 评论按钮
if (document.getElementById('comment-button')) document.getElementById('comment-button').style.display = document.getElementById('post-comment') ? 'block' : 'none'
if (document.getElementById('barrage-btn')) document.getElementById('barrage-btn').style.display = document.getElementById('post-comment') ? 'block' : 'none'