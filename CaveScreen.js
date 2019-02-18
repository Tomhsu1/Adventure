var isFacingRight = true;
var isFacingRight2 = true;
var charaFacingRight = true;
var grgcount = 2;
var bullets;
var time = 60;
var caveFloors;

var CaveScreen = {
    preload: function() {
        game.load.spritesheet('gr', 'assets/images/guy_walk_spritesheet.png', 58, 87, 8);
        game.load.image('caveFloor', 'assets/images/caveFloor.jpg');
        game.load.image('caveBackground', 'assets/images/caveBackground.png', 1000, 100);
        game.load.image('bullet', 'assets/images/bullet.png');
        game.load.spritesheet('portal', 'assets/images/portal.png', 80, 81, 3);
    },
    
    create: function() {
        game.world.setBounds(0,0,4000,580);
        game.physics.arcade.gravity.y = 2000;
        
        caveBackground = game.add.tileSprite(0, 0, 4000, 800, 'caveBackground');
        
        caveFloors = game.add.tileSprite(0, 480, 4000, game.width, 'caveFloor');
        caveFloors.physicsType = Phaser.SPRITE;
        game.physics.arcade.enable(caveFloors);
        caveFloors.body.immovable = true;
        caveFloors.body.allowGravity = false;
        
        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
         };
        
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.jumpTimer = 0;
        
        game.input.onDown.add(this.createBullet, this);
        bullets = game.add.group();
        bullets.enableBody = true;
        
        this.grg = game.add.sprite(0, 10, 'gr');
        game.physics.arcade.enable(this.grg);
        this.grg.animations.add('walk');
        this.grg.animations.play('walk', 10, true);
        this.grg.body.collideWorldBounds = true;
        
        this.portal = game.add.sprite(3800, 365, 'portal');
        game.physics.arcade.enable(this.portal);
        this.portal.animations.add('anim');
        this.portal.animations.play('anim', 3, true);
        this.portal.scale.setTo(1.5, 1.5);
        this.portal.body.allowGravity = false;
    },
    
    update: function() {
        time++;
        game.physics.arcade.collide(caveFloors, this.grg);
         game.physics.arcade.collide(caveFloors, bullets, this.hit, null, this);
        game.physics.arcade.collide(caveFloors, this.portal);
        
        game.camera.follow(this.grg);
        
        if (this.wasd.right.isDown) {
            charaFacingRight = true;
           this.grg.body.velocity.x = 250;
            this.grg.anchor.setTo(.5,1);
            this.grg.scale.x = 1;
        } else if (this.wasd.left.isDown) { //if the left arrow is pressed, move to the left
            charaFacingRight = false;
            this.grg.anchor.setTo(.5,1);
            this.grg.scale.x = -1;
            this.grg.body.velocity.x = -250;
        } else if (this.wasd.down.isDown) { //if the down arrow is pressed, move downwards
            this.grg.body.velocity.y = 350;
            this.mro.body.velocity.y = 350;
        } else {
            this.grg.body.velocity.x = 0;
        }
        
        if (this.wasd.up.isDown && game.time.now > this.jumpTimer) {
            
            this.grg.body.velocity.y = -850;
            this.jumpTimer = game.time.now + 900;

        }
        
//        for (var i = 0; i < 30; i++) {
//            for (var j = 0; j < bullets.length; j++) {
//                if (Phaser.Rectangle.intersects(this.platforms.getChildAt(i).getBounds(), bullets.getChildAt(j).getBounds())) {
//                    bullets.getChildAt(j).kill();    
//                }
//            }
//        }
        
        if (this.grg.overlap(this.portal) && this.space.isDown) {
            this.returnToGame();
        }

    },
    
    createBullet: function() {
        
        if (time > 17) {
            time = 0;
            if (charaFacingRight) {    
                temp = game.add.sprite(this.grg.x+50, this.grg.y - 50, 'bullet', 0, bullets);
                temp.body.allowGravity = false;
                temp.body.velocity.x = 50; 
            } else {
                temp = game.add.sprite(this.grg.x-50, this.grg.y - 50, 'bullet', 0, bullets);
                temp.body.allowGravity = false;
                temp.body.velocity.x = -50; 
            }

            //  Our bullet group
                bullets.setAll('anchor.x', 0.5);
                bullets.setAll('anchor.y', 0.5);
//                bullets.setAll('outOfBoundsKill', true);
                bullets.setAll('checkWorldBounds', true);
                game.physics.arcade.moveToPointer(temp, 300);
        }
    },
    
    hit: function(caveFloors, bullets) {
        bullets.kill();
    },
    
    returnToGame: function() {
        this.state.start('GameScreen');
    },
};