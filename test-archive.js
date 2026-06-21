const hexo = require('hexo')('.', {silent: false});
hexo.init().then(() => hexo.load()).then(() => {
  const Post = hexo.model('Post');
  const Page = hexo.model('Page');
  console.log('Posts:', Post.find().length);
  const pages = Page.find().toArray();
  console.log('Pages:', pages.length);
  pages.forEach(p => console.log('Page:', p.source, 'type:', p.type, 'layout:', p.layout));
  // Find the archive generator output
  const archiveGen = require('./node_modules/hexo-generator-archive/lib/generator.js');
  const posts = Post.find({}, {pipeline: 'toArray'});
  const result = archiveGen.call(hexo, {posts: Post.toArray(Post.find())});
  console.log('\nArchive gen returns:', result.length, 'items');
  result.forEach(r => console.log(' -', r.path, 'layout:', r.layout));
}).catch(e => { console.log('Error:', e.message); console.log(e.stack); });