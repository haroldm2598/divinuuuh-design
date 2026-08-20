import Button from "@/components/ui/button";
import { ArrowRight, Layers } from "lucide-react";
import Image from "next/image";

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
                    <Button className="cta">
                        Start a project <ArrowRight className="icon" />
                    </Button>
                    <Button variant="outline" size="lg" className="demo">
                        View case studies
                    </Button>
                </div>

                <div id="upload" className="upload-shell">
                    <div className="grid-overlay" />

                    <div className="upload-card">
                        <div className="upload-head">
                            <div className="upload-icon">
                                <Layers className="icon" />
                            </div>

                            <h3>Upload your floor plan</h3>
                            <p>Supports JPG, PNG, formats up to 10MB</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="projects">
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
                                <Image
                                    src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png"
                                    alt="project"
                                    fill
                                    className="object-cover"
                                />

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
                                <div className="arrow">
                                    <ArrowRight size={18} />
                                </div>
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
