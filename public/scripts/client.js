/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  // takes in an array of tweet objects and appends each one to the tweets container
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.all-tweets').append($tweet);
    }
  }
  
  // escape function for XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // takes in a tweet object and returns the HTML structure of the tweet 
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
        <p>${escape(tweet.content.text)}</p>
      </article>
      <footer>
        <p>${timeago.format(tweet.created_at)}</p>
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

  // event listener for submit and prevent its default behavior 
  $("form").submit(function(event) {
    event.preventDefault();
  });

  // hide error message 
  $('.error').hide();

  // serialize form data and send it to the server if tweet length is valid 
  $("button").on('click', function() {
    // slide up error message if one is showing
    $('.error').slideUp(300);
    const value = $('textarea').val();
    const valueLength = value.length;
    if (value === "" || value === null) {
      $('.error').text('Tweet is empty!');
      $('.error').slideDown(300);
    } else if (valueLength > 140) {
      $('.error').text('Tweet is too long!');
      $('.error').slideDown(300);
    } else {
      console.log('Button clicked, performing ajax call...');
      const data = $('textarea').serialize();
      $.ajax({ 
        url: '/tweets', 
        method: 'POST', 
        data: data,
        success: function() {
          $('textarea').val('');
        }
      })
      // refetch tweets on submission and display on the page without refreshing
      .then(function() {
        $('.counter').text('140');
        $.ajax({url: '/tweets', method: 'GET'})
        .then(function(tweetObject) {
          const lastTweet = createTweetElement(tweetObject[tweetObject.length-1]);
          $('.all-tweets').prepend(lastTweet);
        });
      })
    }
  });

  // fetch tweets from /tweets page 
  const loadTweets = function() {
    $.ajax({ 
      url: '/tweets', 
      method: 'GET'
    })
    .then(function(tweets) {
      renderTweets(tweets);
    })
  }

  loadTweets();

});