# 3D Tron
This is 3D multiplayer version of the classic Tron game where players compete to be the last rider standing.

## Live Game
To play a live version of this game please click here http://3d-tron.com.

## Game Play Design
3D Tron is a fan variant of the classic Tron game, where players guide a Light Cycle in an arena against opponents, while avoiding the walls and trails of light left behind by all Light Cycles. The players must maneuver quickly and precisely in order to force opponents to run into walls or trails of light.

## Controls
User arrow keys to turn
Avoid the walls and trails of light left behind by all Light Cycles

## Architecture
3D Tron is built on Node.js using Socket.io for client-server interaction, Three.js and Whitestorm.js for 3D graphics rendering, Physi.js for the physics engine, React for HTML rendering, and Redux for both client and server app state and game state management.

Handling of the game logic is distributed between the client and the server. Clients run their own physics calculations to compute their next position and orientation, while the server manages and modifies the master game state according to game logic and client events such as collisions with objects or other players.

## Set up on local machine
- Clone the repository
- npm install
- npm start (Runs webpack and starts the server on port 3000)
