Candy.MainMenu = function(game){
    this.screenX = 60;
    this.direction = false;
    this.flip = 1;
    this.timer = 0;
    this.howtoplay = null;
    
    this.popup;
    this.tween = null;
};
Candy.MainMenu.prototype = {
	create: function(){
		// display images
        
        var waterLevel = 250;
        //this.howtoplay = this.add.sprite(0,0,'howtoplay');
        //this.howtoplay.events.onInputDown.add(this.removeOverlay, this);
        
        this.add.sprite(0, 0, 'background');
		this.add.sprite(0,waterLevel,'floor');
        this.player = this.add.sprite(60,waterLevel-20,'player');
        this.player.anchor.set(0.5,0.5);
        this.add.sprite(80,350,'title');
        
        
        //this.howtoplay = this.add.sprite(0,0,'howtoplay');
        //this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
		//this.add.sprite((Candy.GAME_WIDTH-395)/2, 60, 'title');
		
        
        //Animation GIF
        
        //duck = this.add.sprite(0, 0, 'duck-json');
        //duck.animations.add('swim', Phaser.Animation.generateFrameNames('landing_0026', 0, 26, '', 0), 0, true);
        //duck.animations.play('swim');
        
        
        /*
        var jsonData = JSON.parse(game.cache.getText('duck-json'));
        this.cache._text['duck-json'] = JSON.parse(game.cache.getText('duck-json'));
        var inventory = game.cache.getText('duck-json').inventory;*/
        
        
        //var duckAnim = this.add.sprite(0,0,'duckAnim');
        //this.player.animations.add('ducks', [1,2,3], 10, true);
        //[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
		// play the newly created animation
		//duckAnim.animations.play('anim');
        
        // add the button that will start the game
		//Candy.GAME_WIDTH-401-10  Candy.GAME_HEIGHT-143-10
        
        
        
        this.btnStart = this.add.button((Candy.GAME_WIDTH/2), (Candy.GAME_HEIGHT/2)+200, 'btnStart', this.startGame, this, 1, 0, 2);
        
        this.btnStart.anchor.set(0.5,0.5);
        
        this.btnHowToPlay = this.add.button((Candy.GAME_WIDTH/2),(Candy.GAME_HEIGHT/2)+310,'btnHowToPlay',this.openWindow,this,1);
        
        this.btnHowToPlay.anchor.set(0.5,0.5);
        
        
        
        this.popup = this.add.sprite(0, 0, 'howtoplay');
        this.popup.alpha = 0;
        //this.popup.anchor.set(0.5);
        this.popup.inputEnabled = true;
        this.popup.input.enableDrag();

        //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
        var pw = 480
        var ph = 100;

        //  And click the close button to close it down again
        this.closeButton = this.game.add.sprite(pw, ph, 'square');
        this.closeButton.inputEnabled = true;
        this.closeButton.input.priorityID = 1;
        this.closeButton.input.useHandCursor = true;
        this.closeButton.events.onInputDown.add(this.closeWindow, this);
        this.closeButton.alpha = 0;
        //  Add the "close button" to the popup window image
        this.popup.addChild(this.closeButton);

        //  Hide it awaiting a click
        this.popup.scale.set(0.1);
        

    
        
	},
    
    openWindow : function()
    {
      if ((this.tween !== null && this.tween.isRunning) || this.popup.scale.x === 1)
        {
            return;
        }

        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        this.tween = this.game.add.tween(this.popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
        this.popup.alpha = 1;

    },
    
    closeWindow : function()
    {
        if (this.tween && this.tween.isRunning || this.popup.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        this.tween = this.game.add.tween(this.popup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        this.popup.alpha = 0;
    },
    
    update: function()
    {  
        
        
        if(this.player.x > Candy.GAME_WIDTH-40)
        {   
            this.direction = true;
            this.flip *= -1;
        }
        else if(this.player.x < 50)
        {
            this.direction = false;
            this.flip *= -1;
            //this.player.animations.play('ducks');
        }
        
        
        if(!this.direction)
        {
            
            this.screenX +=3;   
        }
        else
        {
            
            this.screenX -=3;   
        }
        //this.screenX +=2;  */
        this.player.x = this.screenX;
        this.player.scale.x = this.flip;
    },
    
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	},
    
    howToPlay: function(){
        this.howtoplay
        //this.howtoplay = 
        
        //this.howtoplay.inputEnabled = true;
        //this.howtoplay.onDown.dispose();
        //this.howtoplay.input.onDown(this.remove, this);
        this.btnHowToPlay.input.enabled = false;
        this.btnStart.input.enabled = false;
    },
    removeOverlay: function(){
        
        //this.state.start('MainMenu');
        this.btnHowToPlay.input.enabled = true;
        this.btnStart.input.enabled = true;
        this.howtoplay.kill();
        
    }
};