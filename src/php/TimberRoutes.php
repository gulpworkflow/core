<?php

Timber::add_route('submit', function($params){
    //$query = 'posts_per_page=10&post_type=resources&taxonomy=subject&term='.$params['subject'];
    Timber::load_template('submit-inquiry.php');
});

Timber::add_route('help', function($params){
    //$query = 'posts_per_page=10&post_type=resources&taxonomy=subject&term='.$params['subject'];
    Timber::load_template('archive-question.php');
});
