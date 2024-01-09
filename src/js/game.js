// Create PIXI Application
const app = new PIXI.Application({
    width: 640,
    height: 360
});

// Sets scale mode to nearest
PIXI.BaseTexture.defaultOptions.scaleMode = 0;

// Add the PIXI canvas to the HTML body
document.body.appendChild(app.view);

const background = PIXI.Sprite.from('images/game_background.png');
background.scale.set(2,2);
app.stage.addChild(background);

// Write player to screen
// const cat = PIXI.Sprite.from('images/player/')

// Load a sprite image by assigning 'PLAYER' to its resource (png)
/*
app.loader.add('PLAYER', 'images/testCharacter.png').load((loader, resources) => {
    const PLAYER = new PIXI.Sprite(resources.PLAYER.texture);

    PLAYER.anchor.set(0.5);
    PLAYER.x = app.renderer.width / 2;
    PLAYER.y = app.renderer.height / 2;

    app.stage.addChild(PLAYER);
}); */