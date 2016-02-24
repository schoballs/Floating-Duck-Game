Candy.Game = function(game){
	// define needed variables for Candy.Game
	this._player = null;
	this._candyGroup = null;
	this._spawnCandyTimer = 0;
	this._fontStyle = null;
    this._waterLevel = 500;
    this._water = null;
    this._candyType = [];
    this._isAlive = true;
    this._playerLives = 3;
    this._duckLives = [];
	Candy._scoreText = null;
	Candy._score = 0;
    //this._score = 0;
	Candy._health = 0;
    Candy._type = 0;
    this.timer = null;
    this.timerEvent = null;
    this.text = null;
    this.timerText = null;
    Candy.bubbleObj = {};
    Candy.counter = 0;
    
    
};
Candy.Game.prototype = {
	create: function(){
        
        this._waterLevel = Candy.GAME_HEIGHT/2;
        this._isAlive = true;
        
        this.waterLevel = Candy.GAME_HEIGHT-300;
		// start the physics engine
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// set the global gravity
		this.physics.arcade.gravity.y = 200;
		// display images: background, floor and score
		this.add.sprite(0, 0, 'background');
		this._water = this.add.sprite(-30, this._waterLevel, 'floor');
		//this.add.sprite(10, 5, 'score-bg');
		// add pause button
		//this.add.button(Candy.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
		// create the player
		this.player = this.add.sprite(50,this._waterLevel-60,'player');
        this.player.inputEnabled = true;
        this.player.input.enableDrag();
        //this.physics.arcade.enableBody(this.player);
        //this.player.body.collideWorldBounds = true;
        //this.duck

    //  This will lock the sprite so it can only be dragged horizontally, not vertically
        this.player.input.allowVerticalDrag = false; 
        
        //this._player = this.add.sprite(5, 760, 'monster-idle');
		// add player animation
		//this._player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		// play the animation
		//this._player.animations.play('idle');
		// set font style
        
        this._duckLives[0] = this.add.sprite(Candy.GAME_WIDTH-120,20,'live-duck');
        this._duckLives[1] = this.add.sprite(Candy.GAME_WIDTH-80,20,'live-duck');
        this._duckLives[2] = this.add.sprite(Candy.GAME_WIDTH-40,20,'live-duck');
        
        this.ruler = this.add.sprite(Candy.GAME_WIDTH-40,430,'ruler');
        this.pointer = this.add.sprite(Candy.GAME_WIDTH-80,900,'pointer');
        
        
        this._player = this.player;
        
        
		this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
		// initialize the spawn timer
		this._spawnCandyTimer = 0;
		// initialize the score text with 0
		Candy._scoreText = this.add.text(Candy.GAME_WIDTH/2,30, "0", this._fontStyle);
        
        //this.timerText = this.add.text(Candy.GAME_WIDTH-150,30, "3:00", this._fontStyle);
        
        Candy._scoreText.anchor.set(0.5,0.5);
		// set health of the player
		Candy._health = 100;
		// create new group for candy
		this._candyGroup = this.add.group();
        //this._candyType = this.add.group();
		// spawn first candy
		Candy.item.spawnCandy(this);
        
        
        this.timer = this.game.time.create();
        
        // Create a delayed event 1m and 30s from now
        this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);
        
        // Start the timer
        this.timer.start();
        
        
	},
	managePause: function(){
		// pause the game
		this.game.paused = true;
		// add proper informational text
		var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
		// set event listener for the user's click/tap the screen
		this.input.onDown.add(function(){
			// remove the pause text
			pausedText.destroy();
			// unpause the game
			this.game.paused = false;
		}, this);
	},
    
    render: function(){
         if (this.timer.running) {
            this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), 2, 14, "#FFCC00");
             
             //this.timerText.add(Candy.GAME_WIDTH-150,30,this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));
             this.game.add.text(20,5,this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)),this._fontStyle);
             //this.timerText.setText(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));
        }
        else {
            this.game.debug.text("Done!", 2, 14, "#0f0");
        }
    },
    endTimer: function() {
        // Stop the timer when the delayed event triggers
        this.timer.stop();
    },
    formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    },
    restart: function()
    {
        this._player = null;
        this._candyGroup = null;
        this._spawnCandyTimer = 0;
        this._fontStyle = null;
        this._waterLevel = 500;
        this._water = null;
        this._candyType = [];
        this._isAlive = true;
        this._playerLives = 3;
        this._duckLives = [];
        // define Candy variables to reuse them in Candy.item functions
        Candy._scoreText = null;
        Candy._score = 0;
        //this._score = 0;
        Candy._health = 0;
        Candy._type = 0;
        this.timer = null;
        this.timerEvent = null;
        this.text = null;
        this.timerText = null;
        Candy.bubbleObj = {};
        //Candy._scoreText.setText(Candy._score);
        
        this.state.start('Game');
        
        
        /*this.gameover = this.add.sprite(Candy.GAME_WIDTH/2, Candy.GAME_HEIGHT/2, 'game-over');
        this.gameover.anchor.set(0.5,0.5);
        
        this.btnPlayAgain = this.add.button((Candy.GAME_WIDTH/2),(Candy.GAME_HEIGHT/2)+310,'btnPlayAgain',Candy.restart,this,1,0,2);
        this.btnPlayAgain.anchor.set(0.5,0.5);*/
        
        
        
    },
	update: function(){
		
        var lessWater = 0.3;
        
        if(this._water.y < 1100)
        {
            this._water.y += lessWater;
            this._player.y += lessWater;
        }
        
        
        // update timer every frame
		this._spawnCandyTimer += this.time.elapsed;
		// if spawn timer reach one second (1000 miliseconds)
		
            if(this._spawnCandyTimer > 1000) 
            {
                // reset it
                this._spawnCandyTimer = 0;
                // and spawn new candy
                Candy.item.spawnCandy(this);
            }
        
        
        
        
        
        
        
		// loop through all candy on the screen
		//this._candyGroup.forEach(function(candy,player){
		  //if(candy == null)
            // return;
        for(var i = this._candyGroup.length-1;i>=0;i--)
        {
            
            var candy = this._candyGroup.getAt(i);
            //var candyType = this._candyGroup.getAt(i);
            
            
            var destroyed = false;
            
            if(this._isAlive)
            {
                if(candy.x >= candy.player.x && candy.x <= (candy.player.x+candy.player.width) && candy.y >= candy.player.y && candy.y <= (candy.player.y+candy.player.height))
                {
                    if(this._playerLives == 0)
                    {
                    }
                    else
                    {
                    
                        if(candy.type == 0)
                        {

                            Candy._score += 50;

                        }
                        else if (candy.type == 1)
                        {
                            Candy._score += 100;
                        }
                        else if (candy.type == 3)
                        {
                            Candy._score +=20;
                        }
                        else if (candy.type == 2)
                        {
                            Candy._score += 300;   
                        }
                    }
                //Candy._score +=50;

                    Candy._scoreText.setText(Candy._score);
                    candy.destroy(true);
                    destroyed = true;
                }
            }
            
        }
        
        if(candy.y >= this._water.y && !destroyed)
        {
            var x,y;
            if(this._isAlive)
            {
                if (candy.type == 3)
                {
                    if(this._playerLives == 0)
                    {
                    }
                    else
                    {
                        //var moreWater -= 10;
                        this._water.y -= 10;
                        this._player.y -= 10;
                    }
                }
                else
                {
                    if(this._playerLives == 0)
                    {
                        
                    }
                    else
                    {
                        Candy._score -= 50;
                        Candy._scoreText.setText(Candy._score);
                        if(this._playerLives == 0)
                        {
                            this._playerLives == 0;
                            this._isAlive = false;
                        }
                        else
                        {
                            this._playerLives -= 1;
                        }
                    }
                }
            }
            
                x = candy.x;
                y = candy.y;
            
                if(this._playerLives == 2)
                {
                    //this._duckLives[2]
                    this._duckLives[this._playerLives] = this.add.sprite(Candy.GAME_WIDTH-40,20,'dead-duck');
                }
                else if(this._playerLives == 1)
                {
                    this._duckLives[this._playerLives] = this.add.sprite(Candy.GAME_WIDTH-80,20,'dead-duck');
                }
                else if(this._playerLives == 0)
                {
                    this._duckLives[this._playerLives] = this.add.sprite(Candy.GAME_WIDTH-120,20,'dead-duck');   
                }

                candy.destroy(true);  

                this.watersplash = this.game.add.sprite(x,y,"splash");
                this.watersplash.animations.add ("splash",[0,1,2],10,false);
                this.watersplash.anchor.set(0.5,0.5);
                this.watersplash.play("splash",10,false,true);
             
		}
       
		// if the health of the player drops to 0, the player dies = game over
		if(this._playerLives == 0 || this._water.y == this.pointer.y && Candy.counter == 0) 
        {
            this._playerLives = 0;
			
            //Candy.restart();
            //this.game.state.start('Game');
            
            // show the game over message
			this.gameover = this.add.sprite(Candy.GAME_WIDTH/2, Candy.GAME_HEIGHT/2, 'game-over');
            this.gameover.anchor.set(0.5,0.5);
            
            this.score = this.add.text(Candy.GAME_WIDTH/2,(Candy.GAME_HEIGHT/2)+180, "0", this._fontStyle);
            this.score.setText("Score: "+Candy._score);
            this.score.anchor.set(0.5,0.5);
            
            //this.btnPlayAgain = this.add.button((Candy.GAME_WIDTH/2),(Candy.GAME_HEIGHT/2)+310,'btnPlayAgain',this.startGame,this,1,0,2);
             this.btnPlayAgain = this.add.button((Candy.GAME_WIDTH/2),(Candy.GAME_HEIGHT/2)+310,'btnPlayAgain',this.restart,this,1,0,2);
        this.btnPlayAgain.anchor.set(0.5,0.5);
            
            if(this._water.y < 1100)
            {
                this._water.y += 1;
                this._player.y += 1;
            }
            this.player.inputEnabled = false;
            Candy.counter+=1;
            
            //Candy.restart;
			// pause the game
			//this.game.paused = true;
            //endGame();*/
		}
       
	}
    
};

Candy.item = {
	spawnCandy: function(game){
		// calculate drop position (from 0 to game width) on the x axis
		var dropPos = Math.floor(Math.random()*Candy.GAME_WIDTH);
		// define the offset for every candy
		var dropOffset = [-27,-36,-36,-38];
		// randomize candy type
		
        var randomPerc = Math.round(Math.random()*100);
        var candyType = 0;
        //= Math.floor(Math.random()*4);
        
        
        var smallBubble = 40;
        var bigBubble = 60;
        var HtwoO = 90;
        var starPower = 100;
        
        //Object candy = null;
        
        //Turn candy into an object to save the candyType as a property
        
        //Add object to group
        
        //Create random spwan for bubbles
        if(randomPerc <= smallBubble)
        {
            candyType = 0;
        }
        else if(randomPerc > smallBubble && randomPerc <= bigBubble)
        {
            candyType = 1;
        }
        else if(randomPerc > bigBubble && randomPerc <= HtwoO)
        {
            candyType = 3;   
        }
        else if(randomPerc > HtwoO && randomPerc <= starPower)
        {
            candyType = 2;   
        }
        
        //candyType = 3;
        
        //create new candy
		var candy = game.add.sprite(dropPos, dropOffset[candyType], 'candy');
        //give reference to player
        candy.player = game._player;
        //candy.water = game._water;
        
        candy.type = candyType;
        
        
		// add new animation frame
		candy.animations.add('anim', [candyType], 10, true);
		// play the newly created animation
		candy.animations.play('anim');
		// enable candy body for physic engine
		game.physics.enable(candy, Phaser.Physics.ARCADE);
		// enable candy to be clicked/tapped
		candy.inputEnabled = true;
		// add event listener to click/tap
		//candy.events.onInputDown.add(this.clickCandy, this);
		// be sure that the candy will fire an event when it goes out of the screen
		candy.checkWorldBounds = true;
		// reset candy when it goes out of screen
		candy.events.onOutOfBounds.add(this.removeCandy, this);
		// set the anchor (for rotation, position etc) to the middle of the candy
		candy.anchor.setTo(0.5, 0.5);
		// set the random rotation value
		candy.rotateMe = (Math.random()*4)-2;
		
        //Candy.bubbleObj.bubble = candy;
        //Candy.bubbleObj.bubbleType = candyType;
        
        // add candy to the group
		game._candyGroup.add(candy);
        //game._candyType[i].add(candyType);
        
        
        //i += 1;
        
	},
	clickCandy: function(candy){
		// kill the candy when it's clicked
		candy.kill();
		// add points to the score
		Candy._score += 1;
		// update score text
		Candy._scoreText.setText(Candy._score);
	},
	removeCandy: function(candy){
		// kill the candy
		candy.kill();
		// decrease player's health
		//Candy._health -= 10;
	},
    startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};
