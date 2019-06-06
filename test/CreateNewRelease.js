describe('Create New Release', function()
		{

           it('new realease',function(){
        	   

        	   browser.get('http://localhost:4200/').then(function()
       	    		
         	    		{
               		   
                 	browser.executeScript("window.localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2Q0ZTJiNzMwMjA2NDM0MTRhMDJjZjEiLCJhY2Nlc3NfdG9rZW4iOiI2bWhCSXFHcVh2R0IzNTZiTG9MeWdQWkpvWmU1Y3JrbyIsImlhdCI6MTU1NzQ1NTU1Mn0.ka1BckEMR3R19l2zMt9YInDskvfp7h9q7u8y8cEjpOs');");
        		   
                     	   browser.get('http://localhost:4200/release/create').then(function(){
                     		   
                        		browser.sleep(1000);

                     		   
                     	   })
                     	   
         	    		})
         	    		
         	    		 element(by.css("[formcontrolname='name']")).sendKeys("JulyOOC30July1").then(function(){
               				
               				
               				browser.sleep(1000);
               			});

        	   
        	   element(by.cssContainingText("[id='releaseType'] option","OOC")).click().then(function(){
     				
     				
     				browser.sleep(1000);
     			});
        	   

        	   element(by.css("[formcontrolname='description']")).sendKeys("JULYOOC").then(function(){
      				
      				
      				browser.sleep(1000);
      			});

        	   element(by.css("[formcontrolname='releaseDate']")).sendKeys("30/07/2019").then(function(){
     				
     				
     				browser.sleep(1000);
     			});

        	  
          		   element(by.css("button[class='btn btn-info float-right']")).click().then(function(){ 
        				
        				// NEXT BUTTON FOR PAGE 2
        				browser.sleep(1000);
        			}); 

          		   
          		   
          		   
          		   
          		   // PAGE 2
          		   
          		 element(by.css("[formcontrolname='startDate']")).sendKeys("10/06/2019").then(function(){
      				
      				
      				browser.sleep(1000);
      			});
          	
                   	 
          		 element(by.css("[formcontrolname='devFinishDate']")).sendKeys("20/06/2019").then(function(){
      				
      				
      				browser.sleep(1000);
      			});      	
      	
          		 element(by.css("[formcontrolname='refreshDate']")).sendKeys("25/06/2019").then(function(){
      				
      				
      				browser.sleep(1000);
      			}); 
                         	

        		   element(by.css("button[class='btn btn-info float-right']")).click().then(function(){ 
      				
      				// NEXT BUTTON FOR PAGE 3
      				browser.sleep(1000);
      			});
          		 
          		 //page 3
        		   
        		   
        		   element(by.css("[formcontrolname='regressionStartDate']")).sendKeys("30/06/2019").then(function(){
         				
         				
         				browser.sleep(1000);
         			}); 
                       
          		 
        		   element(by.css("[formcontrolname='regressionEndDate']")).sendKeys("10/07/2019").then(function(){
         				
         				
         				browser.sleep(1000);
         			}); 
        		   
        		   
        		   element(by.css("button[class='btn btn-info float-right']")).click().then(function(){ 
         				
         				// NEXT BUTTON FOR PAGE 4
         				browser.sleep(1000);
         			});
             		 
        		   
        		   //page 4
        		   
        		   
        		   element(by.css("[formcontrolname='testEnvironment']")).sendKeys("CIO5").then(function(){
         				
         				
         				browser.sleep(1000);
         			});

        		   element(by.css("[formcontrolname='regEnvironment']")).sendKeys("LAB04").then(function(){
         				
         				
         				browser.sleep(1000);
         			});

        		   
        		   element(by.css("[formcontrolname='sitecore']")).sendKeys("C5454").then(function(){
         				
         				
         				browser.sleep(1000);
         			});

        		   
        		   element(by.css("[formcontrolname='biztalk']")).sendKeys("C6510").then(function(){
         				
         				
         				browser.sleep(1000);
         			});

        		  
        		  
        		   element(by.css("[formcontrolname='devSupport']")).sendKeys("Gitansh").then(function(){
         				
         				
         				browser.sleep(1000);
         			});
        		   
        		   

        		   element(by.css("button[class='dropdown-item active ng-star-inserted']")).click().then(function(){
        				
        				
        				browser.sleep(1000);
        			});


        		   
        		   
        		   element(by.css("[formcontrolname='depchampionName']")).sendKeys("Gitansh").then(function(){
         				
         				
         				browser.sleep(1000);
         			});

        		   
        		   element(by.css("button[class='dropdown-item active ng-star-inserted']")).click().then(function(){
       				
       				
       				browser.sleep(1000);
       				
       			});
        		   
        		   
        		   
        		   
        		   element(by.css("button[class='btn btn-info float-right']")).click().then(function(){ 
        				
        				// NEXT BUTTON FOR PAGE 5
        				browser.sleep(1000);
        			})
          		 
        			
        			// TSR2
        			
        			element(by.id("due-TSR2")).sendKeys("15/07/2019").then(function(){
    					
    					
        				browser.sleep(1000);

    				})

        			element(by.id("contactPerson-TSR2")).sendKeys("Gitansh Vachher").then(function(){
    					
    					
        				browser.sleep(1000);

    				})
        			
    				element(by.css("button[class='dropdown-item active ng-star-inserted']")).click().then(function(){
        				
        				
        				browser.sleep(1000);
        			});
        			
        		   
        		   // TIP 
        		   
        		   element(by.id("due-TIP")).sendKeys("20/07/2019").then(function(){
      					
      					
          				browser.sleep(1000);

      				})

          			element(by.id("contactPerson-TIP")).sendKeys("Gitansh Vachher").then(function(){
      					
      					
          				browser.sleep(1000);

      				})
          			
      				element(by.css("button[class='dropdown-item active ng-star-inserted']")).click().then(function(){
          				
          				
          				browser.sleep(1000);
          			});
        			
        			
        			// PVT 
        		   
       		   element(by.id("due-PVT")).sendKeys("25/07/2019").then(function(){
 					
 					
     				browser.sleep(1000);

 				})

     			element(by.id("contactPerson-PVT")).sendKeys("Gitansh Vachher").then(function(){
 					
 					
     				browser.sleep(1000);

 				})
     			
 				element(by.css("button[class='dropdown-item active ng-star-inserted']")).click().then(function(){
     				
     				
     				browser.sleep(1000);
     			});
   		   
   			

        			 element(by.css("button[class='btn btn-info float-right']")).click().then(function(){ 
        				
        				// NEXT BUTTON FOR PAGE 6
        				browser.sleep(1000);
        			})
        			
        			
        			element(by.css("button[class='btn btn-primary float-right']")).click().then(function(){ 
        				
        				// Create
        				browser.sleep(10000);
        			})
        			
        			
        			

        	
         	    				},120000);
           
           
           
          
         
		})
		
