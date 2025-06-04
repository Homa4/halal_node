import Header from "app/components/Header/Header";
import Bottom from "app/components/Bottom/Bottom";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <>
      <Header />
      <section className="aboutus-section">
        <div className="overlay-box">
          <div className="text-block">
            <span className="highlight">ELC Logistics</span> is a premier
            European transportation and logistics company specializing in
            comprehensive supply chain solutions across the continent. With a
            dedicated team of{" "}
            <span className="highlight">280 professionals</span> and a fleet of{" "}
            <span className="highlight">210 advanced trucks</span>, ELC ensures
            efficient, secure, and on-time cargo movement throughout Europe's
            complex transportation networks.
          </div>

          <div className="text-block">
            Our services encompass <span className="highlight">FTL</span> and{" "}
            <span className="highlight">LTL</span> shipping, cross-border
            transportation, warehousing and distribution, and specialized
            freight forwarding. We maintain strategic partnerships across{" "}
            <span className="highlight">15 European countries</span>, ensuring
            seamless multimodal transport solutions.
          </div>

          <div className="text-block">
            <span className="highlight">Founded in 2016</span> by an experienced
            logistics entrepreneur, ELC has rapidly expanded to become a trusted
            partner in multiple sectors, with{" "}
            <span className="highlight">1,200+ clients</span>.
          </div>

          <div className="text-block">
            Committed to sustainability, ELC operates one of Europe's most
            fuel-efficient fleets, reducing carbon emissions by{" "}
            <span className="highlight">35%</span>.
          </div>
        </div>
      </section>
      {/* <Bottom /> */}
    </>
  );
}
