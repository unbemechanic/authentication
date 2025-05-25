import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import axios from "axios";
import ProfileButton from "@/components/profileButton";

export default async function Home() {
  return (
    <div>
      <header>
        <ProfileButton />
      </header>
    </div>
  );
}
