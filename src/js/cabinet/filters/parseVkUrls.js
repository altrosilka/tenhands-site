angular.module('parseVkUrls', []).filter('parseVkUrls', [function() {
  return function(input, removeLink) {
    if (!input) {
      return;
    }

    var regClub = /\[club([0-9]*)\|([^\]]*)\]/g;
    var regId = /\[id([0-9]*)\|([^\]]*)\]/g;



    var bytes = [];

    for (var i = 0; i < input.length; ++i) {
      bytes.push(input.charCodeAt(i));
    }



    var ranges = [
      '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
      '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
      '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
    ];

  //  var smiles = input.match(new RegExp(ranges.join('|'), 'g'));
 //   var code;
 //   _.forEach(smiles,function(smile){
 //     code = (smile.charCodeAt(0).toString(16)+smile.charCodeAt(1).toString(16)).toUpperCase();
//
    //  input = input.replace(new RegExp(smile, 'g'), '<img class="emoji" src="http://vk.com/images/emoji/'+code+'.png"></img>');
    //});

    //debugger
    input = emojiParseInText(input);
      
    var text = input.autoLink();

    text = (removeLink) ? text.replace(regClub, '<span>$2</span>') : text.replace(regClub, '<a class="link" href="/public/$1/">$2</a>');
    text = text.replace(regId, '<span>$2</span>').replace(/\n/g, "<br />");

    return text;
  }
}]);
