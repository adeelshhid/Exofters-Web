import React from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../content/ContentProvider";
import Images from "../../ImageExport";
import "./Portfolio.css";

const fallbackImages = [Images.etraffic, Images.guest, Images.xliquidus];
export default function Portfolio() {
  const { portfolio } = useContent();
  const livePortfolio = portfolio.filter(
    (project) => project.published !== false,
  );
  return (
    <main className="portfolio-page page-transition">
      <header className="portfolio-hero">
        <span>SELECTED WORK</span>
        <h1>Built for the real world.</h1>
        <p>
          Digital products where craft, clarity and ambitious engineering move
          together.
        </p>
      </header>
      <section className="portfolio-content">
        <div className="portfolio-grid">
          {livePortfolio.map((project, index) => (
            <article className="portfolio-card" key={project.id}>
              <div className="portfolio-image">
                <img
                  src={
                    project.imageUrl ||
                    fallbackImages[index % fallbackImages.length]
                  }
                  alt={project.title}
                />
                <div className="portfolio-overlay">
                  {project.link ? (
                    <a className="view-btn" href={project.link}>
                      View project ↗
                    </a>
                  ) : (
                    <Link className="view-btn" to="/contact">
                      Discuss a project
                    </Link>
                  )}
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="portfolio-tags">
                  {(project.tags || []).map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
