import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import router from './route.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider store={appStore}>
  //   <PersistGate persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router}/>
        </Suspense>
  //   </PersistGate>
  // </Provider>,
)
