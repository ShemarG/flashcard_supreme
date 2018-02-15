$(document).ready(function(){

	var subjects = JSON.parse(localStorage.subjectArr);
	var gotSubject = localStorage.setSubject;
	var gotTopic = localStorage.setTopic;
	var currentArray = subjects[gotSubject];
	var currentTopic;

	for(i=0; i<currentArray.topics.length; i++){
		for (key in currentArray.topics[i]){
			var topic = currentArray.topics[i][key];

			if (topic.topicName === gotTopic){
				currentTopic = topic;
			} else {}
		}
	}

	console.log(currentTopic);

	var saveState;
	var changes = 0

	var colorArray = [
		{rgb:"rgb(255,51,51)", colorName:"Red"},
		{rgb:"rgb(255,102,51)", colorName:"Red-Orange"},
		{rgb:"rgb(255,153,51)", colorName:"Orange"},
		{rgb:"rgb(255,204,51)", colorName:"Yellow-Orange"},
		{rgb:"rgb(255,255,51)", colorName:"Yellow"},
		{rgb:"rgb(204,255,51)", colorName:"Yellow-Green"},
		{rgb:"rgb(153,255,51)", colorName:"Lime Green"},
		{rgb:"rgb(102,255,51)", colorName:"Light Green"},
		{rgb:"rgb(51,255,51)", colorName:"Green"},
		{rgb:"rgb(51,255,102)", colorName:"Pale Green"},
		{rgb:"rgb(51,255,153)", colorName:"Sea Green"},
		{rgb:"rgb(51,255,204)", colorName:"Aquamarine"},
		{rgb:"rgb(51,255,255)", colorName:"Cyan"},
		{rgb:"rgb(51,204,255)", colorName:"Skyblue"},
		{rgb:"rgb(51,153,255)", colorName:"Navy Blue"},
		{rgb:"rgb(51,102,255)", colorName:"Royal Blue"},
		{rgb:"rgb(51,51,255)", colorName:"Blue"},
		{rgb:"rgb(102,51,255)", colorName:"Indigo"},
		{rgb:"rgb(153,51,255)", colorName:"Purple"},
		{rgb:"rgb(204,51,255)", colorName:"Light Purple"},
		{rgb:"rgb(255,51,255)", colorName:"Pink"},
		{rgb:"rgb(255,51,204)", colorName:"Magenta"},
		{rgb:"rgb(255,51,153)", colorName:"Bubble Gum"},
		{rgb:"rgb(255,51,102)", colorName:"Fruit Punch"}
	];

	$(document).on("change", "body", function(){

		if (changes == 0){
			$("#save").toggleClass("active");
		}
		changes++;
		saveState = 1;
		console.log(saveState);
	})

	$("body").css("background-color", currentTopic.color);

	$("head").append("<title>" + currentTopic.tDisplayName + "</title>")

	$("body").append("\
		<center>\
			<div id='title'><h1>" + currentTopic.tDisplayName + "</h1></div>\
			<div id='nav'>\
        <a href='index.html'>\
          <button class='menu'>Home</button>\
        </a>\
				<a href='index_subject.html'>\
          <button class='menu'>Back</button>\
        </a>\
				<a href='index_review.html'>\
          <button id='reviewButton' class='menu'>Review</button>\
        </a>\
        <a href='#'>\
          <button class='menu'>Quiz</button>\
        </a>\
      </div>\
			<select id='theme'>\
				<option data-color_rgb='rgba(255,255,255,0)'>Choose a theme color</option>\
			<select><br>\
		</center>\
	");

	for (i=0; i<colorArray.length; i++){

		var getColor = $("body").css("background-color")
		var nospace = getColor.replace(/\s+/g, '');

		if(colorArray[i].rgb == nospace) {
			$("#theme").append("\
				<option selected='selected' data-color_rgb=" + colorArray[i].rgb + ">" + colorArray[i].colorName + "</option>\
			")
		}else{

			$("#theme").append("\
				<option data-color_rgb=" + colorArray[i].rgb + ">" + colorArray[i].colorName + "</option>\
			")
		}
		//console.log(colorArray[i].rgb)
	}


	$(document).on("change", "#theme", function(){
		var opt = $(this).find(":selected");
		var color = opt.data("color_rgb")
		$("body").css("background-color", color);
		currentTopic.color = color;
	})

	if (currentTopic.brief !== undefined){
		$("body").append("\
			<center>\
				<textarea rows='2' cols='75' style='resize:none;' placeholder='Add a description' id='descript'>" + currentTopic.brief + "</textarea>\
			</center>\
		")
	}else{
		$("body").append("\
			<center>\
				<textarea rows='2' cols='75' style='resize:none;' placeholder='Add a description' id='descript'></textarea>\
			</center>\
		")
	}

	function isChecked(input){
		if (input !== false){
			return "checked"
		} else {
			return
		}
	}


	if(currentTopic.questions.length == 0){
		var x = i+1;
		$("body").append("\
			<div id='container'>\
				<center>\
					<div class='questionDiv'>\
					" + x + "\
						<textarea class='qclass' id='q1' rows='6' cols='45' style='resize:none; 'placeholder='Enter question here' type='text'></textarea>\
						<textarea class='aclass' id='a1' rows='6' cols='45' style='resize:none; 'placeholder='Enter answer here'type='text'></textarea>\
						<textarea class='aclass' id='n1' rows='6' cols='45' style='resize:none; 'placeholder='Enter notes here'type='text'></textarea><br>\
						<button class='deleteButton'>Delete</button><br>\
					</div>\
				</center>\
			</div>\
			<center>\
				<div class='actions'>\
					<button id='addQuestion'>Add Question</button><button id='save'>Save</button><button id='deleteSubject'>Delete Subject</button><br>\
				</div>\
			</center>\
		")
	}else{

		$("body").append("\
			<div id='container'></div>\
			<center>\
				<div class='actions'>\
					<button id='addQuestion'>Add Question</button><button id='save'>Save</button><button id='deleteSubject'>Delete Subject</button><br>\
				</div>\
				<div id='share'>\
					<p>Share these flashcards with friends by sending them this data. Make sure you've saved already! (Ctrl/Cmd + A highlights it real nice.)</p>\
				</div>\
				<textarea rows='10' cols='100' id='export'></textarea>\
			</center>\
		")

		for (i = 0; i < currentTopic.questions.length; i++) {
			var x = i+1;
			$("#container").append("\
				<center>\
					<div class='questionDiv'>\
					" + x + "\
						<textarea class='qclass' rows='6' cols='45' style='resize:none; 'placeholder='Enter question here' type='text'>" + currentTopic.questions[i].q + "</textarea>\
						<textarea class='aclass' rows='6' cols='45' style='resize:none; 'placeholder='Enter answer here' type='text'>" + currentTopic.questions[i].a + "</textarea>\
						<textarea class='nclass' rows='6' cols='45' style='resize:none; 'placeholder='Enter notes here' type='text'>" + currentTopic.questions[i].n + "</textarea><br>\
						<input class='addToQuiz' name='add' type='checkbox' " + isChecked(currentTopic.questions[i].checked) + "></input>\
						<label for='add'>Include in Quiz</label>\
						<button class='deleteButton'>Delete</button><br>\
					</div>\
				</center>\
			")
		};

	}

	$("#export").prop("readOnly", true);
	$("#export").val('{"' + currentTopic.topicName + '":' + JSON.stringify(currentTopic) + '}')


function read(){
		var a = $("#container").find(".questionDiv");
		var vars = {};
		currentTopic.questions = [];

		currentTopic.brief = $("#descript").val();

		//generic counters
		var i1 = 0;
		var i2 = 0;
		var i3 = 0;
		var i4 = 0;

		//question module
  		$(".qclass").each(function(){
    		i1++;
    		$(this).attr("id", ("q"+ i1))
  		})

  		//answer module
  		$(".aclass").each(function(){
    		i2++;
    		$(this).attr("id", ("a"+ i2))
  		})

			//notes module
			$(".nclass").each(function(){
    		i3++;
    		$(this).attr("id", ("n"+ i3))
  		})

			$(".addToQuiz").each(function(){
				i4++;
				$(this).attr("id", ("box" + i4))
			})

  		//reads the values
		for(i = 0; i < a.length; i++){

			var box = $("#box"+ (i+1)).prop("checked")

			if( $("#q"+ (i+1)).val() != "" || $("#q"+ (i+1)).attr("id") == "q1"){
				var question = $("#q" + (i+1)).val();
			}else{
				alert("There are empty fields, did not save. Enter a value or delete the field")
				return;
			}
			if ( $("#a"+ (i+1)).val() != "" || $("#a"+ (i+1)).attr("id") == "a1"){
				var answer = $("#a" + (i+1)).val()
			}else{
				alert("There are empty fields, did not save. Enter a value or delete the field")
				return;
			}
			if ( $("#n"+ (i+1)).val() != "" || $("#n"+ (i+1)).attr("id") == "n1"){
				var notes = $("#n" + (i+1)).val()
			}

			vars["set" + (i+1)] = {q: question, a: answer, n: notes, checked: box}
		}

		//gets the object and updates question array
		for (var k in vars){
			if (vars.hasOwnProperty(k)){
				currentTopic.questions.push(vars[k]);
			}else{}
		}
		subjects[gotSubject] = currentArray;

		localStorage.setItem("subjectArr", JSON.stringify(subjects))
		console.log(JSON.parse(localStorage.subjectArr))
	}

	//deletion module
	$("body").on("click", ".deleteButton", function(){
		var noofContainers = $(this).parents("#container");
		var index = noofContainers.children("center").length;

		if(index != 1){
			var a = $(this).parents("center");

			if($(this).siblings(".aclass").val() == "" && $(this).siblings(".qclass").val() == ""){
				a.remove();
			}else{
				a.remove();
				read();
			}
		}else{}
	})

	$("#deleteSubject").click(function(){
		var sure = confirm("Are you sure you want to delete this subject? You will lose all your data forever if you do!");

		if (sure == true){
			delete subjects[gotSubject];
			localStorage.setItem("subjectArr", JSON.stringify(subjects));
			window.location.href = "index_subject.html";
		}else{}
	})

	function save(){
		changes = 0;
		saveState = 0;
		$("#save").toggleClass("active");
		console.log(saveState);
		read();
	}

	$("body").on("click", "#save", function(){
		save();
		$("#export").val('{"' + currentTopic.subjectName + '":' + JSON.stringify(currentTopic) + '}');
	})

	window.onbeforeunload = function(){
		if (saveState == 1){
			return "You have unsaved changes, are you sure you want to leave?";
		}else{}
	}

	$("body").on("click", "#addQuestion", function(){
		var a = $("#container").children(".questionDiv");
		var b = a.length;
		var c = b+1;
		$("#container").append("\
			<center>\
				<div class='questionDiv'>\
					<textarea class='qclass' id='q" + c + "' rows='6' cols='45' style='resize:none; 'placeholder='Enter question here' type='text'></textarea>\
					<textarea class='aclass' id='a" + c + "' rows='6' cols='45' style='resize:none; 'placeholder='Enter answer here'type='text'></textarea>\
					<textarea class='nclass' id='n" + c + "' rows='6' cols='45' style='resize:none; 'placeholder='Enter notes here'type='text'></textarea><br>\
					<button class='deleteButton'>Delete</button><br>\
				</div>\
			</center>\
		")

	})

	$(".addToQuiz").click(function(){
		console.log($(this).prop("checked"))
	})

});
