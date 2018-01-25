<?php
/**
 * Video slide background template.
 *
 * @since	1.4.0
 */

$slide = new Foyer_Slide( get_the_id() );

$video_url = get_post_meta( $slide->ID, 'slide_bg_video_video_url', true );
$video_start = get_post_meta( $slide->ID, 'slide_bg_video_video_start', true );
$video_end = get_post_meta( $slide->ID, 'slide_bg_video_video_end', true );
$hold_slide = get_post_meta( $slide->ID, 'slide_bg_video_hold_slide', true );

// URL is saved in format https://youtu.be/r9tbusKyvMY
// We need the ID, the last bit
$video_id = substr( $video_url, strrpos( $video_url, '/' ) + 1 );

if ( ! empty( $video_id ) ) {

	?><div<?php $slide->background_classes(); ?><?php $slide->background_data_attr();?>>
		<div class="youtube-video-container" id="<?php echo uniqid(); ?>"
			data-foyer-video-id="<?php echo $video_id; ?>"
			data-foyer-video-start="<?php echo $video_start; ?>"
			data-foyer-video-end="<?php echo $video_end; ?>"
			data-foyer-hold-slide="<?php echo $hold_slide; ?>"
		></div>
	</div><?php

}