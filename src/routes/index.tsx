import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import ShowPost from '../pages/Posts/Show';
import CreatePost from '../pages/Posts/Create';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/home" component={Home} isPrivate />
    <Route path="/posts/new" component={CreatePost} isPrivate />
    <Route path="/posts/:id" component={ShowPost} isPrivate />
  </Switch>
);

export default Routes;
