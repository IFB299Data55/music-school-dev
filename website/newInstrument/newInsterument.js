<!DOCTYPE html>
<html>
<head>
  <% include ../shared/header.ejs %>
    
    <meta charset="utf-8" />
    <title>Add Instrument</title>
    <link rel="stylesheet" type="text/css" href="/newInstrument/css/instrument.css" />
</head>

<body>

  <% include ../shared/nav.ejs %>

 <div class="header">
           
           <div class="container">
               
               <div class="logo">
                   <h2>SCHOOL OF <br/>MUSIC</h2>
               </div>
               
               <div class="nav">
                   <ul>
                       <li><a href="#">HOME</a></li>
                       <li><a href="#">STUDY</a></li>
                       <li><a href="#">CONTACTS</a></li>
                       <li><a href="#">MY.PORTAL</a></li>
                   </ul>
                   <form class="search">
                    <input type="text" name="search" placeholder="Search.."  />
                   </form>
               </div>
           </div>
        </div>
        <div class="header2">
            <div class="bar">
                <ul>
                    <li><a href="#">HOME</a></li>
                    <li><a href="#">ABOUT</a></li>
                    <li><a href="#">STUDY</a></li>
                    <li><a href="#">OUR PEOPLE</a></li>
                    <li><a href="#">CONTACTS</a></li>
                </ul>
            </div>
        </div>
        
        <h2 class="background"><span>Add New Instrument</span></h2>
        
        <div id="box">
        <form action="">
            
            <fieldset id="instrumentinfo">
                <legend><span>Instrument Details</span></legend>
                
                <div class="first1">
                <label>
                    Instrument Type:<br>
                    <input type="text" name="type" id="typeinput" />
                </label>
                <label>
                    Serial Number:<br>
                    <input type="text" name="serial" id="serialinput" />
                </label>
                <label>
                    Condition:<br>
                    <div class="style_select">
                    <select type="text" name="condition" id="conditioninput">
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                    <option value="unstisfactory">Unstisfactory</option> 
                    </select>
                 </div>
                </label> 
                </div>
                
                <div class="second2">
                <label>
                    Purchase Price:<br>
                    <input type="text" name="price" id="priceinput" placeholder="$00.00"/>
                </label>
                <label>
                    Hire Fee:<br>
                    <input type="text" name="hirefee" id="hirefeeinput" placeholder="$00.00" />
                </label>
                 <label>
                    Purchase Date:<br>
                    <input type="date" name="purchase" id="purchaseinput">
                </label>
                </div> 
                
            </fieldset>
    
            <br><br>
            
            <fieldset id="additionalinformation">
                <legend><span>Description</span></legend>
                <div class="addinfo">
                <label>
                    instrument note
                    <textarea id="feedback" name="feedback" rows="7" cols="55"></textarea>
                </label>
                </div>
            </fieldset>
            
            <br><br>
            
            <input type="submit" value="submit" id="submitbutton">
        </form>
        </div>
</body>
</html>