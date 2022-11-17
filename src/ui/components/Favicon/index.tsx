import React, {Fragment} from 'react';

export interface FaviconProps {
    assetsPath: string;
}

const sizes = [16, 32, 120, 192];

const appleTouchSizes = [76, 152, 180];

const renderIconLink = (size: number, folder: string, rel = 'icon') => {
    const dimensions = `${size}x${size}`;

    return (
        <link
            key={size}
            type="image/png"
            sizes={dimensions}
            rel={rel}
            href={`${folder}/favicon-${dimensions}.png`}
        />
    );
};

const Favicon: React.FC<FaviconProps> = ({assetsPath}) => {
    const folder = `${assetsPath}/favicon`;

    return (
        <Fragment>
            <link rel="icon" href={`${folder}/favicon.ico`} sizes="any" />
            <link type="image/x-icon" rel="shortcut icon" href={`${folder}/favicon.ico`} />
            {sizes.map((size) => renderIconLink(size, folder))}
            {appleTouchSizes.map((size) => renderIconLink(size, folder, 'apple-touch-icon'))}
        </Fragment>
    );
};

export default Favicon;
