Candy.Preloader = function(game){
	// define width and height of the game
	Candy.GAME_WIDTH = 640;
	Candy.GAME_HEIGHT = 1136;
    Candy.timer = 0;
};
Candy.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		//this.stage.backgroundColor = '#B4D9E7';
		//this.preloadBar = this.add.sprite((Candy.GAME_WIDTH-311)/2, (Candy.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.preloadImg = this.add.sprite(0,0,'odd-load');
        
        this.preloadImg.alpha = 0;
        
        this.game.add.tween(this.preloadImg).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 200000000000000000000000, true);
        
        
        //this.load.setPreloadSprite(this.preloadBar);
        //this.load.setPreloadSprite(this.preloadImg);
		// load images
		this.load.image('background', 'asset/background.png');
		this.load.image('floor', 'asset/water.png');
		//this.load.image('monster-cover', 'img/monster-cover.png');
		//this.load.image('title', 'img/title.png');
		//this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
        
        
        this.load.image('game-over','asset/titleGameOver.png');
        //load title
        this.load.image('title','asset/titleGame.png');
        
        //load floating duck assets
        this.load.image('player','asset/duck.png');
        
        //load water splash
        this.load.image('splash1','asset/splashWater-1.png');
        
        //load ruler
        this.load.image('ruler','asset/ruler.png');
        this.load.image('pointer','asset/pointer.png');
        
        //load duck lives
        this.load.image('live-duck','asset/live-duck.png');
        this.load.image('dead-duck','asset/dead-duck.png');
        
		// load spritesheets
		this.load.spritesheet('candy', 'asset/bubbles.png', 100.75, 104);
        this.load.spritesheet('ducks','asset/ducks.png', 104, 112);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
        this.load.spritesheet('btnStart','asset/btnStart344x104.png', 344, 104);
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
        this.load.spritesheet('btnHowToPlay', 'asset/btnHowTo344x104.png',344,104);
        this.load.spritesheet('btnPlayAgain','asset/btnPlayAgain344x104.png',344,104);
        
        //splash spritesheet
        this.load.spritesheet('splash','asset/splash.png',147,84);
        
        
        //how to play instructions
        this.load.image('howtoplay','asset/overlay.png');
        
        this.load.spritesheet('duckAnim','asset/duckAnim.png',522,257);
        
        this.load.spritesheet('mainScreen','asset/landing-spritesheet.png',261,568);
        
        this.load.atlas('duck-json', 'animation/duck-json.png', 'animation/duck-json.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        
        
        //this.load.text('duck-json','animation/duck-json.json');
        this.load.image('square','asset/square.png');
        
        //NewGame+
        
        this.load.spritesheet('explosion1','animation/Exp_type_A.png',128,128);
        
        
        
        
	},
	create: function(){
        this.game.time.events.add(Phaser.Timer.SECOND * 30, this.preloadImg, this);
		// start the MainMenu state
		this.state.start('MainMenu');
	},
    
    update: function(){
        /*do{
        }
        while(Candy.timer != 10000)
        {
            this.state.start('MainMenu');
        }*/
        
    }
};