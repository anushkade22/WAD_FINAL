function createTables(){
    var i1= document.getElementById("input1").value;
    var i2= document.getElementById("input2").value;
    console.log(i1+i2);

    var table1size= i1.split("#");
    var table2size= i2.split("#");

    var table1r= parseInt(table1size[0]);
    var table1c= parseInt(table1size[1]);
    var table1v = parseInt(table1size[2]);

    var table2r= parseInt(table2size[0]);
    var table2c= parseInt(table2size[1]);
    var table2v = parseInt(table2size[2]);

    var tables = document.getElementById("tables");
    //tables.innerHTML="";
    if(table1r==table2r && table1c==table2c && table1v==table2v){
        for(var i=0;i<3;i++){
            var table1op = createDefaultTable(table1r, table1c, table1v);
            tables.appendChild(table1op);
        }
    }
    else if(table1r==table2r && table1c==table2c){
        var table1op = createDefaultTable(table1r, table1c, table1v);
        tables.appendChild(table1op);
        var table2op = createDefaultTable(table2r, table2c, table2v);
        tables.appendChild(table2op);
        var table3op = createDefaultTable(table1r, table1c, table1v*table2v);
        tables.appendChild(table3op);
    }
    else{
        var table1op = createDefaultTable(table1r, table1c, table1v);
        tables.appendChild(table1op);
        var table2op = createDefaultTable(table2r, table2c, table2v);
        tables.appendChild(table2op);
    }
}

function createMultiplicationTable(rows, columns, digit) {
    var table = document.createElement('table');
    for (var i = 0; i < rows; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < columns; j++) {
        var cell = document.createElement('td');
        // Calculate the multiplication result
        var result = (i + 1) * (j + 1) * digit;
        // Set the cell content as the result
        cell.textContent = result;
        // Append the cell to the row
        row.appendChild(cell);
      }
  
      // Append the row to the table
      table.appendChild(row);
    }
  
    // Return the created table
    return table;
}

function createDefaultTable(rows, columns, digit) {
    var table = document.createElement('table');
    for (var i = 0; i < rows; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < columns; j++) {
        var cell = document.createElement('td');
        // Calculate the multiplication result
        var result = (i + 1) * (j + digit);
        // Set the cell content as the result
        cell.textContent = result;
        // Append the cell to the row
        row.appendChild(cell);
      }
  
      // Append the row to the table
      table.appendChild(row);
    }
  
    // Return the created table
    return table;
}
  
  // Usage example
  var table = createMultiplicationTable(5, 5, 2);
  
  // Append the table to a container element in the HTML document
  var container = document.getElementById('table-container');
  container.appendChild(table);
  