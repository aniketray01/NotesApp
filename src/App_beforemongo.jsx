import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Pastes from './components/Pastes'
import ViewPastes from './components/ViewPastes'
import Home from './components/Home'
import Navbar from './components/Navbar'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
        <div>
          <Navbar></Navbar>
          <Home></Home>
        </div>
    },
    {
      path: '/pastes',
      element:
        <div>
          <Navbar></Navbar>
          <Pastes></Pastes>
        </div>
    }, {
      path: '/viewpastes',
      element:
        <div>
          <Navbar></Navbar>
          <ViewPastes></ViewPastes>
        </div>
    }
  ]
)

function App() {



  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
