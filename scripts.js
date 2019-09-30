
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
  document.getElementById('username').textContent = user.name
  document.getElementById('user-handle').textContent = `@${user.handle}`
  document.getElementById('user-bio').textContent = user.bio
  document.getElementById('user-location').textContent = user.location
  document.getElementById('number-of-tweets').textContent = user.tweets.length
  document.getElementById('number-of-followers').textContent = user.followers
}

// make this so the students instantiate their own user and then pass that user to all of the appropriate functions
const chrisBridges = constructUser('Chris Bridges', 'chris__bridges', 'JS Dev who loves teaching', 'Boston, MA')

chrisBridges.writeTweet('JS is fun')
chrisBridges.writeTweet('cereal is so good')
chrisBridges.writeTweet('Is this dress white or gold?')
chrisBridges.addFollower()
chrisBridges.addFollower()
chrisBridges.addFollower()
chrisBridges.addFollower()
chrisBridges.addFollower()
chrisBridges.addFollower()

function run (user) {
  displayTweets(user)
  displayProfileInfo(user)
  listenForClicks(user)
  listenForAddTweet(user)
  listenForAddComment(user)
}

// plug in the user that you created in our run function here
run(chrisBridges)
