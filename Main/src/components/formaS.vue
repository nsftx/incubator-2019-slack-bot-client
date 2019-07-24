
<template>
<div id="formaS">

    <div class="form-style-10">
<form id="forma">
    <div class="section">  <p id="section-text">Create Schedule <label id="close-icon" @click="exit">x </label> </p></div>
    <div class="inner-wrap">
        <label class="la">Message</label><select  name="field1" id="field1"> 
            <option value="" disabled selected>Some message title</option>
        </select>
        <label class="la"> Run At </label>  <br> 
        <div class="input-append date form_datetime">
            <input size="16" type="text" value="" readonly id="field2">
            <span class="add-on"><i class="icon-th"></i></span>
        </div>

        <br>
        <input type="checkbox" id="check"/> <label class="check-label"> Repeat </label> 
        <br>
        <br>
        <input type="checkbox" id="active"/> <label class="check-label"> Active </label> 
    <br>
    <br>
        <input type="button" value="Save" id="submit" @click="save"/>
        <input type="button" value="Cancel" @click="exit"/>
</div>

</form>
</div>
    
</div>
</template>

<script>

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
    methods:{
		exit(){
			this.$router.go(-1);
		},
		save(){
            alert("Sacuvaj");
            alert(this.$route.params.id);
            this.$router.go(-1);
		}
    }
}
</script>

<style scoped>

*{
    font-family: 'Roboto', sans-serif;
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
    overflow:hidden;
    box-sizing:border-box;
    display:block;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    z-index: 99;
}

.form-style-10 .inner-wrap{
    display:block;
	padding: 20px;
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
	border: 1px inset rgba(0, 0, 0, 0.2);
	/*box-shadow: inset 1px 1px 1px 1px rgba(0, 0, 0, 0.33);
	-moz-box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.33);
	-webkit-box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.33);*/
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
    float:right;
    margin: 0 20px 10px 0px;
}

#close-icon:hover{
    cursor: pointer;
}

#active{
    margin-bottom: 50px;
}

#field1, #field2{
    margin-bottom: 25px;
    height: 40px;
    margin-top: 10px;
    font-size: 15px;
}

</style>