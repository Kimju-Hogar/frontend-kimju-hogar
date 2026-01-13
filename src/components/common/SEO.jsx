import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = 'Kimju Hogar';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const siteDescription = description || 'Kimju Hogar - Tu tienda favorita de cositas maravillosas, decoración y hogar en Valledupar, Colombia. ✨';

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={siteDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || window.location.href} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={siteDescription} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url || window.location.href} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={siteDescription} />
            {image && <meta property="twitter:image" content={image} />}
        </Helmet>
    );
};

export default SEO;
