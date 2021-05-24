class Scene3 extends Phaser.Scene {
  constructor() {
    super("creditos");
  }

  preload ()
  {
    this.load.image('logo2D', 'assets/logo2D.png');   
  }
  
  create() {
    this.add.image(400, 300, 'sky');
    this.add.image(400, 568, 'ground').setScale(2)
    this.add.image(400, 100, 'logo2D');


    var puntajefinal = this.add.text(0, 0, 'Score: ' + score,  { fontFamily: 'Arial', fontSize: 70, color: '#000000' });
    
    Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(400, 300, 800, 600));



    var restartButton = this.add.text(300, 500, 'Prueba de nuevo', { fontFamily: 'Arial black', fontSize: 20, color: '#000000' })
    .setInteractive()
    .on('pointerdown', () => this.reiniciar() );
  }

  reiniciar() {
    this.scene.start('juego');
  }

  
}