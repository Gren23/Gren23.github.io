'use strict'

hexo.extend.generator.register('tags_json', function(locals) {
  var tags = (locals.tags || []).sort(function(a, b) {
    return a.name.localeCompare(b.name, 'zh');
  }).map(function(tag) {
    return {
      name: tag.name,
      length: tag.length,
      path: tag.path
    };
  });
  return {
    path: 'api/tags.json',
    data: JSON.stringify(tags)
  };
});