'use strict'

hexo.extend.generator.register('categories_json', function(locals) {
  var categories = (locals.categories || []).sort(function(a, b) {
    return a.name.localeCompare(b.name, 'zh');
  }).map(function(cat) {
    return {
      name: cat.name,
      count: cat.length,
      path: cat.path
    };
  });
  return {
    path: 'api/categories.json',
    data: JSON.stringify(categories)
  };
});