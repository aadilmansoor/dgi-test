// Default icon for works and categories without a chosen icon.
export const BuildingIcon = ({ className = "" }) => (
  <svg className={className} width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.5756 37.7704H32.3486V30.968C32.3486 30.6525 32.0912 30.3961 31.7744 30.3961H28.419V12.5069C28.419 5.61009 22.785 0 15.8609 0H7.30502C6.98824 0 6.7308 0.256391 6.7308 0.571875V30.3971H3.37545C3.05867 30.3971 2.80123 30.6535 2.80123 30.9689V37.7714H0.574219C0.257441 37.7714 0 38.0278 0 38.3433C0 38.6587 0.257441 38.9151 0.574219 38.9151H34.5756C34.8924 38.9151 35.1498 38.6587 35.1498 38.3433C35.1498 38.0278 34.8924 37.7714 34.5756 37.7714V37.7704Z" fill="currentColor"/>
  </svg>
);

/**
 * Renders a category icon chosen from the icon library in the dashboard.
 * The SVG is applied as a CSS mask rather than injected as markup, so stored
 * content can never run script, and the icon takes the current text colour.
 */
export default function CategoryIcon({ iconSvg, iconUrl, size = 40, className = "" }) {
  if (iconSvg) {
    const maskImage = `url("data:image/svg+xml;utf8,${encodeURIComponent(iconSvg)}")`;
    return (
      <span
        aria-hidden="true"
        className={`inline-block shrink-0 ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: "currentColor",
          WebkitMaskImage: maskImage,
          maskImage,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    );
  }

  if (iconUrl) {
    // Legacy uploaded icon image, shown until it is replaced in the dashboard.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={iconUrl} alt="" width={size} height={size} className={`object-contain ${className}`} />;
  }

  return <BuildingIcon className={className} />;
}
