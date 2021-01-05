import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { Provider } from './reducers'
import { RoutedContent } from 'views/RoutedContent'
import 'style/index.scss'

const App: React.FC = () => (
  <Provider>
    <RoutedContent/>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
