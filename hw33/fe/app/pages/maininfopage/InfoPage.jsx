import styles from "./InfoPage.module.css";

export default function InfoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.infoSection}>
        <span>
          <strong>ELC Logistics</strong> is a modern transportation company
          specializing in fast and reliable delivery services across the
          country. With a dedicated team of <strong>280 professionals</strong>{" "}
          and a fleet of <strong>210 advanced trucks</strong>, ELC ensures
          efficient, secure, and on-time cargo movement. The company provides
          real-time shipment tracking, 24/7 customer support, and flexible
          logistics solutions tailored to client needs.
        </span>
        <span>
          <strong>Founded in 2016</strong> by an experienced businessman with a
          strong background in logistics and entrepreneurship, ELC grew with the
          support of major companies seeking fast, safe, and punctual transport.
          Today, it's a trusted name in the industry.
        </span>
      </div>
      <img
        src="/info_img/founder.webp"
        alt="founder"
        className={styles.founderImage}
      />
    </div>
  );
}
