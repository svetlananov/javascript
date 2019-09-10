 
    var testArr = [[0, 0, 1, 0, 1],

              [1, 1, 1, 1, 1],

             [1, 0, 0, 1, 1],

           [1, 0, 0, 0, 0]];

    testArr = [[1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 1, 1, 1, 1, 0],
           [1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
           [0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
           [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
           [1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
           [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
           [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
           [1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
           [0, 1, 0, 0, 0, 0, 0, 0, 1, 1]];

  function printIslands(islands){
   console.log("ISLANDS: " + islands.length);
     for (var i = 0; i < islands.length; i++) {
        if (islands[i]) {
          console.log(printArr1(islands[i]));
        }
      }

    }

function printTestData(){
      console.log("TEST DATA");
      for (var i = 0; i < testArr.length; i++) {
        var str = "";
        for (var j = 0; j < testArr[i].length; j++) {
          str += " " + testArr[i][j];
        }
        console.log(str);

      }
    }
    
    function printArr1(land) {
      var str = "";
      for (var f = 0; f < land.length; f++) {
        str += "[" + land[f].i + "," + land[f].j + "]";

      }
      return str;
    }
    
    function printOneRowLand(arr) {
      str = "";
      for (var i = 0; i < arr.length; i++) {
        str += "; ~ to (";
        if (arr[i]) {
          for (var j = 0; j < arr[i].connectionDown.length; j++) {
            str += arr[i].connectionDown[j] + ", ";
          }

          str += ") <- to (" + arr[i].connectionLeft + ") ";
          str += " [" + printArr1(arr[i].land) + "]";
        }
      }
      return str;
    }

    function printOneIsland(arr) {
      str = "";
      for (var i = 0; i < arr.length; i++) {
        str += "; ";
        if (arr[i]) {

          str += " [" + printArr1(arr[i].land) + "]";
        }
      }
      return str;
    }

    function printRowIslands(arr) {
      str = "";
      for (var i = 0; i < arr.length; i++) {
        str += i + ": " + printOneIsland(arr[i]) + "\n";
      }
      return str;
    }

    function printRowLands(arr) {
      str = "";
      for (var i = 0; i < arr.length; i++) {
        str += i + ": " + printOneRowLand(arr[i]) + "\n";
      }
      return str;
    }




    function generateMap(m, n) {
      for (var i = 0; i < m; i++) {
        testArr[i] = [];
        for (var j = 0; j < n; j++) {
          testArr[i][j] = Math.round(Math.random());
        }
      }
    }
//generateMap(m,n);
  
 var  islands =islands(testArr);

printTestData()
    console.log("%c" + printRowIslands(landRows), "color: red");
     /*   console.log("%cI am red %cI am green", "color: red", "color: green");


       for(var i=0; i<testArr.length; i++){
        var str = "";
        for( var j=0; j<testArr[i].length; j++){
          if(checkIslands(i,j)){
            str +="%c " + testArr[i][j];
          }
        }
        console.log(str, "color: red", "color: green", "color: blue", "color: yellow", "color: brown");

       }
      */
      printIslands(islands);
