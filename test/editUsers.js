describe('Project User Test', function()
		{

           it('edit users ',function(){
		
        	   browser.get('http://localhost:4200/').then(function()
    	    		
  	    		{
        		   
                 	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/user').then(function(){
        			   
        			   browser.sleep(3000);
        			   

        		   })
  	    		})
        			   element.all(by.css("i[class='ngx-form-icon']")).get(1).click().then(function(){
            			   
            			   browser.sleep(2000);
            			   
        			   })
            			   
            			   element(by.css("button[class='btn btn-primary px-4 mb-3 mr-1 ng-star-inserted']")).click().then(function(){
                			   
                			   browser.sleep(2000);
                			   
            			   })
            			   
            			
            		
            		   element(by.css("select[class='form-control ng-untouched ng-pristine ng-valid ng-star-inserted']")).click().then(function(){
            			   
            			   browser.sleep(2000);
            			   
        			   })
        	   			
        	   			

        	   			element.all(by.css("option[class='ng-star-inserted']")).last().click().then(function(){
             			   
             			   browser.sleep(2000);
             			   
         			   })


         			   
         			  element(by.css("button[class='btn btn-primary']")).click().then(function(){
         	   			   
           			   browser.sleep(2000);
       			})

  })
			
  	    		
           })
           
		