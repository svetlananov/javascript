 
    //2-dimentional functionality
    function areConnected(arr1, arr2) {
      var flag = false;
      if (arr1 != [] && arr2 != []) {
        // loop through  elements and compare index j to index j in arr2
        var x = 0;
        while (!flag && x < arr1.length) {
          var y = 0;
          while (!flag && y < arr2.length) {
            if (arr1[x].i-1 == arr2[y].i && arr1[x].j == arr2[y].j) {
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

    function  deleteLandNew(upperRow, f){
      upperRow[f] = null;
      return upperRow;
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

    function setConnectionDown(upperRow, lowerRow){
       for (var p = 0; p < upperRow.length; p++) {
          var f = 0;
           for (var r = 0; r < lowerRow.length; r++) {
            if (upperRow[p] && areConnected(lowerRow[r].land, upperRow[p].land)) {
                  upperRow[p].connectionDown[f] = r;
              f++;
              //        console.log(printArr1(landRows[e-1][p].land));
              //           console.log(printArr1(landRows[e][r].land));
              //          console.log("land [" + (e-1) +"," + p +"] is connected to land [" + e + "," + r + "]"  );
            }
          }
        }
        return upperRow;
    }

  function mergeLeft(upperRow,f){
    var upperLand = upperRow[f];
    var connectionLeft = upperLand.connectionLeft;
    var leftUpperLand = upperRow[connectionLeft];
      leftUpperLand.land = leftUpperLand.land.concat(upperLand.land);
      leftUpperLand.connectionDown = arrayUnique(leftUpperLand.connectionDown, upperLand.connectionDown);
      upperRow =  deleteLandNew(upperRow, f);
    return upperRow;
  }

 function  mergeLeftCover(upperRow){
   for (var f = upperRow.length - 1; f >= 0; f--) {
      var upperLand = upperRow[f];
      var connectionLeft = upperLand.connectionLeft;
      if (connectionLeft > -1) {
        //loop through islands  in a row and merge connected to the left 
        upperRow =mergeLeft(upperRow,f);
      }
   }
  return upperRow;
 }
 
 function  mergeDownCover(rows){
  
    for (var f = rows.upperRow.length - 1; f >= 0; f--) {
     var upperLand = rows.upperRow[f];
        if (upperLand && upperLand.connectionDown.length > 0) {
              //loop through islands  in a row and merge connected to the lower row into lower row
              rows =mergeDown(rows.upperRow, rows.lowerRow,f);
      }
   }
      return rows;
 
 }
  function mergeDown(upperRow, lowerRow,f){
    //loop through islands  in a row and merge connected to the lower row into lower row
    var upperLand = upperRow[f];
    var connectionLeft0 =  upperLand.connectionDown[0];
    for (var a = upperLand.connectionDown.length - 1; a > 0; a--) {
      var connectionDown = upperLand.connectionDown[a];
      var connectionLeftNew;
      var lowerLand =lowerRow[connectionDown];
      if(a>0){// for all connectionDown of this upperLand set their left connections to the next left
        connectionLeftNew =  upperLand.connectionDown[a-1];
      }else{//for the first connectionDown 
              //connect it to the the next existing connectionDown in left chain upper lands
        connectionLeftNew =  getNextLeftConnection(upperRow,lowerLand,upperLand);
      }
      lowerLand.connectionLeft  =connectionLeftNew;
     }
 //     console.log("before:" +printArr1(upperLand.land) + "+" +printArr1(lowerRow[connectionLeft0].land));
      lowerRow[connectionLeft0].land = upperLand.land.concat(lowerRow[connectionLeft0].land);
   //   console.log("after:" +printArr1(lowerRow[connectionLeft0].land));
      upperRow =  deleteLandNew(upperRow, f);
    //              console.log( "====222==== "); 
    //         console.log(" upper" +printOneRowLand(upperRow) );
    //          console.log( "lower " +printOneRowLand(lowerRow) );
    
      return {"upperRow":upperRow,"lowerRow":lowerRow };
  }

function countCompletedIslands(row){
  var count = 0;
  if(row){
    for (var j=0; j<row.length; j++){
      if(row[j] && row[j].connectionDown.length==0){
        count++;
      }
    }
  }
  return count;
}
    //================== islands =================
function islands(testArr){
  var count=0;
  if(!testArr|| testArr.length==0){
    return 0;
  }
 
  //**  var landRows = [];
  var flagEmpty=true;
  var flagEmptyRow =false;
  var lowerRow=[];
  var upperRow=[];
  for(var i =0;i<testArr.length;i++){
    if(!flagEmptyRow ){
     //**   landRows[i] = getRowOfLands(i,testArr[i]);
      if(lowerRow && lowerRow.length>0){
        upperRow =lowerRow;
      }else{
        upperRow=getRowOfLands(i,testArr[i]);
      }
      lowerRow=[];
      if(upperRow && upperRow.length>0){//---not empty row
        flagEmpty =false;
           //mergeLeft/
        upperRow = mergeLeftCover(upperRow);

        if(i<testArr.length-1){//--not the last row 
           //check if next row is not empty
            lowerRow = getRowOfLands(i+1,testArr[i+1]);
      //             console.log( "==000====== "); 
      //       console.log(" upper" +printOneRowLand(upperRow) );
      //        console.log( "lower " +printOneRowLand(lowerRow) );
          if(lowerRow && lowerRow.length>0){//---good pair of rows
            //calculation connections to lowerRow (i)->(i+1)
            upperRow =setConnectionDown(upperRow,lowerRow );
        //               console.log( "====111==== "); 
        //     console.log(" upper" +printOneRowLand(upperRow) );
        //      console.log( "lower " +printOneRowLand(lowerRow) );
    
            //mergeDown upperRow and setLeftConnection for lowerRow
            //calculate left connections for lowerRow
            var  rows=mergeDownCover({"upperRow":upperRow,"lowerRow":lowerRow});
            upperRow = rows.upperRow;
            lowerRow = rows.lowerRow;
          }else{//---empty lower row--- 
             flagEmptyRow =true;
          }
        }
        // 
        //count completed islands - without connectionDown 
        count+=countCompletedIslands(upperRow);     
     //        console.log( "count = " +count ); 
     //        console.log(" upper" +printOneRowLand(upperRow) );
      //        console.log( "lower " +printOneRowLand(lowerRow) );
    
      }
    }else{ //---empty upper row---(in previous iteration lowerRow was empty, so skipping this iteration)
          //skip the row and search for the next pair of eligible for connection search rows
      flagEmptyRow =false;
    }   
      //**landRows[i]=upperRow;
   
  }
  if (flagEmpty){
    return 0;
  }

   //** */ console.log(" new LANDROWS: " +printRowLands(landRows));
 // return landRows;
  return count;
}    