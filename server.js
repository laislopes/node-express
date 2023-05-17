const http = require("http")
const port = 3000;

const routes = {
    '/': 'Node Course',
    '/books': 'Books route'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(routes[req.url]);
})

server.listen(port, ()=> {
    console.log(`Server listening on http://localhost:${port}`)
})
