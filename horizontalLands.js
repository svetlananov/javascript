   
 //1 dimentional lands functions
    function isLand(i, j,testArr) {

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

      function getHorizontalLand(i, j,testArr) {
      l = 0;
      var land = [];
       var coordinates = { "i": 0, "j": 0 };

      coordinates.i = i;

      coordinates.j = j;

      land[0] = coordinates;

      var i = land[l].i;
      var j = land[l].j;
      while (isLand(i, j + 1,testArr)) {
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
      if (isLand(coord.i, coord.j,testArr)) {
        landArr[k] = getHorizontalLand(coord.i, coord.j,testArr);
        k++;
      }
      coord = next(landArr.length>0, coord.i, coord.j,landArr[k-1],testArr.length, testArr[0].length);

    }
    return landArr;
 }