

const createThumbnail = async (url: string) => {

    const extractDomain = (url: string) => {
        const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
        const matches = url.match(domainRegex);

        if (matches) {
            const [, , domain, topLevelDomain] = matches;
            return `${domain}.${topLevelDomain}`;
        } else {
            return url;
        }
    }

    let data = {
        key: 'b46cc982a1e8e833732a810bfb41306b',
        q: url
    }

    let result = await fetch('https://api.linkpreview.net', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .then(json => json) 

    if(result.image === undefined || result.image === null || result.image === ""){
        data = {...data,q:extractDomain(url)}
        const result2 = await fetch('https://api.linkpreview.net', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
        })
            .then(data => data.json())
            .then(json => json) 

        result = { ...result, image:result2.image }
    }

    

    return result 
}

export default createThumbnail
