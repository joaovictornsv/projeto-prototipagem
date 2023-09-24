import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';

const { environment } = Meteor.settings.public || {}

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <h2>{environment}</h2>
    <Hello/>
    <Info/>
  </div>
);
