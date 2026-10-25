## Project Tic-Tac-Toe App using React, JavaScript and Vite.
1. This aplication allows users to play Tic-Tac-Toe game in web browser.
2. The application offers two modes of playing, Single player(Vs Computer) and Two Player mode.
3. On fist page user has to make a selection between above two modes by clicking corresponding "2 Player" or "Vs Computer" button.
4. This action takes user to the second page where User can see the scoreboard, message section, empty game board, moves list and buttons to undo a move, reset the board, reset the score and also back button to go back to Mode selection page.

## Tech Stack
1. React JS version 19.3.1 is used as frontend
2. Vite version 8.3.4 is used as build tool.
3. Vitest version 4.0.4 is used for unit tests.
4. React Bootstrap version 2.10.10 is used for styling and layouts

## Features Implemented
1. Single Player Tic-Tac-Toe game.
2. 2 Player Tic-Tac-Toe game.
3. Score board to track wins and draws.
4. Moves list to track moves in each game.
5. Undo button to undo a move.
6. Reset button to reset complete board and moves list.
7. Reset Score board button to reset the score board.
8. Back button to allow user to go back to game mode selection page.

## Steps to run the frontend locally
1. Open command prompt or a terminal and navigate to location where project is to be cloned.
2. Run the following command to clone the repo < git clone https://github.com/prashantcse011/tic-tac-toe-react-app.git >.
3. Navigate to project folder where package.json file is present and run command < npm i >.
4. On successful completion of above step, run < npm run dev > to run the application in local.
5. Click on the URL mentioned in terminal or copy and paste it in a browser tab and press enter.
6. Select the game mode and make your move in the empty grid to start the game.

## Steps to run the tests
1. Clone and install npm packages as mentioned till step 3 in previous section.
2. Run command in terminal from same location where package.json is present, < npm run test >.

## AI tools and prompt summary
Used GitHub CoPilot IDE plugin.
1. Align ScoreBoard, GameBoard and MoveHistory components in a grid layout of 4 rows and 2 columns with ScoreBoard in first row and spanning over 2 columns, GameBoard in 3 row, 1 column and MoveHistory in 3 row, 2nd column.

2. add test script to package.json, install necessary packages and write unit test cases for <GameBoard> <Square> <LandingPage> <MoveHistory> <Scoreboard> and <App> components.
Check all components are rendered properly and state updates are functionaing as expected 

## Design Decisions.
1. The aplication is rendered as a Single Page Application and content being rendered or hidden using React State and user actions.
2. The application is designed using desktop/laptop users in mind and not for Mobile users.

## Clarifications and Assumptions
1. This app should be tested on a destop/laptop and not on a mobile device.
2. Browser reload, click of back button will start user journey from beginning and wipe all data.
	 
## Known limitations 
1. All data is stored in react state and hence get wiped off on browser reload.
2. User has to start their journey from begining on page reload or click of back button.
3. Page is designed for desktop users and styling might not work for mobile users.

## Future improvements 
1. Integrate with backend using REST APIs to move business logic and persistence to backend layer.
2. Improve the design and layout for mobile users.
3. Add animations and make the grid and messages more appealing.
