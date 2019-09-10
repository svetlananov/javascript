   
 //1 dimentional lands functions
    function isLand(i, j) {

      if (testArr[i][j] == 1) {
        return true;
      } else {
        return false;
      }
    }

    function isDone(i, j) {
      if (i == -1)
        return true;
      else
        return false;
    }

     function next(isNotFirstLand,i, j,lastCheckedIsland, m,n) {
       var coord ={"i":0,"j":0}
      if (isNotFirstLand ) {
        var lastCheckedCoord = lastCheckedIsland[lastCheckedIsland.length - 1];
        if (lastCheckedCoord.i == i && lastCheckedCoord.j > j) {
          j = lastCheckedCoord.j;
        }
      }
      var nextJ = j < n - 1 ? j + 1 : 0;
      var nextI = nextJ == 0 ? (i < m - 1 ? i + 1 : -1) : i;
      coord.j = nextJ;
      coord.i = nextI;

      return coord;
    }

      function getHorizontalLand(i, j) {
      l = 0;
      var land = [];
       var coordinates = { "i": 0, "j": 0 };

      coordinates.i = i;

      coordinates.j = j;

      land[0] = coordinates;

      var i = land[l].i;
      var j = land[l].j;
      while (isLand(i, j + 1)) {
        l++;
        land[l] = [];
        land[l].i = land[l - 1].i;
        land[l].j = land[l - 1].j + 1;
        j++;
      }
      return land;
    }
 
    

     function getAllLands(testArr){
      //console.log("%cI am red %cI am green", "color: red", "color: green");
    //find 1-dimentional lands
    var coord = {
      i: 0,
      j: 0
    };
    var k = 0;
    var landArr = [];

    while (!isDone(coord.i, coord.j)) {
      if (isLand(coord.i, coord.j)) {
        landArr[k] = getHorizontalLand(coord.i, coord.j);
        k++;
      }
      coord = next(landArr.length>0, coord.i, coord.j,landArr[k-1],testArr.length, testArr[0].length);

    }
    return landArr;
 } var landRows = [];
 
    //2-dimentional functionality


    function areConnected(arr1, arr2) {
      var flag = false;
      if (arr1 != [] && arr2 != []) {
        // loop through  elements and compare index j to index j in arr2
        var x = 0;
        while (!flag && x < arr1.length) {
          var y = 0;
          while (!flag && y < arr2.length) {
            if (arr1[x].j == arr2[y].j) {
              flag = true;
            }
            y++;
          }
          x++;

        }
      }

      return flag;
    }

    function getRowLandObject() {
      var rowLand = {
        connectionDown: [],
        connectionLeft: -1,
        land: []
      };
      // rowLand.connectionDown[0]=-1;
      return rowLand;
    }

    function arrayUnique(array1, array2) {
      var a = array1.concat(array2);
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j])
            a.splice(j--, 1);
        }
      }

      return a;
    }

    function deleteLand(landRows, e, f) {
      landRows[e][f] = null;
    }


    function getIslands(landRows) {
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

    /*function checkIslands(i,j){
      var flag =false; var x=0; var y = 0;
      while(!flag && x[y]) {
            
      }
      testArr[i][j]=1?true:false;
      return flag;
    }

    */
    //==========================================
    function islands(testArr){
     var islands =[];
     landArr = getAllLands(testArr);

    //place lands in rows
    var landRows = [];
    var num = 0;
    var currentRow = landArr[0][0].i;
    landRows[currentRow] = [];
    landRows[currentRow][num] = getRowLandObject();
    landRows[currentRow][num].land = landArr[0];
    for (var x = 1; x < landArr.length; x++) {
      var land = landArr[x];
      var row = land[0].i;
      //firstRow
      if (row == currentRow) {
        num++;

      } else {
        //second  and next rows
        currentRow = row;
        landRows[currentRow] = [];
        num = 0;
      }
      landRows[currentRow][num] = getRowLandObject();
      landRows[currentRow][num].land = land;
    }

    //glue island to lower row island if connected
    //var islands =deepCopyArr(landRows);


    //console.log(printRowLands(landRows));
    if (landRows.length > 1) {

      // set connectionDown to next row island
      for (var e = 1; e < landRows.length; e++) {
               //for each land in the row  loop and search for connected islands from upper row
            //compare j indexes
     //d fill connections to next row
     var upperRow = landRows[e - 1];
        for (var p = 0; p < upperRow.length; p++) {
          var f = 0;
          var lowerRow = landRows[e];
          for (var r = 0; r < lowerRow.length; r++) {
            if (areConnected(lowerRow[r].land,
                upperRow[p].land)) {
                  upperRow[p].connectionDown[f] = r;
              f++;
              //        console.log(printArr1(landRows[e-1][p].land));
              //           console.log(printArr1(landRows[e][r].land));
              //          console.log("land [" + (e-1) +"," + p +"] is connected to land [" + e + "," + r + "]"  );
            }
          }
        }
      }

      //console.log(printRowLands(landRows));
      //set leftConnections in lowerLand
      for (var e = 0; e < landRows.length - 1; e++) {
        var upperRow = landRows[e];
        for (var f = upperRow.length - 1; f >= 0; f--) {
          var upperLand = upperRow[f];
          //   var lowerLand = landRow[e+1][f];
          if (upperLand.connectionDown.length > 1) {
            var cdArr = upperLand.connectionDown;
            for (var a = cdArr.length - 1; a >= 0; a--) {
              var cda = cdArr[a];
              var cd0 = cdArr[0];
              var lowerLand = landRows[e + 1][cda];
              if (cd0 != cda) {
                lowerLand.connectionLeft =
                  upperLand.connectionLeft > -1 ?
                  upperRow[upperLand.connectionLeft].connectionDown[0] :
                  cd0;
              }
            }

          }
        }
      }

      //  console.log(printRowLands(landRows));

      //merging islands ****change to array of connections
      for (var e = 0; e < landRows.length; e++) {
        for (var f = landRows[e].length - 1; f >= 0; f--) {
          //  console.log("upperLand:"+"["+e + ","+f + "]");
          var upperLand = landRows[e][f];
          var connectionLeft = upperLand.connectionLeft;
          if (connectionLeft > -1) {
            //loop through islands  in a row and merge connected to the left 
            //      console.log(e,connectionLeft,f);
            //      console.log(landRows[e][connectionLeft],landRows[e][f]);
            var leftLand = landRows[e][connectionLeft];
            leftLand.land = leftLand.land.concat(landRows[e][f].land);
            leftLand.connectionDown = arrayUnique(leftLand.connectionDown, upperLand.connectionDown);
            //        console.log("merged upperLand:"+"["+e + ","+f + "]" + "and [" +e +"," + connectionLeft +"]");
            //           console.log("new connectionDown"+printArr1(leftLand.connectionDown));
            deleteLand(landRows, e, f);

          } else if (upperLand.connectionDown.length > 0) {
            //loop through islands  in a row and merge connected to the lower row into lower row
            var connectionLeft0 = upperLand.connectionDown[0];
            for (var a = upperLand.connectionDown.length - 1; a > 0; a--) {
              var connectionDown = upperLand.connectionDown[a];
              landRows[e + 1][connectionDown].connectionLeft = connectionLeft0;
            }
            //console.log("before:" +printArr1(landRows[e][f].land) + "+" +printArr1(landRows[e+1][connectionLeft0].land));
            landRows[e + 1][connectionLeft0].land = landRows[e][f].land.concat(landRows[e + 1][connectionLeft0].land);
            //  console.log("after:" +printArr1(landRows[e+1][connectionLeft0].land));
            deleteLand(landRows, e, f);

          }

        }
      }
       islands =getIslands(landRows);
  }
  return islands;
}     
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
