// Game code

// import { AnimatedSprite, Texture } from '/js/test.pixi.min.js';

// --- Variables ---
const screenWidth = 320;
const screenHeight = 180;

var isRunning = false;
var elapsed = 0.0;

const STATE = {
    TITLE: 0,
    GAMEPLAY: 1,
    DEATH: 2
}
var currentState = STATE.TITLE;

var app;
var player;
var background;
var titleScreen;
var platform;

var input;

// --- Player Movement Vector Variables ---
let playerVelocity = { x: 0, y: 0 };
const playerSpeed = 5; // Player's speed when they move left or right
const deceleration = 0.1; // Deceleration that is enacted upon a player when moving left or right
const jumpVelocity = 30; // How high a player jumps
const gravity = 2; // Gravity num
var fallCount = 0; // Time for how long an object is falling

// --- Begin game ---
Init()
GameLoop()


// --- Functions ---
function Init() {
    // Create PIXI Application
    app = new PIXI.Application({
        width: screenWidth,
        height: screenHeight
    });
    
    // Reads if the keys are pressed from the handleKeys() function
    window.addEventListener("keydown", handleKeys, true);
        
    // Sets scale mode to nearest
    PIXI.BaseTexture.defaultOptions.scaleMode = 0;
    //PIXI.BaseTexture.defaultOptions.mipmap = 2;

    // Add the PIXI canvas to the HTML body
    document.body.appendChild(app.view);

    isRunning = Setup(currentState);
    //isRunning = Setup(STATE.GAMEPLAY); // For testing; uncomment the above for real
    
}

// --- Game Loop ---

function GameLoop() {
    app.ticker.add((delta) => {
        elapsed += delta;
        //console.log(elapsed)
        
        switch(isRunning) {
           
            case true:
                Update(delta);
                //Draw();
                break;
            
            case false:
                break;

            // Runs ONLY if no other case is valid
            default:
                console.log(elapsed + ": GameLoop() out of bounds.");
                console.log(elapsed + ": currentState: " + currentState);
                isRunning = false;
                break;

        }
        //console.log(elapsed + ": isRunning: " + isRunning)
    });
}

// --- Game Logic ---

// Runs every frame
function Update(delta) {
    switch(currentState) {
        case STATE.TITLE:
            //console.log("case STATE.TITLE");
            UpdateTitle(delta);
            break;

        case STATE.GAMEPLAY:
            UpdateGameplay(delta);
            break;
                
        case STATE.DEATH:
            UpdateDeath(delta);
            break;
        
        default:
            console.log("test")
            console.log(elapsed + ": Update() out of bounds.");
            console.log(elapsed + ": currentState: " + currentState);
            isRunning = false;
            break;
    }
    //console.log("test");
}

// Hacky way of starting the game
function StartGame() {
    if (currentState != STATE.GAMEPLAY) {
        app.stage.removeChild(titleScreen);
        //createPlatform();
        ChangeState(STATE.GAMEPLAY);
    }
}

function UpdateTitle(delta) {
    // Write title screen code here

    // Event listener handles title screen input,
    // so this function is just here for posterity.
}

// --- Gameplay Code IMPORTANT ---

function UpdateGameplay(delta) {
    updatePlayerMovement(delta); // Movement additions to x and y velocity
}

// --- Player Key Presses ---

function handleKeys(event) {
    {
        if (event.defaultPrevented) {
          return; // Do nothing if event already handled
        }
    
        switch (event.code) {
          // Jump
            case "KeySpace":
            case "Space":
                StartGame();
                jump();
                break;

          // Move Left
            case "KeyA":
            case "ArrowLeft":
                console.log('a');
                moveLeft();
                break;

          // Move Right
            case "KeyD":
            case "ArrowRight":
                moveRight();
                break;
          }
    }
}

// --- Player Movement Stuff ---

function updatePlayerMovement(delta) {
    // Player movement from right to left.
    player.x += playerVelocity.x * playerSpeed * delta;

    doGravity(delta);

}

function moveLeft() {
    playerVelocity.x = -1;
}

function moveRight() {
    playerVelocity.x = 1;
}

function jump() {
    // PSEUDO CODE: If the jump button is pressed and the player is on the platform, add jumpVelocity to the playerVelocity.y
}

function isOnPlatform(player, platform) { // Returns true if player is on top.
    // PSEUDO CODE: If the player y-axis + the height is greater than or equal to the platform y-axis AND the player y-axis is less than or equal to the platform y-axis + platform height, then return true
    if (player.y >= platform.y) {
        return true;
    }
    else {
        return false;
    }
}

function doGravity(delta) {
    player.y += gravity;
}

// function getFallCount(delta) {
//     if isOnPlatform(player, platform) == true {
//         return 0;
//     }
// }

function UpdateDeath(delta) {
    // Write death screen code here


}

// --- Objects ---

function createPlatform() { // Creates stage that player can step on
    // 144 pixels from the top of the background is the line
    // Either create a sprite that can be manipulated to become the stage platform as seen in this collision test: https://pixijs.com/playground
    // or create a graphic that we might also be able to manipulate and do the same thing
    // If all else fails, just set a specific height to be the boundary box for the floor

    platform = PIXI.Sprite(PIXI.BaseTexture.WHITE); // Creates new platform PIXI sprite
    platform.width = 320; // Background image is 320px long
    platform.height = 20;
    platform.alpha = 0; // Set the alpha (transparency) to make it clear

    platform.x = app.screen.width / 2 - platform.width / 2; 
    platform.y = app.screen.height - 144; // Background image where the platform is starts at 144px from the top

    app.stage.addChild(platform); // Adds the platform to the stage
}

// --- States ---

function ChangeState(newState) {
    isRunning = false;
    currentState = newState;

    isRunning = Setup(currentState);
}

function Setup(currentState) {
    switch(currentState) {
        
        case STATE.TITLE:
            SetupTitle();

            console.log(elapsed + ": Setup(STATE.TITLE) complete!");
            break;

        case STATE.GAMEPLAY: {
            SetupGameplay();

            console.log(elapsed + ": Setup(STATE.GAMEPLAY) complete!");
            break;
        }

        case STATE.DEATH: {
            SetupDeath();

            console.log(elapsed + ": Setup(STATE.DEATH) complete!");
            break;

        }

        default:
            console.log(elapsed + ": Setup() out of bounds.");
            console.log(elapsed + ": currentState: " + currentState);
            isRunning = false;
            break;
    }
    return true;
}

// --- Game Screens ---

function SetupTitle() {
    titleScreen = PIXI.Sprite.from('images/title_placeholder.png');
    app.stage.addChild(titleScreen);
}

function SetupGameplay() {
    // Initialize background
    background = PIXI.Sprite.from('images/game_background.png');
    app.stage.addChild(background);
    
    // Initialize player
     // TODO: Animate player
    
    player = PIXI.Sprite.from('images/player/player_right1.png');
    player.x = app.screen.width / 2;
    player.y = app.screen.height / 2;

    app.stage.addChild(player);

}

function SetupDeath() {


}

// --- Reset the game ---

function Reset() {


}

