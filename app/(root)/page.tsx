export default function Home() {
    return (
        <main className="home">
            <section className="hero">
                <div className="announce">
                    <span className="dot">
                        <span className="pulse" />
                    </span>
                    <p>Available for select product design projects</p>
                </div>

                <h1>
                    Design systems that feel premium and perform beautifully.
                </h1>

                <p className="subtitle">
                    Branding • UX strategy • Product design • Creative direction
                </p>

                <div className="actions">
                    <button className="cta">Start a project</button>
                    <button className="btn btn--secondary demo">
                        View case studies
                    </button>
                </div>

                <div className="upload-shell">
                    <div className="grid-overlay" />
                    <div className="upload-card">
                        <div className="upload-head">
                            <div className="upload-icon">
                                <span className="icon">✦</span>
                            </div>
                            <h3>Creative direction for bold brands</h3>
                            <p>
                                From strategy to launch visuals, we shape
                                standout digital experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="projects" id="work">
                <div className="section-inner">
                    <div className="section-head">
                        <div className="copy">
                            <h2>Selected work</h2>
                            <p>
                                Thoughtful product storytelling, polished
                                interfaces, and visual systems built for modern
                                teams.
                            </p>
                        </div>
                    </div>

                    <div className="projects-grid">
                        <article className="project-card">
                            <div className="preview">
                                <div className="badge">
                                    <span>Brand</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div>
                                    <h3>Northstar Studio</h3>
                                    <div className="meta">
                                        <span>Brand refresh</span>
                                        <span>2026</span>
                                    </div>
                                </div>
                                <div className="arrow">→</div>
                            </div>
                        </article>

                        <article className="project-card">
                            <div className="preview">
                                <div className="badge">
                                    <span>Product</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div>
                                    <h3>Signal Flow</h3>
                                    <div className="meta">
                                        <span>UX system</span>
                                        <span>2026</span>
                                    </div>
                                </div>
                                <div className="arrow">→</div>
                            </div>
                        </article>

                        <article className="project-card">
                            <div className="preview">
                                <div className="badge">
                                    <span>Launch</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div>
                                    <h3>Arc & Ember</h3>
                                    <div className="meta">
                                        <span>Campaign art</span>
                                        <span>2025</span>
                                    </div>
                                </div>
                                <div className="arrow">→</div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="partners" id="about">
                <div className="section-inner">
                    <div className="logos" aria-label="Partner brands">
                        <div className="logo-item">
                            <div>◎</div>
                            <span>Nova</span>
                        </div>
                        <div className="logo-item">
                            <div>◈</div>
                            <span>Fable</span>
                        </div>
                        <div className="logo-item">
                            <div>▣</div>
                            <span>Kite</span>
                        </div>
                        <div className="logo-item">
                            <div>◇</div>
                            <span>Harbor</span>
                        </div>
                        <div className="logo-item">
                            <div>✧</div>
                            <span>Orbit</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
