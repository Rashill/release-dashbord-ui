describe('Download', function()
		{

           it('download release notes and pdf file',function(){
        	   

        	   browser.get('http://localhost:4200/').then(function()
       	    		
         	    		{
               		   
                	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");
        		   
                	 browser.get('http://localhost:4200/').then(function(){
               		   
                 		browser.sleep(1000);

              		   
              	   })
               

         	    		})
         	    		
         	    		element(by.css("i[class='fa fa-chevron-right fa-4x']")).click().then(function(){ 
            				
            				
            				browser.sleep(3000);
            			})
              		 
            			browser.ignoreSynchronization = true

         	    		element.all(by.css("div[class='cal-cell-top ng-star-inserted']")).get(30).click().then(function(){ 
            				
            				
            				browser.sleep(3000);
            			})
            			
            			browser.ignoreSynchronization = true

            			
            			element(by.css("span[class='cal-event-title ng-star-inserted']")).click().then(function(){ 
            				
            				
            				browser.sleep(3000);
            			})
            			// release notes
            			
            			
            			element(by.css("button[class='btn-primary btn-sm pull-right mr-3']")).click().then(function(){ 
            				
            				
            				browser.sleep(5000);
            			})
         	    		
            			element(by.css("button[class='btn-primary btn-sm pull-right']")).click().then(function(){ 
            				
            				
            				browser.sleep(5000);
            			})
         	    		
         	    		
           },120000);
           
		})