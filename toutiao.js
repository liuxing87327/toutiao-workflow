#!./node

var superagent = require('superagent');
var cheerio = require('cheerio');
var rp = require('request-promise');

var day = process.argv[2] || '7';

rp('https://toutiao.io/posts/hot/' + day)
	.then(function(htmlStr) {
		var output = {
			items: []
		};

		var $ = cheerio.load(htmlStr);
		$('div.post').each(function(idx, element) {
			var $element = $(element);
			var content = $element.find('div.content').eq(0);
			var title = content.find('h3.title a').eq(0);

			output.items.push({
				title: title.attr('title').replace(' - 开发者头条', ''),
				subtitle: content.find('p.summary a').eq(0).text(),
				arg: 'https://toutiao.io' + content.attr('data-url')
			});
		});

		console.log(JSON.stringify(output));
	}).catch(function(err) {

	});

// new Promise(function(resolve, reject) {
// 	superagent.get('https://toutiao.io/posts/hot/' + day)
// 		.end(function(err, sres) {
// 			if (err) {
// 				return next(err);
// 			}

// 			var $ = cheerio.load(sres.text);
// 			$('div.post').each(function(idx, element) {
// 				var $element = $(element);
// 				var content = $element.find('div.content').eq(0);
// 				var title = content.find('h3.title a').eq(0);

// 				output.items.push({
// 					title: title.attr('title').replace(' - 开发者头条', ''),
// 					subtitle: content.find('p.summary a').eq(0).text(),
// 					arg: 'https://toutiao.io' + content.attr('data-url')
// 				});
// 			});

// 			resolve(output);
// 		});


// }).then(function(value) {
// 	output = value;
// }, function(value) {

// });