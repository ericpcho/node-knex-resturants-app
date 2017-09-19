'use strict';

const express = require('express');

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

const app = express();
const Treeize = require('treeize');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


app.get('/restaurants', (req, res) => {
  knex.select('id', 'name', 'cuisine', 'borough')
    .from('restaurants')
    .limit(10)
    .then(results => res.json(results));
});

// app.get('/restaurants/:id', (req, res) => {
//   knex.first('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id', 'grade', 'date as inspectionDate', 'score')
//   .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode ) as address"))
//   .from('restaurants')
//   .where('restaurants.id', req.params.id)
//   .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')    
//   .orderBy('date', 'desc')
//   .limit(1)
//   .then(results => res.json(results));
// });

// MANUAL HYDRATE TRY IT

// app.get('/restaurants', (req, res) => {
//   knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
//   .from('restaurants')
//   .where('restaurants.id', 1)
//   .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//   .orderBy('date', 'asc')
//   .then(results => {console.log(results); 

//   const hydrated = {};
//   results.forEach(row => {
//     if ( !(row.id in hydrated) ) {
//       hydrated[row.id] = {
//         id: row.id,
//         name: row.name,
//         cuisine: row.cuisine,
//         borough: row.borough,
//         grades: []
//       }
//     }
//     hydrated[row.id].grades.push({
//       gradeId: row.gradeId,
//       grade: row.grade,
//       score: row.score
//     })
//   })
//   res.json(hydrated);
//   });
// });




// TREEIZE TRY IT 

// app.get('/restaurants', (req, res) => {
//   knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as grades:gradeId', 'grade as grades:grade', 'score as grades:score')
//   .from('restaurants')
//   .where('restaurants.id', 1)
//   .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//   .orderBy('date', 'asc')
//   .then(results => {const restaurantData = results
//     // res.json(restaurantData)
//     const restaurants = new Treeize();
//     restaurants.grow(restaurantData);
//     res.json(restaurants.getData())
//   }) 
// });

app.post('/restaurants/', jsonParser, (req, res) => {
  const requiredFields = ['name', 'cuisine', 'borough', 'grades']
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }



  knex('restaurants').insert(
    {
      name: req.body.name,
      cuisine: req.body.cuisine,
      borough: req.body.borough
    })
    .returning(['id', 'name', 'cuisine', 'borough'])
    .then(restId => {
      console.log('this is my restID', restId),
      req.body.grades.forEach(item => {
        knex('grades').insert(
          {
            restaurant_id: restId[0].id,
            grade: item.grade,
            score: item.score,
            date: new Date
          })

          .returning(['grade', 'score'])
          .then(results => { console.log('HELLO RESULTS', results) });
      })
    })
})




app.listen(PORT);

