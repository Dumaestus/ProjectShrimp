// Game code

// --- Variables ---
const screenWidth = 320;
const screenHeight = 180;

var canRun = true;
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

    // Sets scale mode to nearest
    PIXI.BaseTexture.defaultOptions.scaleMode = 0;
    PIXI.BaseTexture.defaultOptions.mipmap = 2;

    // Add the PIXI canvas to the HTML body
    document.body.appendChild(app.view);

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

function GameLoop() {
    app.ticker.add((delta) => {
        elapsed += delta;
        //console.log(elapsed)
        
        switch(canRun) {
           
            case true:
                Update();
                //Draw();
            
            case false:
                break;

        }
        //console.log(elapsed + ": canRun: " + canRun)
    });
}

// Put game logic here
// Runs every frame
function Update() {
    switch(currentState) {
        
        case STATE.TITLE:
            UpdateTitle();

        case STATE.GAMEPLAY:
            UpdateGameplay();
                
        case STATE.DEATH:
            UpdateDeath();
                
    }
}

// Put graphics updates here
// function Draw() {
//     // TK: Not sure if we need this function, since sprites ARE the objects

// }

function UpdateTitle() {
    // Write title screen code here

}

function UpdateGameplay() {
    // Write gameplay code here

}

function UpdateDeath() {
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
            break;

        case STATE.GAMEPLAY: {
            break;
        }

        case STATE.DEATH: {
            break;

        }
    }
    return true;
}

// Reset the game
function Reset() {


}

