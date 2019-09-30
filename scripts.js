// write a factory function to create a tweet
// our tweets will include (tweet) content, retweets, likes, and comments
// write corresponding methods to edit data values for each tweet - likes, retweets, comments
function constructTweet () {
}

// write a factory function to create our user
// our user will include name, twitter handle, bio, location, followers, tweets
// as well as methods for writing tweets and adding followers
function constructUser () {
}

function displayTweets (user) {
  const tweetsList = document.getElementById('tweets')
  // clear tweets before each display
  tweetsList.innerHTML = ''

  user.tweets.forEach((tweet, index) => { // find way for students to do this since it's in the curriculum
    const tweetListElement = document.createElement('li')
    tweetListElement.setAttribute('class', 'tweet')
    tweetListElement.setAttribute('data-id', index)
    tweetsList.prepend(tweetListElement)
    const { likes, retweets, comments } = tweet
    const tweetHTML = constructTweetHTML(tweet.content, likes, retweets, comments.length, comments)
    tweetListElement.innerHTML = tweetHTML
  })
}

function constructTweetHTML (tweetContent, numberOfLikes, numberOfRetweets, numberOfComments, comments) {
  const likeButton = createLikeButtonForTweet(numberOfLikes)
  const retweetButton = createRetweetButtonForTweet(numberOfRetweets)
  const commentButton = createCommentButtonForTweet(numberOfComments)
  const commentValues = constructCommentsForTweet(comments)

  return `
    <p>${tweetContent}</p><div class="tweet-buttons">${commentButton}${likeButton}${retweetButton}</div>
    <ul class="tweet-comments">${commentValues}</ul>
    <input class="add-comment-input" placeholder="Add comment to this tweet...">
  `
}

function createLikeButtonForTweet (value) {
  return `<div class="tweet-button like-button"><p class="tweet-value">${value}</p></div>`
}

function createRetweetButtonForTweet (value) {
  return `<div class="tweet-button retweet-button"><p class="tweet-value">${value}</p></div>`
}

function createCommentButtonForTweet (value) {
  return `<div class="tweet-button comment-button"><p class="tweet-value">${value}</p></div>`
}

function constructCommentsForTweet (comments) {
  if (comments) {
    return comments.reduce((total, comment) => total + `<li class="tweet-comment">&mdash; ${comment}</li>`, '')
  }
  return ``
}

function listenForClicks (user) {
  document.addEventListener('click', function (event) {
    if (event.target.matches('.like-button')) {
      const tweetToLike = event.target.closest('.tweet')
      const tweetIndex = tweetToLike.dataset.id
      user.tweets[tweetIndex].like()
      displayTweets(user)
    }
    if (event.target.matches('.retweet-button')) {
      const tweetToLike = event.target.closest('.tweet')
      const tweetIndex = tweetToLike.dataset.id
      user.tweets[tweetIndex].retweet()
      displayTweets(user)
    }
    if (event.target.matches('#follow-icon')) {
      user.addFollower()
      displayProfileInfo(user)
    }
  })
}

function listenForAddTweet (user) {
  const tweetInput = document.getElementById('add-tweet')

  tweetInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      const tweetContent = document.getElementById('add-tweet').value
      if (tweetContent.trim() !== '') {
        user.writeTweet(tweetContent)
        document.getElementById('add-tweet').value = ''
        displayTweets(user)
        displayProfileInfo(user)
      }
    }
  })
}

function listenForAddComment (user) {
  document.addEventListener('keyup', function (event) {
    if (event.target.matches('.add-comment-input') && event.key === 'Enter') {
      const tweetToAddComment = event.target.closest('.tweet')
      const tweetIndex = tweetToAddComment.dataset.id
      const commentContent = event.target.value
      user.tweets[tweetIndex].addComment(commentContent)
      displayTweets(user)
    }
  })
}

function displayProfileInfo (user) { // students can fill this out
  document.getElementById('username').textContent = null
  document.getElementById('user-handle').textContent = null
  document.getElementById('user-bio').textContent = null
  document.getElementById('user-location').textContent = null
  document.getElementById('number-of-tweets').textContent = null
  document.getElementById('number-of-followers').textContent = null
}

// create a user using the factory function we created to bring our app to life

function run (user) {
  displayTweets(user)
  displayProfileInfo(user)
  listenForClicks(user)
  listenForAddTweet(user)
  listenForAddComment(user)
}

// plug in the user that you created in our run function here
run()
