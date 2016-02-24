var Candy = {};
Candy.Boot = function(game){};
Candy.Boot.prototype = {
	preload: function(){
		// preload the loading indicator first before anything else
		this.load.image('preloaderBar', 'img/loading-bar.png');
        this.load.image('odd-load','asset/oddscenity-load.jpg');
	},
	create: function(){
		// set scale options
		this.input.maxPointers = 1;
        // set up stage disable visibility change
        this.stage.disableVisibilityChange = true;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape. 
        // * Set second to true to force portrait.
        this.scale.forceOrientation(false, true);
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this 
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        //this.scale.setResizeCallback(this.gameResized, this);
		this.scale.setScreenSize(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        //this.scale.refresh();
		// start the Preloader state
		this.state.start('Preloader');
        
        
        
       
      
        
	}
};