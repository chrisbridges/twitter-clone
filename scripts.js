console.clear()
function constructUser (name, handle, bio, location) {
  return {
    name: name,
    handle: handle,
    bio: bio,
    location: location,
    followers: 0,
    tweets: [],
    writeTweet: function (content) {
      const tweet = constructTweet(content)
      this.tweets.push(tweet)
    },
    addFollower: function () {
      this.followers++
    }
  }
}

function constructTweet (content) {
  return {
    content: content,
    retweets: 0,
    likes: 0,
    comments: [],
    like: function () {
      this.likes++
    },
    retweet: function () {
      this.retweets++
    },
    addComment: function (comment) {
      this.comments.push(comment)
    }
  }
}

function displayTweets (user) {
  const tweetsList = document.getElementById('tweets')
  // 	clear tweets before each display
  tweetsList.innerHTML = ''
 	user.tweets.forEach((tweet, index) => {
    const tweetListElement = document.createElement('li')
    tweetListElement.setAttribute('class', 'tweet')
    tweetListElement.setAttribute('data-id', index)
    tweetsList.appendChild(tweetListElement)
    const { likes, retweets, comments } = tweet
    const tweetHTML = constructTweetHTML(tweet.content, likes, retweets, comments.length)
    tweetListElement.innerHTML = tweetHTML
  })
}

function constructTweetHTML (tweetContent, numberOfLikes, numberOfRetweets, numberOfComments) {
  const likeButton = createLikeButtonForTweet(numberOfLikes)
  const retweetButton = createRetweetButtonForTweet(numberOfRetweets)
  const commentButton = createCommentButtonForTweet(numberOfComments)
  return `<p>${tweetContent}</p><div class="tweet-buttons">${commentButton}${likeButton}${retweetButton}</div>`
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
    if (event.target.matches('.comment-button')) {
      const tweetToLike = event.target.closest('.tweet')
      const tweetIndex = tweetToLike.dataset.id
      user.tweets[tweetIndex].addComment('something')
      displayTweets(user)
    }
    if (event.target.matches('#follow-icon')) {
      user.addFollower()
      displayProfileInfo(user)
    }
  })
}

function displayProfileInfo (user) {
  document.getElementById('username').textContent = user.name
  document.getElementById('user-handle').textContent = `@${user.handle}`
  document.getElementById('user-bio').textContent = user.bio
  document.getElementById('user-location').textContent = user.location
  document.getElementById('number-of-tweets').textContent = user.tweets.length
  document.getElementById('number-of-followers').textContent = user.followers
}

const chrisBridges = constructUser('Chris Bridges', 'chris_bridges', 'JS Dev who loves teaching', 'Boston, MA')

chrisBridges.writeTweet('JS is dope')
chrisBridges.writeTweet('JS is dope')
chrisBridges.writeTweet('JS is dope')

displayTweets(chrisBridges)
displayProfileInfo(chrisBridges)
listenForClicks(chrisBridges)