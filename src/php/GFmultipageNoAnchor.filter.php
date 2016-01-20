<?php
// prevent gravity forms from scrolling down the page to a form anchor to form when paging through a mult-page form
// https://www.gravityhelp.com/forums/topic/disable-confirmation-anchor-revisit
add_filter('gform_confirmation_anchor', '__return_false');
