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
var grgcount = 5;
var time = 60;
var healthChange = 5;

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
        game.load.image('pressedSwitch', 'assets/images/pressed_switch.png', 25, 30);
        game.load.image('cave', 'assets/images/cave_entrance.png', 30, 30);
        game.load.image('health6', 'assets/images/healthbarfull.png');
        game.load.image('health5', 'assets/images/healthbar_5.png');
        game.load.image('health4', 'assets/images/healthbar_4.png');
        game.load.image('health3', 'assets/images/healthbar_3.png');
        game.load.image('health2', 'assets/images/healthbar_2.png');
        game.load.image('health1', 'assets/images/healthbar_1.png');
    },
    create: function() {
       
        //Keyboard
        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
            
         };
        
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
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
        
        entrances = game.add.group();
        
        this.cave = game.add.sprite(2542, 90, 'cave', entrances);
        game.physics.arcade.enable(this.cave);
        this.cave.body.allowGravity = false;
        this.cave.body.immovable = true;
        this.cave.height = 120;
        this.cave.width = 120;
        this.cave.visible = false;
        
        this.grg = game.add.sprite(0, 10, 'gr');
        game.physics.arcade.enable(this.grg);
        this.grg.animations.add('walk');
        this.grg.animations.play('walk', 10, true);
        
        this.bunny = game.add.sprite(100, 100, 'bunny');
        game.physics.arcade.enable(this.bunny);
        this.bunny.animations.add('walk3');
        this.bunny.animations.play('walk3', 4, true);
        this.bunny.scale.setTo(1, 1.5);
        
        this.portal = game.add.sprite(3800, 400, 'portal', entrances);
        game.physics.arcade.enable(this.portal);
        this.portal.animations.add('anim');
        this.portal.animations.play('anim', 3, true);
        this.portal.scale.setTo(1.5, 1.5);
        
        this.mro = game.add.sprite(100, 200, 'mo');
        game.physics.arcade.enable(this.mro);
        this.mro.body.allowGravity = true;
        this.mro.scale.setTo(1, 2);
        
        this.pl = game.add.sprite(Math.random() * 2000 + 300, 380, 'pl');
        
        this.ts = game.add.sprite(Math.random() * 1500 + 200, 380, 'pl');
        
        this.io = game.add.sprite(Math.random() * 1000, 380, 'pl');
        
        this.la = game.add.sprite(1600, 380, 'pl');
        
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
        
        this.healthBar6 = game.add.sprite(600, 30, 'health6');
        game.physics.arcade.enable(this.healthBar6);
        this.healthBar6.body.allowGravity = false;
        this.healthBar6.body.immovable = true;
        
        this.healthBar5 = game.add.sprite(600, 30, 'health5');
        game.physics.arcade.enable(this.healthBar5);
        this.healthBar5.body.allowGravity = false;
        this.healthBar5.body.immovable = true;
        
        this.healthBar4 = game.add.sprite(600, 30, 'health4');
        game.physics.arcade.enable(this.healthBar4);
        this.healthBar4.body.allowGravity = false;
        this.healthBar4.body.immovable = true;
        
        this.healthBar3 = game.add.sprite(600, 30, 'health3');
        game.physics.arcade.enable(this.healthBar3);
        this.healthBar3.body.allowGravity = false;
        this.healthBar3.body.immovable = true;
        
        this.healthBar2 = game.add.sprite(600, 30, 'health2');
        game.physics.arcade.enable(this.healthBar2);
        this.healthBar2.body.allowGravity = false;
        this.healthBar2.body.immovable = true;
        
        this.healthBar1 = game.add.sprite(600, 30, 'health1');
        game.physics.arcade.enable(this.healthBar1);
        this.healthBar1.body.allowGravity = false;
        this.healthBar1.body.immovable = true;
        
        this.healthBar = game.add.group();
        
        this.healthBar.add(this.healthBar6);
        this.healthBar.add(this.healthBar5);
        this.healthBar.add(this.healthBar4);
        this.healthBar.add(this.healthBar3);
        this.healthBar.add(this.healthBar2);
        this.healthBar.add(this.healthBar1);
        this.healthBar.scale.setTo(0.3, 0.3);
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
        game.physics.arcade.collide(this.platforms, this.cave);
        
        game.camera.focusOnXY(this.grg.x, this.grg.y);
        
        game.physics.arcade.collide(pSwitch, bullets, this.activate, null, this);
        
//        game.physics.arcade.collide(this.grg, [this.mro, this.mgm], this.endGame, null, this);
//
//        
//        game.physics.arcade.collide(this.grg, [this.mro], this.endGame, null, this);


//        game.physics.arcade.collide(bullets, this.mro, this.hit, null, this);
        
//        game.physics.arcade.collide(mbls, this.grg, this.destroy, null, this);
        
//        game.physics.arcade.collide(this.grg, this.portal, this.winGame, null, this);
        
        game.physics.arcade.collide(mbls, bullets, this.tall, null, this);
        
        
        if (this.grg.overlap(this.cave) && this.space.isDown) {
            this.enterCave();
        }
        
        if (this.grg.overlap(this.portal) && this.space.isDown) {
            this.winGame();
        }
        
        
        if (this.grg.body.x < 470) {
            this.healthBar.x = 615;
        } else if (this.grg.body.x > 3470) {
            this.healthBar.x = 3620;
        } else {
            this.healthBar.x = this.grg.body.x + 145;
        }
        
        if (healthChange == 5) {
            this.healthBar1.visible = false;
            this.healthBar2.visible = false;
            this.healthBar3.visible = false;
            this.healthBar4.visible = false;
            this.healthBar5.visible = false;
            this.healthBar6.visible = true;
        } else if (healthChange == 4) {
            this.healthBar1.visible = false;
            this.healthBar2.visible = false;
            this.healthBar3.visible = false;
            this.healthBar4.visible = false;
            this.healthBar5.visible = true;
            this.healthBar6.visible = false;
        } else if (healthChange == 3) {
            this.healthBar1.visible = false;
            this.healthBar2.visible = false;
            this.healthBar3.visible = false;
            this.healthBar4.visible = true;
            this.healthBar5.visible = false;
            this.healthBar6.visible = false;
        } else if (healthChange == 2) {
            this.healthBar1.visible = false;
            this.healthBar2.visible = false;
            this.healthBar3.visible = true;
            this.healthBar4.visible = false;
            this.healthBar5.visible = false;
            this.healthBar6.visible = false;
        } else if (healthChange == 1) {
            this.healthBar1.visible = false;
            this.healthBar2.visible = true;
            this.healthBar3.visible = false;
            this.healthBar4.visible = false;
            this.healthBar5.visible = false;
            this.healthBar6.visible = false;
        } else if (healthChange == 0) {
            this.healthBar1.visible = true;
            this.healthBar2.visible = false;
            this.healthBar3.visible = false;
            this.healthBar4.visible = false;
            this.healthBar5.visible = false;
            this.healthBar6.visible = false;
        } else {
            this.healthBar.visible = false;
        }
        
        if (this.wasd.right.isDown) {
            charaFacingRight = true;
           this.grg.body.velocity.x = 250;
            this.grg.anchor.setTo(.5,1);
            this.grg.scale.x = 1;
            console.log(this.grg.body.x);
            if (this.grg.body.x > 470) {
            this.healthBar.x = this.healthBar.x - 2;
            }
        } else if (this.wasd.left.isDown) { //if the left arrow is pressed, move to the left
            charaFacingRight = false;
            this.grg.anchor.setTo(.5,1);
            this.grg.scale.x = -1;
            this.grg.body.velocity.x = -250;
            console.log(this.grg.body.x);
        } else if (this.wasd.down.isDown) { //if the down arrow is pressed, move downwards
            this.grg.body.velocity.y = 350;
            this.mro.body.velocity.y = 350;
        } else {
            this.grg.body.velocity.x = 0;
        }
        

        
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
        this.pressed = game.add.sprite(2000, 0, 'pressedSwitch', 0);
        game.physics.arcade.enable(this.pressed);
        this.pressed.body.immovable = true;
        this.pressed.body.allowGravity = false;
        this.pressed.scale.setTo(0.1, 0.1);
        this.switch.kill();
        
        this.platform7 = game.add.sprite(1900, 300, 'pl');
        game.physics.arcade.enable(this.platform7);
        this.platform7.body.immovable = true;
        this.platform7.height = 30;
        this.platform7.width = 200;
        this.platform7.body.allowGravity = false;
        this.platform7.body.checkCollision.down = false;
        this.platforms.add(this.platform7);

        this.platform8 = game.add.sprite(2200, 220, 'pl');
        game.physics.arcade.enable(this.platform8);
        this.platform8.body.immovable = true;
        this.platform8.height = 30;
        this.platform8.width = 200;
        this.platform8.body.allowGravity = false;
        this.platform8.body.checkCollision.down = false;
        this.platforms.add(this.platform8);
        
        this.platform9 = game.add.sprite(2500, 180, 'pl');
        game.physics.arcade.enable(this.platform9);
        this.platform9.body.immovable = true;
        this.platform9.height = 30;
        this.platform9.width = 200;
        this.platform9.body.allowGravity = false;
        this.platform9.body.checkCollision.down = false;
        this.platforms.add(this.platform9);
        
        this.cave.visible = true;
    },
    
    hit: function(chara, bullet) {
        if (counter < 1) {
            chara.kill();
            this.winGame();
            counter = 9;
            grgcount = 5;
            healthChange = 5;
        } else {
            bullet.kill();
            counter--;
        }
    },
    
    destroy: function(grg, mbls) {
        if (healthChange < 1) {
            grg.kill();
            //call endscreen
            this.endGame();
            grgcount = 5;
            counter = 9;
            healthChange = 5;
        } else {
            mbls.kill();
            grgcount--;
            healthChange--;
            console.log('health left:'+(healthChange+1));
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
    },
    
    enterCave: function() {
        this.state.start('CaveScreen');
}
    
};