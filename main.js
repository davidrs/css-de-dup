// TODO print out to files.

//  SAMPLE CALL
// node main.js '../aiddata-dashboards/css/aiddataui/' true

fs = require('fs');
var $ = require('jquery');

var dir = ''; // Directory to parse for css files.
var STRICT_MATCH = false; // true: look for exact matches of both id and inner properties
                          // false: just look for same signature, but not same properties.
var data={};

var run = function(){
  parseParams();
}


var parseParams = function(){
  if(process.argv.length<4){
    console.log("Not enough arguments.");
    console.log("node main.js [DIR] [STRICT_MATCH]");
    console.log("node main.js '../aiddata-dashboards/css/aiddataui/' true");
  }
  else{
    dir = process.argv[2];
    STRICT_MATCH = process.argv[3];

    processDirectory();
  }
}

var processDirectory = function(){
  fs.readdir(dir,function(err,files){
      if (err) throw err;
      var c=0;
      files.forEach(function(file){
        if(file.indexOf('.css')>=0){
          findDuplicateCSSInFile(dir+file);
        }
      });
  });
}

var findDuplicateCSSInFile = function(f){
  if (f) {
    fs.readFile(f, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      cssFileContent = data;
      findDuplicateCSS(cssFileContent,f);
    });
  }
};

var findDuplicateCSS = function (cssTxt, fileName){

    ids =  cssTxt.match(/#([\w\d\.-]+)[^{}]*{[^}]*}/g);
    if(ids){
      //console.log(fileName+' ids ' + ids.length);
    }

    classes = cssTxt.match(/\.([\w\d\.-]+)[^{}]*{[^}]*}/g);
    if(classes){
      //console.log(fileName+' classes ' + classes.length);
    }

    var dups = findDuplicates(ids);
    if(dups.length>0){
      console.log(fileName+" id dups ");
      for(var i=0;i<dups.length;i++){
        console.log(dups[i].substring(0,65));
        console.log("-------");
      }
    }

    dups = findDuplicates(classes);
    if(dups.length>0){
      console.log(fileName+" classs dups ");
      for(var i=0;i<dups.length;i++){
        console.log(dups[i].substring(0,65));
        console.log("-------");
      }
    }

};

var findDuplicates = function(origAry){
    var results =[];
    if(origAry){
      var sorted_arr = origAry.sort();

      var results = [];
      for (var i = 0; i < sorted_arr.length - 1; i++) {
          if (compareCSS(sorted_arr[i],sorted_arr[i + 1])) {
              results.push(sorted_arr[i]);
          }
      }
    }
  return results;
};

var compareCSS = function(cssA, cssB){
  if(STRICT_MATCH){
    return cssA.trim() == cssB.trim();
  } else{
    return cssA.substring(0,cssA.indexOf('{')).trim() == cssB.substring(0,cssB.indexOf('{')).trim();
  }
};

run();
