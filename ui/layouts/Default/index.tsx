import Footer from "@/ui/Footer";
import Navbar from "@/ui/Navbar";
import { Grid } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Grid gridTemplateRows={"1fr auto"} pt="60px" minH="100vh">
        <main> {children} </main>
        <Footer />
      </Grid>
    </>
  );
}
