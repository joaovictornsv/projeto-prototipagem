import { Meteor } from 'meteor/meteor';

Meteor.methods({
  sayHello({ name }) {
    console.log(`Hello, ${name}`)
  }
})
