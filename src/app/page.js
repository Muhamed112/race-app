import DriversTable from "@/components/DriversTable";
import Link from "next/link";
import { Button } from "@mui/material";
import MultipleTimers from "@/components/Test";
import Image from "next/image";

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
        <Image src="/logo.jpg" width={100} height={100} />

        <Link href="form">
          <Button>Register</Button>
        </Link>
      </div>
      <DriversTable />
    </div>
  );
}
