import TweetEmbed from "react-tweet-embed"

export default function Twitter({ link }) {

    return (
        <section className="twitter-container">
            <TweetEmbed tweetId={ link } options={{dnt: true, align: 'center'}} />
        </section>
    )
}
