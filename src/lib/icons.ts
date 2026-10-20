/**
 * Material Symbols used across the site. The Google Fonts request is subset to these names
 * (much smaller download). If you use a new icon (e.g. in a service's "icon" field), add it here.
 * Browse names at https://fonts.google.com/icons
 */
export const ICONS = [
  'apps', 'arrow_back', 'arrow_forward', 'article', 'auto_awesome', 'bolt', 'bug_report', 'check', 'check_circle',
  'cloud', 'code', 'code_blocks', 'construction', 'devices', 'download', 'favorite', 'flag', 'folder_code', 'forum',
  'grid_view', 'handshake', 'home', 'insights', 'install_mobile', 'language', 'lightbulb', 'location_on', 'mail',
  'map', 'memory', 'notes', 'open_in_new', 'person', 'phone_android', 'play_arrow', 'rocket_launch', 'rss_feed',
  'schedule', 'school', 'science', 'send', 'share', 'smart_toy', 'smartphone', 'sync', 'terminal', 'thumb_up',
  'translate', 'verified', 'visibility', 'work', 'workspace_premium', 'format_quote', 'shop', 'storefront', 'database',
  'api', 'history_edu', 'hub', 'group', 'swap_horiz', 'menu', 'close', 'tag', 'chat', 'new_releases', 'phone_iphone', 'photo_camera', 'expand_more', 'content_copy', 'image', 'photo_library', 'shield',
] as const;

export const iconFontUrl = () =>
  `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=${[...new Set(ICONS)].sort().join(',')}&display=block`;
