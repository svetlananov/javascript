var landRows = [];
 
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


    function getCount(landRows) {
    
      var k = 0;
  //    console.log(landRows.length);
  if(landRows){
    for (var e = 0; e < landRows.length; e++) {
        var row =landRows[e];
        if(row){
  //       console.log(row.length);
        for (var f = 0; f < row.length; f++) {
            if (row[f]) {
              k++;
            }
          }
       }
      }
  }
      return k;
    }

    
    function getNextLeftConnection(upperRow,lowerLand,upperLand){
      var flag = false;
          var connectionLeft= -1
          while(flag ==false && upperLand.connectionLeft > -1 ) {
            var leftUpperLand = upperRow[upperLand.connectionLeft ];
            if(leftUpperLand.connectionDown && leftUpperLand.connectionDown.length>0){
              //set leftConnection to the last element of leftUpperRow 
              connectionLeft = leftUpperLand.connectionDown[leftUpperLand.connectionDown.length-1];
              flag=true;
            }else{
              upperLand = leftUpperLand;
            }
          }
         return connectionLeft;
       }
    //==========================================
    function islands(testArr){
       if(!testArr|| testArr.length==0){
        return [];
      }

     var islands =[];

 
    //place lands in rows
    var landRows = [];
    var flagEmpty=true;
    for(var i =0;i<testArr.length;i++){
      //landRows[i] =[];
      landRows[i] = getRowOfLands(i,testArr[i]);
      if(landRows[i] && landRows[i].length>0){
        flagEmpty =false;
        //break in calculation connections
      }else{
        //calculation connections
      }
    }
    if (flagEmpty){
      return [];
    }
 
    console.log(printRowLands(landRows));
    if (landRows && landRows.length > 1) {

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
            if (areConnected(lowerRow[r].land, upperRow[p].land)) {
                  upperRow[p].connectionDown[f] = r;
              f++;
              //        console.log(printArr1(landRows[e-1][p].land));
              //           console.log(printArr1(landRows[e][r].land));
              //          console.log("land [" + (e-1) +"," + p +"] is connected to land [" + e + "," + r + "]"  );
            }
          }
        }
      }

 
 //      console.log("LANDROWS: " + printRowLands(landRows));
  
      //merging islands ****change to array of connections
      for (var e = 0; e < landRows.length; e++) {
        for (var f = landRows[e].length - 1; f >= 0; f--) {
          //  console.log("upperLand:"+"["+e + ","+f + "]");
          var upperLand = landRows[e][f];
          if(e==5 || e==6){
 //         console.log(" -------------!!! upper land: !!!------------ " );
   //        console.log(" !!! upper land: [ " +e + ","+f + "]:" + printSingleRowLand(upperLand));
         }
          var connectionLeft = upperLand.connectionLeft;
          if (connectionLeft > -1) {
            //loop through islands  in a row and merge connected to the left 
   //               console.log(e,f,connectionLeft);
                var leftUpperLand = landRows[e][connectionLeft];
     //               console.log("left Upper land [ " +e + ","+connectionLeft + "]: "  +printSingleRowLand(leftUpperLand));
       //            console.log(" + right land [ " +e + ","+f + "]: "  + printSingleRowLand(upperLand));
 
          
            leftUpperLand.land = leftUpperLand.land.concat(landRows[e][f].land);
            leftUpperLand.connectionDown = arrayUnique(leftUpperLand.connectionDown, upperLand.connectionDown);
       
         //         console.log("merged leftUpperLand [ " +e + ","+connectionLeft + "]: "+ printSingleRowLand(leftUpperLand));
          
            //        console.log("merged upperLand:"+"["+e + ","+f + "]" + "and [" +e +"," + connectionLeft +"]");
            //           console.log("new connectionDown"+printArr1(leftUpperLand.connectionDown));
            deleteLand(landRows, e, f);

          } else if (upperLand.connectionDown.length > 0) {
            //loop through islands  in a row and merge connected to the lower row into lower row
           
           var connectionLeft0 =  upperLand.connectionDown[0];
            for (var a = upperLand.connectionDown.length - 1; a > 0; a--) {
              var connectionDown = upperLand.connectionDown[a];
              var connectionLeftNew;
              var lowerLand =landRows[e + 1][connectionDown];
            //    lowerLand.connectionLeft = connectionLeft0;
             
                 if(a>0){
                      // for all lowerLands og this upperLand set their left connections to the next left
                    connectionLeftNew =  upperLand.connectionDown[a-1];
                }else{
                
                      //for the first connectionDown 
                      //connect it to the the next existing connectionDown in left chain upper lands
                     connectionLeftNew =  getNextLeftConnection(upperRow,lowerLand,upperLand);
                    
                  }
                 lowerLand.connectionLeft  =connectionLeftNew;
          }
               //console.log("before:" +printArr1(landRows[e][f].land) + "+" +printArr1(landRows[e+1][connectionLeft0].land));
            landRows[e + 1][connectionLeft0].land = landRows[e][f].land.concat(landRows[e + 1][connectionLeft0].land);
            //  console.log("after:" +printArr1(landRows[e+1][connectionLeft0].land));
            deleteLand(landRows, e, f);

          }

        }
      }
     
   } 
  //      islands =getIslands(landRows);

  return landRows;
}    