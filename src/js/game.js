// Create PIXI Application
const app = new PIXI.Application({
    width: 320,
    height: 180
});

// Sets scale mode to nearest
PIXI.BaseTexture.defaultOptions.scaleMode = 0;
PIXI.BaseTexture.defaultOptions.mipmap = 2;

// Add the PIXI canvas to the HTML body
document.body.appendChild(app.view);

const background = PIXI.Sprite.from('images/game_background.png');
//background.scale.set(2,2);
app.stage.addChild(background);

const player = PIXI.Sprite.from('images/player/player_right1.png');
//player.scale.set(2,2);
player.x = app.screen.width / 2;
player.y = app.screen.height / 2;

app.stage.addChild(player);