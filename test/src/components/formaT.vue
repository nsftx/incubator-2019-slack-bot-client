
<template>

<div id="formaT">
    <div class="form-style-10">
<form id="forma">
    <div class="section">  <p>{{ formType }} Trigger <label id="close-icon" @click="exit"> x </label> </p> </div>
    <div class="inner-wrap">
        <label class="la">Message</label>

        <select id="field1" class="border" v-model="messageTitle" @click="getMessageID" :class="{errorBorder: showTitleError, noErrorBorder: !showTitleError}"> 
            
            <option disabled selected >{{ messageTitle }}</option>
            <option v-for="message in messagesData" :key="message.messageId" v-show="showMessageOption"> {{ message.title }} </option>
            
        </select>

        <span v-show="showTitleError">Message title is required</span>
        <br>

        <label class="la"> Trigger </label>  
        <select  id="field2" class="border"  v-model="triggerType" :class="{errorBorder: showTriggerError, noErrorBorder: !showTriggerError}"> 
            <option disabled selected >Some trigger type</option>
            <option>On channel join</option>
        </select>

        <span v-show="showTriggerError">Trigger type is required</span>
        <br>
        <br>

        <select id="field3" class="border"  v-model="channelName" :class="{errorBorder: showChannelError, noErrorBorder: !showChannelError}"> 
            <option disabled selected >Some channel name</option>
            <option v-for="channel in channelsData" :key="channel.name"> {{ channel.name }} </option>
        </select>

        <span v-show="showChannelError">Channel name is required</span>
        <br>
        <br>

        <label class="container"> <p class="checkText">Active</p>
            <input type="checkbox" checked="checked" v-model="active">
            <span class="checkmark"></span>
        </label>

    <br>
    <br>
        <input type="button" value="Save" id="submit" @click="save"/>
        <input type="button" value="Cancel" @click="exit" />
</div>
</form>
</div>
</div>
</template>

<script>
import axios from "axios"

/*
window.addEventListener("mouseup", function(event){
	if(event.target != document.getElementById("formaT") && event.target.parentNode != document.getElementById("formaT") && 
	event.target.parentNode !=  document.getElementById("forma") && event.target.parentNode != document.getElementById("inner-wrap")
    && event.target != document.getElementsByClassName("section")[0] && event.target.parentNode != document.getElementsByClassName("section")[0]
    && event.target != document.getElementById("check") && event.target != document.getElementById("active") && event.target != document.getElementById("field3")
    && event.target != document.getElementById("field1") && event.target != document.getElementById("field2") && event.target != document.getElementsByClassName("la")[0]
    && event.target != document.getElementsByClassName("la")[1] && event.target != document.getElementsByClassName("la")[2] )
	{
		document.getElementById("formaT").style.display = "none";
		document.getElementById("field1").value = "";
        document.getElementById("field2").value = "";
		document.getElementById("field3").value = "";        
	}
})*/

export default {
    name: "formaT",
    data(){
        return{
            messagesData: [],
            channelsData: [],
            targetMess: "",
            messageTitle: "Some message title",
            triggerType: "Some trigger type",
            channelName: "Some channel name",
            active: false,
            formType: "Create",
            messId: "",
            liveValidation: false,
            showTitleError: false,
            showTriggerError: false,
            showChannelError: false,
            showMessageOption: true
        }
    },
    mounted: async function()
    {
        if (this.$route.params.id != null) 
        {

            var currentR = this.$router.currentRoute.fullPath;
            var path = currentR.substring(0, 30);

            if(path == "/dashboard/messages/newTrigger")
            {
                try
                {
                    const res = await axios.get("http://localhost:8080/api/messages/" + this.$route.params.id);
                    this.messagesData = res.data;
                    this.messageTitle = this.messagesData.title;
                    this.showMessageOption = false;
                }
                catch(err)
                {
                    this.$emit("show-notification", -1);                    
                }
            }
            else
            {
                this.formType = "Update";

                var res;
                try
                {
                    res = await axios.get("http://localhost:8080/api/triggers/" + this.$route.params.id);
                    this.messageTitle = res.data.message.title;
                    this.channelName = res.data.channel;
                    this.active = res.data.active;
                    this.triggerType = res.data.triggerType;
                    this.messId = res.data.message.messageId;
                }
                catch(err)
                {
                    this.$emit("show-notification", -1);         
                }
                try
                {
                    const resM = await axios.get("http://localhost:8080/api/messages");
                    this.messagesData = resM.data.content;
                }
                catch(err)
                {
                    this.$emit("show-notification", -1);               
                }
            }
        }
        else
        {
            try 
            {
                const res = await axios.get("http://localhost:8080/api/messages");
                this.messagesData = res.data.content;             
            }
            catch (err) {
                this.$emit("show-notification", -1);
            }
        }
        try
        {
            //Aplikacija nije povezana sa listom kanala
            const res = await axios.get("http://localhost:8080/api/channels");
            this.channelsData = [{name: "#general"}, {name: "#incubator"}];
        }
        catch(err)
        {
            this.$emit("show-notification", -1);
        }
    },

    watch: {
        messageTitle(value) {
          this.messageTitle = value;
          if (this.liveValidation == true) this.check_messageTitle(value);
        },

        triggerType(value) {
          this.triggerType = value;
          if (this.liveValidation == true) this.check_triggerType(value);
        },

        channelName(value){
            this.channelName = value;
            if (this.liveValidation == true) this.check_channelName(value);
        }
    },

    methods: {
        exit(){
            this.$router.go(-1);
        },

        check_messageTitle(value) 
        {
            if (this.messageTitle == "Some message title") 
            {
                this.showTitleError = true;
                return false;
            } 
            else
            {
                this.showTitleError = false;
                return true;
            }
        },

        check_triggerType(value) {
            if (this.triggerType == "Some trigger type") 
            {
                this.showTriggerError = true;
                return false;
            } 
            else {
                this.showTriggerError = false;
                return true;
            }
        },

        check_channelName(value) {
            if (this.channelName == "Some channel name") 
            {
                this.showChannelError = true;
                return false;
            } 
            else {
                this.showChannelError = false;
                return true;
            }
        },

        async save(){

            this.liveValidation = true;
            if (this.check_messageTitle(this.messageTitle) == false) this.invalid = true;
            if (this.check_triggerType(this.triggerType) == false) this.invalid = true;
            if (this.check_channelName(this.channelName) == false) this.invalid = true;
            if (this.invalid == true) 
            {
                this.invalid = false;
                return;
            }

            if(this.$route.params.id != null)
            {
                var cr = this.$router.currentRoute.fullPath;
                var path = cr.substring(0, 30);

                if(path == "/dashboard/messages/newTrigger")
                {
                    try
                    {
                        await axios.post("http://localhost:8080/api/triggers", {channel: this.channelName, triggerType: this.triggerType, active: this.active, messageId: this.$route.params.id})
                        this.$emit("show-notification")                    
                    }
                    catch(err)
                    {
                        this.$emit("show-notification", -1)
                    }
                }
                else
                {
                    try
                    {
                        const res = await axios.get("http://localhost:8080/api/messages");
                        this.messagesData = res.data.content;

                        await axios.put("http://localhost:8080/api/triggers/" + this.$route.params.id, {channel: this.channelName, triggerType: this.triggerType, active: this.active, messageId: this.messId})
                        this.$emit("show-notification")                    
                    }
                    catch(err)
                    {
                        this.$emit("show-notification", -1)
                    }
                }
            }
            else
            {
                try
                {
                    await axios.post("http://localhost:8080/api/triggers", {active: this.active, channel: this.channelName, messageId: this.messId, triggerType:  this.triggerType});
                    this.$emit("show-notification")
                }
                catch(err)
                {
                    this.$emit("show-notification", -1);
                }
            }
            this.$emit("reload-triggers");
            this.$router.go(-1);
        },
        getMessageID()
        {   
            if(this.messagesData.length>1)
            {
                this.targetMess = this.messagesData.filter( mess => mess.title == this.messageTitle);
                this.messId = this.targetMess[0].messageId;
            }
        }
    }
}
</script>

<style scoped>

*{
    font-family: 'Roboto', sans-serif;
}

#formaT{
    width: 640px;
    height: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: white;
    padding: 10px;
    z-index: 99;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#form-style-10{
    width:40%;
    height:auto;
	padding:20px;
	position:absolute;
	top:50%;
	left:50%;
	transform:translateX(-50%) translateY(-50%);
	background: #FFF;
    overflow:hidden;
    box-sizing:border-box;
    display:block;
    z-index: 99;
}
.form-style-10 .inner-wrap{
    height:auto;
    display:block;
	padding: 0 20px 20px 20px;
	background: #fff;
	border-radius: 6px;
	margin-bottom: 15px;
}

.form-style-10 label{
	font: 13px Arial, Helvetica, sans-serif;
	color: #888;
	margin-bottom: 15px;
}
.form-style-10 select{
    color:#222222;
    font: 13px Arial, Helvetica, sans-serif;
    font-weight: 400;
}
.form-style-10 input[type="text"],
.form-style-10 select,
.form-style-10 input[type="datetime"],
.form-style-10 input[type="email"],
.form-style-10 input[type="number"],
.form-style-10 input[type="search"],
.form-style-10 input[type="time"],
.form-style-10 input[type="url"],
.form-style-10 input[type="password"],
.form-style-10 textarea,
.form-style-10 select {
    padding-top:10px;
    overflow:none;
    margin-bottom: 15px;
	display: block;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
    width: 100%;
    height:40%;
	padding: 8px;
	border-radius: 6px;
	-webkit-border-radius:6px;
	-moz-border-radius:6px;
    font-size: 15px;
}

.form-style-10 .section{
	font: normal 23px 'Bitter', serif;
    padding-left: 20px;
}

.form-style-10 .section p{
    height:20%;
    width:100%;
    font-weight: bold;
    color:black;
    margin-top: 18px;
    margin-bottom: 25px;
}

.form-style-10 #submit{
    float:right;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    width:20%;
    height:30%;
    overflow: hidden;
    background: #0080ff;
	padding: 8px 20px 8px 20px;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	color: #fff;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
	font: normal 30px 'Bitter', serif;
	border: 1px solid #0080ff;;
	font-size: 15px;
} 

.form-style-10 #submit:hover{
    
	background:darkblue;
	-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
	-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
	box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}

.form-style-10 input[type="button"]{
    margin-right:35px;
    float:right;
    padding: 8px 8px 8px 8px;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	color:#4D4D4D;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
	font: normal 30px 'Bitter', serif;
	-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
	-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
	box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
	border: 1px solid #257C9E;
	font-size: 15px;
    border:none;
    background:#fff;
    text-align:center;
}
.form-style-10 input[type="submit"]:hover{
    
	background:darkblue;
	-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
	-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
	box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}
.form-style-10 .privacy-policy{
	float: right;
	width: 250px;
	font: 12px Arial, Helvetica, sans-serif;
	color: #4D4D4D;
	margin-top: 10px;
	text-align: right;
}
#textarea{
    display:block;
    overflow:none;
    height:100%;
    width:100%;
    margin-bottom: 20px;
}

#close-icon{
    font-size: 25px;
    display:inline;
    text-align:right;
    float:right;
    margin: 0 20px 10px 0px;
}

#close-icon:hover{
    cursor: pointer;
}

.la{
    position: relative;
    top: 7px;
    left: 10px;
    text-align: center;
    padding: 0px 7px;
    background-color: white;
}

span {
  color: rgb(253, 38, 38);
  font-weight: 400;
}

.errorBorder {
    border: 1px inset rgb(253, 38, 38);
}

.noErrorBorder{
    border: 1px inset rgba(0, 0, 0, 0.2);
}

.checkText{
    position: relative;
    left: 45px;
    bottom: 5px;
}

.container {
  display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -webkit-box-flex: 1;
    -ms-flex: 1 1 100%;
    flex: 1 1 100%;
    padding: 0px;
    width: 100%;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
    top: -5px;
    left: 8px;
    height: 15px;
    width: 15px;
    background-color: white;
    border: 2px solid grey;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: rgb(235, 228, 228);
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
  border-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    margin-left: 3px;
    display: none;
    text-align: center;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

</style>