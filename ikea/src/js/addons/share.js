
  const SHARE_URL = 'https://showcase.withgoogle.com/ikea';
  const SHARE_TEXT = 'https://showcase.withgoogle.com/ikea';
  const toggleElement = document.querySelector('.js-share-toggle');
  const shareOptionsElement = document.querySelector('.js-share-options');
  const shareLinks = [];
  Array.prototype.forEach.call(document.querySelectorAll('[data-share]'), function (link) {
    shareLinks.push(link);
  });
  let shareOpen = false;
  function toggleShare() {
    shareOpen = !shareOpen;
    updateShareVisiblity();
  }
  function updateShareVisiblity() {
    shareOptionsElement.classList.toggle('is-active', shareOpen);
    toggleOutsideShareClick(shareOpen);
  }
  function handleWindowClick(event) {
    if (
      !shareOptionsElement.contains(event.target) &&
      !toggleElement.contains(event.target) &&
      shareOpen
    ) {
      shareOpen = false;
      updateShareVisiblity();
    }
  }
  function toggleOutsideShareClick(open) {
    if (open) {
      document.addEventListener('click', handleWindowClick, false);
    } else {
      document.removeEventListener('click', handleWindowClick, false);
    }
  }
  function share(type) {
    trackerEvent('Share',type)
    switch (type) {
      default:
      case 'twitter':
        openShare('https://twitter.com/intent/tweet?text=Learn how IKEA uses Google Cloud to bring the uniqueness of their brand to life digitally, and improve people’s lives at home. @IngkaGroup @googlecloud &url=' + encodeURIComponent(SHARE_URL));
        break;

      case 'facebook':
        openShare('https://www.facebook.com/sharer.php?display=popup&quote=Learn how IKEA uses Google Cloud to bring the uniqueness of their brand to life digitally, and improve people’s lives at home.&u=' + encodeURIComponent(SHARE_URL));
        break;
      case 'linkedin':
        openShare('https://www.linkedin.com/shareArticle?mini=true&title=Learn how IKEA uses Google Cloud to bring the uniqueness of their brand to life digitally, and improve people’s lives at home. @&url=' + encodeURIComponent(SHARE_URL));
        break;
      case 'copy':
        copyToClipboard(SHARE_URL);
        break;
    }
  }
  function openShare(url) {
    window.open(url, 'shared', 'status=no,resizable=no,width=640,height=480,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no');
  }
  function copyToClipboard(url) {
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  if(toggleElement) toggleElement.addEventListener('click', toggleShare);
  Array.prototype.forEach.call(shareLinks, function (link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      share(link.getAttribute('data-share'));
    });
  });
