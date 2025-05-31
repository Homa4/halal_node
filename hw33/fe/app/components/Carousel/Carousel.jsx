"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import styles from "./Carousel.module.css";

export default function Carousel() {
  return (
    <div className={styles.carouselWrapper}>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carousel-example-captions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel-example-captions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel-example-captions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel-example-captions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/main_img/main1.jpg"
              className="d-block w-100"
              alt="First slide"
            />
            <div
              className={`carousel-caption d-none d-md-block ${styles.carouselCaption}`}
            >
              <h5>Fast & Reliable Delivery</h5>
              <p>
                We ensure your goods are delivered quickly and on time, every
                time.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/main_img/main2.jpg"
              className="d-block w-100"
              alt="Second slide"
            />
            <div
              className={`carousel-caption d-none d-md-block ${styles.carouselCaption}`}
            >
              <h5>Nationwide Coverage</h5>
              <p>
                Our logistics network spans the entire country for maximum
                reach.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/main_img/main3.jpg"
              className="d-block w-100"
              alt="Third slide"
            />
            <div
              className={`carousel-caption d-none d-md-block ${styles.carouselCaption}`}
            >
              <h5>Real-Time Tracking</h5>
              <p>
                Track your shipments live with our advanced logistics platform.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/main_img/main5.jpg"
              className="d-block w-100 h-100"
              alt="Third slide"
            />
            <div
              className={`carousel-caption d-none d-md-block ${styles.carouselCaption}`}
            >
              <h5>24/7 Customer Support</h5>
              <p>
                Our team is here day and night to assist with your logistics
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
