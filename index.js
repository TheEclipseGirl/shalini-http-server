const http = require('http');
const { v4: uuidv4 } = require('uuid');
const port = 8000;


// Create Server
const server = http.createServer((req, res) => {
    let url = req.url;

    let params = url.split('/');
    url = '/' + params[1];
    
    switch(url){
        case '/html': 
        res.writeHead(200, {
            'content-type' : 'text/html'
        });
            return res.end(`<!DOCTYPE html>

            <html>
              <head>
              </head>
              <body>
                  <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
                  <p> - Martin Fowler</p>
            
              </body>
            </html>
            `);
        case '/json' :
            res.writeHead(200 , {
                'content-type': 'application/json'
            })
            return res.end(`{
                "slideshow": {
                  "author": "Yours Truly",
                  "date": "date of publication",
                  "slides": [
                    {
                      "title": "Wake up to WonderWidgets!",
                      "type": "all"
                    },
                    {
                      "items": [
                        "Why <em>WonderWidgets</em> are great",
                        "Who <em>buys</em> WonderWidgets"
                      ],
                      "title": "Overview",
                      "type": "all"
                    }
                  ],
                  "title": "Sample Slide Show"
                }
              }`)
        case '/uuid' :
            let uuid  = uuidv4();
                res.writeHead(200 ,{
                    'content-type' : 'application/json'
                })
                let uuidResponse = { 
                    "uuid": uuid
                }
            uuidResponse = JSON.stringify(uuidResponse);
            return res.end(uuidResponse);
        case '/status': 
            res.writeHead(parseInt(params[2]) , {
                'content-type': 'application/json'
            })
            return res.end(JSON.stringify({
                'message': 'status',
            }));
        case '/delay' :
            setTimeout(() => {
                res.writeHead(200, {
                    'content-type': 'application/json'
                })
                return res.end(JSON.stringify({
                    'message': 'ok',
                }));
            }, parseInt(params[2] * 1000));
            break;
        default :
            res.writeHead(404);
            return res.end('404 not found');
    }
  })
server.listen(port ,(error)=>{
    if(error){
        console.log(`Error in Starting Server at port ${port}`);
        return;
    }
    console.log(`Server Is Up And Runnig on the port ${port}`);
});
