   
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
 
  function getHorizontalLand(j,row) {
      l = j;
      var landObj=getRowLandObject();
      var land = [];
       while (isLand(row[++l ])) {
       
      }
      land[0] = [];
       land[0][0]=j;
       land[0][1]=l-1;
        landObj.land = land;
      return landObj;
    }

 
 function getRowOfLands(i,row){
  //         console.log("row: " +row);
   
  var landArr = [];  
    var k = 0;
     var j=0;
      while (j<row.length) {
       if (isLand(row[j])) {
    //     console.log("j="+j+ " row[j]=" +row[j]);
          landArr[k] = getHorizontalLand(j,row);
 //          console.log("land:"+landArr[k].land[0]);
           j+= landArr[k].land[0][1]-landArr[k].land[0][0]+1;
          k++;
        }else{
          j++;
        }
      }
     return landArr;
  }
 