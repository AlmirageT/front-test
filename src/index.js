import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
//redux
import { Provider } from 'react-redux'; 
import store from './store/index'
//componentes
import App from './App';
import Login from './components/Login';
import Posts from './components/Posts';
import AuthLayout from './layouts/AuthLayout'
//archivos css
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const router = createBrowserRouter([
  {
    path:"/",
    element: (<AuthLayout><App /></AuthLayout>)
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/posts",
    element: (<AuthLayout><Posts /></AuthLayout>)
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
