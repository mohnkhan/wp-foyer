/**
 * Initializes the slide background select on the slide admin page, with the saved background.
 *
 * @since	1.4.0
 *
 * @return 	void
 */
function init_slide_background_select() {
	var $slide_background_select;
	var slide_background;

	$slide_background_select = jQuery('#foyer_slide_content select[name=slide_background]');
	slide_background = jQuery('#foyer_slide_content select[name=slide_background]').val();

	update_slide_background_select();

	$slide_background_select.find('option[value="'+slide_background+'"]').attr('selected','selected');
}

/**
 * Hide/unhides slide background meta boxes on the slide admin page.
 *
 * @since	1.4.0
 *
 * @return 	void
 */
function update_slide_background_meta_boxes() {
	var $meta_boxes;
	var slide_format;

	$meta_boxes = jQuery('.foyer_slide_backgrounds > *');
	slide_background = jQuery('#foyer_slide_content select[name=slide_background]').val();

	$meta_boxes.hide().filter('#foyer_slide_background_'+slide_background).show();
}

/**
 * Rebuilds the slide background select on the slide admin page, for the selected slide format.
 *
 * @since	1.4.0
 *
 * @return 	void
 */
function update_slide_background_select() {
	var $slide_background_select;
	var slide_format;
	var slide_format_backgrounds;

	$slide_background_select = jQuery('#foyer_slide_content select[name=slide_background]');
	slide_format = jQuery('#foyer_slide_content select[name=slide_format]').val();
	slide_format_backgrounds = foyer_slide_formats_backgrounds[slide_format];

	$slide_background_select.empty();

	if (slide_format_backgrounds) {
		jQuery.each(slide_format_backgrounds, function(key, data) {
			$slide_background_select.append(
				jQuery('<option></option>').attr('value', key).text(data.title)
			);
		});
	}
}

/**
 * Hide/unhides slide format meta boxes on the slide admin page.
 *
 * @since	1.0.0
 * @since	1.4.0	Rewritten to work with the new content meta box that includes format and background selects and their content.
 *
 * @return 	void
 */
function update_slide_format_meta_boxes() {
	var $meta_boxes;
	var slide_format;

	$meta_boxes = jQuery('.foyer_slide_formats > *');
	slide_format = jQuery('#foyer_slide_content select[name=slide_format]').val();

	$meta_boxes.hide().filter('#foyer_slide_format_'+slide_format).show();
}

jQuery( function() {

	if (jQuery('#foyer_slide_content select[name=slide_format], #foyer_slide_content select[name=slide_background]').length) {
		// Hide/unhide meta boxes on page load.
		init_slide_background_select();
		update_slide_format_meta_boxes();
		update_slide_background_meta_boxes();
	}

	// Hide/unhide meta boxes if user selects another slide format or background.
	jQuery('#foyer_slide_content select[name=slide_format]').on('change', function() {
		update_slide_background_select();
		update_slide_format_meta_boxes();
		update_slide_background_meta_boxes();
	});
	jQuery('#foyer_slide_content select[name=slide_background]').on('change', function() {
		update_slide_background_meta_boxes();
	});

});

/**
 * Handle file uploads for slide image fields
 *
 * @since	1.0.0
 * @since	1.1.3	Fixed an issue where adding an image to a slide was only possible when
 *					the image was already in the media library.
 * @since	1.5.2	Removed setting the width to auto on the preview image, sizing is now done with CSS.

 *
 * Based on: http://jeroensormani.com/how-to-include-the-wordpress-media-selector-in-your-plugin/
 */
jQuery( function() {

	// Uploading files
	var wp_media_post_id;

	if (wp.media) {
		wp_media_post_id = wp.media.model.settings.post.id;

		jQuery('.slide_image_upload_button').on('click', function(event) {
			var slide_image_field;
			var file_frame;
			event.preventDefault();
			slide_image_field = jQuery(this).parent();

			// If the media frame already exists, reopen it.
			if (file_frame) {

				// Open frame
				file_frame.open();
				return;
			}

			// Create the media frame.
			file_frame = wp.media.frames.file_frame = wp.media({
				title: foyer_slide_image_defaults.text_select_photo,
				button: {
					text: foyer_slide_image_defaults.text_use_photo
				},
				multiple: false // Set to true to allow multiple files to be selected
			});

			// When an image is selected, run a callback.
			file_frame.on('select', function() {

				// We set multiple to false so only get one image from the uploader
				var attachment;
				attachment = file_frame.state().get('selection').first().toJSON();

				// Do something with attachment.id and/or attachment.url here
				var image_preview_url;

				if (typeof(attachment.sizes) !== 'undefined' && typeof(attachment.sizes.full.url) !== 'undefined') {
					image_preview_url = attachment.sizes.full.url;
				}
				else {
					image_preview_url = attachment.url;
				}
				slide_image_field.find('.slide_image_preview').attr('src', image_preview_url);
				slide_image_field.find('.slide_image_value').val(attachment.id);

				// Restore the main post ID
				wp.media.model.settings.post.id = wp_media_post_id;

				slide_image_field.removeClass('empty');
			});

			// Finally, open the modal
			file_frame.open();
		});

		// Delete the selected image.
		jQuery('.slide_image_delete_button').on('click', function(event) {
			var slide_image_field;
			var file_frame;
			event.preventDefault();
			slide_image_field = jQuery(this).parent();
			slide_image_field.find('.slide_image_preview').attr('src', '');
			slide_image_field.find('.slide_image_value').val('');
			slide_image_field.addClass('empty');
		});

		// Restore the main ID when the add media button is pressed
		jQuery('a.add_media').on('click', function() {
			wp.media.model.settings.post.id = wp_media_post_id;
		});
    }
});