/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function(tweet) {
  const $tweet = 
  `<article class="tweet-top">
    <div class="picture-and-name">
      <img src="https://i.imgur.com/0IaXgzM.jpeg">
      <p class="name">${tweet.user.name}</p>
    </div>
    <p class="handle">${tweet.user.handle}</p>
  </article>
  <article class="tweet-middle">
    <p>${tweet.content.text}</p>
  </article>
  <footer>
    <p>${tweet.created_at}</p>
    <div class="buttons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>`;
  return $tweet;
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.