import classNames from "./Bottom.module.css";

export default function Bottom() {
  return (
    <footer className={classNames.footer}>
      <div className={classNames.left}>
        <p className={classNames.text}>
          {new Date().getFullYear()} ELC Logistics. All rights reserved.
        </p>
      </div>
      <div className={classNames.right}>
        <a href="#" className={classNames.link}>
          Privacy Policy
        </a>
        <span className={classNames.separator}>|</span>
        <a href="#" className={classNames.link}>
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
