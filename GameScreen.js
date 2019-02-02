var isFacingRight = true;
var isFacingRight2 = true;
var charaFacingRight = true;
var bunnyRight = true;
var mrokill = true;
var counter = 9;

var background;
var floors;
var bullets;
var mbls;
var grgcount = 2;

var time = 60;


var GameScreen = {
    preload: function() {
        game.load.spritesheet('gr', 'assets/images/guy_walk_spritesheet.png', 58, 87, 8);
        game.load.spritesheet('mo', 'assets/images/marioWalk.png', 40, 34, 8);
        game.load.image('floor', 'assets/images/floor.jpg');
        game.load.image('bullet', 'assets/images/bullet.png');
        game.load.image('pl', 'assets/images/platforms.png', 100, 100, 45);
        game.load.image('bg', 'assets/images/background.png', 1000, 100);
        game.load.image('mbl', 'assets/images/mario_bullet.png');
        game.load.spritesheet('bunny', 'assets/images/bunny_sprite.png', 31, 45, 4);
        game.load.spritesheet('portal', 'assets/images/portal.png', 80, 81, 3);
        game.load.spritesheet('trees', 'assets/images/trees.png', 58, 51, 1);
        game.load.image('switch', 'assets/images/p_switch.png', 25, 30);
    },
    create: function() {
       
        //Keyboard
        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
              
         };
        game.world.setBounds(0,0,4000,580);
        background = game.add.tileSprite(0, 0, 4000, 800, 'bg');
        floors = game.add.tileSprite(0, 548, 4000, game.width, 'floor');
        floors.physicsType = Phaser.SPRITE;
        game.physics.arcade.enable(floors);
        
//        floors.collideWorldBounds = true;
        floors.body.immovable = true;
        floors.body.allowGravity = false;
        
        this.jumpTimer = 0;
        this.mroJumpTimer = 0;
//        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 2000;
        
        this.tree1 = game.add.sprite(Math.random() * 2000 + 900, 380, 'trees');
        this.tree2 = game.add.sprite(Math.random() * 1500 + 600, 380, 'trees');
        this.tree3 = game.add.sprite(Math.random() * 1000 + 1000, 380, 'trees');
        this.tree4 = game.add.sprite(Math.random() * 500 + 320, 380, 'trees');
        this.tree5 = game.add.sprite(Math.random() * 1800 + 600, 380, 'trees');
        this.tree6 = game.add.sprite(Math.random() * 3000 + 300, 380, 'trees');
        this.tree7 = game.add.sprite(Math.random() * 2500 + 400, 380, 'trees');
        
        this.trees = game.add.group();
        this.trees.add(this.tree1);
        this.trees.add(this.tree2);
        this.trees.add(this.tree3);
        this.trees.add(this.tree4);
        this.trees.add(this.tree5);
        this.trees.add(this.tree6);
        this.trees.add(this.tree7);

        this.tree1.scale.setTo(2,2);
        this.tree2.scale.setTo(2,2);
        this.tree3.scale.setTo(2,2);
        this.tree4.scale.setTo(2,2);
        this.tree5.scale.setTo(2,2);
        this.tree6.scale.setTo(2,2);
        this.tree7.scale.setTo(2,2);
        game.physics.arcade.enable(this.trees);
        
        game.input.onDown.add(this.createBullet, this);
             
        //bullet function
        bullets = game.add.group();
        bullets.enableBody = true;
        mbls = game.add.group();
        mbls.enableBody = true;
        
        this.grg = game.add.sprite(0, 10, 'gr');
        game.physics.arcade.enable(this.grg);
        this.grg.animations.add('walk');
        this.grg.animations.play('walk', 10, true);
        
        this.bunny = game.add.sprite(100, 100, 'bunny');
        game.physics.arcade.enable(this.bunny);
        this.bunny.animations.add('walk3');
        this.bunny.animations.play('walk3', 4, true);
        this.bunny.scale.setTo(1, 1.5);
        
        this.portal = game.add.sprite(3800, 400, 'portal');
        game.physics.arcade.enable(this.portal);
        this.portal.animations.add('anim');
        this.portal.animations.play('anim', 3, true);
        this.portal.scale.setTo(1.5, 1.5);
        
        this.mro = game.add.sprite(1000, 400, 'mo');
        game.physics.arcade.enable(this.mro);
        this.mro.body.allowGravity = true;
        this.mro.scale.setTo(1, 2);
        
        this.pl = game.add.sprite(Math.random() * 2000 + 300, 380, 'pl');
        
        this.ts = game.add.sprite(Math.random() * 1500 + 200, 380, 'pl');
        
        this.io = game.add.sprite(Math.random() * 1000, 380, 'pl');
        
        this.la = game.add.sprite(Math.random() * 2500, 380, 'pl');
        
        this.ru = game.add.sprite(Math.random() * 3000, 380, 'pl');
        
        game.physics.arcade.enable(this.mro);
        game.physics.arcade.enable(this.pl);
        game.physics.arcade.enable(this.ts);
        game.physics.arcade.enable(this.io);
        game.physics.arcade.enable(this.la);
        game.physics.arcade.enable(this.ru);
        
        this.mro.animations.add('walk2');

        this.mro.animations.play('walk2', 8, true);
        
        this.grg.body.collideWorldBounds = true;
        this.mro.body.collideWorldBounds = true;
        this.bunny.body.collideWorldBounds = true;
        
        this.pl.body.immovable = true;
//        this.pl.body.collideWorldBounds = true;
        this.pl.height = 30;
        this.pl.width = 200;
        this.pl.body.allowGravity = false;
        this.pl.body.checkCollision.down = false;

        this.ts.body.immovable = true;
//        this.ts.body.collideWorldBounds = true;
        this.ts.height = 30;
        this.ts.width = 200;
        this.ts.body.allowGravity = false;
        this.ts.body.checkCollision.down = false;
        
        this.io.body.immovable = true;
//        this.io.body.collideWorldBounds = true;
        this.io.height = 30;
        this.io.width = 200;
        this.io.body.allowGravity = false;
        this.io.body.checkCollision.down = false;
        
        this.la.body.immovable = true;
//        this.la.body.collideWorldBounds = true;
        this.la.height = 30;
        this.la.width = 200;
        this.la.body.allowGravity = false;
        this.la.body.checkCollision.down = false;
        
        this.ru.body.immovable = true;
//        this.ru.body.collideWorldBounds = true;
        this.ru.height = 30;
        this.ru.width = 200;
        this.ru.body.allowGravity = false;
        this.ru.body.checkCollision.down = false;
        

        this.platforms = game.add.group();
        
        this.platforms.add(this.pl);
        this.platforms.add(this.ts);
        this.platforms.add(this.io);
        this.platforms.add(this.la);
        this.platforms.add(this.ru);
        
        pSwitch = game.add.group();
        
        this.switch = game.add.sprite(2000, 0, 'switch', 0, pSwitch);
        game.physics.arcade.enable(this.switch);
        this.switch.body.immovable = true;
        this.switch.body.allowGravity = false;
        this.switch.scale.setTo(0.1, 0.1);
    },
    
    update: function() {
        time++;
        game.physics.arcade.collide(floors, this.grg);
        game.physics.arcade.collide(floors, this.mro);
        game.physics.arcade.collide(floors, this.bunny);
        game.physics.arcade.collide(floors, this.portal);
        game.physics.arcade.collide(floors, this.trees);

        game.physics.arcade.collide(this.platforms, this.grg);
        game.physics.arcade.collide(this.platforms, this.mro);
        
        game.camera.follow(this.grg);
        
        game.physics.arcade.collide(pSwitch, bullets, this.activate, null, this);
        
//        game.physics.arcade.collide(this.grg, [this.mro, this.mgm], this.endGame, null, this);
//
//        
//        game.physics.arcade.collide(this.grg, [this.mro], this.endGame, null, this);


//        game.physics.arcade.collide(bullets, this.mro, this.hit, null, this);
        
//        game.physics.arcade.collide(mbls, this.grg, this.destroy, null, this);
        
        game.physics.arcade.collide(mbls, bullets, this.tall, null, this);
        
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
        
        game.physics.arcade.collide(this.grg, this.portal, this.winGame, null, this);
        
        if (this.mro.body.x <= game.world.width - 50 && isFacingRight) {
            this.mro.body.velocity.x = 400;//is going to right of screen going this fast
            this.mro.anchor.setTo(.5,1);//will flip to the left
            
            this.mro.scale.x = 1;//will flip to the left

        } else if (this.mro.body.x !== 0){//makes mario flip
            isFacingRight = false;//causes him to go left
            this.mro.anchor.setTo(.5,1);//will flip to the right
            this.mro.scale.x = -1;//will flip to the right
            this.mro.body.velocity.x = -400;//is going to the left of the screen going this fast
            
            
        } else {
            isFacingRight = true;
        }
        
        if (this.bunny.body.x <= game.world.width - 50 && bunnyRight) {
            this.bunny.body.velocity.x = 200;//is going to right of screen going this fast
            this.bunny.anchor.setTo(.5,1);//will flip to the left
            
            this.bunny.scale.x = 1;//will flip to the left

        } else if (this.mro.body.x !== 0){//makes mario flip
            bunnyRight = false;//causes him to go left
            this.bunny.anchor.setTo(.5,1);//will flip to the right
            this.bunny.scale.x = -1;//will flip to the right
            this.bunny.body.velocity.x = -200;//is going to the left of the screen going this fast   
        } else {
            bunnyRight = true;
        }
                    
        
        if (this.wasd.up.isDown && game.time.now > this.jumpTimer) {
            
            this.grg.body.velocity.y = -850;
            this.jumpTimer = game.time.now + 900;

        }
        
        if (game.time.now > this.mroJumpTimer) {
            this.mro.body.velocity.y = -850;
            this.mroJumpTimer = game.time.now + 1100;
            this.createMarioBullet();
        }
        
        for (var i = 0; i < this.platforms.length; i++) {
            for (var j = 0; j < bullets.length; j++) {
                if (Phaser.Rectangle.intersects(this.platforms.getChildAt(i).getBounds(), bullets.getChildAt(j).getBounds())) {
                    bullets.getChildAt(j).kill();    
                }
            }
        }
    },
    
    createMarioBullet: function() {
        if (isFacingRight) {
            help = game.add.sprite(this.mro.x+30, this.mro.y - 30, 'mbl', 0, mbls);
            help.body.allowGravity = false;
//           help.body.velocity.x = 50;
//            help.body.velocity.y = 50;
            game.physics.arcade.moveToObject(help, this.grg, 200);
        } else {
            help = game.add.sprite(this.mro.x-30, this.mro.y - 30, 'mbl', 0, mbls);
            help.body.allowGravity = false;
//            help.body.velocity.x = -50;
//            help.body.velocity.y = -50;
            game.physics.arcade.moveToObject(help, this.grg, 200);
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
    
    activate: function(pSwitch, bullets) {
        console.log("P Switch Activated");
        
    },
    
    hit: function(chara, bullet) {
        if (counter < 1) {
            chara.kill();
            this.winGame();
            counter = 9;
            grgcount = 2;
        } else {
            bullet.kill();
            counter--;
        }
    },
    
    destroy: function(grg, mbls) {
        if (grgcount < 1) {
            grg.kill();
            //call endscreen
            this.endGame();
            grgcount = 2;
            counter = 9;
        } else {
            mbls.kill();
            grgcount--;
        }
    },
    
    tall: function(mbls, bullets) {
        mbls.kill();
        bullets.kill();
    },
    
    //this method just start/change to another state call GameOverScreen
    //check in index.html
    //directory.js
    endGame: function() {
        //start the state 'GameScreen', as defined in the directory
        this.state.start('GameOverScreen');
    },
    
    winGame: function() {
        //start the state 'GameScreen', as defined in the directory
        this.state.start('WinScreen');
    }
    
};