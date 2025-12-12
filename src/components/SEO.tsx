import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title,
  description,
  name = "Novluma",
  type = "website",
  image,
  url,
}: SEOProps) {
  const siteUrl = window.location.origin;
  const currentUrl = url || window.location.href;
  const metaImage = image || `${siteUrl}/og-image.png`; // Fallback to default OG image

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>
        {title} | {name}
      </title>
      <meta name="description" content={description} />

      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={currentUrl} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}
