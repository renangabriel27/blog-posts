import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import ShowPost from '../pages/Posts/Show';
import CreatePost from '../pages/Posts/Create';
import EditPost from '../pages/Posts/Edit';
import RecentPosts from '../pages/Posts/Recent';
import PersonalPosts from '../pages/Posts/Personal';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/posts/new" component={CreatePost} isPrivate />
    <Route path="/posts/recent" component={RecentPosts} isPrivate />
    <Route path="/posts/personal" component={PersonalPosts} isPrivate />
    <Route path="/posts/:id/edit" exact component={EditPost} isPrivate />
    <Route path="/posts/:id" component={ShowPost} isPrivate />
  </Switch>
);

export default Routes;
