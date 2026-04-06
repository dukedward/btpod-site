const YT_BASE = "https://www.googleapis.com/youtube/v3";

async function fetchJson(url) {
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API error: ${res.status} ${text}`);
  }

  return res.json();
}

export async function getUploadsPlaylistId(apiKey, channelId) {
  const url = `${YT_BASE}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;

  const data = await fetchJson(url);
  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

export async function getVideosPage({ apiKey, playlistId, pageToken = "" }) {
  const url =
    `${YT_BASE}/playlistItems?part=snippet,contentDetails` +
    `&playlistId=${playlistId}` +
    (pageToken ? `&pageToken=${pageToken}` : "") +
    `&key=${apiKey}`;

  const data = await fetchJson(url);

  return {
    items: (data.items || [])
      .filter((item) => item.contentDetails?.videoId)
      .map((item) => {
        const videoId = item.contentDetails.videoId;

        return {
          youtube_video_id: videoId,
          title: item.snippet?.title ?? "",
          description: item.snippet?.description ?? "",
          published_at:
            item.contentDetails?.videoPublishedAt ||
            item.snippet?.publishedAt ||
            "",
          thumbnail_url:
            item.snippet?.thumbnails?.maxres?.url ||
            item.snippet?.thumbnails?.high?.url ||
            item.snippet?.thumbnails?.medium?.url ||
            item.snippet?.thumbnails?.default?.url ||
            "",
          youtube_url: `https://www.youtube.com/embed/${videoId}`,
        };
      }),
    nextPageToken: data.nextPageToken || null,
  };
}

export async function fetchAllVideos(apiKey, channelId, maxPages = 20) {
  const playlistId = await getUploadsPlaylistId(apiKey, channelId);
  if (!playlistId) throw new Error("No uploads playlist found");

  let pageToken = "";
  let all = [];
  let page = 0;

  do {
    const { items, nextPageToken } = await getVideosPage({
      apiKey,
      playlistId,
      pageToken,
    });

    all.push(...items);
    pageToken = nextPageToken;
    page += 1;
  } while (pageToken && page < maxPages);

  return all;
}

export async function fetchLatestVideos(
  apiKey,
  channelId,
  isKnownVideoId,
  maxPages = 3,
) {
  const playlistId = await getUploadsPlaylistId(apiKey, channelId);
  if (!playlistId) throw new Error("No uploads playlist found");

  let pageToken = "";
  let newest = [];
  let page = 0;
  let foundExisting = false;

  do {
    const { items, nextPageToken } = await getVideosPage({
      apiKey,
      playlistId,
      pageToken,
    });

    for (const item of items) {
      const alreadyExists = await isKnownVideoId(item.youtube_video_id);

      if (alreadyExists) {
        foundExisting = true;
        break;
      }

      newest.push(item);
    }

    if (foundExisting) break;

    pageToken = nextPageToken;
    page += 1;
  } while (pageToken && page < maxPages);

  return newest;
}
