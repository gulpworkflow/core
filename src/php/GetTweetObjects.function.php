<?php
/**
 *
 * Return Tweets as data objects that we can pass into our templates
 *
 * @param    object  $object The object to convert
 * @return      array
 *
 */
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

function GetTweetObjects() {

  // API access
  $twitter_consumer_key          = 'ekQvmtbwtMDVfRytdSaqwFUdH';
  $twitter_consumer_secret       = 'CUFwJrkQsVsRHJACEA6l47udWtiCsaLyoVQBrLAusgdguVsrXH';
  $twitter_access_token          = '4150706475-uPYFKKf5uozK36uVqd9hFVUbfW5viAKc3NBWCUH';
  $twitter_access_token_secret   = 'XngFVl9el1H9pAit7b8ON0bJY79XlMJ7RpXjaaNfREfqo';
  // Configuration Settings
  $twitter_user_name             = 'TweetGlobalDocs';
  $settings_tweet_limit          = 6;
  $settings_include_retweets     = 'false';
  $settings_exclude_replies      = 'true';

  $twitter = new TwitterOAuth($twitter_consumer_key, $twitter_consumer_secret, $twitter_access_token, $twitter_access_token_secret);
  # Migrate over to SSL/TLS
  $twitter->ssl_verifypeer = true;
  # Load the Tweets
  $tweets = $twitter->get('statuses/user_timeline', array('screen_name' => $twitter_user_name, 'exclude_replies' => 'true', 'include_rts' => 'false', 'count' => $settings_tweet_limit));
  # Example output
  if(!empty($tweets)) {
      /*foreach($tweets as $tweet) {
          # Access as an object
          $tweetText = $tweet['text'];
          # Make links active
          $tweetText = preg_replace("#(http://|(www.))(([^s<]{4,68})[^s<]*)#", '<a href="http://$2$3" target="_blank">$1$2$4</a>', $tweetText);
          # Linkify user mentions
          $tweetText = preg_replace("/@(w+)/", '<a href="http://www.twitter.com/$1" target="_blank">@$1</a>', $tweetText);
          # Linkify tags
          $tweetText = preg_replace("/#(w+)/", '<a href="http://search.twitter.com/search?q=$1" target="_blank">#$1</a>', $tweetText);
          # Output
          echo $tweetText;
      }*/
      return $tweets;
  }
}
