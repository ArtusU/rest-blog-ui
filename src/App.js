import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./helpers";
import Layout from "./containers/Layout";
import PostList from "./containers/PostList";
import PostDetail from "./containers/PostDetail";
import PostCreate from "./containers/PostCreate";
import PostUpdate from "./containers/PostUpdate";
import PostDelete from "./containers/PostDelete";

import Login from "./containers/Login";
import Signup from "./containers/Signup";

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/create" component={PostCreate} />
          <Route exact path="/posts/:postSlug" component={PostDetail} />
          <Route path="/posts/:postSlug/update" component={PostUpdate} />
          <Route path="/posts/:postSlug/delete" component={PostDelete} />
          <Route path="/login" component={Login} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
