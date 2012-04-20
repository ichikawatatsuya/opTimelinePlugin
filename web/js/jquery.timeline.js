/*********************************************************
** jQuery timeilinePlugin functions
** how to use : $('#element').timelineComment();
**              $('#element').timelineDelete();
** @parts     : opTimelinePlugin
** @author    : Shouta Kashiwagi <kashiwagi@tejimaya.com>
**********************************************************/
(function($){

  $.fn.timelineComment = function(settings){
    settings = jQuery.extend({
      loader_path: '',
      callback: function(){},
    });
    return this.each(function(){
      $(this).click(function(){
        var id = $(this).attr("data-timeline-id");
        var foreign = $(this).attr('data-activity-foreign');
        var foreignId = $(this).attr('data-activity-foreign-id');
        var body = $('#comment-textarea-'+id).val();
                                $timelineLoader = $(this).parent().next();
        $timelineLoader.next().text('');
        $timelineLoader.next().hide();
        $timelineLoader.show();
        $(this).parent().hide();
        $.ajax({
          url: openpne.apiBase + 'activity/post.json',
          type: 'POST',
                data: 'body=' + body + '&in_reply_to_activity_id=' + id + '&apiKey=' + openpne.apiKey + '&target=' + foreign + '&target_id=' +foreignId,
                dataType: 'json',
                success: function(data) {
                  if(data.status=='success'){
                      $('#comment-textarea-'+id).val('');
                      $timelineLoader.hide();
                      timelineAllLoad();
                  }else{
                      alert(data.message);
                  }
                },
          error: function(x, r, t) {
            $timelineLoader.hide();
            $timelineLoader.next().text('投稿に失敗しました');
            $timelineLoader.next().show();
            $timelineLoader.prev().show();
          }
        });
        return false;
      });
    });
  };

  $.fn.timelineDelete = function() {
    return this.each(function(){
      $(this).click(function(){
      $(this).hide();
      $(this).parent().next().show();
      var activity_id = $(this).attr('data-activity-id');
        $.ajax({
          url: openpne.apiBase + 'activity/delete.json',
          type: 'POST',
                data: 'activity_id=' + activity_id + '&apiKey=' + openpne.apiKey,
                dataType: 'json',
                success: function(data) {
            $(this).parent().next().hide();
            $.colorbox.close();
            timelineAllLoad();
                },
          error: function(x, r, t) {
            $(this).parent().next().hide();
            $.colorbox.close();
          }
        });
      });
    });
  };

})(jQuery);
