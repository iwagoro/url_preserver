const extractDomain = (url:string) => {
    const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
    const matches = url.match(domainRegex);

    if (matches) {
        const [, , domain, topLevelDomain, remainingPath] = matches;
        const cleanedPath = remainingPath ? remainingPath.replace(/[^a-zA-Z0-9]/g, '') : '';
        return `${domain}.${topLevelDomain}${cleanedPath}`;
    } else {
        return url;
    }
};

export default extractDomain;
