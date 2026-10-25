import Button from 'react-bootstrap/Button';

export default function LandingPage({ setIsComputerMode, isGameStarted, setIsGameStarted }) {
    
    return (
        <>
        {!isGameStarted && (
            <div className="landing-page">
                <h2 className="landing-page__prompt">Please select the game mode</h2>
                <div className="landing-page__actions">
                    <Button variant="primary" onClick={() => {setIsComputerMode(false); setIsGameStarted(true)}}>2 Player</Button>
                    <Button variant="primary" onClick={() => {setIsComputerMode(true); setIsGameStarted(true)}}>Vs Computer</Button>
                </div>
            </div>
        )}
        </>
    );

}