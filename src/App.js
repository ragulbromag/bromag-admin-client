import './App.css';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"
import Login from './authentication/login';
import {Dashboard} from "./components"
import RootLayout from './layouts/rootLayout';


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Dashboard/>}/>
        <Route path='login' element={<Login/>}/>
    </Route>
  )
)

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
