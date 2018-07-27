var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if (path === '/') {
    var string = fs.readFileSync('./index.html', 'utf-8')
    var amount = fs.readFileSync('./db', 'utf-8')   // db === 100 zifuhuan     
    string = string.replace('&&&amount&&&', amount)
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/style.css') {
    var string = fs.readFileSync('./style.css', 'utf-8');
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/main.js') {
    var string = fs.readFileSync('./style.css', 'utf-8');
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/pay') {
    var amount = fs.readFileSync('./db', 'utf-8')    //100
    var newAmount = amount - 1;
    if (Math.random() > 0.2) {
      fs.writeFileSync('./db', newAmount);
      // response.setHeader('Content-Type', 'image/jpg');    img发请求法用
      response.setHeader('Content-Type','application/javascript')
      response.statusCode = 200;
      // response.write(fs.readFileSync('./a.jpg'))  img法请求法使用
      // response.write("文字")
      response.write(`
        ${query.callback}.call(undefined,'success')
      `)
    } else {
      response.statusCode = 400;
      response.write('fail');
    }
    response.end();
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('呜呜呜,没找到对应的路径')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port) 