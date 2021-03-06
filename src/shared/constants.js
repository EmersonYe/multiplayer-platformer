module.exports = Object.freeze({
  PLAYER_RADIUS: 20,
  PLAYER_GRAVITY: 5,
  FRICTION: 0.6,
  PLAYER_MAX_SPEED: 10,

  SCORE_KILL: 20,
  SCORE_WIN: 50,

  MAP_SIZE: 3000,

  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
    PLAYER_DEAD: 'player_died',
  },
});
