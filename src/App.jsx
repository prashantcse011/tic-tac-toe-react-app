import { useState } from 'react'
import LandingPage from './Components/LandingPage/LandingPage'
import './App.css'
import GameBoard from './Components/GameBoard/GameBoard'

function App() {

  const [isComputerMode, setIsComputerMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <>
      <header className='app-header'><h1>Tic-Tac-Toe Game</h1></header>
      <LandingPage setIsComputerMode={setIsComputerMode} isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} />
      {isGameStarted && <GameBoard player1={'X'} player2={'O'} isComputerMode={isComputerMode}/>}
      
    </>
  )
}

export default App
