 
    //2-dimentional functionality
     function areConnected(arr1, upperLand) {
      var flag = false;
      if (arr1 != [] && upperLand != []) {
        // loop through  elements and compare index j to index j in upperLand
          var y = 0;
          while (!flag && y < upperLand.length) {
           var x = 0;
        while (!flag && x < arr1.length) {
         if (arr1[x]== upperLand[y]) {
              flag = true;
            }
            x++;
          }
          y++;

        }
      }

      return flag;
    }
     function areConnectedNew(lowerLand, upperLand) {
      var flag = false;
      if (lowerLand != [] && upperLand != []) {
     
        var lowerFirst=lowerLand[0]; 
        var lowerLast=lowerLand[lowerLand.length-1]; 
        var upperFirst=upperLand[0]; 
        var upperLast=upperLand[upperLand.length-1]; 
        if(lowerFirst<=upperFirst && lowerLast>=upperFirst
            || lowerFirst<=upperLast && lowerLast>=upperLast
            || lowerFirst>=upperFirst && lowerLast<=upperLast){
              flag= true;
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
       upperRow.splice(f,1);
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
      var nextUpperLandFlag=true;
      var p=0;
      while( p < upperRow.length){
        nextUpperLandFlag=false;
          var f = 0;
          var r=0;
        while(!nextUpperLandFlag && r < lowerRow.length){
            if( lowerRow[r].land[0] <= upperRow[p].land[upperRow[p].land.length-1]){
              if(lowerRow[r].land[lowerRow[r].land.length-1] >= upperRow[p].land[0]){
                 if ( areConnected(lowerRow[r].land, upperRow[p].land)) {
                      upperRow[p].connectionDown[f] = r;
                  f++;
                  //        console.log(printArr1(landRows[e-1][p].land));
                  //           console.log(printArr1(landRows[e][r].land));
                  //          console.log("land [" + (e-1) +"," + p +"] is connected to land [" + e + "," + r + "]"  );
                }
              }// nextLowerLand
               r++;
            
            }else{ //drop skimming lower land for this upper land and take a new upperLand
              nextUpperLandFlag=true;
            }
          } 
          p++;    
        }
        return upperRow;
     }

  function mergeLeft(row,f){
    var land = row[f];
    var connectionLeft = land.connectionLeft;
    var leftLand = row[connectionLeft];
      leftLand.land = leftLand.land.concat(land.land);
      leftLand.connectionDown = arrayUnique(leftLand.connectionDown, land.connectionDown);
      row =  deleteLandNew(row, f);
    return row;
  }

 function  mergeLeftConnections(row){
   for (var f = row.length - 1; f >= 0; f--) {
      var land = row[f];
      var connectionLeft = land.connectionLeft;
      if (connectionLeft > -1) {
        //loop through islands  in a row and merge connected to the left 
    //    row =mergeLeft(row,f);
   //     var land = row[f];
    var connectionLeft = land.connectionLeft;
      var leftLand = row[connectionLeft];
   //   leftLand.land = leftLand.land.concat(land.land);
      leftLand.connectionDown = arrayUnique(leftLand.connectionDown, land.connectionDown);
 //     row =  deleteLandNew(row, f);
    }
   }
  return row;
 }
 function  mergeLeftLand(row){
   for (var f = row.length - 1; f >= 0; f--) {
      var land = row[f];
      var connectionLeft = land.connectionLeft;
      if (connectionLeft > -1) {
        //loop through islands  in a row and merge connected to the left 
    //    row =mergeLeft(row,f);
   //     var land = row[f];
    var connectionLeft = land.connectionLeft;
      var leftLand = row[connectionLeft];
      leftLand.land = leftLand.land.concat(land.land);
   //   leftLand.connectionDown = arrayUnique(leftLand.connectionDown, land.connectionDown);
      row =  deleteLandNew(row, f);
    }
   }
  return row;
 }
  function  mergeLeftCover(row){
   for (var f = row.length - 1; f >= 0; f--) {
      var land = row[f];
      var connectionLeft = land.connectionLeft;
      if (connectionLeft > -1) {
        //loop through islands  in a row and merge connected to the left 
    //    row =mergeLeft(row,f);
   //     var land = row[f];
    var connectionLeft = land.connectionLeft;
      var leftLand = row[connectionLeft];
      leftLand.land = leftLand.land.concat(land.land);
     leftLand.connectionDown = arrayUnique(leftLand.connectionDown, land.connectionDown);
      row =  deleteLandNew(row, f);
    }
   }
  return row;
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
 //     lowerRow[connectionLeft0].land = upperLand.land.concat(lowerRow[connectionLeft0].land);
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
function countCompletedConnectedIslands(row){
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
    //    upperRow = mergeLeftCover(upperRow);

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
          // lowerRow = mergeLeftConnections(lowerRow);
            lowerRow = mergeLeftCover(lowerRow);

          }else{//---empty lower row--- 
             flagEmptyRow =true;
          }
        }
        // 
        //count completed islands - without connectionDown 
     //       upperRow = mergeLeftLand(upperRow);
     //   count+=countCompletedIslands(upperRow);     
        count+=upperRow.length;     
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