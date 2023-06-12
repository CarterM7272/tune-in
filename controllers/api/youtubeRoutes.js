const router = require('express').Router();
const {Youtube_accounts} = require('../../models');
const {format_amount, format_date} = require('../../utils/helpers');

const { google } = require('googleapis');

// Create a YouTube client
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyDalIa4wkK7h0gcT-sIWjb77YFnFW0E9OA', 
});


async function searchVideosByUser(username) {
  try {
    // Retrieve the channel ID for the provided username
    const channelsResponse = await youtube.channels.list({
      forUsername: username,
      part: 'id',
    });
    console.log(channelsResponse);
    const channelId = channelsResponse.data.items[0].id;

    // Search for videos uploaded by the channel
    const searchResponse = await youtube.search.list({
      channelId: channelId,
      part: 'snippet',
      type: 'video',
      maxResults: 12,
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
      let { title, description, thumbnails, publishedAt } = video.snippet;
      let { viewCount, likeCount, commentCount } = videosResponse.data.items[index].statistics;
      publishedAt = format_date(publishedAt);
      viewCount = format_amount(viewCount);
      likeCount = format_amount(likeCount);
      commentCount = format_amount(commentCount);
      return {
        title,
        description,
        thumbnails,
        publishedAt,
        viewCount,
        likeCount,
        commentCount
      };
    });
    
      

    console.log(allVideoData);
    return {
      channelId: channelId,
      allVideoData: allVideoData
    };
  } catch (error) {
    console.error('Error retrieving videos:', error);
  }
}

router.post('/', async (req, res) => {
  try {
    const videoData = await searchVideosByUser(req.body.youtuber);
  
    const youtubeData = await Youtube_accounts.create({
      youtube_accounts_id: videoData.channelId,
      user_id: req.session.user_id
    });
  
    res.json(videoData)

  } catch(err) {
    console.log(err);
  }
})


module.exports = router;
