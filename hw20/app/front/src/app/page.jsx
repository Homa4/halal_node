"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Button from "./components/Button";
import { getList } from "./api/getList";

export default function Home() {
  return (
    <div className="homeDiv">
      <Button className="userList" onClick={getList}>
        <span>Get list of users</span>
      </Button>
    </div>
  );
}
