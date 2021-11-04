import Head from "next/head";
import { Container } from "@chakra-ui/layout";
import useSWR from "swr";
import { fetcher } from "../util/swr-fetcher";

export default function ColorTokens() {
  const { data, error } = useSWR("/api/colorTokens", fetcher);

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
      </Head>

      {error && <div>failed to load: {error.info}</div>}
    </Container>
  );
}
