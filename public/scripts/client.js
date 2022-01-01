/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.all-tweets').append($tweet);
    }
  }
  
  const createTweetElement = function(tweet) {
    const $tweet = 
    $(`
    <section class="tweets">
      <article class="tweet-top">
        <div class="picture-and-name">
          <img src="${tweet.user.avatars}">
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
      </footer>
    </section>
    `);
    return $tweet;
  }
  
  renderTweets(data);

  $("form").submit(function(event) {
    event.preventDefault();
  });

  $("button").on('click', function() {
    console.log('Button clicked, performing ajax call...');
    const data = $('textarea').serialize();
    $.ajax('/tweets', { method: 'POST', data: data })
    .then(function () {
      console.log(data);
    });
  });
});