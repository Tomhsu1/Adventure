var CaveScreen = {
    preload: function() {
        game.load.image('caveFloor', 'assets/images/caveFloor.jpg');
        game.load.image('caveBackground', 'assets/images/caveBackground.png', 1000, 100);
    },
    
    create: function() {
        game.world.setBounds(0,0,4000,580);
        
        caveBackground = game.add.tileSprite(0, 0, 4000, 800, 'caveBackground');
        
        caveFloors = game.add.tileSprite(0, 480, 4000, game.width, 'caveFloor');
        caveFloors.physicsType = Phaser.SPRITE;
        game.physics.arcade.enable(caveFloors);
        caveFloors.body.immovable = true;
        caveFloors.body.allowGravity = false;
    },
    
    update: function() {
        
    }
};