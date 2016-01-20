<?php
/**
 * Nav - Get Active
 * ---------------------------------------------------------------------------------------------------------------------
 * Create a navigation object based on current page URL.
 *
 *
 */

register_nav_menus( array(
        'mainNav'   => __( 'Main menu')
) );

// custom menu example @ http://digwp.com/2011/11/html-formatting-custom-menus/
function NavGetActive() {

    // specify custom menu slug as definited in regeister_nav_menus
    $menu_name = 'mainNav';


    // How many slashes until the name of section?
    $how_many_slashes_between = 1; // This is the portion of URL we're trying to matchon .
                                   // Ie: http://arlingtoncap.com/investments/ahm, we're looking for "investments"
                                   // As you can see, there is 1 slash separating them so this variable is "1";


    // Query the current page and find the current site section in URL string
    // exclude http, www, or any other request related info.
    //This relies the base URL to be in the development URL (ie build.com/build/yourdomain.com )
    $url_base_string = get_site_url();
    $url = $_SERVER['REQUEST_URI'];
    $current_url_parts = explode('/', $url);
    $url_key = array_search($url_base_string, $current_url_parts);
    // This is the portion of URL we're trying to matchon .
    $url_match_partial = $current_url_parts[$url_key + $how_many_slashes_between];

    // trim any empty URL parts, they aren't real parts of the URL
    $current_url_parts = array_filter(array_map('trim', $current_url_parts));
    //console_dump(empty($current_url_parts));
    // Ie: http://arlingtoncap.com/investments/ahm, we're looking for "investments"


    if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
        $menu = wp_get_nav_menu_object($locations[$menu_name]);
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        if(empty($current_url_parts)) {
            return $menu_items;
        }

        foreach ((array) $menu_items as $key => $menu_item) { // loop through all menu items and build menu

            $title = $menu_item->title;
            $url = $menu_item->url;
            $menu_item->is_active = false;

            // check if this item matches the URL string that corresponds to site section, ie "about" or "contact"
            $item_url_parts = explode('/', $url);
            //console_dump($item_url_parts);
            $url_item_key = array_search($url_match_partial, $item_url_parts);
            //$url_item_match_partial = $item_url_parts[$url_item_key + $how_many_slashes_between];

            if($url_item_key) {
                $menu_item->is_active = true;
            }
           // if($url_item_match_partial == $url_match_partial) {

            //}

        }
       // console_dump($menu_items);
        return $menu_items;
    }

}
