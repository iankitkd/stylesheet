export const navigatorShare = async (url: string) => {
  if (navigator.share) {
    await navigator.share({ url: url });
  } else {
    console.error('Share not supported on this browser');
  }
};
