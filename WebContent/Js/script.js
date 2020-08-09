var details = function(movieName,movieGross,movieStatus,movieDate,movieGenre,hasTeaser) {            
    this.movieName = movieName;
    this.movieGross = movieGross;
    this.movieStatus = movieStatus;
    this.movieDate = movieDate;
    this.movieGenre = movieGenre;
    this.hasTeaser = hasTeaser;
 }

var movieDetails = [
     {movieName: 'Avatar', movieGross: '$2,45,677,456', movieStatus: 'Yes', 
     movieDate: '15/03/2017', movieGenre: 'Science Fiction', hasTeaser: 'Yes' },
     {movieName: 'The Avengers', movieGross: '$1,23,345,456', movieStatus: 'Yes', 
     movieDate: '23/12/2017', movieGenre: 'SuperHero', hasTeaser: 'No' },
     {movieName: 'Rajneethi', movieGross: '$2,34,456,567', movieStatus: 'Yes', 
     movieDate: '21/08/2017', movieGenre: 'Politics', hasTeaser: 'No' },
     {movieName: 'StrangerThings', movieGross: '$4,45,567,678', movieStatus: 'No', 
     movieDate: '02/07/2017', movieGenre: 'Fiction', hasTeaser: 'Yes' },
     {movieName: 'M.S.Dhoni', movieGross: '$5,56,678,780', movieStatus: 'Yes', 
     movieDate: '02/11/2022', movieGenre: 'Autobiography', hasTeaser: 'Yes' }
   ]
   var favorite=[];

   function nameInvalid(textbox) { 
  
    if (textbox.value === '') { 
        textbox.setCustomValidity 
              ('Entering the Movie name is necessary'); 
    } 
    else if (textbox.validity.patternMismatch) { 
        textbox.setCustomValidity 
              ('Movie name should contain only text'); 
    } 
    else { 
        textbox.setCustomValidity(''); 
    } 

    return true; 
  } 

function grossInvalid(textbox) { 
    if (textbox.value === '$.') { 
        textbox.setCustomValidity 
              ('Entering the Gross is necessary'); 
    } 
    else { 
        textbox.setCustomValidity(''); 
    } 
    return true; 
  }


function dateInvalid(textbox) { 
    if (textbox.value === '') { 
        textbox.setCustomValidity 
        ('Entering the DateofLaunch is necessary'); 
    } 
    else { 
        textbox.setCustomValidity(''); 
    } 
      return true; 
  }


  function autoFill() {
    var autoData = JSON.parse(sessionStorage.getItem("auto"));
    console.log(autoData);
    if(autoData != null) {
                        var autoDate = autoData[0].movieDate.match(/\d+/g),
                        year = autoDate[2], month = autoDate[1], day = autoDate[0];
                        var autoShortDate = year + '-' + month + '-' + day;
                        console.log(autoData[0].movieGenre);
                        document.getElementById("title").value = autoData[0].movieName;
                        document.getElementById("gross").value = autoData[0].movieGross;
                        if(autoData[0].movieStatus == 'Yes') {
                           document.getElementById("active1").checked = true;
                        }
                        else if(autoData[0].movieStatus == 'No') {
                            document.getElementById("active2").checked = true;
                        }
                        document.getElementById("dateOfLaunch").value = autoShortDate;
                        document.getElementById("genre").value = autoData[0].movieGenre;
                        if(autoData[0].hasTeaser == 'Yes') {
                           document.getElementById("hasTeaser").checked = true;
                        }
                        else if(autoData[0].hasTeaser == 'No') {
                            document.getElementById("hasTeaser").checked = false;
                        }
        
                      }
                    }


 function update() {  
          var autoDataUpdate = JSON.parse(sessionStorage.getItem("auto"));
          var isoDate = document.getElementById("dateOfLaunch").value;
          var datePart = isoDate.match(/\d+/g),
          year = datePart[0], month = datePart[1], day = datePart[2];
          var shortDate = day+'/'+month+'/'+year;
            console.log(datePart);
                        
          var Yes = document.getElementById("active1").checked;
          var No = document.getElementById("active2").checked;
          if(Yes) {
            status = 'Yes';
          }
         else if(No) {
           status = 'No';
          }
                        
          var details1 = new details(document.getElementById("title").value, document.getElementById("gross").value,
             status,shortDate, 
            document.getElementById("genre").value, document.getElementById("hasTeaser").checked);
            if(details1.hasTeaser) {
                   details1.hasTeaser = 'Yes';
                   }
            else {
                   details1.hasTeaser = 'No';
                 }
                 
            if(autoDataUpdate == null) {
               if(details1.movieStatus != ""){
         var storeData = JSON.parse(sessionStorage.getItem("movieDetails"));
              console.log(storeData);
              if(storeData == null) {
              movieDetails.push(details1);
              var storage = JSON.stringify(movieDetails);  
              sessionStorage.setItem("movieDetails", storage);
              }
             else {
             storeData.push(details1);
             var storage = JSON.stringify(storeData);  
             sessionStorage.setItem("movieDetails", storage);  
             }
         }
       }
             else {
             var storeData = JSON.parse(sessionStorage.getItem("movieDetails"));
             console.log(storeData);
             if(storeData == null) {
             var arrayIndex = sessionStorage.getItem("index");
             arrayIndex--;
             movieDetails.splice(arrayIndex,1,details1);
             var storage = JSON.stringify(movieDetails);  
             sessionStorage.setItem("movieDetails", storage);                
               }
             else {
             var arrayIndex = sessionStorage.getItem("index");
             arrayIndex--;
             storeData.splice(arrayIndex,1,details1);
             var storage = JSON.stringify(storeData);  
             sessionStorage.setItem("movieDetails", storage);
                }
         }
       }
                             
function addmovie() {
            var str = "Edit";
            var addedLists = JSON.parse(sessionStorage.getItem("movieDetails"));
            console.log(addedLists);
            var table = document.getElementById("movie-table");
            sessionStorage.removeItem("auto");
            var fillData = [];
            var autoFill = [];
            if(addedLists == null) {
                   var i = 0;
                   for (var movieDetail of movieDetails) {
                         fillData.push(movieDetail);
                         var fillStorage = JSON.stringify(fillData);  
                         sessionStorage.setItem("fill", fillStorage);
                         i++;
                         var row = table.insertRow(i);
                         var cell1 = row.insertCell(0);
                         var cell2 = row.insertCell(1);
                         var cell3 = row.insertCell(2);
                         var cell4 = row.insertCell(3);
                         var cell5 = row.insertCell(4);
                         var cell6 = row.insertCell(5);
                         var cell7 = row.insertCell(6);

                         cell1.innerHTML = movieDetail.movieName;
                         cell2.innerHTML = movieDetail.movieGross;
                         cell3.innerHTML = movieDetail.movieStatus;
                         cell4.innerHTML = movieDetail.movieDate;
                         cell5.innerHTML = movieDetail.movieGenre;
                         cell6.innerHTML = movieDetail.hasTeaser;
                         cell7.innerHTML = str.link("edit-movie.html");
                         cell7.onclick =  function(){    
                               var editRowId = this.parentNode.rowIndex;
                               sessionStorage.setItem("index", editRowId);
                               autoFill.push(fillData[editRowId-1]);
                               var fillAuto = JSON.stringify(autoFill); 
                               sessionStorage.setItem("auto", fillAuto);
                                }
                         }
                  }
                        
            else {
                          var i = 0;
                          for (var addedList of addedLists) {
                          fillData.push(addedList);
                          var fillStorage = JSON.stringify(fillData);  
                          sessionStorage.setItem("fill", fillStorage);
                          i++;
                          var row = table.insertRow(i);
                          var cell1 = row.insertCell(0);
                          var cell2 = row.insertCell(1);
                          var cell3 = row.insertCell(2);
                          var cell4 = row.insertCell(3);
                          var cell5 = row.insertCell(4);
                          var cell6 = row.insertCell(5);
                          var cell7 = row.insertCell(6);
                    
                          cell1.innerHTML = addedList.movieName;
                          cell2.innerHTML = addedList.movieGross;
                          cell3.innerHTML = addedList.movieStatus;
                          cell4.innerHTML = addedList.movieDate;
                          cell5.innerHTML = addedList.movieGenre;
                          cell6.innerHTML = addedList.hasTeaser;
                          cell7.innerHTML = str.link("edit-movie.html");
                          cell7.onclick =  function(){    
                               var editRowId = this.parentNode.rowIndex;
                               sessionStorage.setItem("index", editRowId);
                               autoFill.push(fillData[editRowId-1]);
                               var fillAuto = JSON.stringify(autoFill); 
                               sessionStorage.setItem("auto", fillAuto);
                               }
                            }
   }  
 }
   
 

 function customerAddFav() {
    
  var str = "Add to Favorite";
  var addedLists = JSON.parse(sessionStorage.getItem("movieDetails"));
  var favorites = JSON.parse(sessionStorage.getItem("favorite"));
  var table = document.getElementById("movie-table");
  var today = new Date(); 
  var movieList = [];
  if(addedLists == null) {
      console.log(addedLists);
      var i = 0;
      var j = -1;
  for (var movieDetail of movieDetails) {
      j++;
      var datePart = movieDetail.movieDate.match(/\d+/g),
      year = datePart[2], month = datePart[1], day = datePart[0];
      var shortDate = year + '-' + month + '-' + day;
      var myDate = new Date(shortDate);
      if(movieDetail.movieStatus=='Yes' && today > myDate ) {
              movieList.push(movieDetail);
              var movieListStorage = JSON.stringify(movieList);  
              sessionStorage.setItem("movieList", movieListStorage);
              i++;
              console.log(j);
              var row = table.insertRow(i);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
  
              cell1.innerHTML = movieDetail.movieName;
              cell2.innerHTML = movieDetail.hasTeaser;
              cell3.innerHTML = movieDetail.movieGross;
              cell4.innerHTML = movieDetail.movieGenre;
              cell5.innerHTML = str.link("movie-list-customer-notification.html");
              
              cell5.onclick =  function() {   
                                              if(favorites==null){
                                              var rowId = this.parentNode.rowIndex;
                                              favorite.push(movieList[rowId - 1]);
                                              var movieStorage = JSON.stringify(favorite);  
                                              sessionStorage.setItem("favorite", movieStorage);}
                                              else{
                                                  var rowId = this.parentNode.rowIndex;
                                                  favorites.push(movieList[rowId - 1]);
                                                  var moviesStorage = JSON.stringify(favorites);  
                                                  sessionStorage.setItem("cart", moviesStorage);
                                              }
                                          }     
} 
   }
      }
  
  else {
      
      var i = 0;
  for (var addedList of addedLists) {
      var datePart = addedList.itemDate.match(/\d+/g),
      year = datePart[2], month = datePart[1], day = datePart[0];
      var shortDate = year + '-' + month+'-' + day;
      var myDate = new Date(shortDate);
      if(addedList.movieStatus == 'Yes' && today > myDate ) {
              movieList.push(addedList);
              var movieListStorage = JSON.stringify(movieList);  
              sessionStorage.setItem("movieList", movieListStorage);
              i++;
              var row = table.insertRow(i);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
  
              cell1.innerHTML = addedList.movieName;
              cell2.innerHTML = addedList.hasTeaser;
              cell3.innerHTML = addedList.movieGross;
              cell4.innerHTML = addedList.movieGenre;
              cell5.innerHTML = str.link("movie-list-customer-notification.html");
              
              cell5.onclick =  function() {    
                                              if(favorites == null){
                                              var rowId = this.parentNode.rowIndex;
                                              cart.push(movieList[rowId - 1]);
                                              var movieStorage = JSON.stringify(favorites);  
                                              sessionStorage.setItem("cart", movieStorage);}
                                              else{
                                                  var rowId = this.parentNode.rowIndex;
                                                  favorites.push(movieList[rowId - 1]);
                                                  var moviesStorage = JSON.stringify(favorites);  
                                                  sessionStorage.setItem("favorite", moviesStorage);
                                              } 
                                          }
          } 
}
}
}



function addfav() {
  
  var str = "Delete";
  var table = document.getElementById("movie-table");
  var movieLists = JSON.parse(sessionStorage.getItem("favorite"));
  if(movieLists != null&&movieLists.length != 0){
      var i = 0;
      
      console.log(movieLists);
  for (var movieList of movieLists) {
      
              i++;
              var row = table.insertRow(i);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
  
              cell1.innerHTML = movieList.movieName;
              cell2.innerHTML = movieList.hasTeaser;
              cell3.innerHTML = movieList.movieGross;
              cell4.innerHTML = str.link("favorites-notification.html");
              
              cell4.onclick = function() {
                                              var rowId = this.parentNode.rowIndex;
                                              var index = rowId - 1;
                                              movieLists.splice(index,1);
                                              var movieStorage = JSON.stringify(movieLists); 
                                              console.log(movieStorage);
                                              sessionStorage.setItem("favorite", movieStorage);
                                          }

   }
      var total = [];
      for (var movieList of movieLists) {
              // var n = 0;
              var l = movieList.movieGross;
              var m = Number(l.substring(3));
              total.push(m);
              console.log(m);  
      }
      console.log(total);
      var sum = total.reduce(function(a, b){
      return a + b;
      }, 0);
      console.log(sum);
      var j = i + 1;
      var row = table.insertRow(j);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell2.innerHTML = 'Total Price';
      cell3.innerHTML = 'Rs.' + sum + '.00';
      }
  else{
      window.location.href = "favorites-empty.html";
  }
}




                                     



