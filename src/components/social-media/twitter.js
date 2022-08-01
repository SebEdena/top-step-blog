import TweetEmbed from "react-tweet-embed"

export default function Twitter({ link }) {

    // Extract last path parameter & remove query params to get id
    const tweetId = link.split('/').slice(-1)[0].split('?')[0]

    return (
        <section className="twitter-container">
            <TweetEmbed tweetId={tweetId} options={{dnt: true, align: 'center'}} />
        </section>
    )
}
