// Normalize paired uploads and older single-device records in one place.
export function normalizeScreenshots(screenshots = []) {
  return screenshots.flatMap((shot, index) => {
    const desktop = shot.desktopImageUrl ?? (shot.device !== "mobile" ? shot.imageUrl : "");
    const mobile = shot.mobileImageUrl ?? (shot.device === "mobile" ? shot.imageUrl : "");
    return [["desktop", desktop], ["mobile", mobile]]
      .filter(([, url]) => Boolean(url))
      .map(([device, imageUrl]) => ({ ...shot, id: `${shot.id || index}-${device}`, device, imageUrl }));
  });
}
