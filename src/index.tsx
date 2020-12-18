import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from './reducers';
import PrivateRoute from 'components/private-route';
import Layout from 'components/layout';
import { Loading } from 'components/loading';
import 'style/index.scss';

const Home = lazy(() => import('views/home'));
const Table = lazy(() => import('views/table'));
const Login = lazy(() => import('views/login'));
const Logout = lazy(() => import('views/logout'));

const App: React.FC = () => (
  <Provider>
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Layout>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/table/:tableName" component={Table} />
        </Layout>
      </Suspense>
    </HashRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
