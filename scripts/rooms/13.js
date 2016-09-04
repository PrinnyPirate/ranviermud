'use strict';
const CommandUtil = require('../../src/command_util')
  .CommandUtil;
const Random = require('../../src/random').Random;
const examiner = require('../../src/examine').examine;
const Broadcast = require('../../src/broadcast').Broadcast;
const util = require('util');

exports.listeners = {

  examine: l10n =>
    (args, player, players) => {

      const config = {
        poi: [
          'railing',
          'bent',
          'banister',
          'guardrail',
          'rail'
        ],
        found: findRailing.bind(null, player, players),
      };

      return examiner(args, player, players, config);

      function findRailing(player, players) {
        let alreadyFound = player.hasExplored('observed_balcony_serpent');

        player.say('Upon close examination, you see what appear to be <red>wide scratches</red> in the finishing where the railing is bent.');
        player.say('They resemble claw marks. It looks like the iron railing was bent by... something.');

        if (!alreadyFound) {
          player.emit('experience', 15, 'the brute strength you may be up against');
        }

        players.eachIf(
          p => CommandUtil.inSameRoom(player, p),
          p => {
            p.say(player.getName() + ' closely examines the balcony\'s guardrail.');
          });
      }
    },

    playerEnter: l10n => {
      return function (player, players) {
        if (Random.coinFlip()) {

          util.log('crick');

          const makeYellow = str => '<yellow>' + str + '</yellow>';
          player.say(makeYellow('The planks creak as you step onto the balcony.'));

          players.eachIf(
            p => CommandUtil.inSameRoom(player, p),
            p => p.say(makeYellow('The planks creak as ' + player.getShortDesc() + 'steps onto the balcony.')));
        }
      }
    },

}