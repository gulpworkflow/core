<?php
/*

This function creates the data object for the primary "call to action", which the user sees as "Get Started".
We add this function to our global context, so you can access this anywhere in the app!!

See the GetStarted.scss partial in the "scss" source folder to see how to use this data object to populate the UI.

*/
function GetStarted() {
  $getStartedPageID = 27;
  $get_started = array();
  $get_started['callTitle']        = get_field('call_us_title',$getStartedPageID);
  $get_started['availableText']    = get_field('available_text',$getStartedPageID);
  $get_started['unavailableText']  = get_field('unavailable_text',$getStartedPageID);
  $get_started['phone']            = get_field('hotline_phone_number',$getStartedPageID);

  /* Determine if the Global Docs folks are currently available for users to call.
     If not, we'll need to tell the user when they're next available. */
     $schedule = array();
     if(have_rows('schedule_availability',$getStartedPageID)) {
        while(have_rows('schedule_availability',$getStartedPageID)) {
          the_row();
          /* */
          $this_day = null;
          if(get_sub_field('available')) { // only evaluate days when they are available
            /* Set this day's availability as a seris of UNIX timestamps */
            $this_day['day']    = strtotime(get_sub_field('day_of_the_week'));
            $this_day['start']  = strtotime(get_sub_field('available_start_time'));
            $this_day['end']    = strtotime(get_sub_field('available_end_time'));
            /*if(date(l,strtotime("now")) === get_sub_field('day_of_the_week')) {
              console_dump(get_sub_field('day_of_the_week'));
            }*/
            array_push($schedule,$this_day); // add today's info to our schedule object
          }
        }
        $get_started['schedule'] = $schedule; // add schedule to the 'get started' object
        //console_dump(date('ga',1447261200));
     }

  /* Get all the document types. */
     $document_types = array();
     query_posts('post_type=document-type');
     while (have_posts()) {
       the_post();
       $currentID = get_the_ID();

       $this_document_type = null; // clear out the temporary object
       $this_document_type['title']       = get_the_title();
       $this_document_type['icon']        = get_field('documentType_icon',$currentID);
       $this_document_type['permalink']   = get_permalink($currentID);
       array_push($document_types, $this_document_type);
     }
     wp_reset_query();  // reset the wp query
     $get_started['documentTypes'] = $document_types; // add doc types to the 'get started' object
  // --
  return $get_started;  // This is the money object
}
