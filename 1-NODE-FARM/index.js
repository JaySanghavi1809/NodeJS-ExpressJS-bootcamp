const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');
////////////////////////////
/////////Files///////////////

//synchronous file system:-
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

//create new file and old file txt override  in new file
// const textOut =`this is what we no about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File written!');

//non-blocking Asynchronous way:-
// fs.readFile('./txt/start.txt','utf-8',(err,data)=>{
//     console.log(data);
// });
// console.log("will read file!");

//one file overwrite to another file:-
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1)=>{
//     if(err) return console.log("ERROR!...");
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`,'utf-8',(err,data3)=>{
//             console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err =>{
//                 console.log("your file has been written");

//             })
//         })
//     })
// });
// console.log('will read file');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR! 💥');

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);

// const hello = 'Hello world';
// console.log(hello);


////////////////////////
//////////SERVER///////
 


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
 const dataObj = JSON.parse(data);
 const slugs = dataObj.map(el=>slugify(el.productname,{lower :true}));
console.log(slugs);


const server = http.createServer((req, res) => {
     const {query, pathname} = url.parse(req.url, true);
// Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardshtml = dataObj.map(el=> replaceTemplate(tempCard, el)).join('');
       const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardshtml);
        res.end(output);

// // Product Page
   } else if (pathname === '/product') {
      res.writeHead(200, { 'Content-type': 'text/html' });
      const product = dataObj[query.id];
      const output = replaceTemplate(tempProduct,product);
       res.end(output);


 //API
     } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
         res.end(data);
 //Not Found
     } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
         res.end("<h1>Page Not Found!</h1>");
     }

})

server.listen(8000, '127.0.0.1', (req, res) => {
    console.log("Listening to requests on port 8000");

})