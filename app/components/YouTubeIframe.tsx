type YouTubeIframeProps = {
  url: URL;
};

export function YouTubeIframe({ url }: YouTubeIframeProps) {
  const videoId = url.searchParams.get("v");

  if (!videoId) {
    return null;
  }

  return (
    <iframe
      className="aspect-video"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}
