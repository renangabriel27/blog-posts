import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import Post from '../pages/Post';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/home" component={Home} isPrivate />
    <Route path="/posts/:id" component={Post} isPrivate />
  </Switch>
);

export default Routes;
