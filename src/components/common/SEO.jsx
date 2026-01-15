import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, schema, canonical }) => {
    const siteTitle = 'Kimju Hogar';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const siteDescription = description || 'Kimju Hogar - Tu tienda favorita de cositas maravillosas, decoración y hogar en Valledupar, Colombia. ✨';
    const currentUrl = url || window.location.href;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={siteDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={siteDescription} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={siteDescription} />
            {image && <meta property="twitter:image" content={image} />}

            {/* Structured Data (Schema.org) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
