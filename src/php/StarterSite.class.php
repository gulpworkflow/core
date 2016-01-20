<?php

class StarterSite extends TimberSite {

  function __construct() {
    add_theme_support( 'post-formats' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );
    add_filter( 'timber_context', array( $this, 'add_to_context' ) );
    add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
    add_action( 'init', array( $this, 'register_post_types' ) );
    add_action( 'init', array( $this, 'register_taxonomies' ) );
    parent::__construct();
  }

  function register_post_types() {
    //this is where you can register custom post types
  }

  function register_taxonomies() {
    //this is where you can register custom taxonomies
  }

  function add_to_context( $context ) {
    $context['menu'] = NavGetActive();
    $context['getStarted'] = GetStarted();

    // add footer content to the context
    $footerPageID = 24;
    $locations = array();
    if(have_rows('locations',$footerPageID)) {
      while(have_rows('locations',$footerPageID)) {
        the_row();
        $this_location['name'] = get_sub_field('name');
        $this_location['contactDetails'] = get_sub_field('contact_details');
        array_push($locations,$this_location);
      }
      $context['locations'] = $locations;
    }
    return $context;
  }

  function add_to_twig( $twig ) {
    /* this is where you can add your own fuctions to twig */
    $twig->addExtension( new Twig_Extension_StringLoader() );
    $twig->addFilter( 'myfoo', new Twig_Filter_Function( 'myfoo' ) );

    //
    // Display Gravity Forms
    //
    $gravityfunction = new Twig_SimpleFunction('displaygform', function ($id) {
      $tabindex = '';
      $form = gravity_form($id, false, false, false, '', $ajax=false, $tabindex);
      return $form;
    });
    $twig->addFunction($gravityfunction);

    return $twig;
  }

}
