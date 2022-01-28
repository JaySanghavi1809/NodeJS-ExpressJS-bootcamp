const fs = require('fs');
const server = require('http').createServer();

server.on('request',(req,res)=>{
    
    //solution-1
    // fs.readFile('test-file.txt',(err,data)=>{
    //     if(err) console.log(err);
    //     res.end(data)
    // })

    //solution-2: Streams
    // const Readable = fs.createReadStream("test1-file.txt");
    // Readable.on("data",chunk =>{
    //     res.write(chunk);
    // });
    // Readable.on("end",()=>{
    //     res.end();
    // });
    // Readable.on("error",err=>{
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found")
    // })
    //solution-3
    const Readable = fs.createReadStream("test-file.txt");
    Readable.pipe(res);
    //readableSource.pipe(writeableDest)

    });

server.listen(8000,"127.0.0.1", ()=>{
    console.log("Listing....");

})