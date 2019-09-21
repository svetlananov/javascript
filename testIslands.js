 
 testArr = [
[["1","1","0","0","0"],
["1","1","0","0","0"],
["0","0","1","0","0"],
["0","0","0","1","1"]],                  
                  [[1,1,1,1,0],
                  [1,1,0,1,0],
                  [1,1,0,0,0],
                  [0,0,0,0,0]],
  
                [[0, 0, 1, 0, 1],
                [1, 1, 1, 1, 1],
                [1, 0, 0, 1, 1],
                [1, 0, 0, 0, 0]],
  [[1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 1, 1, 1, 1, 0],
           [1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
           [0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
           [0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
           [1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
           [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
           [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
           [1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
           [0, 1, 0, 0, 0, 0, 0, 0, 1, 1]],
[["1","0","0"],
          ["0","0","0"],
          ["0","0","1"]],
    
          [["1","1","1","1","1","0","1","1","1","1","1","1","1","1","1","0","1","0","1","1"],
          ["0","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","0"],
          ["1","0","1","1","1","0","0","1","1","0","1","1","1","1","1","1","1","1","1","1"],
          ["1","1","1","1","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
          ["1","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
          ["1","0","1","1","1","1","1","1","0","1","1","1","0","1","1","1","0","1","1","1"],
          ["0","1","1","1","1","1","1","1","1","1","1","1","0","1","1","0","1","1","1","1"],
          ["1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","0","1","1"],
          ["1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1"],
          ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
          ["0","1","1","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1","1","1"],
          ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
          ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
          ["1","1","1","1","1","0","1","1","1","1","1","1","1","0","1","1","1","1","1","1"],
          ["1","0","1","1","1","1","1","0","1","1","1","0","1","1","1","1","0","1","1","1"],
          ["1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","1","0"],
          ["1","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","0","0"],
          ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
          ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
          ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"]],


[],

 [["1"]],
 
[["1","1","1","1","1","1"],
["1","0","0","0","0","1"],
["1","0","1","1","0","1"],
["1","0","0","0","0","1"],
["1","1","1","1","1","1"]],

[["1","0","1","1","1"],
 ["1","0","1","0","1"],
 ["1","1","1","0","1"]]]

function printIslands(islands){ 
     console.log("ISLANDS: " + islands.length);
     for (var i = 0; i < islands.length; i++) {
        if (islands[i]) {
          console.log(printArr1(islands[i]));
        }
      }

    }

function printTestData(testArr){
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
    function printSingleRowLand(arr){
       var str = " ~ to (";
        if (arr) {
          for (var j = 0; j < arr.connectionDown.length; j++) {
            str += arr.connectionDown[j] + ", ";
          }

          str += ") <- to (" + arr.connectionLeft + ") ";
          str += " [" + printArr1(arr.land) + "]";
        }
        return str;
    }
    function printOneRowLand(arr) {
      str = "ROW";
      if(arr){
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
      console.log("--- ROWLANDS: ---")
      str = "";
      for (var i = 0; i < arr.length; i++) {
        str += i + ": " + printOneRowLand(arr[i]) + "\n";
      }
      return str;
    }


/*function checkIslands(i,j){
      var flag =false; var x=0; var y = 0;
      while(!flag && x[y]) {
            
      }
      testArr[i][j]=1?true:false;
      return flag;
    }

    */
/*
    function generateMap(m, n) {
      for (var i = 0; i < m; i++) {
        testArr[i] = [];
        for (var j = 0; j < n; j++) {
          testArr[i][j] = Math.round(Math.random());
        }
      }
    }
  */
 /*   function getIslands(landRows) {
      var islands = [];
      var k = 0;
  //    console.log(landRows.length);
         for (var e = 0; e < landRows.length; e++) {
        var row =landRows[e];
        if(row){
  //       console.log(row.length);
        for (var f = 0; f < row.length; f++) {
            var land = row[f];
            if (land) {
              islands[k] = land.land;
              k++;
            }
          }
       }
      }
      return islands;
    }
*/
//generateMap(m,n);
for(var i = 0;i<testArr.length;i++){
  var count =islands(testArr[i]);
//  var landRows =islands(testArr);
 // var count =getCount(landRows);
 //var  islands =getIslands(landRows);
   console.log("Total islands:" + count);
 /*if(!islands){
         console.log("Total islands:" + 0);
 
    }else{
         console.log("Total islands:" + islands.length);
 }
 */
 printTestData(testArr[i]);
 }
  //  console.log("%c" + printRowIslands(landRows), "color: red");
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
    //  printIslands(islands);
