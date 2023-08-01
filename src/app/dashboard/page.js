import DriversTable from "@/components/DriversTable";
import Image from "next/image";
import HeaderButtons from "@/components/HeaderButtons";

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
        <HeaderButtons />
      </div>
      <DriversTable />
    </div>
  );
}
