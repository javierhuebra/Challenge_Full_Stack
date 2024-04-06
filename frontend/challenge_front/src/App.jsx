import { useState, useContext } from 'react'

import NavBar from './components/NavBar'
import LoginView from './components/views/LoginView'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeView from './components/views/HomeView'
import RegisterView from './components/views/RegisterView'
import SessionContextProvider from './context/SessionContextProvider'

import { userContext } from './context/propContext'
import NotFoundView from './components/views/NotFondView'
import IndexView from './components/views/IndexView'
import NoteDetailView from './components/views/NoteDetailView'
function App() {
  const { isLogged } = useContext(userContext)

  return (
    <>

      <div className='bg-red-300 w-full h-[100vh] bg-hero-pattern bg-cover bg-center'>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col">
          <Router>
            <NavBar />
            <div className='flex-1'>

              <Routes>
                <Route path='*' element={<NotFoundView />} />
                {!isLogged &&
                  <>
                    <Route path='/' element={<HomeView />} />
                    <Route path='/login' element={<LoginView />} />
                    <Route path='/register' element={<RegisterView />} />
                  </>
                }
                {isLogged &&
                  <>
                    <Route path='/index' element={<IndexView />} />
                    <Route path="/notes/:id" element={<NoteDetailView/>} />
                  </>
                }
              </Routes>
            </div>
          </Router>

        </div>
      </div >

    </>
  )
}

export default App
