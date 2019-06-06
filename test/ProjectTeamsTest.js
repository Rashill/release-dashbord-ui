describe('Project Teams Test', function()
		{

           it('add team1 ',function(){

        	   browser.get('http://localhost:4200').then(function()
    	    		
  	    		{
               	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/team').then(function(){
        			   
        			   browser.sleep(1000);
        			   
        		   })
        			   
  	    		})
       				element(by.id("add-row-button")).click();
       				
     				
     	    			element(by.name("jiraProjectId")).click().then(function(){
             			   
             			   browser.sleep(1000);
             			   
             		   })

	    				
    	   			element.all(by.css("option[class='ng-star-inserted']")).get(1).click().then(function(){
           	   			browser.sleep(1000);
           	   			
    	   			})

    	   				
    	   			element.all(by.css("option[class='ng-star-inserted']")).get(0).click().then(function(){
           	   			browser.sleep(1000);
           	   			
    	   			})
  	    		
			element(by.name("email")).sendKeys("gitanshvachher@gmail.com");
				
				element(by.css("button[class='btn btn-primary']")).click().then(function(){
					
					
					browser.sleep(5000);
  	    		})

  	    		//expect(element(by.css("button[class='btn btn-info']")).isDisplayed()).toBe(false);

  	    	
       
           })
	
           
           
           it('add team2 ',function(){

        	   browser.get('http://localhost:4200').then(function()
    	    		
  	    		{
               	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/team').then(function(){
        			   
        			   browser.sleep(1000);
        			   
        		   })
        			   
  	    		})
       				element(by.id("add-row-button")).click();
       				
     				
     	    			element(by.name("jiraProjectId")).click().then(function(){
             			   
             			   browser.sleep(1000);
             			   
             		   })

	    				
    	   			element.all(by.css("option[class='ng-star-inserted']")).get(1).click().then(function(){
           	   			browser.sleep(1000);
           	   			
    	   			})

    	   			
  	    		
			element(by.name("email")).sendKeys("gitanshvachher95@gmail.com");
				
				element(by.css("button[class='btn btn-primary']")).click().then(function(){
					
					
					browser.sleep(5000);
  	    		})

  	    		//expect(element(by.css("button[class='btn btn-info']")).isDisplayed()).toBe(false);

  	    	
           })
           
           
           
           it('add team3 ',function(){

        	   browser.get('http://localhost:4200').then(function()
    	    		
  	    		{
               	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/team').then(function(){
        			   
        			   browser.sleep(1000);
        			   
        		   })
        			   
  	    		})
       				element(by.id("add-row-button")).click();
       				
     				
     	    			element(by.name("jiraProjectId")).click().then(function(){
             			   
             			   browser.sleep(1000);
             			   
             		   })
             		   
             		   element.all(by.css("option[class='ng-star-inserted']")).get(1).click().then(function(){
             			   
           	   			browser.sleep(1000);
           	   			
    	   			})
	    				
    	   			element.all(by.css("option[class='ng-star-inserted']")).get(2).click().then(function(){
           	   			browser.sleep(1000);
           	   			
    	   			})

    	   			
  	    		
			element(by.name("email")).sendKeys("s3672912@student.rmit.edu.au");
				
				element(by.css("button[class='btn btn-primary']")).click().then(function(){
					
					
					browser.sleep(5000);
  	    		})

  	    		//expect(element(by.css("button[class='btn btn-info']")).isDisplayed()).toBe(false);

  	    	
           })
           
           it('add team4 ',function(){

        	   browser.get('http://localhost:4200').then(function()
    	    		
  	    		{
               	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/team').then(function(){
        			   
        			   browser.sleep(1000);
        			   
        		   })
        			   
  	    		})
       				element(by.id("add-row-button")).click();
       				
     				
     	    			element(by.name("jiraProjectId")).click().then(function(){
             			   
             			   browser.sleep(1000);
             			   
             		   })

	    				
    	   			element.all(by.css("option[class='ng-star-inserted']")).get(3).click().then(function(){
           	   			browser.sleep(1000);
           	   			
    	   			})

    	   			
  	    		
			element(by.name("email")).sendKeys("abhinaykathuria@gmail.com");
				
				element(by.css("button[class='btn btn-primary']")).click().then(function(){
					
					
					browser.sleep(5000);
  	    		})

  	    		//expect(element(by.css("button[class='btn btn-info']")).isDisplayed()).toBe(false);

  	    	
           })
           
           
           it('add team5 ',function(){

        	   browser.get('http://localhost:4200').then(function()
    	    		
  	    		{
               	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/team').then(function(){
        			   
        			   browser.sleep(1000);
        			   
        		   })
        			   
  	    		})
       				element(by.id("add-row-button")).click();
       				
     				
     	    			element(by.name("jiraProjectId")).click().then(function(){
             			   
             			   browser.sleep(1000);
             			   
             		   })

	    				
    	   			element.all(by.css("option[class='ng-star-inserted']")).get(4).click().then(function(){
           	   			browser.sleep(1000);
           	   			
    	   			})

    	   			
  	    		
			element(by.name("email")).sendKeys("isswarrajgopee@gmail.com");
				
				element(by.css("button[class='btn btn-primary']")).click().then(function(){
					
					
					browser.sleep(5000);
  	    		})

  	    		//expect(element(by.css("button[class='btn btn-info']")).isDisplayed()).toBe(false);

  	    	
           })
           
           
           
           it('edit team 2',function(){

        	   browser.get('http://localhost:4200').then(function()
    	    		
  	    		{
               	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

        		   browser.get('http://localhost:4200/team').then(function(){
        			   
        			   browser.sleep(1000);
        			   
        		   })
  	    		})
        			   
        			  
        			   element.all(by.css("i[class='ngx-form-icon']")).get(1).click().then(function(){
        				   
        				   
           				browser.sleep(2000);

        			   })
        			   
        			   

        						
       				element.all(by.css("button[class='btn btn-primary px-4 mb-3 mr-1 ng-star-inserted']")).get(1).click().then(function(){
       					
        				browser.sleep(2000);

       					
       				})
       				
       				element(by.name("jiraProjectId")).click();

	    
    	   			element.all(by.css("option[class='ng-star-inserted']")).get(5).click().then(function(){
           	   			browser.sleep(1000);

    	   			})
    	   			
    	   			    element(by.id("email")).clear();

        			    
						element(by.id("email")).sendKeys("gitanshvachher@gmail.com");
        						
        				element(by.css("button[class='btn btn-primary']")).click().then(function(){
        					
            				browser.sleep(2000);

        					
        				})

        		
  	    		})
  	    		
  	    		
  	    		
  	    		it('delete teams',function(){
  	    			
  	        	   browser.get('http://localhost:4200/').then(function()
  	    	    		
  	  	    		{
  	        		   
  	                  	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

  	        		   browser.get('http://localhost:4200/team').then(function(){
  	        			   
  	        			   browser.sleep(2000);
  	        		   })
  	        		   
  	  	    		})
  	        			  
  	        			   element.all(by.css("i[class='ngx-form-icon']")).last().click().then(function(){
  	            			   
  	            			   browser.sleep(2000);
  	            		   })
  	        			   

  	        						
  	        				element(by.css("button[class='btn btn-warning px-4 mb-3 mr-5 ng-star-inserted']")).click();
  	        				
  	        				element(by.css("button[class='btn btn-primary']")).click().then(function(){
  	             			   
  	             			   browser.sleep(2000);
  	             		   })


  	  	    		
  	           })
  	           
  	        
  	    		it('add duplicate team',function(){
  	    			
  	        	   browser.get('http://localhost:4200/').then(function()
  	    	    		
  	  	    		{
  	        		   
  	                  	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");

  	        		   browser.get('http://localhost:4200/team').then(function(){
  	        			   
  	        			   browser.sleep(2000);
  	        		   })
  	        		   
  	  	    		})
         				element(by.id("add-row-button")).click();
         				
       				
       	    			element(by.name("jiraProjectId")).click().then(function(){
               			   
               			   browser.sleep(1000);
               			   
               		   })

  	    				
      	   			element.all(by.css("option[class='ng-star-inserted']")).get(3).click().then(function(){
             	   			browser.sleep(1000);
             	   			
      	   			})

      	   			
    	    		
  			element(by.name("email")).sendKeys("abhinaykathuria@gmail.com");
  				
  				element(by.css("button[class='btn btn-primary']")).click().then(function(){
  					
  					
  					browser.sleep(1000);
    	    		})

    	    		expect(element(by.css("button[class='btn btn-info']")).isDisplayed()).toBe(true);

    	    	
             },120000);
             
           
		
		})
		
		
		
		    