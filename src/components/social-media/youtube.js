export default function Youtube({ link }) {
    return (
        <div className="youtube-container flex justify-center items-center">
            <iframe width="560" height="315" 
				src={`https://www.youtube.com/embed/${link}`} 
				title="YouTube video player" frameBorder="0" 
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
				allowFullScreen>
			</iframe>
        </div>
    )
}
