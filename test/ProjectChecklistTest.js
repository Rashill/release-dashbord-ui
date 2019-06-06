describe('Project Checklist tests', function()
		{

           it('add checklist1',function(){
		
        	   browser.get('http://localhost:4200/').then(function()
    	    		
  	    		{
        		   
                  	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/checklist').then(function(){
        			   
        			   browser.sleep(3000);
        		   })
        		   
  	    		})
        			   
       				element(by.css("button[class='btn btn-primary px-4 mb-3 mr-1 ng-star-inserted']")).click();
       				
					element(by.id("name")).sendKeys("TSR").then(function(){
    					
    					
        				browser.sleep(3000);

    				})

					element(by.id("description")).sendKeys("Hello").then(function(){
    					
    					
        				browser.sleep(3000);

    				})

    				element(by.css("button[class='btn btn-primary']")).click().then(function(){
    					
    					
        				browser.sleep(3000);

    				})
    		
  	    		
           })
           
           
           it('add checklist2',function(){
       		
        	   browser.get('http://localhost:4200/').then(function()
    	    		
  	    		{
        		   
                  	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/checklist').then(function(){
        			   
        			   browser.sleep(3000);
        		   })
        		   
  	    		})
        			   
       				element(by.css("button[class='btn btn-primary px-4 mb-3 mr-1 ng-star-inserted']")).click();
       				
					element(by.id("name")).sendKeys("TSR2").then(function(){
    					
    					
        				browser.sleep(3000);

    				})

					element(by.id("description")).sendKeys("Hello").then(function(){
    					
    					
        				browser.sleep(3000);

    				})

    				element(by.css("button[class='btn btn-primary']")).click().then(function(){
    					
    					
        				browser.sleep(3000);

    				})
    		
  	    		
           })
           
           it('add checklist3',function(){
       		
        	   browser.get('http://localhost:4200/').then(function()
    	    		
  	    		{
        		   
                  	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/checklist').then(function(){
        			   
        			   browser.sleep(3000);
        		   })
        		   
  	    		})
        			   
       				element(by.css("button[class='btn btn-primary px-4 mb-3 mr-1 ng-star-inserted']")).click();
       				
					element(by.id("name")).sendKeys("TIP").then(function(){
    					
    					
        				browser.sleep(3000);

    				})

					element(by.id("description")).sendKeys("Hello").then(function(){
    					
    					
        				browser.sleep(3000);

    				})

    				element(by.css("button[class='btn btn-primary']")).click().then(function(){
    					
    					
        				browser.sleep(3000);

    				})
    		
  	    		
           })
           
           it('add checklist4',function(){
       		
        	   browser.get('http://localhost:4200/').then(function()
    	    		
  	    		{
        		   
                  	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/checklist').then(function(){
        			   
        			   browser.sleep(3000);
        		   })
        		   
  	    		})
        			   
       				element(by.css("button[class='btn btn-primary px-4 mb-3 mr-1 ng-star-inserted']")).click();
       				
					element(by.id("name")).sendKeys("PVT").then(function(){
    					
    					
        				browser.sleep(3000);

    				})

					element(by.id("description")).sendKeys("Hello").then(function(){
    					
    					
        				browser.sleep(3000);

    				})

    				element(by.css("button[class='btn btn-primary']")).click().then(function(){
    					
    					
        				browser.sleep(3000);

    				})
    		
  	    		
           })
           
           it('edit checklist',function(){
       		
        	   browser.get('http://localhost:4200/').then(function()
    	    		
  	    		{
        		   
                  	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/checklist').then(function(){
        			   
        			   browser.sleep(3000);
        			   

        		   })
  	    		})
  	    		
  	    		
        			   element.all(by.css("i[class='ngx-form-icon']")).get(1).click();

        			   
       				element.all(by.css("button[class='btn btn-primary px-4 mb-3 mr-1 ng-star-inserted']")).get(1).click().then(function(){
         				
         				
         				browser.sleep(3000);
         			});
       				
       				element(by.id("name")).clear();
       				
       				element(by.id("name")).sendKeys("TIP2").then(function(){
         				
         				
         				browser.sleep(2000);
         			});

       				
       				element(by.id("description")).clear();
       				
       				element(by.id("description")).sendKeys("NEW").then(function(){
         				
         				
         				browser.sleep(2000);
         			});

       		
           })
           it('delete checklist',function(){
       		
        	   browser.get('http://localhost:4200/').then(function()
    	    		
  	    		{
        		   
                  	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/checklist').then(function(){
        			   
        			   browser.sleep(3000);
        		   })
        		   
  	    		})
        			   
        			   element.all(by.css("i[class='ngx-form-icon']")).get(1).click();

        			   
       				element.all(by.css("button[class='btn btn-warning px-4 mb-3 mr-5 ng-star-inserted']")).click().then(function(){
         			   
         			   browser.sleep(3000);
         		   })
       				


    				element(by.css("button[class='btn btn-primary']")).click().then(function(){
         			   
         			   browser.sleep(3000);
         		   })
    				
        		
  	    		})
  	    	
           
		})