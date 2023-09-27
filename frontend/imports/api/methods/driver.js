import { Meteor } from 'meteor/meteor';
import {DriversCollection} from "../collections/DriversCollection";

Meteor.methods({
  sayHello({ name }) {
    DriversCollection.save({ name, documentNumber: 1 })
  }
})
