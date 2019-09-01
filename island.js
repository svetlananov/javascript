    
n=5;
m=4;

var testArr=[[0,0,1,0,1],

              [1,1,1,1,1],
 
             [0,0,0,1,1],
    
           [1,0,0,0,0]];

var coord ={i:0,
          j:0};
var k=0;
var landArr = [];

function  printArr1(land){
  var str ="";
  	  for (var f=0;f<land.length; f++){
	    str+= "["+land[f].i +"," + land[f].j +"]";

	  }
return str;
}
function printOneRawLand(arr){
  str ="";
  for(var i=0;i<arr.length; i++){
    str += "; ~ to " +arr[i].connection +" [" +printArr1(arr[i].land) + "]" ;
  }
  return str;
}
function printRawLands(arr){
	 str ="";
  for(var i=0;i<arr.length; i++){
     str += i+": " +printOneRawLand(arr[i]) +"\n" ;
  }
  return str;
}



//1 dementional islands functions

function next(i,j){
if(k>0){
  var lastCheckedIsland = landArr[k-1];
  var lastCheckedElement =lastCheckedIsland[lastCheckedIsland.length-1];
  if(lastCheckedElement.i==i && lastCheckedElement.j>j){
    j=lastCheckedElement.j
  }
}
  var nextJ = j<n-1?j+1:0;
  var nextI = nextJ==0?(i<m-1?i+1:-1):i;
  coord.j=nextJ;
  coord.i=nextI;
 
  return coord;
}

function isDone(i,j){
  if( i==-1)
     return true;
   else
     return false;
}

function isLand(i,j){

  if (testArr[i][j] == 1){
    return true;
  }else{
    return false;
  }
}

function goAlongIsland(land){
 l=0
  var i = land[l].i;
  var j = land[l].j;
  while (isLand(i,j+1)){
 l++;   
   land[l] = [];
   land[l].i=land[l-1].i;
   land[l].j = land[l-1].j+1;  
   j++;
  }
}

function getRowIsland(i,j){
  var island=[];

  var coordinates = {"i":0,"j":0};

  coordinates.i = i;

  coordinates.j = j;

  island[0] = coordinates;

  goAlongIsland(island);
 return island;

}
//2-dimentional functionality

function getRow(land){
	return land[0].i;
}

  function areConnected(arr1, arr2){
    var flag = false;
    if(arr1!=[] && arr2!=[]){
      // loop through  elements and compare index j to index j in arr2
         var x = 0;
         while(!flag  && x<arr1.length){
         	var y=0;
         	while(!flag && y<arr2.length){
             if(arr1[x].j ==arr2[y].j){
               flag =true;
             } 
             y++;
            }
            x++;
          
         }
    }
       
    return flag;
  }
function getRowLandObject(){
	var rowLand = {connection:-1,
                    land : []};
	return rowLand;
}
//find 1-dimentional lands
 while(!isDone(coord.i, coord.j)){
  if (isLand(coord.i,coord.j)){
   landArr[k] = getRowIsland(coord.i,coord.j); 
    k++;
  }
  coord = next(coord.i,coord.j);

 }

 //place lands in rows
  var landRows = [];
  var num =0;
  var currentRow =  landArr[0][0].i;
  landRows[currentRow]=[];
  landRows[currentRow][num] = getRowLandObject();
  landRows[currentRow][num].land = landArr[0];
 for (var  x = 1; x < landArr.length; x++){
   var land= landArr[x];
   var row =land[0].i;
  //firstRow
   if( row == currentRow){
     num++;
   
   }else{
   //second  and next rows
     currentRow = row;
     landRows[currentRow] =[];
      num = 0;
   }
  landRows[currentRow][num] = getRowLandObject();
  landRows[currentRow][num].land = land;
  //landRows[currentRow][num].connection = -1;
  }
 
 //glue island to lower row island if connected
//var islands =deepCopyArr(landRows);
var islands = [];


//console.log(printRawLands(landRows));
if(landRows.length>1) {

//starting from 2nd row set connection to next row island
  for(var e=1; e<landRows.length; e++){
        //loop through islands   and fill connections to next row
       
  	for (var  r=0; r<landRows[e].length;   r++){
         //for each land in the row  loop and search for connected islands from upper row
     // var removed=[];
	   for (var p=0; p < landRows[e-1].length; p++){
       //compare j indexes
       if(areConnected(landRows[e][r].land,
       	               landRows[e-1][p].land)){
           //connected upper piece is not connected to any previous lower level pieces 
            //so connected upper piece should be appended in front of this lowerlevel piece  
	         //islands[e][r] = mergeIslands(landRows[e][r], landRows[e-1][p]) ; 
	         landRows[e-1][p].connection=r;
	      }
     }   
  	}
  }
//console.log(printRawLands(landRows));
	 //merging islands
  islands[0] = new Array(landRows[0].length);
  for(var e=0; e<landRows.length-1; e++){
    islands[e +1] = new Array(landRows[e+1].length);
        //loop through islands  in a row and merge connected to the next row
    for(var f=landRows[e].length-1 ; f>=0; f--){
          	var connection = landRows[e][f].connection;
	    if(connection>-1){
	       	if(islands[e+1][connection] ){
	       		if(islands[e][f]){
                  var arr =islands[e][f].concat(islands[e+1][connection]);
	       		}else{
	       		  var arr = landRows[e][f].land.concat(islands[e+1][connection]);
	       	    }
	        }else{
	        	if(islands[e][f]){
	        	   var arr =islands[e][f].concat(landRows[e+1][connection].land);
	        	}else{
	       		   var arr =landRows[e][f].land.concat(landRows[e+1][connection].land);
	        	}
	         
	       	}
           islands[e+1][connection]=arr;
  	    }else{
             islands[e][f] =landRows[e][f].land;  
         }
    }

  }

  console.log("TEST DATA");

 for(var i=0; i<testArr.length; i++){
 	var str = "";
 	for( var j=0; j<testArr[i].length; j++){
 			str +=" " + testArr[i][j];
 	}
 	console.log(str);

 }
  console.log("Islands:");
 for(var i=0; i<islands.length; i++){
 	for( var j=0; j<islands[i].length; j++){
 		if(islands[i][j]){
 			console.log(	printArr1(islands[i][j]));
 		}
 	}

 }
}

