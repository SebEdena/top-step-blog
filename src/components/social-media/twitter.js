export default function Twitter({ link }) {

    return (
        <section className="twitter-container">
            <a
                className="twitter-embed"
                data-height="400"
                href={ link }
                target="_blank"
                rel="noreferrer"
                >
            </a>
        </section>
    )
}
