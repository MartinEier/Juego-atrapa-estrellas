class Scene2 extends Phaser.Scene {
  constructor() {
    super('juego');
  }

  create ()
  {
      
      this.add.image(400, 300, 'sky');

      
      platforms = this.physics.add.staticGroup();

      
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      
      platforms.create(600, 400, 'ground');
      platforms.create(50, 250, 'ground');
      platforms.create(750, 220, 'ground');

      
      player = this.physics.add.sprite(100, 450, 'dude');

      
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      player.setScale(0.5);

      
      if (cursors =! undefined){
          cursors = this.input.keyboard.createCursorKeys();
      }
          

      
      stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars2 = this.physics.add.group({
        key: 'star2',
        repeat: 11,
        setXY: { x: 45, y: 0, stepX: 70 }
    });
    stars.children.iterate(function (child) {

        
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
    });
    stars2.children.iterate(function (child) {

     
     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

      
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


      
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(stars2, platforms);
    this.physics.add.collider(bombs, platforms);

      
    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.overlap(player, stars2, this.collectStar2, null, this);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

      
    score = 0;
    gameOver = false;

      
    initialTime = 30
  
    timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
    timeText = this.add.text(500, 16, '', { fontSize: '32px', fill: '#000' });

    this.jumps = 0;


  }

  update ()
  {
      if (gameOver)
      {       
          return
      }
      
      
      if (cursors.left.isDown)
      {
          player.setVelocityX(-160);

          player.anims.play('left', true);
      }
      else if (cursors.right.isDown)
      {
          player.setVelocityX(160);

          player.anims.play('right', true);
      }
      else
      {
          player.setVelocityX(0);

          player.anims.play('turn');
      }

      if (cursors.up.isDown && player.body.touching.down){
          player.setVelocityY(-330);
      }
  }

 collectStar (player, star, ) 
 {
   star.disableBody(true, true);

    
   score += 10;   
   contadorama += 1;
   console.log('amarillo' + contadorama)
   scoreText.setText('Score:' + score);
    

   if (contadorama === 12 && contadornar === 11) 
   {    console.log('ejecutando if amarillas') 
      stars.children.iterate(function (child) {

       child.enableBody(true, child.x, 0, true, true);

      });
      stars2.children.iterate(function (child) {

       child.enableBody(true, child.x, 0, true, true);

      });

     contadorama=0
     contadornar=0     
    
     var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        
     var bomb = bombs.create(x, 16, 'bomb');
     bomb.setBounce(1);
     bomb.setCollideWorldBounds(true);
     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
     bomb.allowGravity = false;
     level += 1
      initialTime = 30 - level;
    }
    
  } 
 collectStar2 (player, star2,)
 {   
   star2.disableBody(true, true);
    contadornar += 1;
     
   score += 15;
    scoreText.setText('Score:' + score);
    console.log('estrellas2' + contadornar)

    if (contadorama === 12 && contadornar === 11)
    { console.log('ejecutando if amarillas')
            
      stars2.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true,);

      });
      stars.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

      });
      contadorama=0
      contadornar=0
            
      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        
      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
      
      level += 1
      initialTime = 30 - level;
    }      
  }

  hitBomb (player, bomb)
  {
      this.gameOver()
  }


  gameOver() {        
      gameOver = true;
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');        

      var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Arial black', fontSize: 70, color: '#ff0000' })
      .setInteractive()
      this.add.text(300, 500, 'press to continue', { fontFamily: 'Arial black', fontSize: 20, color: '#000000' })
      .setInteractive()
      
      .on('pointerdown', () => this.scene.start('creditos'));
      Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));    
  }
  
  onSecond() {
      if (! gameOver)
      {       
          initialTime = initialTime - 1; // One second
          timeText.setText('Time: ' + initialTime);
          if (initialTime == 0) {
              timedEvent.paused = true;
              this.gameOver()
          }            
      }

  }



}