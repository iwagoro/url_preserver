

const createThumbnail = async (url: string) => {

    

    const data = {
        key: 'b46cc982a1e8e833732a810bfb41306b',
        q: url
    }

    const result = await fetch('https://api.linkpreview.net', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .then(json => json) 

    return result 
}

export default createThumbnail
