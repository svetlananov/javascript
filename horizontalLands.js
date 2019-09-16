   
 //1 dimentional lands functions
    function isLand(cell) {

      if (cell == 1) {
        return true;
      } else {
        return false;
      }
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

    function getHorizontalLand(i,j,row) {
      l = 0;
      var landObj=getRowLandObject();
      var land = [];
        landObj.land[0] = {"i":i,"j":j};
        while (isLand(row[++j ])) {
          landObj.land[++l] = {"i":i, "j":j };
        }
      return landObj;
    }

 
 function getRowOfLands(i,row){
  var landArr = [];  
    var k = 0;
     var j=0;
      while (j<row.length) {
       if (isLand(row[j])) {
          landArr[k] = getHorizontalLand(i,j,row);
          j+= landArr[k].land.length;
          k++;
        }else{
          j++;
        }
      }
     return landArr;
  }
 