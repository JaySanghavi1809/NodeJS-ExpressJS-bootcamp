const { json } = require('express');
const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json());

// app.get('/',(req,res)=>{
//     res.status(200).send("Hello from the server side!")
// });

// app.get('/',(req,res)=>{
//     res
//     .status(404)
//     .json({message:"Hello from the server side!",app: "natours" })
// })

// app.post('/',(req,res)=>{
//     res.send("you can post to this endpoint...");
// })

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//GET Request:
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }

    });
});

//Responding URL Parameters 
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
          status: 'fail',
          message: 'Invalid ID'
        });
      }

    
    
    const tour = tours.find(e1 => e1.id === req.params)

    res.status(200).json({
        status: 'success',
        data: {
            tour 
        }

    });
});



//POST Request:
app.post(`/api/v1/tours`, (req, res) => {
    // console.log(req.body)

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
    JSON.stringify(tours),
    err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour:newTour
            }
        });
    })
});

app.patch(`/api/v1/tours`,(req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data:{
            tour: '<updated tour here..>',
          
        }
    })
})


app.delete(`/api/v1/tours`,(req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:'fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
      });
})


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})