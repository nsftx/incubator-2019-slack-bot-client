
<template>
<div id="formaS">

    <div class="form-style-10">
<form id="forma">
    <div class="section">  <p id="section-text">{{ formType }} Schedule <label id="close-icon" @click="exit">x </label> </p></div>
    <div class="inner-wrap">
        
        <label class="la">Message</label>
        
        <select name="field1" id="field1" v-model="messageTitle" @click="getMessageID" :class="{errorBorder: showTitleError, noErrorBorder: !showTitleError}"> 
            <option disabled selected>{{ messageTitle }}</option>
            <option v-for="message in messagesData" :key="message.messageId" v-show="showMessageOption"> {{ message.title }} </option>
        </select>

        <span v-show="showTitleError">Message title is required</span>
        <br>

        <label class="la"> Run At </label>  <br> 
        <div class="input-append date form_datetime">
            <div>
           <date-picker v-model="date" :lang="lang" style="margin-top: 8px"></date-picker>
            </div>
        </div>
        <br>
        <br>
        <span v-show="showDateError">Date is required and must not be less then today date</span>
        <br>

        <label class="la"> Channel name </label> 
        <select id="field3" v-model="channelName" :class="{errorBorder: showChannelError, noErrorBorder: !showChannelError}"> 
            <option disabled selected >Some channel name</option>
            <option v-for="channel in channelsData" :key="channel.name"> {{ channel.name }} </option>
        </select>

        <span v-show="showChannelError"> Channel name is required </span>

        <br>
        <input type="checkbox" id="check" class="checkBox" v-model="repeat"/> <label class="check-label checkBox" for="check"> Repeat </label> 
        <br> 
        <br>
        <input type="checkbox" id="active" class="checkBox" v-model="active"/> <label class="check-label checkBox" for="active"> Active </label> 
        <br>
        <input type="button" class="bottomOption" value="Save" id="submit" @click="save"/>
        <input type="button" class="bottomOption" id="cancel" value="Cancel" @click="exit"/>
</div>

</form>
</div>
    
</div>
</template>

<script>
import axios from "axios"
import DatePicker from 'vue2-datepicker'
import { API_BASE_URL } from '../constants';


/*
window.addEventListener("mouseup", function(event){
	if(event.target != document.getElementById("formaS") && event.target.parentNode != document.getElementById("formaS") && 
	event.target.parentNode !=  document.getElementById("forma") && event.target.parentNode != document.getElementById("inner-wrap")
    && event.target != document.getElementById("section") && event.target.parentNode != document.getElementById("section")
    && event.target != document.getElementById("field1") && event.target != document.getElementById("field2") 
    && event.target != document.getElementsByClassName("la")[0] && event.target != document.getElementsByClassName("la")[1]
    && event.target != document.getElementById("check") && event.target != document.getElementById("active")
    && event.target != document.getElementById("section-text")
    && event.target != document.getElementsByClassName("check-label")[0] && event.target != document.getElementsByClassName("check-label")[1])
	{
		document.getElementById("formaS").style.display = "none";
		document.getElementById("field1").value = "";
		document.getElementById("textarea").value = "";
	}
})*/

export default {
    name: "formaS",
    components:{DatePicker},
     data (){  
        return {
            messagesData: [],
            channelsData: [],
            messageTitle: "Some message title",
            channelName: "Some channel name",
            targetMess: "",
            messId: "",
            showTitleError: false,
            showDateError: false,
            showChannelError: false,
            repeat: false,
            active: false,
            date: null,
            formType: "Create",
            showMessageOption: true,

            time1: '',
            time2: '',
            time3: '',
            // custom lang
            lang: {
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
                placeholder: {
                date: 'Select Date',
                dateRange: 'Select Date Range'
            }
        }
        }
    },

    mounted: async function(){
        if(this.$route.params.id == null)
        {
            try 
            {
                const res = await axios.get(API_BASE_URL+"/api/messages");
                    this.messagesData = res.data.content;             
            }
            catch (err) {
                this.$emit("show-notification", -1);
            }
        }
        else
        {
            var currentR = this.$router.currentRoute.fullPath;
            var path = currentR.substring(0, 31);

            if(path == "/dashboard/messages/newSchedule")
            {
                try
                {
                    const res = await axios.get(API_BASE_URL+"/api/messages/" + this.$route.params.id);
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
                    res = await axios.get(API_BASE_URL+"/api/schedules/" + this.$route.params.id);
                    this.active = res.data.active;
                    this.repeat = res.data.repeat;
                    this.channelName = res.data.channel;
                    this.messageTitle = res.data.message.title;
                    this.date = res.data.runAt;
                    this.messId = res.data.message.messageId;
                }
                catch(err)
                {
                    this.$emit("show-notification", -1);               
                }
                try
                {
                    const resM = await axios.get(API_BASE_URL+"/api/messages");
                    this.messagesData = resM.data.content;
                }
                catch(err)
                {
                    this.$emit("show-notification", -1);               
                }
            }
        }
        try
        {
            //Aplikacija nije povezana sa listom kanala
            const res = await axios.get(API_BASE_URL+"/api/channels");
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

        date(value){
            this.date = value;
            if(this.liveValidation == true) this.check_date(value);
        },

        channelName(value){
            this.channelName = value;
            if (this.liveValidation == true) this.check_channelName(value);
        }
    },

    methods:{
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

        check_date(value){
            if(this.date == null)
            {
                var inputi = document.getElementsByClassName("mx-input")[0];
                inputi.style.borderColor = "red";
                this.showDateError = true;
                return false;
            }
            var today = new Date();
            if(today>this.date)
            {
                var inputi = document.getElementsByClassName("mx-input")[0];
                inputi.style.borderColor = "rgba(0, 0, 0, 0.2);";   
                this.showDateError = true;
                return false;
            }
            else
            {
                var inputi = document.getElementsByClassName("mx-input")[0];
                inputi.style.borderColor = "rgba(0, 0, 0, 0.2);"; 
                this.showDateError = false;
                return true;
            }
        },

		async save(){

            this.liveValidation = true;
            if (this.check_messageTitle(this.messageTitle) == false) this.invalid = true;
            if (this.check_date(this.date) == false) this.invalid = true;
            if (this.check_channelName(this.channelName) == false) this.invalid = true;
            if (this.invalid == true) 
            {
                this.invalid = false;
                return;
            }

            if(this.$route.params.id != null)
            {
                var cr = this.$router.currentRoute.fullPath;
                var path = cr.substring(0, 31);

                if(path == "/dashboard/messages/newSchedule")
                {
                    try
                    {
                        await axios.post(API_BASE_URL+"/api/schedules", {active: this.active, channel: this.channelName, repeat: this.repeat, messageId: this.$route.params.id, runAt: this.date})
                        this.$emit("show-notification");
                    }
                    catch(err)
                    {
                        this.$emit("show-notification", -1);
                    }
                }
                else
                {
                    try
                    {
                        await axios.put(API_BASE_URL+"/api/schedules/" + this.$route.params.id, {active: this.active, channel: this.channelName, messageId:     this.messId, repeat: this.repeat, runAt: this.date});
                        this.$emit("show-notification");
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
                    await axios.post(API_BASE_URL+"/api/schedules", {active: this.active, channel: this.channelName, messageId: this.messId, repeat: this.repeat, runAt: this.date})
                    this.$emit("show-notification")
                }
                catch(err)
                {
                    this.$emit("show-notification", -1);
                }
            }
            this.$emit("reload-schedules");
            this.$router.go(-1);
        },
        getMessageID()
        {   
            if(this.messagesData.length > 1)
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

*[data-v-f2ae3234] {
    width: 100%;
    height:13px;
    font-family: 'Roboto', sans-serif;
}
#check{
    margin-top:15px;
}

#check,#active{
    width:10%;
}

#cancel,#submit{
    width:30%;
    height:auto;
}

.mx-input{
    overflow: visible;
}

.mx-input-append{
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    margin-right: 10px;
}

#formaS{
    width: 640px;
    height: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 99;
}

.form-style-10{
    width: 100%;
    height: 100%;
	padding:20px;
	position:absolute;
	top:50%;
	left:50%;
	transform:translateX(-50%) translateY(-50%);
	background: #FFF;
    box-sizing:border-box;
    display:block;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 99;
}

.form-style-10 .inner-wrap{
    display:block;
	padding: 20px;
	background: #fff;
	border-radius: 6px;
	margin-bottom: 15px;
    margin-top: 20px;
}

.form-style-10 label{
	font: 13px Arial, Helvetica, sans-serif;
	color: #888;
	margin-bottom: 10px;
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
    overflow:none;
    margin-bottom: 20px;
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
}

.form-style-10 .section{
	font: normal 25px 'Bitter', serif;
    padding-left: 20px;
	padding-bottom: 5px;
}

.form-style-10 .section p{
    height:20%;
    width:100%;
    font-weight: bold;
    color:black;
    margin-top: 18px;
}

.form-style-10 #submit{
    float:right;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    width:20%;
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
	font-size: 17px;
}

.form-style-10 #submit:hover{
    
	background:darkblue;
	-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
	-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
	box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}

.form-style-10 input[type="button"]{
    margin-right:15px;
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
	font-size: 17px;
    border:none;
    background:#fff;
    text-align:center;
    margin-right: 25px;
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
    position: relative;
    left: 60%;
}

#close-icon:hover{
    cursor: pointer;
}

#active{
    margin-bottom: 50px;
}

#field1, #field2, #field3{
    margin-bottom: 10px;
    height: 37px;
    margin-top: 10px;
    font-size: 15px;
}

.checkBox{
    position: relative;
    top: 10px;
    right: 15px;
}

.bottomOption{
    position: relative;
    bottom: 45px;
}

.errorBorder {
    border: 1px inset rgb(253, 38, 38);
}

.noErrorBorder{
    border: 1px inset rgba(0, 0, 0, 0.2);
}

span {
  color: rgb(253, 38, 38);
  font-weight: 400;
}

.checkBox:hover{
    cursor: pointer;
}

.la{
    display: inline;
    background-color: white;
    position: relative;
    top: 15px;
    left: 10px;
    z-index: 99;
    padding: 0px 5px;
}

</style>