import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/layout/Dashboard';
import ChatDetail from './components/chats/ChatDetail';
import AllChats from './components/chats/AllChats';
import Login from './components/auth/Login';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={AllChats} />
        <Route path="/contacts" component={Dashboard}/>
        <Route path="/chat" component={ChatDetail} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
