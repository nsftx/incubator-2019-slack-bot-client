<template>
   <div id="Schedules" class="tabcontent">

    <router-view></router-view>

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
    
  <button @click="showScheduleForm" id="btn"> + </button>
</div>
</template>

<script>
export default {
    name: "schedules",
    methods:{
      showScheduleForm(){
        this.$router.push("/schedules/newSchedule");
      }
    }
}
</script>

<style scoped>
body {font-family: "Lato", sans-serif;
background:#EAEAEA;}


#Schedules{
  height: 100vh;
  padding: 20px;
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


/* Style the buttons inside the tab */

#btn {
    float:right;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    font-size: 30px;
    position: absolute;
    bottom: 50px;
    right: 13px;
    background-color:  #006BF5;;
    color: white;
    border: 1px solid white;
    font-family: 'Courier New', Courier, monospace;
    line-height: 60px;
    z-index: 99;
}

#btn:hover{
  cursor: pointer;
}

#footer{
  width: 92%;
  height: 7vh;
  background-color: white;
  float: left;
  z-index: 0;
  position: absolute;
  border: 1px solid lightgray;
  bottom: 0px;
  margin: 0px;
  padding: 0px 20px;
}

#footer-btn{
    border: 1px solid grey;
    padding: 5px 5px;
    width: 105px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 4px;
}

</style>
