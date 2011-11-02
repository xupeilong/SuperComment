
var num = 0;

function getSel()
{

var sel = window.getSelection();
var selRange = sel.getRangeAt(0);
if (!sel.isCollapsed)
{
alert("go"); 
var newNode = document.createElement("span");
num++;
newNode.id = "ttt" + num;
newNode.style.color = "red";
newNode.style.background = "blue";
selRange.surroundContents(newNode);
$("#ttt" + num).corner();

var newComment = document.createElement("div");
newComment.id = "sss" + num;
newComment.class = "comment";
newComment.innerText = "sss";
newComment.style.height = 300;
newComment.style.width = 300;
newComment.style.position = "absolute";
newComment.style.background = "red";
newComment.style.left = 300;
newComment.style.top = 200;
newNode.appendChild(newComment);


jsPlumb.setRenderMode(jsPlumb.VML);


var targetEndpoint = {
				endpoint:"Dot",					
				paintStyle:{ fillStyle:"#558822",radius:11 },
				isTarget:true,
				anchor:[ "LeftMiddle", "RightMiddle" , "TopCenter", "BottomCenter", "TopLeft", "TopRight", "BottomLeft", "BottomRight"]
			};


jsPlumb.Defaults.DragOptions = { cursor: 'pointer', zIndex:2000 };
jsPlumb.setMouseEventsEnabled(true);

var window3Endpoint = jsPlumb.addEndpoint('ttt' + num,targetEndpoint );  
var window4Endpoint = jsPlumb.addEndpoint('sss' + num,targetEndpoint ); 

jsPlumb.bind("jsPlumbConnection", function(connInfo) { 
				init(connInfo.connection);
			});



jsPlumb.connect({ 
	source:window3Endpoint,
	target:window4Endpoint,
});  

$('._jsPlumb_connector').css("z-index", 1);
$('._jsPlumb_connector').css("pointer-events", "none");
$('._jsPlumb_endpoint').css("z-index", 2);
$("#sss" + num).css("z-index", 2700);
jsPlumb.draggable($("#sss" + num));




document.forms[0].selectedtext.value = selRange.toString();
}
}
alert(document.body);
document.body.addEventListener("mouseup", getSel, false); 



