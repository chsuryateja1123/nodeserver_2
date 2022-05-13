const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000,
        'Content-Type': 'application/json'  // 30 days
        /** add other headers too */
      };

    /*

        we can Navigate to different pages via different requests.
        if / then goto index.html
        if /about about then goto about.html
        if /api then laod the JSON file  /  ;) this might be something you need for your exam.

    */

    if (req.url === '/') {
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
                    (err, content) => {

                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }

    else if (req.url === '/about') {


        // read the about.html file public folder
        fs.readFile(
            path.join(__dirname, 'public', 'about.html'),
                    (err, content) => {

                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
    }
    else if (req.url === '/css'){
        fs.readFile(
            path.join(__dirname, 'public', 'css', 'styles.css'),
                (err, content) => {
                    if(err) throw err;
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(content);
                }
        )
    }
    else if (req.url === '/image'){
        fs.readFile(
            path.join(__dirname, 'public', 'images', 'img.jpeg'),
                (err, content) => {
                    if(err) throw err;
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.end(content);
                }
        )
    }
    else if (req.url==='/api')
    {
        fs.readFile(
            path.join(__dirname, 'public', 'db.json'),'utf-8',
                    (err, content) => {

                                    if (err) throw err;
                                    // Please note the content-type here is application/json
                                    res.writeHead(200,headers);
                                    res.end(content);
                        }
              );
    }
    else{
        res.end("<h1> 404 nothing is here</h1>");
    }

    /*

        But what if we have  1000 pages/urls ? do we need to write 1000 if-else statements?

        It depends on the types of pages you are providing, if it can be categorised in some groups
        then need not go for if else statement for each instead just name the file as the url you want
        and just create a dynamic link which will take the user input url check for that file if exists
        send it as response else throw error page

    */
});

// it will first try to look for
// environment variable, if not found then go for 5959
const PORT= process.env.PORT || 5959;

// port, callback
server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));
