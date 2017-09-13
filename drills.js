'use strict';

const { DATABASE } = require('./config');
const knex = require('knex')(DATABASE);

// clear the console before each run
process.stdout.write('\x1Bc');

// Sample select 
// knex
//   .select()
//   .from('restaurants')
//   .limit(10)
//   .debug(true)
//   .then(results => console.log(results));

//1.
// knex
// .select()
// .from('restaurants')
// .debug(true)
// .then(results => console.log(results));

// 2.
// knex
// .select()
// .from('restaurants')
// .where({cuisine:'Italian'})
// .debug(true)
// .then(results => console.log(results));

//3.
// knex
// .select('id', 'name')
// .from('restaurants')
// .where({cuisine: 'Italian'})
// .limit(10)
// .debug(true)
// .then(results => console.log(results));

//4
  // knex
  // //total number of thai restaurants
  // .select().count()
  // .from('restaurants')
  // .where({cuisine:'Thai'})
  // .debug(true)
  // .then(results => console.log(results));

//5
  // knex
  // .select().count()
  // .from('restaurants')
  // .debug(true)
  // .then(results => console.log(results));

//6
// knex
// .select().count()
// .from('restaurants')
// .where({cuisine:'Thai', address_zipcode:'11372'})
// .debug(true)
// .then(results => console.log(results));

// 7
// knex
// .select('id','name')
// .from('restaurants')
// .where({cuisine:'Italian'})
// .whereBetween('address_zipcode', [10012, 10014])
// .limit(5)
// .debug(true)
// .then(results => console.log(results));

//8
  // knex('restaurants').insert({
  // name: 'Byte Cafe',
  // borough: 'Brooklyn',
  // cuisine: 'coffee',
  // address_building_number: '123',
  // address_street: 'Atlantic Avenue',
  // address_zipcode: '11231'})
  // .debug(true)
  // .then(results => console.log(results));

//9
  // knex('restaurants').insert({
  // name: 'Yummy house',
  // borough: 'Brooklyn',
  // cuisine: 'food',
  // address_building_number: '456',
  // address_street: 'Electric Avenue',
  // address_zipcode: '11231'})
  // .returning(['id','name'])
  // .debug(true)
  // .then(results => console.log(results));

//10
    // knex('restaurants'). insert([{
    //   name: 'Yummy house2',
    //   borough: 'Brooklyn',
    //   cuisine: 'food',
    //   address_building_number: '456',
    //   address_street: 'Electric Avenue2',
    //   address_zipcode: '11232'
    // } , {
    //   name: 'Yummy house3',
    //   borough: 'Brooklyn',
    //   cuisine: 'food3',
    //   address_building_number: '4563',
    //   address_street: 'Electric Avenue3',
    //   address_zipcode: '11213'
    // }, {
    //   name: 'Yummy house4',
    //   borough: 'Brooklyn',
    //   cuisine: 'food',
    //   address_building_number: '4564',
    //   address_street: 'Electric Avenue4',
    //   address_zipcode: '11231'
    // }])
    // .returning(['id', 'name'])
    // .debug(true)
    // .then(results => console.log(results));

// 11   
  // knex('restaurants')
  //   .where({nyc_restaurant_id: '30191841'})
  //   .update({
  //     name: 'DJ Reynolds Pub and Restaurant'
  //   })
  //   .then(results => console.log(results));
  // knex 
  // .select()
  // .from('restaurants')
  // .where({nyc_restaurant_id: '30191841'})
  // .debug(true)
  // .then(results => console.log(results));

// // 12
//  knex('grades')
//   .where('id', 10)
//   .del()
//   .debug(true)
//   .then(results => console.log(results));
// knex()
// .select()
// .from('grades')
// .debug(true)
// .then(results => console.log(results));

// 13
// knex('restaurants')
//   .where('id', 22)
//   .del()
//   .debug(true)
//   .then(results => console.log(results));


// Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});