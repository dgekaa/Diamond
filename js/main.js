let sprite;

const preload = () => {
  game.stage.backgroundColor = "#20B2AA";
  game.load.spritesheet("start", "img/bri_big_anim_start.png", 390, 370);
  game.load.spritesheet("middle", "img/bri_big_anim_middle.png", 450, 430);
  game.load.spritesheet("finish", "img/bri_big_anim_finish.png", 326, 330);
};

const create = () => {
  sprite = game.add.sprite(
    game.world.width * 0.5,
    game.world.height * 0.5,
    "start"
  );
  sprite.scale.x = 0.1;
  sprite.scale.y = 0.1;
  sprite.animations.add("walk");
  sprite.animations.play("walk", 8, true);
};

const update = () => {
  let prevTime = game.time.prevTime;

  if (prevTime > 1000 && prevTime <= 1600 && sprite.scale.x < 0.8) {
    sprite.scale.x += 0.02;
    sprite.scale.y += 0.02;
    game.add
      .tween(sprite)
      .to(
        { x: game.world.width * 0.2, y: game.world.height * 0.35 },
        270,
        Phaser.Easing.Linear.None,
        true
      );
  } else if (prevTime > 1600 && prevTime < 1700 && sprite.scale.x > 0.1) {
    sprite.kill();
    sprite = game.add.sprite(
      game.world.width * 0.3,
      game.world.height * 0.4,
      "middle"
    );
    sprite.animations.add("walk");
    sprite.animations.play("walk", 10, true);
    sprite.scale.x = 0.6;
    sprite.scale.y = 0.6;
  } else if (prevTime == 3000) {
    sprite.kill();
    sprite = game.add.sprite(
      game.world.width * 0.3,
      game.world.height * 0.4,
      "finish"
    );
    sprite.scale.x = 0.8;
    sprite.scale.y = 0.8;
    sprite.animations.add("walk");
  } else if (prevTime > 3000 && sprite.scale.x > 0.1) {
    sprite.animations.play("walk", 10, true);
    sprite.scale.x -= 0.02;
    sprite.scale.y -= 0.02;
    game.add
      .tween(sprite)
      .to(
        { x: game.world.width * 0.35, y: game.world.height * 0.08 },
        70,
        Phaser.Easing.Linear.None,
        true
      );
  } else if (prevTime > 3400) {
    sprite.kill();
    sprite = game.add.sprite(
      game.world.width * 0.35,
      game.world.height * 0.08,
      "middle"
    );
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    sprite.animations.stop("walk");
  }
};

const game = new Phaser.Game(600, 600, Phaser.CANVAS, "phaser-example", {
  preload,
  create,
  update
});
