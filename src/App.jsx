import { Route, Routes } from 'react-router-dom';
import './App.css'
import MyTable from './components/table/Table';
import ModaAdd from './components/modal/Modal';
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<MyTable />}/>
      <Route path='/add' element={<ModaAdd />}/>
    </Routes>
     
    </>
  )
}

export default App
