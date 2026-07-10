
/**
 * search-expand.js
 * 内联展开式搜索：替代原来的全屏弹窗搜索
 */

(function () {
  'use strict'

  var searchWrap = document.getElementById('search-wrap')
  var searchIcon = document.getElementById('search-icon')
  var searchInput = document.getElementById('search-input')
  var searchClose = document.getElementById('search-close')

  if (!searchWrap || !searchInput) return

  function openSearch () {
    searchWrap.classList.add('active')
    searchIcon.style.display = 'none'
    searchInput.focus()
  }

  function closeSearch () {
    searchWrap.classList.remove('active')
    searchIcon.style.display = ''
    searchInput.value = ''
    hideDropdown()
  }

  searchIcon.addEventListener('click', function (e) {
    e.preventDefault()
    openSearch()
  })

  searchClose.addEventListener('click', function (e) {
    e.preventDefault()
    closeSearch()
  })

  document.addEventListener('click', function (e) {
    if (!searchWrap.contains(e.target)) {
      if (searchWrap.classList.contains('active') && searchInput.value === '') {
        closeSearch()
      }
    }
  })

  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape' && searchWrap.classList.contains('active')) {
      closeSearch()
    }
  })

  var dropdown = null
  var localSearchInstance = null

  function ensureDropdown () {
    if (!dropdown) {
      dropdown = document.createElement('div')
      dropdown.id = 'search-results-dropdown'
      searchWrap.appendChild(dropdown)
    }
  }

  function hideDropdown () {
    if (dropdown) dropdown.classList.remove('show')
  }

  function showDropdown () {
    if (dropdown) dropdown.classList.add('show')
  }

  function getLocalSearch () {
    if (!localSearchInstance) {
      localSearchInstance = window.localSearch
    }
    return localSearchInstance
  }

  var searchTimer = null
  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimer)
    var val = this.value.trim()
    if (val === '') {
      hideDropdown()
      return
    }
    searchTimer = setTimeout(function () {
      performSearch(val)
    }, 200)
  })

  function performSearch (searchText) {
    var ls = getLocalSearch()
    if (!ls || !ls.isfetched) {
      if (ls) {
        ls.fetchData()
        ls.isfetched = true
      }
      ensureDropdown()
      dropdown.innerHTML = '<div class="search-loading">加载中...</div>'
      showDropdown()
      var handler = function () {
        window.removeEventListener('search:loaded', handler)
        performSearch(searchText)
      }
      window.addEventListener('search:loaded', handler)
      return
    }

    var keywords = searchText.split(/[-\s]+/)
    var resultItems = ls.getResultItems(keywords)
    ensureDropdown()

    if (resultItems.length === 0) {
      dropdown.innerHTML = '<div id="search-no-result">没有找到相关内容</div>'
      showDropdown()
      return
    }

    var topItems = resultItems.slice(0, 5)
    var html = '<ul style="margin:0;padding:0;list-style:none;">'
    topItems.forEach(function (result) { html += result.item })
    html += '</ul>'
    if (resultItems.length > 5) {
      html += '<div style="padding:0.5rem 1rem;text-align:center;font-size:0.8125rem;color:var(--c-text-secondary);">查看全部 ' + resultItems.length + ' 条结果</div>'
    }
    dropdown.innerHTML = html
    showDropdown()
  }

  document.addEventListener('click', function (e) {
    var hit = e.target.closest('.local-search-hit-item')
    if (hit && hit.querySelector('a')) {
      window.location.href = hit.querySelector('a').href
      closeSearch()
    }
  })

  searchInput.addEventListener('keydown', function (e) {
    if (e.code === 'Enter') {
      var firstHit = dropdown ? dropdown.querySelector('.local-search-hit-item a') : null
      if (firstHit) {
        window.location.href = firstHit.href
        closeSearch()
      }
    }
  })

})()
