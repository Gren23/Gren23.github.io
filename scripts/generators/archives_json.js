'use strict'

hexo.extend.generator.register('archives_json', function(locals) {
  var posts = locals.posts.sort('date', 'desc');
  var data = {};

  posts.forEach(function(post) {
    var year = post.date.year();
    if (!data[year]) {
      data[year] = [];
    }
    data[year].push({
      title: post.title,
      url: '/' + post.path,
      date: post.date.format('YYYY-MM-DD'),
      categories: post.categories ? post.categories.map(function(c) { return c.name; }) : [],
      tags: post.tags ? post.tags.map(function(t) { return t.name; }) : []
    });
  });

  var result = Object.keys(data).map(function(year) {
    return {
      year: parseInt(year),
      posts: data[year]
    };
  });

  return {
    path: 'api/archives.json',
    data: JSON.stringify(result)
  };
});