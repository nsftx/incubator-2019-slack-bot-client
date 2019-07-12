<template>

<div id="dashboard">
      <formaM />
<div class="tab">
  <div id="logo" class="tablinks"></div>
  <button class="tablinks" onclick="openCity(event, 'Messages')" id="defaultOpen">
    <i class="fas fa-envelope"></i> <br>
    Messages
    </button>
  <button class="tablinks" onclick="openCity(event, 'Schedules')">
    <i class="fas fa-calendar-check"></i><br>
    Schedules
    </button>
  <button class="tablinks" onclick="openCity(event, 'Triggers')">
    <i class="fas fa-calendar-times"></i><br>
    Triggers
    </button>
</div>

<div id="Messages" class="tabcontent">
  <table cols="15">
    <tr>
      <th>Title</th>
      <th>Text</th>
      <th>CreatedAt</th>
      <th colspan="5"> </th>
    </tr>
    <tr>
            
      <td>Peter</td>
      <td>Griffin</td>
      <td>$150</td>
      <td colspan="5"></td>
    </tr>
    <tr>
            
      <td>Lois</td>
      <td>Griffin</td>
      <td>$150</td>
      <td colspan="5"></td>
    </tr>
    <tr>
            
      <td>Joe</td>
      <td>Swanson</td>
      <td>$300</td>
      <td colspan="5"></td>
    </tr>
    <tr>
            
      <td>Cleveland</td>
      <td>Brown</td>
      <td>$250</td>
      <td colspan="5"></td>
    </tr>
    <tr>
            
            <td>Peter</td>
            <td>Griffin</td>
            <td>$100</td>
            <td colspan="5"></td>
          </tr>
          <tr>
                
                <td>Peter</td>
                <td>Griffin</td>
                <td>$100</td>
                <td colspan="5"></td>
              </tr>
              <tr>
                
                    <td>Peter</td>
                    <td>Griffin</td>
                    <td>$100</td>
                    <td colspan="5"></td>
                  </tr>
  </table>
</div>

<!-- <div id="Schedules" class="tabcontent">
    <table cols="8">
        <tr>
                
          <th>Message</th>
          <th>NextRun</th>
          <th>Active At</th>
          <th colspan="5"> </th>
        </tr>
        <tr>
                
          <td>Peter</td>
          <td>Griffin</td>
          <td>$100</td>
          <td colspan="5"> </td>
        </tr>
        <tr>
                
          <td>Lois</td>
          <td>Griffin</td>
          <td>$150</td>
          <td colspan="5">    </td>
        </tr>
        <tr>
                
          <td>Joe</td>
          <td>Swanson</td>
          <td>$300</td>
          <td colspan="5">    </td>
        </tr>
        <tr>
               
          <td>Cleveland</td>
          <td>Brown</td>
          <td>$250</td>
          <td colspan="5">    </td>
        </tr>
        <tr>
                
                <td>Peter</td>
                <td>Griffin</td>
                <td>$100</td>
                <td colspan="5">     </td>
              </tr>
              <tr>
                    
                    <td>Peter</td>
                    <td>Griffin</td>
                    <td>$100</td>
                    <td colspan="5">     </td>
                  </tr>
                  <tr>
                
                        <td>Peter</td>
                        <td>Griffin</td>
                        <td>$100</td>
                        <td colspan="5">     </td>
                      </tr>
      </table>
</div>

<div id="Triggers" class="tabcontent">

    <table cols="15">
        <tr>
          <th>Message</th>
          <th>Trigger</th>
          <th>Channel</th>
          <th colspan="12"> </th>
        </tr>
        <tr>
          <td>Peter</td>
          <td>Griffin</td>
          <td>$100</td>
          <td colspan="12">     </td>
        </tr>
        <tr>
               
          <td>Lois</td>
          <td>Griffin</td>
          <td>$150</td>
          <td colspan="12">    </td>
        </tr>
        <tr>
               
          <td>Joe</td>
          <td>Swanson</td>
          <td>$300</td>
          <td colspan="12">    </td>
        </tr>
        <tr>
                
          <td>Cleveland</td>
          <td>Brown</td>
          <td>$250</td>
          <td colspan="12">    </td>
        </tr>
        <tr>
                
                <td>Peter</td>
                <td>Griffin</td>
                <td>$100</td>
                <td colspan="12">     </td>
              </tr>
              <tr>
                    
                    <td>Peter</td>
                    <td>Griffin</td>
                    <td>$100</td>
                    <td colspan="12">     </td>
                  </tr>
                  <tr>
                
                        <td>Peter</td>
                        <td>Griffin</td>
                        <td>$100</td>
                        <td colspan="5">     </td>
                      </tr>
      </table>
  
</div>
-->

<button @click="prikazForme" id="dugme"> + </button>
</div>

</template>

<script>
import formaM from "./formaM.vue";

export default {
    name: "dashboard",
    components: {
        formaM
    },
    methods: {
        prikazForme(){
            formaM.methods.prikazi();
        }
    }
}
</script>

<style scoped>

body {font-family: "Lato", sans-serif;
background:#EAEAEA;}


#dashboard{
  height: 100vh;
}

#logo{
  margin-top: 10px;
  height: 50px;
  background-image: url("../assets/logo.png");
  background-position: center;
  margin-bottom: 10px;
}

table {
      float:right;
      border-collapse: collapse;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    
    th, td {
      width:10%;
      padding: 4px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      font-size:10px;
      padding-left: 20px;
    }
    th{
       
        background:silver;
    }
    
    tr:hover {background-color:#f5f5f5;}
    
        #parent{
            display:block;
            background-color:#0080ff;
            width:20%;
            float:left;
        }
        tr{
            height:50px;
        }
/* Style the tab */
.tab {
  text-align:center;
  float: left;
  background-color: #007FFF;
  width: 6%;
  height: 100%;
}

/* Style the buttons inside the tab */
.tab button {
  display: block;
  background-color: inherit;
  color: #fff;
  width: 100%;
  border: none;
  outline: none;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
  height: 80px;
}

.tab button i{
  font-size: 22px;
  margin-bottom: 10px;
}

/* Change background color of buttons on hover */
.tab button:hover{
  background-color: rgb(45, 146, 247);
}

/* Create an active/current "tab button" class */
.tab button.active {
  background-color:  #0080ff;;
}

/* Style the tab content */
.tabcontent {
  float: left;
  width: 94%;
  border-left: none;
  height: 100%;
  padding: 13px;
}

#dugme {
    float:right;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    font-size: 30px;
    position: relative;
    bottom: 140px;
    right: 20px;
    background-color:  #0080ff;;
    color: white;
    border: 1px solid white;
}

#dugme:hover{
  cursor: pointer;
}

</style>
