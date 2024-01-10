// Game code

// --- Variables ---
const screenWidth = 320;
const screenHeight = 180;

var canRun = false;
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

var input;

let playerVelocity = { x: 0, y: 0 };
const playerSpeed = 5;

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
    
    window.addEventListener(
        "keydown",
        (event) => {
          if (event.defaultPrevented) {
            return; // Do nothing if event already handled
          }
      
          switch (event.code) {
            case "KeySpace":
            case "Space":
              // Handle "jump"


              StartGame();
              //updatePosition(moveRate);
              break;
            case "KeyA":
            case "ArrowLeft":
              // Move Left
              console.log('a');
              moveLeft();
              break;
            case "KeyD":
            case "ArrowRight":
              // Move Right
              moveRight();
              break;
            }
          },
          true,
        );
        
    // Sets scale mode to nearest
    PIXI.BaseTexture.defaultOptions.scaleMode = 0;
    //PIXI.BaseTexture.defaultOptions.mipmap = 2;

    // Add the PIXI canvas to the HTML body
    document.body.appendChild(app.view);

    canRun = Setup(currentState);
    //canRun = Setup(STATE.GAMEPLAY); // For testing; uncomment the above for real
    
}

function GameLoop() {
    app.ticker.add((delta) => {
        elapsed += delta;
        //console.log(elapsed)
        
        switch(canRun) {
           
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
                canRun = false;
                break;

        }
        //console.log(elapsed + ": canRun: " + canRun)
    });
}

// Put game logic here
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
            canRun = false;
            break;
    }
    //console.log("test");
}

// Put graphics updates here
// function Draw() {
//     // TK: Not sure if we need this function, since sprites ARE the objects

// }

function StartGame() {
    if (currentState != STATE.GAMEPLAY) {
        app.stage.removeChild(titleScreen);
        ChangeState(STATE.GAMEPLAY);
    }
}

function UpdateTitle(delta) {
    // Write title screen code here


    // Should switch to GAMEPLAY
    //test
    //Object.onkeydown = ChangeState(STATE.GAMEPLAY);
    
}

function UpdateGameplay(delta) {
    // Write gameplay code here
    //updatePlayerMovement();
    player.x += playerVelocity.x * playerSpeed * delta;
    player.y += playerVelocity.y * playerSpeed * delta;
}

function moveLeft() {
    playerVelocity.x = -1;
}

function moveRight() {
    playerVelocity.x = 1;
}

function jump() {
    
}

// function updatePlayerMovement() {
//     playerVelocity.x = 0;
//     playerVelocity.y = 0;

//     if (app.keyboardManager.isKeyDown(PIXI.keyboardManager.KEYS.LEFT)) {
//         playerVelocity.x = -1;
//     }
//     if (app.keyboardManager.isKeyDown(PIXI.keyboardManager.KEYS.RIGHT)) {
//         playerVelocity.x = 1;
//     }
    
// }


function UpdateDeath(delta) {
    // Write death screen code here


}

function ChangeState(newState) {
    canRun = false;
    currentState = newState;

    canRun = Setup(currentState);
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
            canRun = false;
            break;
    }
    return true;
}

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

// Reset the game
function Reset() {


}

