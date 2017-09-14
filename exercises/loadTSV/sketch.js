            // p5 calls setup() exactly once when the canvas loads
            function setup() {
                createCanvas(displayWidth, displayHeight);
                loadTable('groceries.tsv', 'tsv', 'header', showData); //call file, then showData is a callback.
                // frameRate(5);
                // noLoop();
                }

        function showData(data) {
            var count = data.getRowCount(); // find how many rows
            console.log(count);
        
        for (var i = 0; i<count; i++) {
                var amount = data.getString(i,0); // getString wants (row and column)
                var unit = data.getString(i,1); // getString wants (row and column);
                var item = data.getString(i,2); // getString wants (row and column)
                var source = data.getString(i,3); // getString wants (row and column)
            
            if (source == 'store') {
                fill('darkgray'); //is text color
            } else {
                fill(255, 120, 0);
            }
            //no need for curly brackots    
            
            text(amount + ' |||| ' + unit + ' |||| ' + item + ' |||| ' + source, width/2, 30*(i+1)); 
            //puts text on the screen. in referece, in brackets means optional.
            // width means centered.
        };
            
        }