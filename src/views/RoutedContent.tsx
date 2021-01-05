import React, { lazy, Suspense } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import PrivateRoute from 'components/private-route'
import Layout from 'components/layout'
import Loading from 'components/loading'

const Home = lazy(() => import('views/home'))
const Table = lazy(() => import('views/table'))
const Login = lazy(() => import('views/login'))
const Logout = lazy(() => import('views/logout'))

const RoutedContent: React.FC = () => (
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
)

export { RoutedContent }
