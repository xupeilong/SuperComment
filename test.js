var commentCount = 0;

function getSel()
{
//得到选区
var select = window.getSelection();
var selectRange = select.getRangeAt(0);
if (!select.isCollapsed)	//选取为空则跳过
{
	commentCount++;
	select.collapse(select.anchorNode, 0); 
	//评论源的创建
	var sourceNode = document.createElement("span");
	sourceNode.id = "sn" + commentCount;
	sourceNode.style.display = "inline-block";
	sourceNode.style.position = "relative";
	selectRange.surroundContents(sourceNode);
	$('#sn' + commentCount).css("pointer-events", "none");
	
	var sourceOuter  = document.createElement("div");
	sourceOuter.id = "so" + commentCount;
	sourceOuter.style.background = "black";
	sourceOuter.style.opacity = 0.5;

	sourceOuter.style.width = $('#sn' + commentCount).css("width");
	sourceOuter.style.height = $('#sn' + commentCount).css("height");
	sourceOuter.style.position = "absolute";
	sourceOuter.style.left = -2 + "px";
	sourceOuter.style.top = -2 + "px";
	
	sourceNode.appendChild(sourceOuter);
	$('#so' + commentCount).css("z-index", -20);
	$('#so' + commentCount).css("padding", 2);
	$('#so' + commentCount).corner();	
	
	var sourceInner  = document.createElement("div");
	sourceInner.id = "si" + commentCount;
	sourceInner.style.background = "white";
	sourceInner.style.opacity = 0.5;	
	
	sourceInner.style.width = $('#sn' + commentCount).css("width");
	sourceInner.style.height = $('#sn' + commentCount).css("height");
	sourceInner.style.position = "absolute";
	sourceInner.style.left = 2 + "px";
	sourceInner.style.top = 2 + "px";
	
	sourceOuter.appendChild(sourceInner);
	$('#si' + commentCount).css("z-index", -10);
	$('#si' + commentCount).corner();
	
	
	//评论的建立
	var commentNode = document.createElement("div");
	var commentOuter = document.createElement("div");
	commentOuter.id = "co" + commentCount;
	commentOuter.style.height = 26 + "px";
	commentOuter.style.width = 100 + "px";
	commentOuter.style.background = "black";
	commentNode.id = "cn" + commentCount;
	commentNode.style.position = "absolute";
	commentNode.style.left = $('#sn' + commentCount).offset().left + 100 + "px";
	commentNode.style.top = $('#sn' + commentCount).offset().top + 50 + "px";
	commentNode.appendChild(commentOuter);

	var commentInner = document.createElement("div");
	commentInner.id = "ci" + commentCount;
	commentInner.style.height = 20 + "px";
	commentInner.style.width = 94 + "px";
	commentInner.style.position = "absolute";
	commentInner.style.left = 3 + "px";
	commentInner.style.top = 3 + "px";
	commentInner.style.background = "white";
	commentInner.style.zIndex = 2800;
	commentOuter.appendChild(commentInner);





	document.body.appendChild(commentNode);
	$('#co' + commentCount).corner("round 8px");
	$('#ci' + commentCount).corner("round 8px");
	commentOuter.style.opacity = 0.5;
	commentInner.style.opacity = 0.5;


	var commentText = document.createElement("textarea");
	commentText.id = "ct" + commentCount;
	commentText.cols = 10;
	commentText.rows = 1;
	commentText.style.overflow = "hidden";

	commentNode.appendChild(commentText);
	commentText.style.position = "absolute";
	commentText.style.left = 3 + "px";
	commentText.style.top = 3 + "px";
	commentText.style.border = 0;
	commentText.style.background = "transparent";
	
	//高度自动调整
	
	$('#ct' + commentCount).autoResize({
		animateCallback  : function() {
			boxResize();
		},
		extraSpace : 0
	});
	
	function boxResize()
	{	
		var textHeight;
		textHeight = parseInt($('#ct' + commentCount).height());        
		commentOuter.style.height = textHeight + 8;
		commentInner.style.height = textHeight + 2;
	}
	
	function commitComment(evt)
	{
		if(evt.keyCode == 13){ 
			commentText.readOnly = true;
			var cover = document.createElement("div");
			cover.id = 'cv' + commentCount;
			cover.style.height = commentInner.style.height ;
			cover.style.width = commentInner.style.width;			
			cover.style.position = "absolute";
			cover.style.left = 3 + "px";
			cover.style.top = 3 + "px";
			cover.style.zIndex = 2900;
			commentNode.appendChild(cover);			
		}
	}
	
	
	commentText.addEventListener("keypress", commitComment, false);
	




	//连线
	jsPlumb.setRenderMode(jsPlumb.VML);
	var endpointOptions = {
				endpoint:"Dot",					
				paintStyle:{ fillStyle:"#558822",radius:3 },
				anchor:[ "LeftMiddle", "RightMiddle" , "TopCenter", "BottomCenter", "TopLeft", "TopRight", "BottomLeft", "BottomRight"]
			};


	
	jsPlumb.setMouseEventsEnabled(false);

	var sourceEndpoint = jsPlumb.addEndpoint('sn' + commentCount, endpointOptions );  
	var targetEndpoint = jsPlumb.addEndpoint('cn' + commentCount, endpointOptions ); 

	



	jsPlumb.connect({ 
		target : sourceEndpoint,
		source : targetEndpoint,		
		connector: [ "Bezier", { curviness:100 }],
		paintStyle:{ 
					lineWidth: 1, 
					strokeStyle: "black"
					}
	});  

	$('._jsPlumb_connector').css("z-index", 1);
	$('._jsPlumb_connector').css("pointer-events", "none");
	$('._jsPlumb_endpoint').css("z-index", 2);
	$("#cn" + commentCount).css("z-index", 2700);
	jsPlumb.draggable($("#cn" + commentCount));
	
	
	

}
}
alert(document.body);
document.body.addEventListener("mouseup", getSel, false); 
document.body.appendChild(document.createElement('script')).src='http://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js';
document.body.appendChild(document.createElement('script')).src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js';
document.body.appendChild(document.createElement('script')).src='https://raw.github.com/xupeilong/SuperComment/master/jquery.corner.js';
document.body.appendChild(document.createElement('script')).src='http://jsplumb.googlecode.com/files/jquery.jsPlumb-1.3.3-all-min.js';





