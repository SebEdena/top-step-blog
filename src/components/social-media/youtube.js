export default function Youtube({ link }) {

    const getVideoId = (link) => {
        const url = new URL(link)
        switch(url.hostname) {
            case "youtu.be": {
                return link.split("/").slice(-1)[0].split("?")[0];
            }
            case "www.youtube.com": {
                if(url.pathname.startsWith('/embed')) {
                    return link.split("/").slice(-1)[0].split("?")[0];
                } else {
                    return url.searchParams.get('v') ?? '';
                }
            }
            default: return '';
        }
    }

    return (
        <div className="youtube-container flex justify-center items-center">
            <iframe width="560" height="315" 
				src={`https://www.youtube.com/embed/${getVideoId(link)}`} 
				title="YouTube video player" frameBorder="0" 
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
				allowFullScreen>
			</iframe>
        </div>
    )
}
