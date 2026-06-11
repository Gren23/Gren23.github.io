var start_date = '20220901' // 开始日期
var date = new Date();
var end_date = '' + date.getFullYear() + (date.getMonth() > 8 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + (date.getDate() > 9 ? date.getDate() : ("0" + date.getDate())); // 结束日期

var access_token = '' // accessToken（百度统计 API Token）
var site_id = '' // 网址 id（百度统计站点 ID）
var dataUrl = '' + access_token + '&site_id=' + site_id
var metrics = 'pv_count' // 统计访问次数 PV 填写 'pv_count'，统计访客数 UV 填写 'visitor_count'
var metricsName = (metrics === 'pv_count' ? '访问次数' : (metrics === 'visitor_count' ? '访客数' : ''))
var color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4c4948' : 'rgba(255,255,255,0.7)'

// 动态加载 ECharts（按需加载，不阻塞首屏）
function loadECharts(callback) {
  if (window.echarts) {
    callback();
    return;
  }
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js';
  script.onload = callback;
  script.onerror = function() {
    // CDN 失败则尝试本地
    var localScript = document.createElement('script');
    localScript.src = '/js/echarts.min.js';
    localScript.onload = callback;
    document.head.appendChild(localScript);
  };
  document.head.appendChild(script);
}

// 通用图表渲染器（避免重复注入 script 标签）
function renderChart(containerId, option) {
  if (!containerId || document.getElementById(containerId + '_rendered')) return;
  var chart = echarts.init(document.getElementById(containerId), 'light');
  chart.setOption(option);
  window.addEventListener('resize', function() { chart.resize(); });
  document.getElementById(containerId).dataset.rendered = 'true';
}

// 访问地图
function mapChart() {
  var paramUrl = '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=overview/getDistrictRpt';
  fetch(dataUrl + paramUrl).then(function(data) { return data.json(); }).then(function(data) {
    var mapName = data.result.items[0];
    var mapValue = data.result.items[1];
    var mapArr = [];
    var max = mapValue[0][0];
    for (var i = 0; i < mapName.length; i++) {
      mapArr.push({ name: mapName[i][0], value: mapValue[i][0] });
    }
    renderChart('map-chart', {
      title: { text: '网站访客地域分布图🌏', x: 'center', textStyle: { color: color } },
      tooltip: { trigger: 'item' },
      visualMap: { min: 0, max: max, left: 'left', top: 'bottom', text: ['多','少'], color: ['#39c5bb','#b9ebe4'], textStyle: { color: color }, calculable: true },
      series: [{ name: metricsName, type: 'map', mapType: 'china', showLegendSymbol: false,
        label: { normal: { show: false }, emphasis: { show: true, color: '#617282' } },
        itemStyle: { normal: { areaColor: 'rgb(230, 232, 234)', borderColor: 'rgb(255, 255, 255)', borderWidth: 1 }, emphasis: { areaColor: 'gold' } },
        data: mapArr }]
    });
  }).catch(function(error) {
    console.log(error);
  });
}

// 访问趋势
function trendsChart() {
  var paramUrl = '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=trend/time/a&gran=month';
  fetch(dataUrl + paramUrl).then(function(data) { return data.json(); }).then(function(data) {
    var monthArr = [];
    var monthValueArr = [];
    var monthName = data.result.items[0];
    var monthValue = data.result.items[1];
    for (var i = monthName.length - 1; i >= 0; i--) {
      monthArr.push(monthName[i][0].substring(0, 7).replace('/', '-'));
      monthValueArr.push(monthValue[i][0] !== '--' ? monthValue[i][0] : 0);
    }
    renderChart('trends-chart', {
      title: { text: '网站访客日期分布图📅', x: 'center', textStyle: { color: color } },
      tooltip: { trigger: 'axis' },
      xAxis: { name: '日期', type: 'category', boundaryGap: false, nameTextStyle: { color: color }, axisTick: { show: false },
        axisLabel: { show: true, color: color }, axisLine: { show: true, lineStyle: { color: color } }, data: monthArr },
      yAxis: { name: metricsName, type: 'value', nameTextStyle: { color: color }, splitLine: { show: false },
        axisTick: { show: false }, axisLabel: { show: true, color: color }, axisLine: { show: true, lineStyle: { color: color } } },
      series: [{ name: metricsName, type: 'line', smooth: true, lineStyle: { width: 0 },
        showSymbol: false, itemStyle: { opacity: 1, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(128, 255, 165)' }, { offset: 1, color: 'rgba(1, 191, 236)' }]) },
        areaStyle: { opacity: 1, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(128, 255, 165)' }, { offset: 1, color: 'rgba(1, 191, 236)' }]) },
        data: monthValueArr, markLine: { data: [{ name: '平均值', type: 'average', label: { color: color } }] } }]
    });
  }).catch(function(error) {
    console.log(error);
  });
}

// 访问来源
function sourcesChart() {
  var paramUrl = '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=source/all/a';
  fetch(dataUrl + paramUrl).then(function(data) { return data.json(); }).then(function(data) {
    var sourcesName = data.result.items[0];
    var sourcesValue = data.result.items[1];
    var sourcesArr = [];
    for (var i = 0; i < sourcesName.length; i++) {
      sourcesArr.push({ name: sourcesName[i][0].name, value: sourcesValue[i][0] });
    }
    renderChart('sources-chart', {
      title: { text: '网站访客来源分布图🎨', x: 'center', textStyle: { color: color } },
      legend: { top: 'bottom', textStyle: { color: color } },
      tooltip: { trigger: 'item' },
      series: [{ name: metricsName, type: 'pie', radius: [30, 80], center: ['50%', '50%'], roseType: 'area',
        label: { color: color, formatter: '{b} : {c} ({d}%)' },
        data: sourcesArr,
        itemStyle: { emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(255, 255, 255, 0.5)' } } }]
    });
  }).catch(function(error) {
    console.log(error);
  });
}

// 仅当 Charts 页面元素存在时才加载 ECharts 并渲染
if (document.getElementById('map-chart') || document.getElementById('trends-chart') || document.getElementById('sources-chart')) {
  loadECharts(function() {
    if (document.getElementById('map-chart')) mapChart();
    if (document.getElementById('trends-chart')) trendsChart();
    if (document.getElementById('sources-chart')) sourcesChart();
  });
}