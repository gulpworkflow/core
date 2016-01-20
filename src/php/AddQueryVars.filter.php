<?php

// add custom variables to the Wordpress query string, so it knows to look for them
// can be treated like $_GET[] variables are outside of wordpress
// usage in theme is is like this:
//    $wp_query->query_vars['your-variable-here'];

function add_query_vars($aVars) {
  $vars = array('q'); //custom query attributes
  $aVars = array_merge( $aVars, $vars ); // combine terms into proper structure
  return $aVars; // spit it out
}

// hook add_query_vars function into query_vars
add_filter('query_vars', 'add_query_vars');
