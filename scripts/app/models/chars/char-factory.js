define(function(require, exports, module){
    var CharType = require('./char-type');
    var Swordman = require('./swordman');

    var CharFactory = {

        characterClasses: {
        },

        createCharacter: function(characterType){
            var refClass = this.characterClasses[characterType];
            return new refClass();
        },

        registClass: function(key, value){
            this.characterClasses[key] = value;
        }
    };

    CharFactory.registClass(CharType.swordman, Swordman);

    module.exports = CharFactory;
});