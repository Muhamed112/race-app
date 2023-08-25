import Image from "next/image";
import HeaderButtons from "@/components/HeaderButtons";
import DriversTableFinal from "@/components/DriversTableFinal";
import Link from "next/link";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <Image src="/logo.jpg" width={100} height={100} alt="logo" />
        <Link href="dashboard">
          <Button>Back</Button>
        </Link>
      </div>
      <DriversTableFinal />
    </div>
  );
}
