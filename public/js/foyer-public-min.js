function foyer_setup_slide_group_classes(){jQuery(foyer_slides_selector).children().addClass("foyer-slide-group-1")}function foyer_setup_display(){jQuery(this).css("cursor","none"),major_refresh_timeout=setTimeout(foyer_display_reload_window,288e5),foyer_loader_intervalObject=window.setInterval(foyer_load_display_data,3e4)}function foyer_load_display_data(){var e,r;jQuery(".foyer-slide-group-1").length?jQuery(".foyer-slide-group-2").length||(r="foyer-slide-group-2",e="foyer-slide-group-1"):(r="foyer-slide-group-1",e="foyer-slide-group-2"),r.length&&jQuery.get(window.location,function(t){if($new_html=jQuery(jQuery.parseHTML(t)),$new_html.find(foyer_channel_selector).attr("class")!==jQuery(foyer_channel_selector).attr("class"))foyer_ticker_shutdown(foyer_replace_channel,$new_html.find(foyer_channel_selector));else{var o=$new_html.find(foyer_slides_selector).children().addClass(r);1===jQuery(foyer_slides_selector).children().length&&1===$new_html.find(foyer_slides_selector).children().length?(jQuery(foyer_slides_selector).html(o),foyer_ticker_set_slide_active_next_classes()):(jQuery(foyer_slides_selector).children().last().after(o),jQuery(foyer_slides_selector).find("."+r).first().attrChange(function(t){jQuery(foyer_slides_selector).find("."+r).first().attrChange(function(r){jQuery(foyer_slides_selector).find("."+e).remove()})}))}})}function foyer_replace_channel(e){jQuery(foyer_channel_selector).replaceWith(e),foyer_setup_slide_group_classes(),setTimeout(foyer_ticker_setup,100)}function foyer_display_reload_window(){window.location.reload()}function foyer_ticker_setup(){foyer_ticker_set_slide_active_next_classes(),foyer_ticker_set_active_slide_timeout()}function foyer_ticker_set_slide_active_next_classes(){jQuery(foyer_slide_selector).first().removeClass("next").addClass("active"),jQuery(foyer_slide_selector).first().next().addClass("next")}function foyer_ticker_set_active_slide_timeout(e){var r=parseFloat(jQuery(foyer_slide_selector+".active").data("foyer-slide-duration"));!r>0&&(r=5),setTimeout(foyer_ticker_next_slide,1e3*r)}function foyer_ticker_next_slide(){var e=jQuery(foyer_slide_selector+".active"),r=jQuery(foyer_slide_selector).length,t=jQuery(foyer_slide_selector).index(e)+1;t>=r&&(t=0);var o=t+1;o>=r&&(o=0),e.removeClass("active"),foyer_ticker_shutdown?(foyer_ticker_shutdown=!1,setTimeout(function(){foyer_ticker_shutdown_callback(foyer_ticker_shutdown_callback_options)},2e3)):(jQuery(foyer_slide_selector).eq(t).removeClass("next").addClass("active"),jQuery(foyer_slide_selector).eq(o).addClass("next"),foyer_ticker_set_active_slide_timeout())}function foyer_ticker_shutdown(e,r){foyer_ticker_shutdown=!0,foyer_ticker_shutdown_callback=e,foyer_ticker_shutdown_callback_options=r}var foyer_display_selector=".foyer-display",foyer_channel_selector=".foyer-channel",foyer_slides_selector=".foyer-slides",foyer_slide_selector=".foyer-slide";jQuery(document).ready(function(){(jQuery("body.single-foyer_display").length||jQuery("body.single-foyer_channel").length||jQuery("body.single-foyer_slide").length)&&jQuery("html").addClass("foyer"),jQuery(foyer_display_selector).length&&(foyer_setup_display(),foyer_setup_slide_group_classes())}),jQuery(function(){!function(e){var r=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;e.fn.attrChange=function(e){if(r){var t={subtree:!1,attributes:!0},o=new r(function(r){r.forEach(function(r){o.disconnect(),e.call(r.target,r.attributeName)})});return this.each(function(){o.observe(this,t)})}}}(jQuery)});var foyer_ticker_shutdown=!1,foyer_ticker_shutdown_callback,foyer_ticker_shutdown_callback_options;jQuery(document).ready(function(){foyer_ticker_setup()});