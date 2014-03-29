// JavaScript Document
function addID(){
	var p=0;
	$(".block p").each(function(){
		p++;
		var id=$(this).parents(".block").attr('id');
		$(this).prepend('<span class="comment-count">99<i class="icon-comment icon-4x icon-flip-horizontal"></i></span>').attr({'id': id+p, "title":"Double click to add comment."});
		$('<form id="form'+id+p+'" style="display:none;"><div class="form-element"><textarea class="form-textarea" id="textarea" ></textarea></div><div class="form-actions"><input type="button" class="form-submit submit-value" value="Add Comment" /> <input type="reset" class="form-submit form-cancel" value="Cancel" /></div></form>').insertAfter($(this).find(".post-content"));
	});
}
 $(document).ready(function(){
	addID();
	$(".post-content").click('live', function(){
		var postTitle = $(this).parents("form").find(".form-text").val();
		var postContent = $(this).parents("form").find(".form-textarea").val();
		var postID = $(".block:first").attr("id");
		postID = postID+1;
		if(postTitle=="" || postContent==""){$(this).parents("form").find(".form-text").addClass("error");$(this).parents("form").find(".form-textarea").addClass("error");}
		else{
			$('<div class="block" id="'+postID+'"><h2 class="block-title">'+postTitle+'</h2><div class="block-content"><p>'+postContent+'</p></div></div>').insertAfter($(this).parents("#main-post"));
			$(this).parents("form").find(".form-text").removeClass("error").val("");
			$(this).parents("form").find(".form-textarea").removeClass("error").val("");
			addID();
		}
	});

	$(".comment-count").click("live",function() {
		$(this).parents("p").find("form").toggle("slide",{direction:"up"},"slow");
		$(this).parents("p").find(".comments").toggle("slide",{direction:"up"},"slow");
		//CKEDITOR.replace('textarea');
	});
	
	$(".submit-value").click("live",function(){
		var now=new Date();    
		var time;
		var text=$(this).parents("form").find(".form-textarea").val();
		if(text==""){$(this).parents("form").find(".form-textarea").addClass("error");}
		else{
			$(this).parents("p").find(".comment-list").prepend('<span class="comment-row">'+ text +' <span class="time-stamp">'+dateFormat(now, "dddd, mmmm d, yyyy, h:MM tt")+'</span></span>');
			$(this).parents("form").find(".form-textarea").val("").removeClass("error");
		}
		//$.now();
		//alert();
	});
	$(".form-cancel").click("live",function(){
		$(this).parents("form").toggle("slide",{direction:"up"},"slow");
		$(this).parents("p").find(".comments").toggle("slide",{direction:"up"},"slow");
		$(this).parents("form").find(".form-textarea").removeClass("error");
	});
	$(".view-comments").click(function(){
		$(this).next(".comment-list").toggle();
		$(this).text(($(this).text() == 'View Comment') ? 'Hide Comment' : 'View Comment');
	});
});

/* hide element on escape key */
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        $("form").hide(); 
    }
});

$(window).load(function(){
	// console.log('A button has been clicked ');
});