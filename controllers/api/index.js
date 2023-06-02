const router = require('express').Router();
const userRoutes = require('./userRoutes');

const { google } = require('googleapis');

// Create a YouTube client
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY, // Replace with your actual API key
});


async function searchVideosByUser(username) {
  try {
    // Retrieve the channel ID for the provided username
    const channelsResponse = await youtube.channels.list({
      forUsername: username,
      part: 'id',
    });
    const channelId = channelsResponse.data.items[0].id;

    // Search for videos uploaded by the channel
    const searchResponse = await youtube.search.list({
      channelId: channelId,
      part: 'snippet',
      type: 'video',
    });

    // Get the video IDs from the search results
    const videoIds = searchResponse.data.items.map((item) => item.id.videoId);

    // Retrieve video statistics using the video IDs
    const videosResponse = await youtube.videos.list({
      id: videoIds.join(','),
      part: 'statistics',
    });

    // Process the search results along with video statistics
    const videos = searchResponse.data.items;

    const allVideoData = videos.map((video, index) => {
      const { title, description, thumbnails, publishedAt } = video.snippet;
      const { viewCount, likeCount, commentCount } = videosResponse.data.items[index].statistics;
      return {
        title,
        description,
        thumbnails,
        publishedAt,
        viewCount,
        likeCount,
        commentCount
      }
    });

    console.log(allVideoData);

  } catch (error) {
    console.error('Error retrieving videos:', error);
  }
}


// Call the function with the username of the user you want to find videos for
searchVideosByUser('PewDiePie');

router.use('/users', userRoutes);

module.exports = router;
